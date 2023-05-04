import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { json, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Buffer } from "buffer";
import { debounce } from "lodash";

import {
  Container,
  ContainerSec,
  HeaderContainer,
  ListingContainer,
  ListingContainerImg,
  ListingContainerTitle,
  ListingContainerInfo,
  NavbarContainer,
  MapContainer,
  CarouselStyle,
} from "../components/styled/viewListings-styled.js";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const host_name = process.env.REACT_APP_SERVER_HOST_PARCADE;

Geocode.setApiKey(apiKey);

const containerStyle = {
  width: "100%",
  height: "55vh",
};

const center = {
  lat: 43.009542161687456,
  lng: -81.27376578830157,
};

const options = {
  disableDefaultUI: true, // disable all default UI controls
};

export default function ViewListings({ id }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(" ");
  const [received, setReceived] = useState([]);
  const [coords, setCoords] = useState([]);

  // Get latitude & longitude from address.
  function convert(address) {
    return new Promise((resolve, reject) => {
      Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          resolve({ lat, lng });
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async function fetchCoords() {
    const temp = [];
    for (const val of received) {
      const result = await convert(val.address);
      temp.push([result.lat, result.lng]);
    }
    let reduced = Array.from(new Set(temp));
    return reduced;
  }

  async function updateCoords() {
    setCoords([]);
    const newCoords = await fetchCoords();
    return newCoords;
  }

  const debouncedSearch = useCallback(
    debounce((text) => {
      if (text == "") {
        text = " ";
      }
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: text,
        }),
        mode: "cors",
      };
      console.log(received);
      // Send the search query to the server
      fetch(host_name + "/view-listings", request)
        .then((res) => res.json())
        .then((res) => {
          setReceived(res);
        });
    }, 250),
    []
  );

  // useEffect(() => {
  //   const request = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       city: searchTerm,
  //     }),
  //     mode: "cors",
  //   };

  //   fetch(host_name + "/view-listings", request)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setReceived(res);
  //     });
  // }, [searchTerm]);

  useEffect(() => {
    let settable = true;
    updateCoords().then((newCoords) => {
      if (settable) {
        setCoords(newCoords);
      }
    });
    return () => (settable = false);
  }, [received]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  }

  function handleViewProperty(propertyID) {
    navigate("/book", { state: { property: propertyID } });
  }

  return (
    <Container>
      <HeaderContainer>
        <input
          onChange={handleSearchChange}
          type="text"
          placeholder="Search"
          style={{
            border: "thin solid",
            borderColor: "#F3F3F3",
            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
            fontSize: "14px",
            height: "35px",
            width: "100%",
            borderRadius: 20,
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        />
      </HeaderContainer>

      <MapContainer>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={options}
          >
            {coords.map((item) => {
              return (
                <Marker
                  key={item[0]}
                  position={{ lat: item[0], lng: item[1] }}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </MapContainer>
      <ContainerSec>
        <CarouselStyle>
          <Carousel showIndicators={false} showStatus={false}>
            {received.map((val) => {
              const buffer = Buffer.from(val.photos.data);
              const uint8Array = new Uint8Array(buffer);
              const blob = new Blob([uint8Array], { type: val.photos.type });
              const imageUrl = URL.createObjectURL(blob);
              return (
                <div>
                  <ListingContainer>
                    <ListingContainerImg>
                      <img
                        src={imageUrl}
                        style={{ display: "flex", width: "80%" }}
                        alt="HouseImg"
                      ></img>
                    </ListingContainerImg>

                    <ListingContainerTitle>{val.address}</ListingContainerTitle>

                    <ListingContainerInfo>
                      Available: {val.timeStart} - {val.timeEnd}
                      <div>${val.price / 100}/hr</div>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          color: "white",
                          backgroundColor: "#FF6D9E",
                          height: "35%",
                          width: "40%",
                          marginTop: "2%",
                          padding: "3%",
                          fontSize: "12px",
                          fontWeight: "600",
                          borderColor: "#FF6D9E",
                          textTransform: "unset",
                          borderRadius: "25px",
                          "&:hover": {
                            backgroundColor: "#FA3F7E",
                          },
                        }}
                        onClick={() => handleViewProperty(val.id)}
                      >
                        View Listing
                      </Button>
                    </ListingContainerInfo>
                  </ListingContainer>
                </div>
              );
            })}
          </Carousel>
        </CarouselStyle>
      </ContainerSec>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
    </Container>
  );
}
