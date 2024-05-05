export const mainContainerStyle = {
  width: "320px",
  background: "white",
  display: "flex",
  flexDirection: "column",
};

export const menuContainerStyle = {
  padding: "10px",
};

export const menuItemBaseStyle = {
  display: "flex",
  padding: "15px",
  alignItems: "center",
  gap: "5px",
  alignSelf: "stretch",
  borderRadius: "5px",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  cursor: "pointer",
  marginBottom: "5px",

  "&:hover": {
    background: "#f2f2f2",
  },
};

export const menuItemStyle = {
  ...menuItemBaseStyle,
  ...{
    background: "#FFF",
    color: "#191919",
  },
};

export const selectedItem = {
  ...menuItemBaseStyle,
  ...{
    background: "#177DB8",
    color: "white",
  },

  "&:hover": {
    background: "#177DB8",
  },
};

export const selectParentItem = {
  ...menuItemBaseStyle,
  ...{
    color: "#177DB8",
  },

  "&:hover": {
    color: "#177DB8",
  },
};
