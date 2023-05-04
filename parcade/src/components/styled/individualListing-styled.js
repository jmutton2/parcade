import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "8%",
  fontSize: "30px",
  fontWeight: "bold",
  backgroundColor: "white",
  fontFamily: "Montserrat",
});

export const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "8%",
  width: "100%",
  marginTop: "5%",
  backgroundColor: "white",
});

export const InputBox = styled("div")({
  color: "white",
  width: "100%",
});

export const ListingContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "82%",
  paddingLeft: "5%",
  paddingRight: "5%",
});

export const ListingContainerTitle = styled("div")({
  marginTop: "4%",
  fontSize: "25px",
  fontWeight: "bold",
  fontFamily: "Montserrat",
});

export const ListingContainerImg = styled("div")({
  display: "flex",
  marginTop: "2%",
});

export const ListingContainerInfo = styled("div")({
  fontSize: "14px",
  marginTop: "2%",
  fontFamily: "Montserrat",
});

export const MapContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "40%",
  marginTop: "2%",
});

export const MapTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "10%",
  width: "100%",
  fontFamily: "Montserrat",
  fontWeight: "bold",
});

export const Map = styled("div")({
  display: "flex",
  justifyContent: "center",
  alginItems: "center",
  height: "80%",
  width: "100%",
});

export const SearchBarStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "90%",
});

export const ListingContainerFooter = styled("div")({
  display: "flex",
  justifyContent: "end",
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});
