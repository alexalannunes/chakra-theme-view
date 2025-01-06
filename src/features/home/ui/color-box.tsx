import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import chroma from "chroma-js";

import { IColor } from "../types/colors";
import { InputColor } from "./color-input";
import { ColorMode } from "../types/color-mode";
import { getContrastTextColor } from "../helpers";

interface ColorBoxContainerProps {
  children: ReactNode;
}

function ColorBoxContainer({ children }: ColorBoxContainerProps) {
  return (
    <Stack alignItems={"center"} spacing={0}>
      {children}
    </Stack>
  );
}

interface ColorViewProps {
  color: string;
}

function useShadowBoxColor(color: string) {
  const shadowOnLightMode = "0 10px 18px 0 " + chroma(color).luminance(0.7);
  const shadowOnDarkMode = "none";
  const shadow = useColorModeValue(shadowOnLightMode, shadowOnDarkMode);
  return shadow;
}

function ColorView({ color }: ColorViewProps) {
  const shadow = useShadowBoxColor(color);
  return <Box rounded={"2xl"} bg={color} h="full" boxShadow={shadow} />;
}

interface ColorBoxProps {
  color: string;
  colorMode: ColorMode;
  id: number;
  onChangeColor: (color: IColor) => void;
  onCopy: (content: string) => void;
}

function ShadeViewColor({
  color,
  onCopy,
}: {
  color: string;
  onCopy: (color: string) => void;
}) {
  const textColor = getContrastTextColor(color);

  return (
    <Flex
      alignItems={"center"}
      pl={4}
      sx={{
        "&:first-of-type": {
          borderTopRadius: "2xl",
        },
        "&:last-child": {
          borderBottomRadius: "2xl",
        },
      }}
      flex={1}
      bg={color}
      cursor={"pointer"}
      onClick={() => onCopy(color)}
    >
      <Text fontSize={"small"} fontWeight={"semibold"} color={textColor}>
        {color.toUpperCase()}
      </Text>
    </Flex>
  );
}

interface ShadesViewProps extends ColorViewProps {
  onCopy: (color: string) => void;
}

function ShadesView({ color, onCopy }: ShadesViewProps) {
  const shadow = useShadowBoxColor(color);

  // create the light colors
  const colors: string[] = [4, 3, 2, 1].map((s) => {
    const colorShade = chroma(color)
      .brighten(s * 0.5)
      .hex();

    return colorShade;
  });

  // current color
  colors.push(color);

  // create the dark colors
  const darkColors = [6, 7, 8, 9].map((s) => {
    const colorShade = chroma(color)
      .darken((s - 5) * 0.5)
      .hex();

    return colorShade;
  });

  colors.push(...darkColors);

  return (
    <Flex
      flexDirection={"column"}
      rounded={"2xl"}
      h="full"
      bg="red.100"
      boxShadow={shadow}
    >
      {colors.map((c, index) => (
        <ShadeViewColor onCopy={onCopy} key={color + index} color={c} />
      ))}
    </Flex>
  );
}

export function ColorBox({
  color,
  id,
  onChangeColor,
  onCopy,
  colorMode,
}: ColorBoxProps) {
  const rgbColor = `rgb(${chroma(color).rgb().join(", ")})`;

  return (
    <ColorBoxContainer>
      <Box h={80} w="100%">
        {colorMode === "shades" ? (
          <ShadesView onCopy={onCopy} color={color} />
        ) : (
          <ColorView color={color} />
        )}
      </Box>

      <InputColor
        color={color}
        onChange={(color) => {
          onChangeColor({ color, id });
        }}
      />

      <Button
        fontWeight={"semibold"}
        variant={"ghost"}
        color={"gray.500"}
        mt={4}
        onClick={() => onCopy(color)}
      >
        {color.toUpperCase()}
      </Button>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => onCopy(rgbColor)}
        color={"gray.400"}
      >
        {rgbColor}
      </Button>
    </ColorBoxContainer>
  );
}
