import BackgroundImage from "../../assests/images/background.jpeg";

export const containerStyle = {
  backgroundColor: "#fff",
  minHeight: "100vh",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundPosition: "center top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const nameSystemStyle = {
  color: "#fff",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "26px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "44px",
  marginBottom: "30px",
};

export const loginPanelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#002D56",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  padding: "40px",
  borderRadius: "10px",

  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "white",
  fontFamily: "Inter",
};

export const labelStyle = {
  color: "#fff",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
};

export const textInputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  outline: "none",

  color: "#002D56",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",

  "&:focus": {
    outline: "none",
    borderBottom: "none",
  },
};

export const buttonStyle = {
  marginTop: "20px",
  display: "flex",
  padding: "16px 24px",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  alignSelf: "stretch",
  borderRadius: "32px",
  border: "2px solid #fff",
  background: "linear-gradient(0deg, #342BB5 0%, #261F8D 100%)",
  // boxShadow: "0px 4px 0px 0px #A13A18",
  // background: "#004f99",
  color: "#FFF",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "20px",
  letterSpacing: "0.5px",
  minWidth: "100px",

  "&:hover": {
    opacity: "0.9",
  },
};
export const buttonSSOStyle = {
  marginTop: "20px",
  display: "flex",
  padding: "16px 24px",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  alignSelf: "stretch",
  borderRadius: "32px",
  border: "2px solid #fff",
  background: "linear-gradient(0deg, #AB3D0C 0%, #FF7D42 100%)",
  // boxShadow: "0px 4px 0px 0px #A13A18",
  // background: "#004f99",
  color: "#FFF",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "20px",
  letterSpacing: "0.5px",
  minWidth: "100px",

  "&:hover": {
    opacity: "0.9",
  },
};
export const rowStyle = {
  width: "100%",
  display: "flex",
  marginBottom: "10px",
};
