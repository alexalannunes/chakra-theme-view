import { chakra } from "@chakra-ui/react";
import chroma from "chroma-js";

interface InputColorProps {
  color: string;
  onChange: (color: string) => void;
}
export function InputColor({ color, onChange }: InputColorProps) {
  return (
    <chakra.input
      type="color"
      mt={10}
      rounded={"full"}
      h={12}
      w={12}
      sx={{
        "::-webkit-color-swatch-wrapper": {
          padding: 0,
        },
        "::-webkit-color-swatch": {
          rounded: "full",
          border: "4px",
          borderColor: chroma(color).luminance(0.6).hex(),
        },
      }}
      value={color}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
