import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import chroma from "chroma-js";

import { IColor } from "../types/colors";
import { InputColor } from "./color-input";

function getContrastTextColor(color: string) {
  const whiteContrast = chroma.contrast(color, "white");
  const blackContrast = chroma.contrast(color, "black");

  return whiteContrast >= blackContrast ? "white" : "black";
}

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

function ColorView({ color }: ColorViewProps) {
  return (
    <Box
      rounded={"2xl"}
      bg={color}
      h="full"
      boxShadow={"0 10px 18px 0 " + chroma(color).luminance(0.7)}
    />
  );
}

interface ColorBoxProps {
  color: string;
  onChangeColor: (color: IColor) => void;
  id: number;
  onCopy: (content: string) => void;
}

function ShadeViewColor({ color }: { color: string }) {
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
    >
      <Text fontSize={"small"} fontWeight={"semibold"} color={textColor}>
        {color.toUpperCase()}
      </Text>
    </Flex>
  );
}

interface ShadesViewProps extends ColorViewProps {}

function ShadesView({ color }: ShadesViewProps) {
  const colors: string[] = [4, 3, 2, 1].map((s) => {
    const colorShade = chroma(color)
      .brighten(s * 0.5)
      .hex();

    return colorShade;
  });

  // current color
  colors.push(color);

  const rest = [6, 7, 8, 9].map((s) => {
    const colorShade = chroma(color)
      .darken((s - 5) * 0.5)
      .hex();

    return colorShade;
  });

  colors.push(...rest);

  return (
    <Flex
      flexDirection={"column"}
      rounded={"2xl"}
      h="full"
      bg="red.100"
      boxShadow={"0 10px 18px 0 " + chroma(color).luminance(0.7)}
    >
      {colors.map((c, index) => (
        <ShadeViewColor key={color + index} color={c} />
      ))}
    </Flex>
  );
}

export function ColorBox({ color, id, onChangeColor, onCopy }: ColorBoxProps) {
  const rgbColor = `rgb(${chroma(color).rgb().join(", ")})`;

  return (
    <ColorBoxContainer>
      <Box h={80} w="100%">
        {/* <ColorView color={color} /> */}
        <ShadesView color={color} />
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
