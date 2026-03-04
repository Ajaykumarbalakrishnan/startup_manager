import { selectStyle } from "../styles/commonStyles";

export default function SelectInput({
  value,
  onChange,
  options,
  label,
  style = {},
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {label && <span style={{ fontSize: 14, opacity: 0.8 }}>{label}:</span>}
      <select
        value={value}
        onChange={onChange}
        style={{ ...selectStyle, ...style }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
