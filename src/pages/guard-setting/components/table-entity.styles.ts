export const containerStyle = {
  //   color: "red",
};

export const headerRowStyle = {};

export const tableContainerStyle = {
  borderRadius: "8px",
  background: " #FFF",
  boxShadow:
    "0px 0px 0px 1px rgba(152, 161, 178, 0.10), 0px 1px 4px 0px rgba(69, 75, 87, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)",
//   border: "1px solid #e2e2e2",
  borderCollapse: "collapse",
};

export const headerCellStyle = {
  background: "#f2f2f2",
  //   backdropFilter: "blur(4px)",
  //   border: "none",
//   border: "1px solid #d2d2d2",
};
export const cellStyle = {
  //   border: "none",
//   border: "1px solid #d2d2d2",
  padding: "15px",
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

  "&:hover": {
    opacity: "0.9",
    background: "light-orange"
  },
};
