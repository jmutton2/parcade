import { styled } from "@mui/system";

export const Container = styled("div")({
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(45deg, #8C4CD4, #7385FD)",
  margin: 0,
  padding: "10%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Montserrat",
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  width: "80%",
  height: "50%",
  alignContent: "space-between",
  marginTop: "20%",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  height: "15%",
  marginTop: "35%",
});
