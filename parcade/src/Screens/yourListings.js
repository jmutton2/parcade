import * as React from "react";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar.js";
import { useEffect, useState } from "react";
import { useIsMount } from "../components/useIsMount";
import { TextField } from "@mui/material";
import { Buffer } from "buffer";
import Spinner from "../components/Spinner";
import "../components/styled/spinner-styled.css";

import {
  Container,
  ContainerSec,
  TitleContainer,
  DetailsContainer,
  Button1,
  InputBox,
  InnerContainer,
  MainListingContainer,
  ListingContainer,
  ListingContainerImg,
  ListingContainerTitle,
  ListingContainerInfo,
  InnerContainerBtns,
  StatsContainerMain,
  StatsContainerTitle,
  StatsContainerSec,
  NavbarContainer,
  ButtonContainer,
} from "../components/styled/yourListings-styled";

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

function YourListings() {
  const isMount = useIsMount();
  const [received, setReceived] = useState([]);
  const [listerFlag, setListerFlag] = useState(false);
  const [valid, setValid] = useState([]);
  const storedEmail = localStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMount) {
      async function fetchData() {
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
        await fetch(host + "/list-spots", request)
          .then((res) => res.json())
          .then((res) => {
            setListerFlag(res[0].listerFlag == 1);
            setReceived(res.slice(1));
            setIsLoading(false);
          });
      }
      fetchData();
    }
  }, []);

  // This is for if the account is already signed up as a lister
  function renderList() {
    // This is if you have no current listings
    if (Array.isArray(received) && received.length == 0) {
      return (
        <div>
          <InnerContainer>
            <div
              style={{
                color: "#676767",
                fontSize: "15px",
                marginLeft: "15%",
                marginRight: "15%",
                marginTop: "25%",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              You have no spots listed at the moment. List a parking spot now.
            </div>
            <form action="/list" method="GET">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    color: "white",
                    backgroundColor: "#FF6D9E",
                    height: "90%",
                    width: "60%",
                    marginBottom: "20%",
                    marginTop: "10%",
                    alignSelf: "center",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    borderColor: "#FF6D9E",
                    borderRadius: "25px",
                    textTransform: "unset",
                    "&:hover": {
                      backgroundColor: "#FA3F7E",
                    },
                  }}
                  type="submit"
                  id="submit"
                  role="link"
                >
                  Add Listing
                </Button>
              </div>
            </form>
          </InnerContainer>
        </div>
      );
    }
    // This is if you have at least one listing
    else if (Array.isArray(received) && received.length > 0) {
      return (
        <div>
          <MainListingContainer>
            {received.map((val) => {
              const buffer = Buffer.from(val.photos.data);
              const uint8Array = new Uint8Array(buffer);
              const blob = new Blob([uint8Array], { type: val.photos.type });
              const imageUrl = URL.createObjectURL(blob);
              return (
                <ListingContainer>
                  <ListingContainerImg>
                    <img
                      src={imageUrl}
                      style={{ width: "100%" }}
                      alt="HouseImg"
                    ></img>
                  </ListingContainerImg>

                  <ListingContainerTitle>{val.address}</ListingContainerTitle>

                  <ListingContainerInfo>
                    Available: {val.timeStart} - {val.timeEnd}
                    <div>${val.price / 100}/hr</div>
                    <ButtonContainer>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          color: "white",
                          backgroundColor: "#FF6D9E",
                          height: "30%",
                          width: "48%",
                          marginTop: "2%",
                          padding: "3%",
                          fontSize: "14px",
                          fontFamily: "Montserrat",
                          fontWeight: "600",
                          borderColor: "#FF6D9E",
                          borderRadius: "25px",
                          textTransform: "unset",
                          "&:hover": {
                            backgroundColor: "#FA3F7E",
                          },
                        }}
                        onClick={() => {
                          console.log("feature not made yet");
                        }}
                      >
                        Edit Listing
                      </Button>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          color: "white",
                          backgroundColor: "#FF6D9E",
                          height: "3%",
                          width: "48%",
                          marginTop: "2%",
                          padding: "3%",
                          fontSize: "14px",
                          fontFamily: "Montserrat",
                          fontWeight: "600",
                          borderColor: "#FF6D9E",
                          borderRadius: "25px",
                          textTransform: "unset",
                          marginLeft: "auto",

                          "&:hover": {
                            backgroundColor: "#FA3F7E",
                          },
                        }}
                        onClick={() => {
                          console.log("feature not made yet");
                        }}
                      >
                        List Again
                      </Button>
                    </ButtonContainer>
                  </ListingContainerInfo>
                </ListingContainer>
              );
            })}
          </MainListingContainer>
          <form action="/list" method="GET">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  color: "white",
                  backgroundColor: "#FF6D9E",
                  height: "90%",
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
                type="submit"
                id="submit"
                role="link"
              >
                Add Listing
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }

  // This is for if the account is not already signed up as a lister
  function renderSignUp() {
    return (
      <div>
        <InnerContainer>
          <div
            style={{
              color: "black",
              fontSize: "16px",
              marginLeft: "15%",
              marginRight: "15%",
              marginTop: "25%",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            You have not been set up as a lister. Activate your account now.
          </div>
          <form action="/upgrade-account" method="POST" noValidate>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                id="userID"
                type="userID"
                value={storedEmail}
                name="userID"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                style={{
                  backgroundColor: "white",
                  marginBottom: "10%",
                  marginLeft: "5%",
                  marginTop: "5%",
                  width: "37%",
                  display: "none",
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "13px",
                  },
                  shrink: true,
                }}
                label="Spot Number"
                color="secondary"
                variant="standard"
              />
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
                  borderColor: "#FF6D9E",
                  borderRadius: "25px",
                  textTransform: "unset",
                  fontFamily: "Montserrat",
                  "&:hover": {
                    backgroundColor: "#FA3F7E",
                  },
                }}
                type="submit"
                id="submit"
                role="link"
              >
                Become a Lister
              </Button>
            </div>
          </form>
        </InnerContainer>
      </div>
    );
  }

  /* TEMPLATE FOR AN EXISTING BOOKING */

  /* <InnerContainer>
          <InnerContainerImg>
            <img src={houseImg}></img>
          </InnerContainerImg>
          <InnerContainerInfo>
            <div>
              Booked From: Today 11:00-14:00
            </div>
            <div>
              Total Paid: $8.50
            </div>
            <div>
              Spots Booked: 1
            </div>
          </InnerContainerInfo>
          <InnerContainerBtns>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                backgroundColor: "#FF6D9E",
                height: "90%",
                width: "45%",
                borderColor: "#FF6D9E",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#FA3F7E",
                },
              }}
              >
              List Again
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                backgroundColor: "#FF6D9E",
                height: "90%",
                width: "45%",
                borderColor: "#FF6D9E",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#FA3F7E",
                },
              }}
              >
              Edit
            </Button>
          </InnerContainerBtns>
        </InnerContainer>

        <StatsContainerMain>
          <StatsContainerTitle>
            Property Statistics
          </StatsContainerTitle>
          <StatsContainerSec>
              <div style={{color:"#FF6D9E",fontSize: "50px"}}>
                $100
              </div>
              <div>
                earned
              </div>
          </StatsContainerSec>
          <StatsContainerSec>
              <div style={{color:"#FF6D9E",fontSize: "50px"}}>
                17
              </div>
              <div>
                hours
              </div>
          </StatsContainerSec>
        </StatsContainerMain> */

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <h1 style={{ margin: "0%", paddingLeft: "10%" }}>Your Listings</h1>
      </TitleContainer>

      <ContainerSec sx={{}}>
        {listerFlag == true ? renderList() : renderSignUp()}
      </ContainerSec>

      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </Container>
  );
}

export default YourListings;
