import { errorStyle } from "../styles/commonStyles";

export default function ErrorDisplay({ error }) {
  if (!error) return null;
  return <p style={errorStyle}>{error}</p>;
}
