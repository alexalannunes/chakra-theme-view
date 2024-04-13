import chroma from "chroma-js";

export function toSlashColors(colors: Array<{ id: number; color: string }>) {
  const colorsString = colors
    .map((c) => c.color.replace("#", "").toLowerCase())
    .join("-");

  return colorsString;
}

export function getContrastTextColor(color: string) {
  const whiteContrast = chroma.contrast(color, "white");
  const blackContrast = chroma.contrast(color, "black");

  return whiteContrast >= blackContrast ? "white" : "black";
}
