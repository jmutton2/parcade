// import "./App.css";
// import Start from "./Screens/start.js";
import Login from "./Screens/login.js";
// import Signup from "./Screens/signup.js";

import ViewListings from "./Screens/ViewListings.js";
// import ViewIndividualListing from "./Screens/individualListing";

// import BookForm from "./Screens/book.js";
// import ListForm from "./Screens/list.js";

// import YourListings from "./Screens/yourListings.js";
// import YourBookings from "./Screens/yourBookings.js";

// import Profile from "./Screens/profile.js";
// import Payment from "./Screens/payment";

import { useState } from "react";

function App() {
  const [id, setID] = useState();

  return (
    <div className="App">
      {id}
      {id ? <ViewListings id={id} /> : <Login onIDSubmit={setID} />}
    </div>
  );
}

// // export default App;
