import * as React from "react";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { appBarClasses, TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import upload from "../assets/upload-photo.svg";
import { borderRadius, styled } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  ContainerSec,
  TitleContainer,
  DetailsContainer,
  Button1,
  InputBox,
  InnerContainer,
  ContainerImg,
  ContainerBtn,
  UploadImg,
} from "../components/styled/list-styled";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(apiKey);

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

function List() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [adr, setAdr] = useState("");
  const [post, setPost] = useState("");
  //ignoring date input for now
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [cost, setCost] = useState("");
  const [spots, setSpots] = useState("");
  const [img, setImage] = useState("");
  const [desc, setDesc] = useState("Short description on your spot.");
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  //
  const [addressError, setAddressError] = useState(false);
  const [postError, setPostError] = useState(false);
  const [costError, setCostError] = useState(false);
  const [spotsError, setSpotsError] = useState(false);
  //
  const [validAddress, SetValidAddress] = useState(false);
  const [validPost, SetValidPost] = useState(false);

  const [validDate, SetValidDate] = useState(false);
  const [validStartTime, SetValidStartTime] = useState(false);
  const [validEndTime, SetValidEndTime] = useState(false);

  const [validCost, SetValidCost] = useState(false);
  const [validSpots, SetValidSpots] = useState(false);
  const [validPhoto, SetValidPhoto] = useState(false);
  //

  const storedEmail = localStorage.getItem("id");

  function submitListing(e) {
    e.preventDefault();
    alert("sending request");
    var adrcom = adr + " " + post;

    const formData = new FormData();
    formData.append("userID", storedEmail);
    formData.append("adr", adrcom);
    formData.append("cost", cost);
    formData.append("spots", spots);
    formData.append("photos", imageBlob, "image.png"); // add the Blob object with a filename
    formData.append("desc", desc);
    formData.append("timeStart", timeStart);
    formData.append("timeEnd", timeEnd);

    const request = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData, //need userID to remain accessible after sign in
      // mode: "cors",
    };

    console.log(formData);

    fetch(host + "/create-product", request).then((res) => {
      if (res.status == 200) {
        navigate("/listings");
      }
    });
  }

  const handleAddAddress = (event) => {
    const enteredAddress = event.target.value;
    Geocode.fromAddress(enteredAddress + ", London, ON")
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        console.log("VALID: ", enteredAddress);
        setAdr(enteredAddress);
        setAddressError(false);
        SetValidAddress(true);
      })
      .catch((error) => {
        console.log("INVALID");
        setAddressError(true);
        SetValidAddress(false);
      });
  };

  const handleAddPost = (event) => {
    const inputValue = event.target.value;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (postalCodeRegex.test(inputValue)) {
      setPost(inputValue);
      SetValidPost(true);
      setPostError(false);
    } else {
      setPostError(true);
    }
  };

  const handleAddDate = (event) => {
    const inputValue = event.target.value;
    // adding date ignored?
    SetValidDate(true);
  };

  const handleAddStartTime = (event) => {
    const inputValue = event.target.value;
    setTimeStart(inputValue);
    SetValidStartTime(true);
  };

  const handleAddEndTime = (event) => {
    const inputValue = event.target.value;
    setTimeEnd(inputValue);
    SetValidEndTime(true);
  };

  const handleAddCost = (event) => {
    setCost(event.target.value);
    const inputValue = event.target.value;
    if (inputValue > 2) {
      setCost(inputValue);
      SetValidCost(true);
      setCostError(false);
    } else {
      setCostError(true);
    }
  };

  const handleAddSpots = (event) => {
    setSpots(event.target.value);
    SetValidSpots(true);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: file.type });
      setImageBlob(blob);
      SetValidPhoto(true);
      setImageSrc(URL.createObjectURL(blob));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <ContainerSec>
        <TitleContainer>
          <h1 style={{ color: "black", fontSize: "28px" }}>
            List a Parking Spot.
          </h1>
        </TitleContainer>
        <DetailsContainer>
          <form action="" method="POST">
            <div>
              <TextField
                id="email"
                type="email"
                value={storedEmail}
                name="email"
              />
              <InputBox>
                <TextField
                  required
                  id="address"
                  type="address"
                  name="address"
                  error={addressError}
                  helperText={addressError ? "Enter a valid address." : ""} // show error
                  style={{
                    backgroundColor: "white",
                    marginBottom: "10%",
                    marginRight: "5%",
                    width: "65%",
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "13px",
                    },
                  }}
                  label="Address"
                  color="secondary"
                  variant="standard"
                  onChange={handleAddAddress}
                />
                <TextField
                  id="postal-code"
                  error={postError}
                  helperText={postError ? "Enter a valid postal code." : ""} // show error
                  style={{
                    backgroundColor: "white",
                    marginBottom: "10%",
                    width: "30%",
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "13px",
                    },
                  }}
                  inputProps={{ maxLength: 6 }}
                  label="Postal Code"
                  color="secondary"
                  variant="standard"
                  onChange={handleAddPost}
                />
              </InputBox>
            </div>
            <div>
              <InputBox>
                <TextField
                  id="date"
                  type="date"
                  style={{
                    backgroundColor: "white",
                    marginBottom: "10%",
                    marginRight: "5%",
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
                  onChange={handleAddDate}
                />

                <TextField
                  id="time1"
                  type="time"
                  style={{
                    backgroundColor: "white",
                    marginBottom: "10%",
                    marginRight: "5%",
                    width: "25%",
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
                  onChange={handleAddStartTime}
                />
                <TextField
                  id="time2"
                  type="time"
                  style={{
                    backgroundColor: "white",
                    marginBottom: "10%",
                    width: "25%",
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
                  onChange={handleAddEndTime}
                />
              </InputBox>
              <div>
                <InputBox>
                  <FormControl
                    fullWidth
                    sx={{
                      marginBottom: "10%",
                      marginRight: "5%",
                      width: "45%",
                    }}
                    variant="standard"
                    color="secondary"
                  >
                    <InputLabel htmlFor="price">Price/Hour</InputLabel>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      error={costError}
                      helperText={
                        costError ? "Enter a valid price (Minimum $2)." : ""
                      } // show error
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      onChange={handleAddCost}
                    />
                  </FormControl>

                  <TextField
                    id="num-spots"
                    type="number"
                    error={spotsError}
                    helperText={
                      spotsError ? "Enter a valid number of spots." : ""
                    } // show error
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    style={{
                      backgroundColor: "white",
                      marginBottom: "10%",
                      width: "50%",
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "13px",
                      },
                    }}
                    label="Number of Spots"
                    color="secondary"
                    variant="standard"
                    onChange={handleAddSpots}
                  />
                </InputBox>
              </div>
            </div>

            {!imageSrc ? (
              <div>
                <div style={{ color: "#878787", fontSize: "12px" }}>
                  Upload Photo
                </div>
                <UploadImg>
                  <>
                    <label htmlFor="image-upload">
                      <Button
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                        onChange={(event) => setImage(event.target.value)}
                        sx={{
                          backgroundColor: "white",
                          color: "#7385FD",
                          fontWeight: 500,
                          height: "35px",
                          width: "111px",
                          fontSize: "12px",
                          borderRadius: "25px",
                          border: "none",
                          textTransform: "none",
                        }}
                      >
                        Upload Photo
                      </Button>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                  </>
                </UploadImg>
              </div>
            ) : (
              <div style={{ paddingBottom: "10%" }}>
                <img
                  src={imageSrc}
                  alt="Selected file"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            )}

            <TextField
              style={{
                width: "100%",
                alignSelf: "center",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
              }}
              id="description-box"
              label="Description"
              multiline
              rows={5}
              color="secondary"
              defaultValue="Short description on your spot."
              onChange={(event) => setDesc(event.target.value)}
            />

            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                backgroundColor: "#FF6D9E",
                textTransform: "none",
                height: "5%",
                width: "50%",
                marginTop: "10%",
                borderColor: "#FF6D9E",
                fontSize: "15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                borderRadius: "25px",
                textTransform: "unset",
                "&:hover": {
                  backgroundColor: "#FA3F7E",
                },
              }}
              disabled={
                validAddress &&
                validPost &&
                validCost &&
                validSpots &&
                validPhoto &&
                validDate &&
                validStartTime &&
                validEndTime
                  ? false
                  : true
              }
              onClick={submitListing}
              role="link"
            >
              Post Listing
            </Button>
          </form>
        </DetailsContainer>
      </ContainerSec>
    </Container>
  );
}

export default List;
