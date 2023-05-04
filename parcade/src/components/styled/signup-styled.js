import { styled } from "@mui/system";

export const Container = styled("div")({
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  margin: 0,
  padding: "10%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Montserrat",
  fontWeight: "500",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  height: "13%",
  marginTop: 55,
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
  width: "75%",
  height: "70%",
  alignContent: "space-between",
  marginLeft: 8,
  marginRight: 8,
});

export const InputBox = styled("div")({
  color: "white",
  width: "100%",
});
