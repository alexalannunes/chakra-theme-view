import { Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CopyColorButton } from "./copy-color-button";

interface ColorBoxProps {
  color: string;
  index: number;
}

export function ColorBox({ color, index }: ColorBoxProps) {
  return (
    <Link
      as={RouterLink}
      key={color + "-" + index}
      to={`color/${color.replace("#", "")}`}
    >
      <Flex
        bg={color}
        h={108}
        m={15}
        rounded={"12px"}
        width={108}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          "&:hover": {
            button: {
              display: "flex",
              "&:active": {
                transform: "scale(0.9)",
              },
            },
          },
        }}
      >
        <CopyColorButton color={color} />
      </Flex>
    </Link>
  );
}
