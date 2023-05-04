import React, { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import logo from "../assets/logo.svg";

import {
  Container,
  SecContainer,
  TitleContainer,
  DetailsContainer,
  Button1,
  InputBox,
} from "../components/styled/login-styled";

export default function Login() {
  const [ID, setID] = useState();
  const [pass, setPass] = useState();

  const handleChangeEmail = (event) => {
    setID(event.target.value);
    localStorage.setItem("id", event.target.value);
  };

  const handleChangePassword = (event) => {
    setPass(event.target.value);
  };

  return (
    <Container>
      <SecContainer>
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
            to="/signup"
          >
            Don't have an account? Sign up here.
          </Link>
        </TitleContainer>
        <DetailsContainer>
          <div>
            <form action="/login" method="POST">
              <InputBox>
                <TextField
                  required
                  fullWidth
                  name="email"
                  value={ID}
                  type="email"
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
                  required
                  fullWidth
                  name="password"
                  value={pass}
                  type="password"
                  style={{ backgroundColor: "white", marginBottom: 20 }}
                  InputLabelProps={{
                    style: {
                      fontSize: "13px",
                    },
                  }}
                  label="Password"
                  variant="standard"
                  onChange={handleChangePassword}
                />
              </InputBox>
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
                  fontFamily: "Montserrat",
                  textTransform: "unset",
                  "&:hover": {
                    backgroundColor: "#FA3F7E",
                  },
                }}
                type="submit"
                id="submit"
                role="link"
              >
                Log In
              </Button>
            </form>
          </div>
        </DetailsContainer>
      </SecContainer>
    </Container>
  );
}
