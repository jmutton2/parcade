import { styled, width } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  backgroundColor: "#F5F5F5",
  overflowY: "scroll",
  fontFamily: "Montserrat",
});

export const ContainerSec = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  margin: "8%",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "8%",
  alignSelf: "center",
  paddingTop: "15%",
  paddingBottom: "5%",
  backgroundColor: "white",
  fontWeight: "bold",
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  width: "80%",
  height: "70%",
});

export const Button1 = styled("div")({
  borderRadius: 25,
  color: "white",
  justifyContent: "center",
  width: "100%",
  height: "5%",
  border: 1,
  borderColor: "white",
  textDecoration: "none",
});

export const inputBox = styled("div")({
  color: "white",
  width: "100%",
});

export const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "auto",
  backgroundColor: "white",
  margin: "8%",
});

export const MainListingContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const ListingContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "5%",
  marginBottom: "10%",
  backgroundColor: "white",
  boxShadow: "2px 2px rgba(0, 0, 0, 0.1)",
});

export const ListingContainerImg = styled("div")({
  display: "flex",
  marginTop: "2%",
});

export const ListingContainerTitle = styled("div")({
  marginTop: "4%",
  fontSize: "25px",
  fontWeight: "bold",
  textAlign: "left",
});

export const ListingContainerInfo = styled("div")({
  fontSize: "18px",
  marginTop: "2%",
});

export const InnerContainerImg = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5%",
});

export const InnerContainerInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "5%",
});

export const InnerContainerBtns = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const StatsContainerMain = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  marginLeft: "8%",
  marginRight: "8%",
  marginBottom: "8%",
});

export const StatsContainerTitle = styled("div")({
  display: "flex",
  fontSize: "20px",
});

export const StatsContainerSec = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
  borderRadius: "10px",
  marginTop: "5%",
  marginBottom: "5%",
  backgroundColor: "white",
  boxShadow: "2px 2px 2px 2px grey",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});
