import { Flex, IconButton, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CopyColorButton } from "./copy-color-button";
import { MdOutlineLink } from "react-icons/md";

interface ColorBoxProps {
  color: string;
}

export function ColorBox({ color }: ColorBoxProps) {
  return (
    <Flex
      bg={color}
      h={108}
      m={15}
      rounded={"12px"}
      width={108}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
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
      <Link
        as={RouterLink}
        to={`color/${color.replace("#", "")}`}
        target="_blank"
      >
        <IconButton
          display={"none"}
          fontSize={"large"}
          rounded={"full"}
          _hover={{
            bg: "rgba(0, 0,0,0.1)",
          }}
          variant={"ghost"}
          aria-label="Open color"
          icon={<MdOutlineLink />}
        />
      </Link>
    </Flex>
  );
}
