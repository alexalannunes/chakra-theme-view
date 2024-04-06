import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    transition: "transform .1s ease-in, background .2s ease-in",
    rounded: "xl",
    "--pressed-effect": 0.96,
    "&:active": {
      transform: "scale(var(--pressed-effect))",
    },
  },
  variants: {
    preLarge: {
      py: 6,
      bg: "gray.100",
      "&:active": {
        "--pressed-effect": 0.9,
      },
      "&:hover": {
        transform: "scale(var(--pressed-effect))",
      },
    },
  },
});
