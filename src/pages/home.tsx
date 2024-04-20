import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";
import { useReadLocalStorage } from "usehooks-ts";
import { useSearchParams } from "react-router-dom";

import { Header } from "../components/header";
import { initialColors } from "../features/home/initial-colors";
import { ColorMode } from "../features/home/types/color-mode";
import { IColor } from "../features/home/types/colors";
import { ActionButtons } from "../features/home/ui/action-buttons";
import { ColorBox } from "../features/home/ui/color-box";
import { CopiedToastContainer } from "../features/home/ui/copied-toast";
import { useColors } from "../features/home/use-colors";
import { useColorsNavigation } from "../features/home/use-colors-navigation";
import { IPalette } from "../features/home/types/palette";

function ColorPaletteName() {
  // TODO validate if key does not exist
  const localColors = useReadLocalStorage<IPalette[]>("palettes");

  const [params] = useSearchParams();

  const colors = params.get("colors");

  const savedColor = localColors?.find((color) => color.id === colors);

  return (
    <Text fontSize={"large"} fontWeight={"bold"} color={"gray.600"}>
      {savedColor?.name ?? "Color Palette"}
    </Text>
  );
}

export function HomePage() {
  const { updateColorUrl } = useColorsNavigation();
  const { colors, setColors } = useColors();
  const toast = useToast();

  const [colorMode, setColorMode] = useState<ColorMode>("color");

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast({
      status: "success",
      position: "top",
      duration: 2000,
      containerStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      render: CopiedToastContainer,
    });
  };

  const debouncedUpdateUrlColors = useDebouncedCallback(
    (newColors: IColor[]) => {
      updateColorUrl(newColors);
    },
    800
  );

  const handleNewColors = () => {
    setColors(initialColors);
    debouncedUpdateUrlColors(initialColors);
  };

  const handleChangeColor = (colorObj: IColor) => {
    const updatedColors = colors.map((item) => {
      if (item.id === colorObj.id) {
        return {
          ...item,
          color: colorObj.color,
        };
      }
      return item;
    });

    setColors(updatedColors);
    debouncedUpdateUrlColors(updatedColors);
  };

  const handleToggleColorMode = () => {
    setColorMode(colorMode === "color" ? "shades" : "color");
  };

  // TODO: prepare to mobile
  const templateGrid = `repeat(${colors.length}, 1fr)`;

  return (
    <Box minH={"100vh"}>
      <Header onClickNew={handleNewColors} />
      <Container maxW={"container.lg"} pt={10}>
        <Flex alignItems={"align"} justifyContent={"space-between"} my={8}>
          <HStack>
            <Icon as={BsStars} color="cyan.400" />
            <ColorPaletteName />
          </HStack>
          <ActionButtons
            colorMode={colorMode}
            onToggleColorMode={handleToggleColorMode}
          />
        </Flex>
        <Grid templateColumns={templateGrid} gap={6}>
          {colors.map(({ color, id }) => {
            return (
              <GridItem key={id}>
                <ColorBox
                  color={color}
                  id={id}
                  onChangeColor={handleChangeColor}
                  onCopy={handleCopy}
                  colorMode={colorMode}
                />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
