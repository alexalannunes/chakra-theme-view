import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { initialColors } from "./initial-colors";

export function useColors() {
  const [params] = useSearchParams();
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

  return { colors, setColors };
}
