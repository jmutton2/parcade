import React, { useState } from "react";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import profilePic from "../assets/profilePic.svg";
import Navbar from "../components/Navbar.js";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

import {
  MainContainer,
  HeaderContainer,
  HeaderText,
  HeaderTitle,
  HeaderImage,
  HeaderInfo,
  DetailsContainer,
  InputBox,
  ButtonContainer,
  NavbarContainer,
} from "../components/styled/editProfile-styled";

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

function Update() {
  const [error, setError] = useState("");
  const [key, setKey] = useState();
  const [keyConfirm, setKeyConfirm] = useState();
  const [oldPass, setOldPass] = useState();
  const navigate = useNavigate();

  const toEdit = localStorage.getItem("change");
  let prompt = "";
  if (toEdit === "firstName") {
    prompt = "First Name";
  } else if (toEdit === "lastName") {
    prompt = "Last Name";
  } else if (toEdit === "number") {
    prompt = "Phone Number";
  } else if (toEdit === "email") {
    prompt = "Email Address";
  } else if (toEdit === "pass") {
    prompt = "Password";
  }

  const handleOldPass = (event) => {
    setOldPass(event.target.value);
  };

  const handleChange = (event) => {
    setKey(event.target.value);
  };

  const handleChangeConfirm = (event) => {
    setKeyConfirm(event.target.value);
  };

  function evaluateChange() {
    if (key !== keyConfirm) {
      setError("Error: Your 2 inputs do not match. Please try again.");
      return;
    }

    if (toEdit === "firstName") {
      // Create a request with relevant data.
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: localStorage.getItem("id"),
          fName: key,
        }),
        mode: "cors",
      };
      // Send request, update using hook if something changed in DB.
      fetch(host + "/change-fName", request)
        .then((res) => res.json())
        .then((res) => {
          if (res.changedRows !== 1) {
            setError("Error: Something went wrong.");
            return;
          } else {
            setError("");
            setTimeout(function () {
              localStorage.setItem("change", "");
              navigate("/profile");
            }, 200);
          }
        });
    } else if (toEdit === "lastName") {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: localStorage.getItem("id"),
          lName: key,
        }),
        mode: "cors",
      };

      fetch(host + "/change-lName", request)
        .then((res) => res.json())
        .then((res) => {
          if (res.changedRows !== 1) {
            setError("Error: Something went wrong.");
            return;
          } else {
            setError("");
            setTimeout(function () {
              localStorage.setItem("change", "");
              navigate("/profile");
            }, 200);
          }
        });
    } else if (toEdit === "number") {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: localStorage.getItem("id"),
          number: key,
        }),
        mode: "cors",
      };

      fetch(host + "/change-number", request)
        .then((res) => res.json())
        .then((res) => {
          if (res.changedRows !== 1) {
            setError("Error: Something went wrong.");
            return;
          } else {
            setError("");
            setTimeout(function () {
              localStorage.setItem("change", "");
              navigate("/profile");
            }, 200);
          }
        });
    } else if (toEdit === "email") {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: localStorage.getItem("id"),
          newEmail: key,
        }),
        mode: "cors",
      };
      localStorage.setItem("id", key);
      fetch(host + "/change-email", request)
        .then((res) => res.json())
        .then((res) => {
          if (res.changedRows !== 1) {
            setError("Error: Something went wrong.");
            return;
          } else {
            setError("");
            setTimeout(function () {
              localStorage.setItem("change", "");
              navigate("/profile");
            }, 200);
          }
        });
    } else if (toEdit === "pass") {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: localStorage.getItem("id"),
          oldPassword: oldPass,
          password: key,
        }),
        mode: "cors",
      };

      fetch(host + "/change-password", request)
        .then((res) => res.json())
        .then((res) => {
          if (res.changedRows !== 1) {
            setError(
              "Error: The current password is incorrect. Please try again."
            );
            return;
          } else {
            setError("");
            setTimeout(function () {
              localStorage.setItem("change", "");
              navigate("/profile");
            }, 200);
          }
        });
    }
  }

  return (
    <MainContainer>
      {/* <SecContainer> */}
      <HeaderContainer>
        <HeaderText>
          <HeaderTitle>Edit Profile</HeaderTitle>
          <HeaderInfo>Manage your personal information</HeaderInfo>
        </HeaderText>
        <HeaderImage>
          <img src={profilePic} alt="Profile Logo" style={{ height: "100%" }} />
        </HeaderImage>
      </HeaderContainer>
      {/* </SecContainer> */}
      <DetailsContainer>
        <InputBox hidden={prompt == "Password" ? false : true}>
          <TextField
            fullWidth
            id="key"
            type="password"
            name="key"
            style={{ backgroundColor: "white", marginBottom: 20 }}
            InputLabelProps={{
              style: {
                fontSize: "13px",
                fontFamily: "Montserrat",
              },
            }}
            label={"Current Password"}
            variant="standard"
            onChange={handleOldPass}
          />
        </InputBox>
        <InputBox>
          <TextField
            fullWidth
            id="key"
            type={prompt == "Password" ? "password" : ""}
            name="key"
            style={{ backgroundColor: "white", marginBottom: 20 }}
            InputLabelProps={{
              style: {
                fontSize: "13px",
                fontFamily: "Montserrat",
              },
            }}
            label={prompt == "Password" ? "New Password" : prompt}
            variant="standard"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox>
          <TextField
            fullWidth
            id="password"
            type={prompt == "Password" ? "password" : ""}
            name="password"
            style={{ backgroundColor: "white", marginBottom: 20 }}
            InputLabelProps={{
              style: {
                fontSize: "13px",
                fontFamily: "Montserrat",
              },
            }}
            label={`Confirm ${prompt}`}
            onChange={handleChangeConfirm}
            variant="standard"
          />
        </InputBox>
        <HeaderInfo style={{ color: "red" }}>
          {error !== "" ? error : ""}
        </HeaderInfo>
        <ButtonContainer>
          <Button
            variant="contained"
            disableElevation
            sx={{
              color: "white",
              backgroundColor: "#FF6D9E",
              height: "80%",
              width: "48%",
              marginTop: "5%",
              borderColor: "#FF6D9E",
              borderRadius: "25px",
              fontWeight: "600",
              fontFamily: "Montserrat",
              textTransform: "unset",
              "&:hover": {
                backgroundColor: "#FA3F7E",
              },
            }}
            id="back"
            role="link"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              color: "white",
              backgroundColor: "#FF6D9E",
              height: "80%",
              width: "48%",
              marginTop: "5%",
              borderColor: "#FF6D9E",
              borderRadius: "25px",
              fontWeight: "600",
              fontFamily: "Montserrat",
              textTransform: "unset",
              "&:hover": {
                backgroundColor: "#FA3F7E",
              },
            }}
            type="submit"
            id="submit"
            role="link"
            onClick={evaluateChange}
          >
            Update
          </Button>
        </ButtonContainer>
      </DetailsContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </MainContainer>
  );
}

export default Update;
