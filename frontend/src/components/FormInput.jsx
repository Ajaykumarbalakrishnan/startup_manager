import { inputStyle } from "../styles/commonStyles";

export default function FormInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  style = {},
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{ ...inputStyle, ...style }}
    />
  );
}
