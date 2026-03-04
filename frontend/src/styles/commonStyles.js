// Shared form input styles
export const inputStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
};

export const buttonStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer",
};

export const formContainerStyle = {
  display: "flex",
  gap: 10,
  marginBottom: 12,
};

export const selectStyle = {
  ...inputStyle,
  minWidth: 240,
};

export const tabStyle = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  textDecoration: "none",
  color: "black",
  background: isActive ? "#f3f3f3" : "white",
  display: "inline-block",
});

export const errorStyle = {
  color: "red",
};

export const listItemStyle = {
  marginBottom: 8,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "white",
};

export const selectedItemStyle = {
  ...listItemStyle,
  background: "#f3f3f3",
};
