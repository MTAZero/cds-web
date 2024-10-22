export const containerStyles = {
  background: "white",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  margin: "10px",
  padding: "15px",
  // height: "calc(100vh-65px)",
};

export const controlPanelStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "15px",
};

export const searchBoxStyle = {
  display: "flex",
  width: "320px",
  padding: "8px 12px",
  alignItems: "center",
  gap: "8px",
  borderRadius: "6px",
  background: "#FFF",
  boxShadow:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(104, 113, 130, 0.16)",
};

export const searchTextBoxStyle = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  border: "none",

  color: "black",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "20px",
  outline: "none",
};

export const buttonAddStyle = {
  display: "inline-flex",
  padding: "6px 12px",
  alignItems: "center",
  gap: "8px",
  borderRadius: "6px",
  background: "#187DB8",
  boxShadow:
    "0px 1px 0px 0px #4B85FA inset, 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 1px #2264E5, 0px 2px 5px 0px rgba(34, 100, 229, 0.12)",
  color: " #FFF",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "20px",
  letterSpacing: "0.28px",

  textTransform: "none !important",

  "&:hover": {
    opacity: "0.9",
    backgroundColor: "#187DB8",
  },
};

export const paginatePanelStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
};
