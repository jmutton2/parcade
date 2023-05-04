import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  fontFamily: "Montserrat",
});

export const SecContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  backgroundColor: "#F5F5F5",
});

export const TitleContainer = styled("div")({
  display: "flex",
  width: "100%",
  height: "12%",
  backgroundColor: "white",
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "5%",
  width: "100%",
  height: "100%",
});

export const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "auto",
  backgroundColor: "white",
  marginLeft: "5%",
  marginRight: "5%",
  marginBottom: "5%",
});

export const InputBox = styled("div")({
  color: "white",
  width: "100%",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  marginTop: "10%",
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});

export const InputBoxContainer = styled("div")({
  width: "90%",
  paddingLeft: "5%",
  paddingRight: "5%",
});
