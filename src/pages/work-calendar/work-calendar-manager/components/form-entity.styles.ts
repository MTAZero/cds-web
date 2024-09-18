export const containerStyle = {
  width: "1000px",
};

export const labelStyle = {
  color: "#475467",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "20px",
};

export const textInputStyle = {
  color: "#475467",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "20px",

  outline: "none",
  background: "#f2f2f2",
  border: "none",

  "& fieldset": { border: "none" },
};

export const buttonPanelStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "5px",
  marginTop: "15px",
};

export const buttonSaveStyle = {
  width: "100px",
  display: "flex",
  padding: "10px 18px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  border: "1px solid #187DB8",
  background: "#187DB8",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  color: "#FFF",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
  textTransform: "none",

  "&:hover": {
    opacity: "0.9",
    background: "#187DB8",
  },
};

export const buttonCancelStyle = {
  width: "100px",
  display: "flex",
  padding: "10px 18px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  border: "1px solid #D0D5DD",
  background: "#FFF",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  color: "#344054",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
  textTransform: "none",

  "&:hover": {
    opacity: "0.9",
  },
};

export const rowInfoStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

export const formPanelStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
};

export const leftColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  flex: 1,
};

export const rightColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flex: 1,

  overflow: "scroll",
  maxHeight: "500px",
  padding: "10px",
};

export const searchBoxStyle = {
  display: "flex",
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

export const listUserSelectStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

export const selectUserStyle = {
  padding: "10px",
  background: "#187DB8",
  borderRadius: "5px",

  color: "white",
  fontSize: "14px"
};
