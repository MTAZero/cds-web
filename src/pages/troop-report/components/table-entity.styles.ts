export const containerStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 3,
  padding: "15px",
};

export const titleStyle = {
  color: "#101828",
  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "28px",
  marginBottom: "10px",
};

export const headerRowStyle = {};

export const tableContainerStyle = {
  borderRadius: "8px",
  background: " #FFF",
  boxShadow:
    "0px 0px 0px 1px rgba(152, 161, 178, 0.10), 0px 1px 4px 0px rgba(69, 75, 87, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)",
  borderCollapse: "collapse",
};

export const headerCellStyle = {
  background: "#e2e2e2",

  color: "black",
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "600",
};
export const cellStyle = {
  padding: "15px",

  color: "black",
  fontFamily: "Inter",
  fontSize: "14px",
};

export const rowOddStyle = {
  border: "none",
  borderRadius: "8px",
  background: "#FFF",
};

export const rowEventStyle = {
  border: "none",
  borderRadius: "8px",
  background: "#f2f2f2",
};

export const cellContentStyle = {
  display: "flex",
  gap: "10px",
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

export const selectStatusStyle = {
  color: "#101828",
  fontFamily: "Inter",
  fontSize: "13px",
  fontStyle: "normal",
  lineHeight: "28px",
  width: "100%",
  border: "none !important",

  "&&": { padding: "2px" },
};

export const buttonSaveStyle = {
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  background: "#187DB8",
  color: "white",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
  textTransform: "none",

  "&:hover": {
    opacity: "0.9",
    background: "#187DB8",
  },
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
