const { debug } = require("console");
const e = require("express");
const express = require("express");
const app = express();
const { resolve } = require("path");
const newConn = require("./DBConnections");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { get } = require("request");
const multer = require("multer");
const upload = multer();

const viewsDir = path.join(__dirname, "./ml_assets/views");
app.use(express.static(viewsDir));
app.use(express.static(path.join(__dirname, "./ml_assets/public")));
app.use(express.static(path.join(__dirname, "./ml_assets/images")));
app.use(express.static(path.join(__dirname, "./ml_assets/media")));
app.use(express.static(path.join(__dirname, "./ml_assets/weights")));
app.use(express.static(path.join(__dirname, "./ml_assets/dist")));

// Copy the .env.example in the root into a .env file in this folder
require("dotenv").config({ path: "./.env" });

// Ensure environment variables are set.
checkEnv();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  limit: "10mb",
};
app.use(cors(corsOptions));

app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-one-time-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-one-time-payments",
  },
});

app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded());
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.post("/signup", async (req, res) => {
  const domainURL = process.env.SERVER_DOMAIN + "face_recognition";
  const previousSite = process.env.DOMAIN + "login";

  const name = req.body.name;
  var fName = name.split(" ")[0];
  var lName = name.split(" ")[1];
  const email = req.body.email;
  const password = req.body.password;
  const number = req.body.number;
  let conn = newConn();
  let data = NaN;
  conn.connect();
  conn.query(
    `SELECT emailAddress FROM User WHERE emailAddress= '${email}'`,
    (err, rows) => {
      if (err) throw err;
      data = rows;
      //Verify user does not have an account first
    }
  );
  if (data.length != 0) {
    //Save to DB
    conn.query(
      `INSERT INTO User (emailAddress, fname, lname, phoneNumber, password) VALUES ("${email}", "${fName}", "${lName}", "${number}", "${password}")`
    );
    return res.redirect(domainURL);
  } else {
    return res.redirect(previousSite);
  }
  conn.end();
});

app.post("/login", (req, res) => {
  const domainURL = process.env.DOMAIN + "listings";
  const previousSite = process.env.DOMAIN;

  const email = req.body.email;
  const password = req.body.password;
  let conn = newConn();
  conn.connect();

  conn.query(
    `SELECT emailAddress, password FROM User WHERE emailAddress = "${email}" AND password = "${password}"`,
    (err, rows) => {
      if (err) throw err;
      //Incorrect login credentials
      if (rows.length === 0) {
        return res.redirect(previousSite);
      }
      //Correct login credentials
      else return res.redirect(domainURL);
    }
  );

  conn.end();
});

app.get("/config", async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/create-account", async (req, res) => {
  const domainURL = process.env.DOMAIN;

  return res.redirect(`${domainURL}/listings`); //CODE: Change to app landing page
});

app.post("/get-profile", async (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(
    `SELECT * FROM User WHERE emailAddress= '${req.body.emailAddress}'`,
    (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        res.send(rows.slice(0, 3));
      }
    }
  );
  conn.end();
});

