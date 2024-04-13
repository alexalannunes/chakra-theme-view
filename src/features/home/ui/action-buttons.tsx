import { Button, HStack, Text } from "@chakra-ui/react";
import { MdFavoriteBorder, MdMenu, MdNotes } from "react-icons/md";

import { ColorMode } from "../types/color-mode";

interface ActionButtonsProps {
  onToggleColorMode: () => void;
  colorMode: ColorMode;
}

export function ActionButtons({
  onToggleColorMode,
  colorMode,
}: ActionButtonsProps) {
  const isColorViewMode = colorMode === "color";
  const buttonText = isColorViewMode ? "View Shades" : "View Colors";
  const buttonIcon = isColorViewMode ? (
    <MdNotes />
  ) : (
    <Text as="span" transform="rotateZ(90deg)">
      <MdMenu />
    </Text>
  );

  return (
    <HStack>
      <Button
        variant={"preLarge"}
        leftIcon={buttonIcon}
        onClick={() => onToggleColorMode()}
      >
        {buttonText}
      </Button>
      <Button variant={"preLarge"} leftIcon={<MdFavoriteBorder />}>
        Saved
      </Button>
    </HStack>
  );
}
