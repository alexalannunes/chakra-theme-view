import {
  Box,
  Button,
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
import chroma from "chroma-js";
import { ReactNode } from "react";
import { BsStars } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

import { Header } from "../components/header";
import { initialColors } from "../features/home/initial-colors";
import { IColor } from "../features/home/types/colors";
import { ActionButtons } from "../features/home/ui/action-buttons";
import { InputColor } from "../features/home/ui/color-input";
import { ColorNameInput } from "../features/home/ui/color-name-input";
import { CopiedToastContainer } from "../features/home/ui/copied-toast";
import { useColors } from "../features/home/use-colors";
import { useColorsNavigation } from "../features/home/use-colors-navigation";

function ColorBoxContainer({ children }: { children: ReactNode }) {
  return (
    <Stack alignItems={"center"} spacing={0}>
      {children}
    </Stack>
  );
}

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
            const rgbColor = `rgb(${chroma(color).rgb().join(", ")})`;
            return (
              <GridItem key={id}>
                <ColorBoxContainer>
                  {/* TODO: color view mode */}
                  <Box h={80} w="100%">
                    <Box
                      rounded={"2xl"}
                      bg={color}
                      h="full"
                      boxShadow={
                        "0 10px 18px 0 " + chroma(color).luminance(0.7)
                      }
                    />
                  </Box>

                  <InputColor
                    color={color}
                    onChange={(color) => {
                      const updatedColors = colors.map((item) => {
                        if (item.id === id) {
                          return {
                            ...item,
                            color,
                          };
                        }
                        return item;
                      });

                      setColors(updatedColors);
                      debouncedUpdateUrlColors(updatedColors);
                    }}
                  />

                  <Button
                    fontWeight={"semibold"}
                    variant={"ghost"}
                    color={"gray.500"}
                    mt={4}
                    onClick={() => handleCopy(color)}
                  >
                    {color.toUpperCase()}
                  </Button>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => handleCopy(rgbColor)}
                    color={"gray.400"}
                  >
                    {rgbColor}
                  </Button>
                </ColorBoxContainer>
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
