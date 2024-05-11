export const containerStyle = {
  background: "white",
  display: "flex",
  flexDirection: "row",
  flex: 1,
  margin: "10px",
  padding: "15px",
  gap: "20px",
};

export const selectTimePanelStyle = {};

export const mainContentStyle = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "15px",
};

// time panel
export const timePanelStyle = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  // width: "770px",
};

export const timePanelRowStyle = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
};

export const timePanelHeaderCellStyle = {
  display: "flex",
  flex: 1,
  border: "1px solid #e2e2e2",
  height: "50px",

  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",

  alignItems: "center",
  justifyContent: "center",
  margin: "-1px -1px 0 0",
};

export const timePanelCellEmptyStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #e2e2e2",
  height: "110px",
  padding: "10px",
  gap: "5px",
  flex: 1,
  margin: "-1px -1px 0 0",

  fontFamily: "Inter",
  fontSize: "14px",

  background: "#f2f2f2",
};

export const timePanelCellStyle = {
  ...timePanelCellEmptyStyle,
  ...{
    cursor: "pointer",
    background: "white",

    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#f2f2f2",
    },
  },
};

export const timePanelTitleStyle = {
  textAlign: "center",
};

export const timePanelBodyStyle = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "5px",
};

export const positionItemStyle = {
  display: "flex",
  padding: "10px",

  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",

  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",

  background: "#98e698"
}
