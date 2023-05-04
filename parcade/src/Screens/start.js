import * as React from "react";
import { height, styled } from "@mui/system";
import Button from "@mui/material/Button";

import {
  Container,
  DetailsContainer,
  TitleContainer,
} from "../components/styled/start-styled";

export default function Start() {
  return (
    <Container>
      <TitleContainer>
        <h1
          style={{
            color: "white",
            fontSize: "48px",
            marginBottom: 0,
            fontWeight: "bold",
          }}
        >
          Welcome.
        </h1>
        <h2 style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>
          Get Started With Parcade.
        </h2>
      </TitleContainer>
      <DetailsContainer>
        <form action="/signup" method="GET">
          <div>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "#6172E9",
                fontWeight: "bold",
                backgroundColor: "white",
                width: "100%",
                borderColor: "white",
                borderRadius: "25px",
                fontWeight: "600",
                marginBottom: "5%",
                fontFamily: "Montserrat",
                textTransform: "unset",
                "&:hover": {
                  backgroundColor: "#D4D4D4",
                },
              }}
              type="submit"
              id="submit"
              role="link"
            >
              Create Account
            </Button>
          </div>
        </form>

        <form action="/login" method="GET">
          <div>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "#6172E9",
                fontWeight: "bold",
                backgroundColor: "white",
                width: "100%",
                borderColor: "white",
                borderRadius: "25px",
                fontWeight: "600",
                marginBottom: "5%",
                textTransform: "unset",
                fontFamily: "Montserrat",
                "&:hover": {
                  backgroundColor: "#D4D4D4",
                },
              }}
              type="submit"
              id="submit"
              role="link"
            >
              Log In
            </Button>
          </div>
        </form>

        <Button
          variant="outlined"
          disableElevation
          onClick={() => {
            alert("clicked");
          }}
          sx={{
            color: "white",
            fontWeight: "bold",
            backgroundColor: "transparent",
            width: "100%",
            borderColor: "white",
            fontWeight: "600",
            borderRadius: "25px",
            textTransform: "unset",
            fontFamily: "Montserrat",
            "&:hover": {
              backgroundColor: "#D4D4D4",
            },
          }}
        >
          Terms & Conditions
        </Button>
        <div
          style={{
            color: "white",
            fontSize: "14px",
            marginTop: "auto",
            fontWeight: "400",
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
