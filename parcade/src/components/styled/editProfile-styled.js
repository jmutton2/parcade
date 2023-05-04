import { styled } from "@mui/system";

export const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
});

export const HeaderContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  paddingLeft: "9%",
  paddingRight: "9%",
  paddingTop: "12%",
  paddingBottom: "8%",
  height: "10%",
  backgroundColor: "white",
  fontFamily: "Montserrat",
});
export const HeaderText = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "58%",
  marginLeft: "1%",
  fontFamily: "Montserrat",
});
export const HeaderTitle = styled("div")({
  display: "flex",
  justifyContent: "start",
  height: "100%",
  marginBottom: 0,
  fontSize: "28px",
  fontWeight: "bold",
  fontFamily: "Montserrat",
});
export const HeaderImage = styled("div")({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  marginRight: "1%",
  height: "100%",
  width: "40%",
});
export const HeaderInfo = styled("div")({
  color: "#676767",
  fontSize: "14px",
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: 50,
  width: "80%",
  height: "60%",
  alignContent: "space-between",
  marginLeft: 7,
  marginRight: 7,
  alignSelf: "center",
});

export const InputBox = styled("div")({
  color: "white",
  width: "100%",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "auto",
  gap: 23,
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});
