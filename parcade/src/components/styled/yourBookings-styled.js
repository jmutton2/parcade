import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  width: "100%",
  height: "100vh",
  backgroundColor: "#F5F5F5",
  fontFamily: "Montserrat",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "8%",
  alignSelf: "center",
  paddingLeft: "17%",
  paddingTop: "15%",
  paddingBottom: "5%",
  backgroundColor: "white",
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

export const InputBox = styled("div")({
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

export const AccInfoTitle = styled("div")({
  display: "flex",
  height: "5%",
  marginTop: "5%",
  marginBottom: "5%",
  fontWeight: "bold",
  fontSize: "18px",
  color: "#9C9C9C",
});

export const AccountInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "8%",
  paddingRight: "8%",
  paddingBottom: "8%",
  height: "100%",
});

// for individual container
export const ListingContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const ListingContainerImg = styled("div")({
  display: "flex",
  marginTop: "2%",
});

export const ListingContainerTitle = styled("div")({
  marginTop: "4%",
  fontSize: "25px",
  fontWeight: "bold",
});

export const ListingContainerInfo = styled("div")({
  fontSize: "18px",
  marginTop: "2%",
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});
