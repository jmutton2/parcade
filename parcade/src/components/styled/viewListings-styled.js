import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  fontFamily: "Montserrat",
});

export const ContainerSec = styled("div")({
  //display: "flex",
  flexDirection: "column",
  paddingLeft: "10%",
  paddingRight: "10%",
});

export const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  height: "auto",
  width: "90%",
  padding: "5%",
  zIndex: "10",
});

// export const MainListingContainer = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   height: "auto",
//   width: "100%",
// });

// for individual container
export const ListingContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "start",
  marginTop: "5%",
});

export const ListingContainerImg = styled("div")({
  display: "flex",
  justifyContent: "center"
});

export const ListingContainerTitle = styled("div")({
  marginTop: "4%",
  color: "#676767",
  fontSize: "18px",
  fontWeight: "600",
});

export const ListingContainerInfo = styled("div")({
  color: "#676767",
  fontSize: "14px",
  marginTop: "1%",
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});

export const MapContainer = styled("div")({
  display: "flex",
});

export const CarouselStyle = styled("div")({});
