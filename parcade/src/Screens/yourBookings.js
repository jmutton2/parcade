import * as React from "react";
import Button from "@mui/material/Button";
import arrow from "../assets/arrow.svg";
import { useIsMount } from "../components/useIsMount";
import { useState, useEffect } from "react";
import HouseImg from "../assets/house1.svg";
import Navbar from "../components/Navbar.js";

import {
  Container,
  TitleContainer,
  DetailsContainer,
  Button1,
  InputBox,
  InnerContainer,
  AccInfoTitle,
  AccountInfoContainer,
  ListingContainer,
  ListingContainerImg,
  ListingContainerTitle,
  ListingContainerInfo,
  NavbarContainer,
} from "../components/styled/yourBookings-styled";

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

export default function YourBookings() {
  const isMount = useIsMount();
  const [received, setReceived] = useState([]);
  const storedEmail = localStorage.getItem("id");

  useEffect(() => {
    if (isMount) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: storedEmail,
        }),
        mode: "cors",
      };

      fetch(host + "/your-bookings", request)
        .then((res) => res.json())
        .then((res) => setReceived(res));
    }
  }, []);

  function displayBookingHistory() {
    if (received[1] != undefined) {
      return (
        <div>
          {received[1].map((val) => {
            return (
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  height: "11%",
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginTop: "1%",
                  borderRadius: 0,
                }}
              >
                {
                  val.address //key
                }
                <img src={arrow} style={{ marginLeft: "auto" }}></img>
              </Button>
            );
          })}
        </div>
      );
    }
  }

  function noBookings() {
    return (
      <InnerContainer>
        <div
          style={{
            color: "#676767",
            fontSize: "16px",
            marginLeft: "15%",
            marginRight: "15%",
            marginTop: "25%",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          You have no active bookings at the moment. Browse parking spots now!
        </div>
        <Button
          variant="contained"
          disableElevation
          sx={{
            color: "white",
            backgroundColor: "#FF6D9E",
            height: "80%",
            width: "60%",
            marginBottom: "20%",
            marginTop: "10%",
            alignSelf: "center",
            fontWeight: "600",
            fontFamily: "Montserrat",
            borderColor: "#FF6D9E",
            borderRadius: "25px",
            textTransform: "unset",
            "&:hover": {
              backgroundColor: "#FA3F7E",
            },
          }}
        >
          Browse Listings
        </Button>
      </InnerContainer>
    );
  }

  function currentFutureBooking() {
    if (received[0].length != 0) {
      var val = received[0][0];

      return (
        <ListingContainer>
          <ListingContainerImg>
            <img src={HouseImg} style={{ width: "100%" }} alt="HouseImg"></img>
          </ListingContainerImg>

          <ListingContainerTitle>{val.address}</ListingContainerTitle>

          <ListingContainerInfo>
            Available: {val.startDate} for {val.durationMinutes} minutes
            <div>${val.price}/hr</div>
            {/* <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                backgroundColor: "#FF6D9E",
                height: "35%",
                width: "40%",
                marginTop: "2%",
                padding: "3%",
                fontSize: "14px",
                fontWeight: "bold",
                borderColor: "#FF6D9E",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#FA3F7E",
                },
              }}
            ></Button> */}
          </ListingContainerInfo>
        </ListingContainer>
      );
    }
  }

  return (
    <Container>
      <TitleContainer>
        <h1 style={{ margin: "0%" }}>Your Bookings</h1>
      </TitleContainer>

      <InnerContainer>
        {}
        {received[0] !== undefined ? currentFutureBooking() : noBookings()}
      </InnerContainer>

      <AccountInfoContainer>
        <AccInfoTitle>Booking History</AccInfoTitle>
        {received[1] !== undefined
          ? displayBookingHistory()
          : console.log("no history")}
      </AccountInfoContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </Container>
  );
}
