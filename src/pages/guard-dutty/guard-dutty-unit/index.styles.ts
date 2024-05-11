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
  minHeight: "110px",
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

export const timePanelCellSelectStyle = {
  ...timePanelCellEmptyStyle,
  ...{
    cursor: "pointer",
    background: "#187DB8",
    color: "white",

    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#187DB8",
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
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
};

export const timePanelInfoStyle = {
  fontWeight: "600",
  fontFamily: "Inter",
  fontSize: 11,
};

export const timePanelInfoCompleteStyle = {
  fontWeight: "600",
  fontFamily: "Inter",
  fontSize: 11,
};

// detail panel
export const detailGuardDuttyPanel = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  background: "#f2f2f2",
  width: "350px",
  padding: "20px 10px",
  borderRadius: "10px",
  height: "83vh",
  overflow: "scroll",
};

export const detaiPanelRowStyle = {
  display: "flex",
  background: "white",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",

  "&:hover": {
    opacity: "0.9",
    backgroundColor: "#187DB8",
    color: "white",
  },
};

export const detaiPanelRowContentStyle = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "3px",
};

export const detailPanelMainContent = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export const detailPanelTitleStyle = {
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "18px",
  fontWeight: "600",

  display: "flex",
  justifyContent: "space-between",
};

export const detailPanelRowLabelStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "600",
};

export const detailPanelRowValueStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
};

export const positionItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "10px",
  width: "90%",

  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",

  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",

  background: "#98e698",
  color: "black",
};
