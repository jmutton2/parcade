import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "white",
  fontFamily: "Montserrat",
  fontWeight: "500",
});

export const ContainerSec = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "10%",
});

export const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "8%",
  fontWeight: "bold",
});

export const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "70%",
  marginTop: "2%",
  alignContent: "space-between",
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
  display: "flex",
  flexDirection: "row",
  color: "white",
  width: "100%",
});

export const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

export const ContainerImg = styled("div")({
  width: "100%",
  hieght: "auto",
});
export const ContainerBtn = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  backgroundColor: "white",
  color: "#7385FD",
  fontSize: "12px",
  border: 0,
  cursor: "pointer",
  borderRadius: 25,
});

export const UploadImg = styled("div")({
  display: "flex",
  width: "100%",
  height: "184px",
  marginTop: "5%",
  marginBottom: "10%",
  fontSize: "12px",
  backgroundColor: "#6172E9",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  fontFamily: "Montserrat",
  background: "linear-gradient(45deg, #aba8f7, #8645ff)",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
});
