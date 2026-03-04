import { buttonStyle } from "../styles/commonStyles";

export default function FormButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  style = {},
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...buttonStyle, ...style }}
    >
      {children}
    </button>
  );
}
