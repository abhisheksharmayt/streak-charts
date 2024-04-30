const defaultValue = "#0000000a";
//paletter source : https://www.color-hex.com/color-palette/253
const palette = ["#aefe57", "#9afe2e", "#8ae429", "#6bb120", "#4d7f17"];

export function getColorCode(value: number) {
  if (value === 0) return defaultValue;
  else if (value <= 2) return palette[0];
  else if (value <= 4) return palette[1];
  else if (value <= 6) return palette[2];
  else if (value <= 8) return palette[3];
  else return palette[4];
}
