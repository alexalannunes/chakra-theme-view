import { useSearchParams } from "react-router-dom";

import { IColor } from "./types/colors";
import { toSlashColors } from "./helpers";

export function useColorsNavigation() {
  const [colorsParams, setColorsParams] = useSearchParams();

  const updateColorUrl = (colors: IColor[]) => {
    const slashColors = toSlashColors(colors);
    setColorsParams(
      {
        colors: slashColors,
      },
      {
        replace: true,
      }
    );
  };

  return {
    updateColorUrl,
    colorsParams,
  };
}
