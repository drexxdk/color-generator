import { type RGB } from "~/types/rgb";

const hexToRGB = (hex: string): RGB | undefined => {
  hex = hex.startsWith("#") ? hex.slice(1) : hex;
  if (hex.length === 3) {
    hex = Array.from(hex).reduce((str, x) => str + x + x, ""); // 123 -> 112233
  }
  const values = hex
    .split(/([a-z0-9]{2,2})/)
    .filter(Boolean)
    .map((x) => parseInt(x, 16));

  return values.length > 2
    ? { red: values[0] ?? 0, green: values[1] ?? 0, blue: values[2] ?? 0 }
    : undefined;
};
export default hexToRGB;
