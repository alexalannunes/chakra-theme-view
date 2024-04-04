import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    transition: "transform .1s ease-in",
    rounded: "xl",
    "&:active": {
      transform: "scale(0.96)",
    },
  },
  variants: {
    preLarge: {
      py: 6,
      bg: "gray.100",
      "&:hover": {
        transform: "scale(0.94)",
      },
    },
  },
});
