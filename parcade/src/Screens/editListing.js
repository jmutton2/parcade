import * as React from "react";
import Button from "@mui/material/Button";
import { useEffect } from "react";

import { appBarClasses, TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import upload from "../assets/upload-photo.svg";
import { borderRadius, styled } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "white",
  fontFamily: "Montserrat",
  fontWeight: "500",
});

const ContainerSec = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "10%",
});

const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "8%",
  fontWeight: "bold",
});

const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "70%",
  marginTop: "2%",
  display: "flex",
  flexDirection: "column",
  alignContent: "space-between",
});

const Button1 = styled("div")({
  borderRadius: 25,
  color: "white",
  justifyContent: "center",
  width: "100%",
  height: "5%",
  border: 1,
  borderColor: "white",
  textDecoration: "none",
});

const InputBox = styled("div")({
  display: "flex",
  flexDirection: "row",
  color: "white",
  width: "100%",
});

const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const ContainerImg = styled("div")({
  width: "100%",
  hieght: "auto",
});
const ContainerBtn = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  backgroundColor: "white",
  color: "#7385FD",
  fontSize: "12px",
  border: 0,
  cursor: "pointer",
  borderRadius: 25,
});

const UploadImg = styled("div")({
  display: "flex",
  width: "100%",
  height: "184px",
  marginTop: "5%",
  marginBottom: "10%",
  fontSize: "12px",
  backgroundColor: "#6172E9",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  fontFamily: "Montserrat",
  background: "linear-gradient(45deg, #aba8f7, #8645ff)",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
});

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
  const [desc, setDesc] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

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
      mode: "cors",
    };

    fetch("http://localhost:4242/create-product", request).then((res) => {
      console.log("complete");
      console.log(res);
      if (res.status == 200) {
        console.log("redirect");
        navigate("/listings");
      }
    });
  }

  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     setImageSrc(event.target.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: file.type });
      setImageBlob(blob);

      setImageSrc(URL.createObjectURL(blob));
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    console.log(imageBlob);
  }, [imageBlob]);

  return (
    <Container>
      <ContainerSec>
        <TitleContainer>
          <h1 style={{ color: "black", fontSize: "28px" }}>
            Edit Listing.
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
                style={{
                  marginBottom: "8%"
                }}
              />
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
                  onChange={(event) => setTimeStart(event.target.value)}
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
                  onChange={(event) => setTimeEnd(event.target.value)}
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
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      onChange={(event) => setCost(event.target.value)}
                    />
                  </FormControl>

                  <TextField
                    id="num-spots"
                    type="number"
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
                    onChange={(event) => setSpots(event.target.value)}
                  />
                </InputBox>
              </div>
            </div>
            <div style={{ color: "#878787", fontSize: "12px" }}>
              Upload Photo
            </div>
            <UploadImg>
              {!imageSrc && (
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
              )}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Selected file"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </UploadImg>
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
              onClick={submitListing}
              // type="submit"
              // id="submit"
              role="link"
            >
              Update Listing
            </Button>
          </form>
        </DetailsContainer>
      </ContainerSec>
    </Container>
  );
}

export default List;
