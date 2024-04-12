import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

import { Header } from "../components/header";
import { initialColors } from "../features/home/initial-colors";
import { IColor } from "../features/home/types/colors";
import { ActionButtons } from "../features/home/ui/action-buttons";
import { ColorBox } from "../features/home/ui/color-box";
import { ColorNameInput } from "../features/home/ui/color-name-input";
import { CopiedToastContainer } from "../features/home/ui/copied-toast";
import { useColors } from "../features/home/use-colors";
import { useColorsNavigation } from "../features/home/use-colors-navigation";

export function HomePage() {
  const { updateColorUrl } = useColorsNavigation();
  const { colors, setColors } = useColors();
  const toast = useToast();

  // TODO
  // const [viewMode, setViewMode] = useState<"color" | "shades" | "tints">(
  //   "color"
  // );

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
    // TODO: set name
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

  // TODO: prepare to mobile
  const templateGrid = `repeat(${colors.length}, 1fr)`;

  return (
    <Box minH={"100vh"}>
      <Header onClickNew={handleNewColors} />
      <Container maxW={"container.lg"} pt={10}>
        <Flex alignItems={"flex-end"} justifyContent={"space-between"} my={8}>
          <Stack spacing={0}>
            <Text fontSize={"small"} fontWeight={"bold"} color={"gray.400"}>
              Color Palette
            </Text>
            <HStack>
              <Icon as={BsStars} color="cyan.400" />
              <ColorNameInput />
            </HStack>
          </Stack>
          <ActionButtons />
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
                />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
