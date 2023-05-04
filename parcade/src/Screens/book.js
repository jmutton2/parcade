import * as React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import HouseImg from "../assets/house1.svg";
import { useState, useEffect } from "react";
import { useIsMount } from "../components/useIsMount";
import Navbar from "../components/Navbar.js";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Buffer } from "buffer";

import {
  Container,
  SecContainer,
  TitleContainer,
  DetailsContainer,
  InnerContainer,
  InputBox,
  ButtonContainer,
  NavbarContainer,
  InputBoxContainer,
} from "../components/styled/book-styled";

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

export default function Book() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { property } = state;
  const storedEmail = localStorage.getItem("id");

  const [received, setReceived] = useState("1");
  const [bookingsReceived, setbooksRec] = useState("");
  const isMount = useIsMount();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spotNo, setSpotNo] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isMount) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: property,
        }),
        mode: "cors",
      };

      fetch(host + "/view-property", request)
        .then((res) => res.json())
        .then((res) => {
          setReceived(res);
          console.log(res);
          const buffer = Buffer.from(res.photos.data);
          const uint8Array = new Uint8Array(buffer);
          const blob = new Blob([uint8Array], { type: res.photos.type });
          setImageUrl(URL.createObjectURL(blob));
        });
    }
  });

  useEffect(() => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property: property,
      }),
      mode: "cors",
    };

    fetch("https://" + host + "/get-bookings", request)
      .then((res) => res.json())
      .then((res) => setbooksRec(res));
  }, [received]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSpotNoChange = (event) => {
    setSpotNo(event.target.value);
  };

  return (
    <Container>
      <SecContainer>
        <TitleContainer>
          <h1
            style={{
              color: "black",
              fontSize: "28px",
              paddingTop: "8%",
              paddingLeft: "11%",
              paddingRight: "11%",
            }}
          >
            Book Spot
          </h1>
        </TitleContainer>
        <DetailsContainer>
          <form
            action="/create-checkout-session"
            method="POST"
            noValidate={true}
          >
            <InnerContainer>
              <h1
                style={{
                  color: "black",
                  fontSize: "18px",
                  marginBottom: "5%",
                  width: "90%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                {received.address}
              </h1>

              <img
                src={imageUrl}
                style={{ width: "90%", paddingLeft: "5%", paddingRight: "5%" }}
                alt="HouseImg"
              ></img>
              <div>
                <h2
                  style={{
                    color: "#676767",
                    fontSize: "14px",
                    fontWeight: "400",
                    width: "90%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                  }}
                >
                  Available: {received.timeStart}-{received.timeEnd}
                </h2>
              </div>
              <h1
                style={{
                  color: "#676767",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "1%",
                  width: "90%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                Rate: ${received.price / 100}/hr
              </h1>
              <h1
                style={{
                  color: "#676767",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "1%",
                  width: "90%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                Spots Available: {received.spots}
              </h1>
              <div
                style={{
                  color: "#676767",
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5%",
                  marginBottom: "5%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                {received.description}
              </div>
            </InnerContainer>

            <InnerContainer>
              <div>
                <h1
                  style={{
                    color: "black",
                    fontSize: "18px",
                    width: "90%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                  }}
                >
                  Your Information
                </h1>
                {/*  */}
                <InputBoxContainer>
                  <InputBox>
                    <TextField
                      id="date-nums"
                      type="date"
                      name="date-nums"
                      style={{
                        backgroundColor: "white",
                        marginRight: "5%",
                        marginBottom: "5%",
                        width: "40%",
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "13px",
                        },
                        shrink: true,
                      }}
                      inputProps={{ max: "2050-01-01" }}
                      label="Date"
                      color="secondary"
                      variant="standard"
                      value={date}
                      onChange={handleDateChange}
                    />
                    {/* <DatePicker disablePast={true} /> */}
                    <TextField
                      id="time-nums"
                      type="time"
                      name="time-nums"
                      style={{
                        backgroundColor: "white",
                        marginRight: "5%",
                        marginBottom: "5%",
                        width: "22%",
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "13px",
                        },
                        shrink: true,
                      }}
                      label="Time Range"
                      color="secondary"
                      variant="standard"
                      value={time}
                      onChange={handleTimeChange}
                    />
                    <TextField
                      id="time2"
                      type="time"
                      name="time2"
                      style={{
                        backgroundColor: "white",
                        marginBottom: "10%",
                        width: "22%",
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "13px",
                        },
                        shrink: true,
                      }}
                      label=" "
                      color="secondary"
                      variant="standard"
                    />
                  </InputBox>
                  <InputBox>
                    <TextField
                      id="num-spots"
                      type="number"
                      name="num-spots"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      style={{
                        backgroundColor: "white",
                        marginRight: "5%",
                        marginBottom: "5%",
                        width: "20%",
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
                      value={spotNo}
                      onChange={handleSpotNoChange}
                    />
                  </InputBox>
                </InputBoxContainer>
                {/*  */}
                <TextField
                  id="propertyID"
                  type="propertyID"
                  value={received.id}
                  name="propertyID"
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
                <TextField
                  id="user"
                  type="string"
                  value={storedEmail}
                  name="user"
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
              </div>
            </InnerContainer>
            <ButtonContainer
              sx={{
                marginBottom: "20%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                sx={{
                  color: "white",
                  backgroundColor: "#FF6D9E",
                  height: "80%",
                  width: "40%",
                  margin: "2%",
                  padding: "3%",
                  borderColor: "#FF6D9E",
                  borderRadius: "25px",
                  fontFamily: "Montserrat",
                  textTransform: "unset",
                  "&:hover": {
                    backgroundColor: "#FA3F7E",
                  },
                }}
                onClick={() => navigate("/listings")}
              >
                Back to Listing
              </Button>

              <Button
                variant="contained"
                disableElevation
                sx={{
                  color: "white",
                  backgroundColor: "#FF6D9E",
                  height: "80%",
                  width: "40%",
                  margin: "2%",
                  padding: "3%",
                  borderColor: "#FF6D9E",
                  borderRadius: "25px",
                  fontFamily: "Montserrat",
                  textTransform: "unset",
                  "&:hover": {
                    backgroundColor: "#FA3F7E",
                  },
                }}
                role="link"
                id="submit"
                type="submit"
              >
                Confirm & Pay
              </Button>
            </ButtonContainer>
          </form>
        </DetailsContainer>
      </SecContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </Container>
  );
}
