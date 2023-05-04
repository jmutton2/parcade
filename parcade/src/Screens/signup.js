import React, { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { Input, TextField } from "@mui/material";
import { Link } from "@mui/material";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TitleContainer,
  DetailsContainer,
  InputBox,
} from "../components/styled/signup-styled";

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

function Signup() {
  const [email, setID] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  //
  const [validName, SetValidName] = useState(false);
  const [validEmail, SetValidEmail] = useState(false);
  const [validPassword, SetValidPassword] = useState(false);
  const [validConfirmPassword, SetValidConfirmPassword] = useState(false);
  const [validNumber, SetValidNumber] = useState(false);
  
  //

  const handleChangeName = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    const inputValue = event.target.value;
    if (regex.test(inputValue)) {
      setName(inputValue);
      SetValidName(true);
    }else{
      SetValidName(false);
    } 
  };

  const handleChangeEmail = (event) => {
    setID(event.target.value);
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const inputValue = event.target.value;

    if (emailregex.test(inputValue)) {
      setID(inputValue);
      localStorage.setItem("id", event.target.value);
      setEmailError(false);
      SetValidEmail(true);
    } else{
      setEmailError(true);
      SetValidEmail(false);
    }
    
  };

  const handleChangePassword = (event) => {
    setPass(event.target.value);
    if(password != ""){
      SetValidPassword(true);
    }else{
      SetValidPassword(false);
    }
    
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    if(confirmPassword != ""){
      SetValidConfirmPassword(true);
    }else{
      SetValidConfirmPassword(false);
    }
  };
  
  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
    const phoneRegex = /^[0-9]{10}$/;
    const inputValue = event.target.value;

    if (phoneRegex.test(inputValue)) {
      setNumber(inputValue);
      setNumberError(false);
      SetValidNumber(true);
    } else {
      setNumberError(true); 
      SetValidNumber(false);
    }
    
  };


  return (
    <Container>
      <TitleContainer>
        <img style={{ width: "70%" }} src={logo} alt="logo" />
        <Link
          style={{
            textDecoration: "none",
            color: "#878787",
            fontSize: "13px",
            marginLeft: 8,
            marginTop: 10,
          }}
          to="/login"
        >
          Already have an account? Log in here.
        </Link>
      </TitleContainer>
      <DetailsContainer>
        <form action="/signup" method="POST">
          <InputBox>
            <TextField
              fullWidth
              id="name"
              value={name}
              name="name"
              style={{ backgroundColor: "white", marginBottom: 20 }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
              }}
              label="Full Name"
              variant="standard"
              onChange={handleChangeName}
            />
          </InputBox>
          <InputBox>
            <TextField
              fullWidth
              id="email"
              value={email}
              type="email"
              name="email"
              error={emailError} // set error state of TextField based on emailError
              helperText={emailError ? "Enter a valid email address." : ""} // show error
              style={{ backgroundColor: "white", marginBottom: 20 }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
              }}
              label="Email Address"
              variant="standard"
              onChange={handleChangeEmail}
            />
          </InputBox>
          <InputBox>
            <TextField
              fullWidth
              id="password"
              value={password}
              type="password"
              name="password"
              style={{ backgroundColor: "white", marginBottom: 20 }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
              }}
              label="Password"
              onChange={handleChangePassword}
              variant="standard"
            />
          </InputBox>
          <InputBox>
            <TextField
              fullWidth
              id="confirm-password"
              type="password"
              error={passwordError} // set error state of TextField based on passwordError
              helperText={passwordError ? "Your password does not match" : ""} // show error
              style={{ backgroundColor: "white", marginBottom: 20 }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
              }}
              label="Confirm Password"
              onChange={handleChangeConfirmPassword}
              variant="standard"
            />
          </InputBox>
          <InputBox>
            <TextField
              fullWidth
              id="number"
              value={number}
              name="number"
              error={numberError} // set error state of TextField based on numberError
              helperText={numberError ? "Enter a valid phone number." : ""} // show error
              style={{ backgroundColor: "white", marginBottom: 20 }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              label="Phone Number"
              variant="standard"
              onChange={handleChangeNumber}
            />
          </InputBox>
          <div>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                backgroundColor: "#FF6D9E",
                height: "8%",
                width: "45%",
                marginTop: "5%",
                borderColor: "#FF6D9E",
                borderRadius: "25px",
                fontWeight: "600",
                textTransform: "unset",
                fontFamily: "Montserrat",
                "&:hover": {
                  backgroundColor: "#FA3F7E",
                },
              }}
              type="submit"
              id="submit"
              role="link"
              disabled={validName && validEmail && validPassword && validConfirmPassword && validNumber? false : true}
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div
          style={{
            color: "#878787",
            fontSize: "14px",
            marginTop: "auto",
            fontWeight: "600",
          }}
        >
          {" "}
          By signing up, I agree to Parcade’s Terms of Service, Privacy Policy,
          and Refund Policy.
        </div>
      </DetailsContainer>
    </Container>
  );
}

export default Signup;
