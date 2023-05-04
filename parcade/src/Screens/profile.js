import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import profilePic from "../assets/profilePic.svg";
import Navbar from "../components/Navbar.js";
import { useNavigate } from "react-router-dom";

import {
  MainContainer,
  SecContainer,
  HeaderContainer,
  HeaderText,
  HeaderTitle,
  HeaderImage,
  HeaderInfo,
  InfoContainer,
  Header,
  InnerContainer,
  NavbarContainer,
} from "../components/styled/profile-styled";

const host = process.env.REACT_APP_SERVER_HOST_PARCADE;

function Profile() {
  // UseState/Effect Variables
  const [info] = useState("");
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phoneNum, setPhoneNum] = useState(512840);
  const [email, setEmail] = useState(localStorage.getItem("id"));

  useEffect(() => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: localStorage.getItem("id"),
      }),
      mode: "cors",
    };

    fetch(host + "/get-profile", request)
      .then((res) => res.json())
      .then((res) => {
        setFName(res[0].fname);
        setLName(res[0].lname);
        setPhoneNum(res[0].phoneNumber);
        setEmail(res[0].emailAddress);
      });
  }, [info]);

  return (
    <MainContainer>
      {
        <SecContainer>
          <HeaderContainer>
            <HeaderText>
              <HeaderTitle>Dashboard</HeaderTitle>
              <HeaderInfo>Manage your personal information</HeaderInfo>
            </HeaderText>
            <HeaderImage>
              <img
                src={profilePic}
                alt="Profile Logo"
                style={{ height: "100%" }}
              />
            </HeaderImage>
          </HeaderContainer>

          <InfoContainer>
            <InnerContainer>
              <Header>Account Settings</Header>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  height: 50,
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginTop: "6%",
                  borderRadius: "10px",
                  fontFamily: "Montserrat",
                }}
                onClick={() => {
                  localStorage.setItem("change", "firstName");
                  navigate("/editProfile");
                }}
              >
                First Name: {fName}
              </Button>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  height: 50,
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginTop: "1%",
                  borderRadius: "10px",
                  fontFamily: "Montserrat",
                }}
                onClick={() => {
                  localStorage.setItem("change", "lastName");
                  navigate("/editProfile");
                }}
              >
                Last Name: {lName}
              </Button>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  height: 50,
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginTop: "1%",
                  borderRadius: "10px",
                  fontFamily: "Montserrat",
                }}
                onClick={() => {
                  localStorage.setItem("change", "number");
                  navigate("/editProfile");
                }}
              >
                Phone Number: {phoneNum}
              </Button>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  height: 50,
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginTop: "1%",
                  borderRadius: "10px",
                  fontFamily: "Montserrat",
                }}
                onClick={() => {
                  localStorage.setItem("change", "email");
                  navigate("/editProfile");
                }}
              >
                Email: {email}
              </Button>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  height: 50,
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginTop: "1%",
                  borderRadius: "10px",
                  fontFamily: "Montserrat",
                }}
                onClick={() => {
                  localStorage.setItem("change", "pass");
                  navigate("/editProfile");
                }}
              >
                Password
              </Button>
            </InnerContainer>
          </InfoContainer>
        </SecContainer>
      }
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </MainContainer>
  );
}

export default Profile;