app.post("/change-fName", async (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(
    `UPDATE User SET fname= '${req.body.fName}' WHERE emailAddress='${req.body.emailAddress}'`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
  conn.end();
});

app.post("/change-lName", async (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(
    `UPDATE User SET lname= '${req.body.lName}' WHERE emailAddress='${req.body.emailAddress}'`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
  conn.end();
});

app.post("/change-number", async (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(
    `UPDATE User SET phoneNumber= '${req.body.number}' WHERE emailAddress='${req.body.emailAddress}'`,
    (err, rows) => {
      if (err) throw err;
      //Verify something was returned.
      res.send(rows);
    }
  );
  conn.end();
});

app.post("/change-email", async (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(
    `UPDATE User SET emailAddress= '${req.body.newEmail}' WHERE emailAddress='${req.body.emailAddress}'`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
  conn.end();
});

app.post("/change-password", async (req, res) => {
  let conn = newConn();
  conn.connect();
  conn.query(
    `UPDATE User SET password= '${req.body.password}' WHERE emailAddress='${req.body.emailAddress}' AND password='${req.body.oldPassword}'`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
  conn.end();
});

// app.put("/add-listing", (req, res) => {
//   console.log(req.body);
//   const domainURL = process.env.DOMAIN;
//   let conn = newConn();
//   conn.connect();

//   let received = req.body;

//   var propID = genID(50);
//   var userID = received.userID;
//   var adr = received.adr;
//   var cost = received.cost;
//   var spots = received.spots;
//   var photos = received.photos;
//   var desc = received.description;
//   var timeStart = received.timeStart;
//   var timeEnd = received.timeEnd;
//   console.log(propID);
//   //add
//   conn.query(
//     `Insert into Property values ("${propID}", "unknown", "${adr}", "${cost}", "${spots}", TIME("${timeStart}"), TIME("${timeEnd}"), "${photos}", "${desc}", "${userID}")`,
//     (err, rows, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("added to db");
//       }
//     }
//   );

//   //add spots
//   for (var i = 1; i <= spots; i++) {
//     conn.query(
//       `Insert into Spot values ("${i}", "${propID}")`,
//       (err, rows, fields) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("added to db");
//         }
//       }
//     );
//   }

//   conn.end();
// });

//owned rental spaces, owner views their spots
app.post("/list-spots", (req, res) => {
  const domainURL = process.env.DOMAIN;
  let conn = newConn();
  conn.connect();

  let userID = req.body.userID;

  conn.query(
    `SELECT emailAddress AS common_column, listerFlag, null as propertyID, null as propName, null as address, null as costPerHour, null as numOfSpots, null as startTime, null as endTime, null as photos, null as description, null as priceID, null as stripeAccID from User where emailAddress="${userID}" UNION SELECT emailAddress AS common_column, null as listerFlag, propertyID, propName, address, costPerHour, numOfSpots, startTime, endTime, photos, description, priceID, stripeAccID FROM Property where emailAddress="${userID}" order by listerFlag DESC;`,
    (err, rows, fields) => {
      let data = rows;

      if (data) {
        let content = [];
        for (d of data) {
          var current = {
            listerFlag: d.listerFlag,
            id: d.propertyID,
            name: d.propName,
            address: d.address,
            price: d.costPerHour,
            spots: d.numOfSpots,
            timeStart: d.startTime,
            timeEnd: d.endTime,
            photos: d.photos,
            description: d.description,
            owner: d.common_column,
          };
          content.push(current);
        }
        res.json(content);
        res.end();
      } else {
        res.json({ ret: "Not a lister" });
        res.end();
      }
    }
  );

  conn.end();
});

app.post("/view-listings", (req, res) => {
  const domainURL = process.env.DOMAIN;
  //let value = JSON.parse(req.body);

  let city = req.body.city;
  let conn = newConn();

  conn.connect();

  conn.query(
    `Select * from Property where address like "%${city}%"`,
    (err, rows, fields) => {
      let data = rows;
      let content = [];
      for (d of data) {
        var current = {
          id: d.propertyID,
          name: d.propName,
          address: d.address,
          price: d.costPerHour,
          spots: d.numOfSpots,
          timeStart: d.startTime,
          timeEnd: d.endTime,
          photos: d.photos,
          description: d.description,
          owner: d.emailAddress,
        };

        content.push(current);
      }

      res.json(content);
      res.end();
    }
  );

  conn.end();
});

app.post("/get-bookings", async (req, res) => {
  const conn = newConn();
  conn.connect();

  var property = req.body.propery;
  var date = Date.now();

  let timings = [];

  conn.query(
    `Select * from Booking where propertyID = "${property} AND where Date(startDate) >= Date(${date})"`,
    (err, rows, fields) => {
      let data = rows;
      if (err) {
        res.write(err);
        res.end();
      } else {
        for (d of data) {
          var current = {
            startDate: d.startDate,
            minutes: d.durationMinutes,
          };
          timings.push(current);
        }
        res.json(timings);
        res.end();
      }
    }
  );
});

app.post("/view-property", (req, res) => {
  const domainURL = process.env.DOMAIN;
  var property = req.body.property;

  const conn = newConn();
  conn.connect();

  conn.query(
    `Select * from Property where propertyID = "${property}"`,
    (err, rows, fields) => {
      let d = rows[0];
      if (err) {
        res.write(err);
        res.end();
      } else {
        var current = {
          id: d.propertyID,
          name: d.propName,
          address: d.address,
          price: d.costPerHour,
          spots: d.numOfSpots,
          timeStart: d.startTime,
          timeEnd: d.endTime,
          photos: d.photos,
          description: d.description,
          owner: d.emailAddress,
        };
        res.write(JSON.stringify(current));
        res.end();
      }
    }
  );

  conn.end();
});

//view spots booked
app.post("/your-bookings", (req, res) => {
  const domainURL = process.env.DOMAIN;
  let conn = newConn();
  conn.connect();

  let futureBookings = [];
  let pastBookings = [];
  var userID = req.body.userID;
  const currentDateTime = new Date();

  //get all bookings and sort based on end times and current date'

  conn.query(
    `select b.*, p.address from Booking b inner join Property p on b.propertyID=p.propertyID where b.emailAddress = "${userID}" order by startDate DESC`,
    (err, rows, fields) => {
      var data = rows;
      if (data[0] == undefined) {
        res.write("No Bookings Found");
        res.end();
      } else {
        for (d of data) {
          d.startDate = d.startDate.toLocaleString("en-US", {
            timeZone: "America/Detroit",
          });
          var datetime = new Date(d.startDate);
          if (addMinutes(d.durationMinutes, datetime) < currentDateTime) {
            //if current date is past end date send as past bookings
            pastBookings.push(d);
          } else {
            futureBookings.push(d);
          }
        }

        futureBookings.reverse();
        // console.log(pastBookings);

        res.json([futureBookings, pastBookings]);
        res.end();
      }
    }
  );

  conn.end();
});

app.post("/book-listing", async (req, res) => {
  const errorURL = process.env.DOMAIN + "book";
  const domainURL = process.env.DOMAIN;

  const quantity = 1;
  const priceID = process.env.PRICE;
  var recvAccID;
  let conn = newConn();
  conn.connect();

  var propertyID = req.body.propertyID;
  var spotNum = req.body["num-spots"];
  var startDate = new Date(req.body["date-nums"]);
  var duration = req.body["time-nums"];
  var purchaser = req.body.user;
  var owner;

  conn.query(
    `Select emailAddress from Property where propertyID = '${propertyID}'`,
    (err, rows, fields) => {
      owner = rows;
    }
  );

  conn.query(
    `Select stripeAccID from User where emailAddress = '${owner}'`,
    (err, rows, fields) => {
      recvAccID = rows;
    }
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: quantity,
        price: priceID,
      },
    ],
    success_url: `${domainURL}success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}canceled`,
    payment_intent_data: {
      application_fee_amount: 100,
      transfer_data: {
        destination: recvAccID,
      },
    },
  });

  conn.query(
    `Insert into Booking values("${genID(50)}", "${startDate}", ${duration}, ${
      (costPerHour * duration) / 60
    }, ${spotNum}, "${propertyID}", "${purchaser}")`,
    (err, rows, fields) => {
      if (err) {
        res.write(err);
        res.end();
      }
    }
  );

  return res.redirect(303, session.url);
});

app.post("/upgrade-account", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  let conn = newConn();
  conn.connect();

  var emailAddress = req.body.userID;

  var found = false;

  //CODE: Verify user has an account first

  conn.query(
    `Select * from User where emailAddress = "${emailAddress}"`,
    (err, rows, fields) => {
      var data = rows;
      if ((data[0] = undefined)) {
        res.write("account not found");
        res.end();
      } else {
        found = true;
      }
    }
  );

  const account = await stripe.accounts.create({ type: "express" });

  if (found) {
    conn.query(
      `Update User Set listerFlag = true, stripeAccID = "${account.id}" where emailAddress = "${emailAddress}"`,
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      }
    );
  }

  // return res.redirect(domainURL + "/listings");

  // CODE: Save account.id to DB << Will be parsed automatically during payment later

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${domainURL}listings`, //CODE: Upgrade account flow entry filed (expired link, user already used this, rejected acc, etc..)
    return_url: `${domainURL}listings`, //CODE: Upgrade account page flow completed  (not necessarily all information was included)
    type: "account_onboarding",
  });

  conn.end();

  return res.redirect(accountLink.url); // Stripe hosted onboarding
});

let getOwner = function (conn, propertyID) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `Select * from Property where propertyID = "${propertyID}"`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          console.log(rows);
          resolve(rows);
        }
      }
    );
  });
};

let getAccID = function (conn, email) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `Select stripeAccID from User where emailAddress = "${email}"`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    );
  });
};

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN + "listings";
  const propertyID = req.body.propertyID;
  const userID = req.body.user;
  const date = req.body.date;
  const time = req.body.time;
  const endTime = req.body.time2;

  var timeStart = new Date("01/01/2007 " + time).getHours();
  var timeEnd = new Date("01/01/2007 " + endTime).getHours();

  var duration = (timeEnd - timeStart) * 60;

  let priceID;
  let recvAccID;

  var conn = newConn();
  conn.connect();

  let session;

  getOwner(conn, propertyID).then(async (obj) => {
    priceID = obj[0].priceID;
    recvAccID = obj[0].stripeAccID;

    const quantity = 1;

    var conn = newConn();
    conn.connect();

    conn.query(
      `Insert into Booking values("${genID(
        50
      )}", "2022-12-09 22:55:00", ${20}, ${12}, ${1}, "${propertyID}", "${userID}")`,
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        }
      }
    );

    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: quantity,
          price: priceID,
        },
      ],
      success_url: `${domainURL}`,
      cancel_url: `${domainURL}`,
      payment_intent_data: {
        application_fee_amount: 10,
        transfer_data: {
          destination: recvAccID,
        },
      },
    });

    var conn = newConn();
    conn.connect();
    conn.query(
      `Insert into Booking values("${genID(
        50
      )}", ${"2022-12-09 23:55:00"}, ${20}, ${12}, ${1}, "${propertyID}", "${userID}")`,
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        }
      }
    );

    return res.redirect(session.url);
  });

  conn.end();
});

