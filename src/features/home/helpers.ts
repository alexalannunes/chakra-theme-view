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

/**
 *
 * Transforms string in a clean slug
 * Default separator is "-" (kekab-case)
 *
 * @param {string} value - the unparsed value
 * @param {string} separator - the tokens separator
 * @returns {string} cleaned string
 */
export const toSlug = (value: string, separator = "-") => {
  const NON_ALPHANUMERIC_UNDERSCORE = /[^A-Za-z0-9_ ]/g;

  // Convert the string to normalized NFD form (Unicode)
  const normalizedValue = (value || "").normalize("NFD");

  // Remove accents through the unicode character range
  const withoutAccents = normalizedValue.replace(/[\u0300-\u036f]/g, "");

  // Convert to lowercase
  const lowercased = withoutAccents.toLowerCase();

  // Remove extra spaces, transforming more than one space into a single space
  const trimmed = lowercased.trim().replace(/[\s\t\n]+/gm, " ");

  // Replace slashes with underscores to avoid collision
  const withoutSlashes = trimmed.replace(/\//, "_");

  // Remove non-alphanumeric characters and underscores
  const alphanumericOnly = withoutSlashes.replace(
    NON_ALPHANUMERIC_UNDERSCORE,
    ""
  );

  // Replace spaces with a specific separator (default is '-')
  const result = alphanumericOnly.replace(/\s/g, separator);

  return result;
};
