export const containerStyle = {
  background: "white",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  margin: "10px",
  padding: "15px",
  gap: "20px",
  height: "strech",
};

export const titleStyle = {
  color: "#101828",
  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "28px",
};

export const dateSelectPanelStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  background: "#f2f2f2",
  padding: "15px",
  alignItems: "center",
};

export const datePickerStyle = {
  color: "#101828",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "28px",
};

export const contentPanelStyle = {
  display: "flex",
  gap: "20px",
};

export const childStatusPanelStyle = {
  width: "250px",
  background: "#f2f2f2",
  padding: "15px",
  minHeight: "70vh",
};

export const treeStyle = (isReport: boolean) => {
  const baseStyle = {
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "28px",

    display: "flex",
    gap: "5px",
  };

  if (isReport)
    return {
      ...baseStyle,
      ...{
        color: "black",
      },
    };

  return {
    ...baseStyle,
    ...{
      color: "red",
    },
  };
};

export const currentUnitReportPanelStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "15px",
  gap: "15px",
};

export const searchPanelStyle = {};

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

export const tablePanelStyle = {};

export const normalTextStyle = {
  color: "#101828",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  lineHeight: "28px",
};

export const menuContainerStyle = {
  width: "250px",
};

export const menuItemStyle = {
  padding: "10px 10px",
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  cursor: "pointer",

  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
};
