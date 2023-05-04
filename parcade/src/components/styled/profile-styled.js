import { styled } from "@mui/system";

export const MainContainer = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  backgroundColor: "rgba(217,217,217,0.3)",
});

export const SecContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  overflowY: "scroll",
  paddingBottom: "20%",
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

export const InfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "9%",
  paddingRight: "9%",
  paddingTop: "5%",
  marginBottom: "0%",
  height: "100%",
});

export const Header = styled("div")({
  display: "flex",
  height: "5%",
  marginTop: "5%",
  marginBottom: "2%",
  fontWeight: 600,
  fontSize: "18px",
  fontFamily: "Montserrat",
});

export const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "auto",
});

export const NavbarContainer = styled("div")({
  width: "100%",
  bottom: 0,
  position: "fixed",
});
