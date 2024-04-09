export const toSlashColors = (colors: Array<{ id: number; color: string }>) => {
  const colorsString = colors
    .map((c) => c.color.replace("#", "").toLowerCase())
    .join("-");

  return colorsString;
};
