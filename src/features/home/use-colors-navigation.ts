import { NavigateOptions, useSearchParams } from "react-router-dom";

import { IColor } from "./types/colors";
import { toSlashColors } from "./helpers";

const navigationOptions: NavigateOptions = {
  replace: true,
};

export function useColorsNavigation() {
  const [colorsParams, setColorsParams] = useSearchParams();

  const updateColorUrl = (colors: IColor[]) => {
    const slashColors = toSlashColors(colors);
    setColorsParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("colors", slashColors);
      return newParams;
    }, navigationOptions);
  };

  return {
    updateColorUrl,
    colorsParams,
  };
}
