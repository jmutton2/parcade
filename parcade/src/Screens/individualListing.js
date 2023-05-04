//import * as React from "react";
import { borderRadius, styled } from "@mui/system";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import HouseImg from "../assets/house1.svg";
import React, { useState } from "react";
import MapImage from "../assets/tempMap.svg";
import Navbar from "../components/Navbar.js";

import {
  Container,
  TitleContainer,
  HeaderContainer,
  InputBox,
  ListingContainer,
  ListingContainerTitle,
  ListingContainerImg,
  ListingContainerInfo,
  MapContainer,
  MapTitle,
  Map,
  SearchBarStyle,
  ListingContainerFooter,
  NavbarContainer,
} from "../components/styled/individualListing-styled";

export default function Book() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <HeaderContainer>
        <SearchBarStyle>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Seach..."
            style={{
              outline: "none",
              height: "50%",
              width: "100%",
            }}
          />
        </SearchBarStyle>
      </HeaderContainer>

      <ListingContainer>
        <ListingContainerTitle>356 Hayden St.</ListingContainerTitle>

        <ListingContainerImg>
          <img src={HouseImg} style={{ width: "100%" }} alt="HouseImg"></img>
        </ListingContainerImg>

        <ListingContainerInfo>
          <div>Available: Today 16:00-22:00</div>
          <div>$5/hr</div>
          <div>Spots Available: 2</div>
          <div>
            A clean driveway containing 2 parking spots perfect for 2 sedans. In
            close proximity to the city.
          </div>
        </ListingContainerInfo>

        <MapContainer>
          <MapTitle>Map</MapTitle>
          <Map>
            <img src={MapImage}></img>
          </Map>
        </MapContainer>

        <ListingContainerFooter>
          <Button
            variant="contained"
            disableElevation
            sx={{
              color: "white",
              backgroundColor: "#FF6D9E",
              width: "40%",
              marginTop: "2%",
              padding: "3%",
              fontSize: "15px",
              fontFamily: "Montserrat",
              textTransform: "unset",
              borderColor: "#FF6D9E",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: "#FA3F7E",
              },
            }}
          >
            Book Spot
          </Button>
        </ListingContainerFooter>
      </ListingContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </Container>
  );
}
