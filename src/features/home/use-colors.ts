import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { initialColors } from "./initial-colors";
import { useColorsNavigation } from "./use-colors-navigation";

export function useColors() {
  const [params] = useSearchParams();
  const { updateColorUrl } = useColorsNavigation();
  const colorsParams = params.get("colors");

  const [colors, setColors] = useState(() => {
    if (colorsParams) {
      // TODO: validate colors
      return colorsParams
        .split("-")
        .filter((c) => !!c)
        .map((color, id) => ({
          color: `#${color}`,
          id,
        }));
    }

    return initialColors;
  });

  useEffect(() => {
    if (!colorsParams) {
      updateColorUrl(initialColors);
    }
  }, [colorsParams, updateColorUrl]);

  return { colors, setColors };
}
