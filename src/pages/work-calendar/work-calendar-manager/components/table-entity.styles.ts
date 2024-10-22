export const headerRowStyle = {};

export const tableContainerStyle = {
  borderRadius: "8px",
  background: " #FFF",
  boxShadow:
    "0px 0px 0px 1px rgba(152, 161, 178, 0.10), 0px 1px 4px 0px rgba(69, 75, 87, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)",
  borderCollapse: "collapse",
};

export const containerStyle = {
  background: "white",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  margin: "10px",
  // padding: "15px",
  fontFamily: "Inter",
};

export const labelStyle = {
  marginBottom: "20px",
};

export const cellCenterStyle = {
  textAlign: "center !important",
  verticalAlign: "center",
  horizontalAlign: "center",
  padding: "auto",
};

export const buttonEditStyle = {
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  background: "#187DB8",
  color: "white",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "5px",

  "&:hover": {
    opacity: "0.9",
  },
};

export const buttonRemoveStyle = {
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  background: "red",
  color: "white",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "5px",

  "&:hover": {
    opacity: "0.9",
    background: "light-orange",
  },
};

export const cellContentStyle = {
  display: "flex",
  gap: "10px",
};