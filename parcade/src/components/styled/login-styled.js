import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  height: "100%",
  width: "100%",
  fontFamily: "Montserrat",
  fontWeight: "500",
});

export const SecContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  backgroundColor: "white",
  padding: "10%",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "13%",
  marginTop: 55,
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "20%",
  width: "95%",
  height: "70%",
  alignContent: "space-between",
  marginLeft: 8,
  marginRight: 8,
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