let insertQuery = async function (
  conn,
  price,
  product,
  productName,
  req,
  unit_amount,
  email
) {
  const domainURL = process.env.DOMAIN + "/listings";
  const priceID = process.env.PRICE;

  const imageDataHex = req.file.buffer.toString("hex");

  getAccID(conn, email).then((accID) => {
    const conn = newConn();
    conn.connect();

    let acc_ID = accID[0].stripeAccID;
    return new Promise(function async(resolve, reject) {
      conn.query(
        `Insert into Property values ("${product.id}", "${productName}", "${
          req.body.adr
        }", ${parseInt(
          unit_amount
        )}, ${1}, Time("12:00 AM"), Time("11:55 PM"), x'${imageDataHex}', "${
          req.body.desc
        }", "${email}", "${price.id}", "${acc_ID}")`
      );
      resolve(conn);
      conn.end();
    });
  });
};

// Upload can take an array of photos also
app.post("/create-product", upload.single("photos"), async (req, res) => {
  const domainURL = process.env.DOMAIN + "listings";
  const conn = newConn();
  conn.connect();
  const email = req.body.userID;

  //address - price
  const productName = req.body.adr + " - " + req.body.cost;
  const currency = "cad";

  // Convert from cents to dollars
  const unit_amount = req.body.cost * 100;

  const product = await stripe.products.create({
    name: productName,
  });

  try {
    await stripe.prices
      .create({
        unit_amount,
        currency,
        product: product.id,
      })
      .then(async (price) => {
        insertQuery(
          conn,
          price,
          product,
          productName,
          req,
          unit_amount,
          email
        ).then((conn) => {
          function myFunction() {
            let temp = newConn();
            temp.connect();
            temp.query(
              `Insert into Spot values (${1}, "${product.id}")`,
              (err, rows, fields) => {
                console.log(err);
              }
            );
          }

          // Call setTimeout() function with a delay of 5 seconds and the function as an argument
          setTimeout(myFunction, 5000);
        });
      });
  } catch (err) {
    console.log(err);
  }
  // var productID = genID(50);

  //price.id
  // CODE: Save price and productID to the database entry

  // return res.redirect(303, domainURL); // Successfully created a new listing.

  res.sendStatus(200);
});

// Webhook handler for asynchronous events.
app.post("/webhook", async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    console.log(`🔔  Payment received!`);
  }

  res.sendStatus(200);
});

function checkEnv() {
  const price = process.env.PRICE;
  if (price === "price_1Hh1ZeCZ6qsJgndJaX9fauRl" || !price) {
    console.log(
      "You must set a Price ID in the environment variables. Please see the README."
    );
    process.exit(0);
  }
}

function addMinutes(numMins, date) {
  date.setTime(date.getTime() + numMins * 60 * 1000);
  return date;
}

function genID(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * length));
  }
  return result;
}

app.use(bodyParser.urlencoded({ extended: true }));
// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(cors(corsOptions));

app.get("/", (req, res) => res.redirect("/face_recognition"));
app.get("/face_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "faceRecognition.html"))
);
app.get("/face_rec", (req, res) => res.redirect("http://localhost:4241"));

app.get("/face_rec_back", (req, res) =>
  res.redirect("http://localhost:3000/verify")
);

//NEEDS TO BE IMRPOVED
app.get("confirm_user_id", (req, res) => {
  res.send("OK");
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
