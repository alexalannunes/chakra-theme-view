import {
  Box,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { MdCheck, MdFavoriteBorder, MdSettingsSuggest } from "react-icons/md";
import { Header } from "../components/header";
import { ReactNode, useState } from "react";
import chroma from "chroma-js";

function ColorBoxContainer({ children }: { children: ReactNode }) {
  return (
    <Stack alignItems={"center"} spacing={0}>
      {children}
    </Stack>
  );
}

export function HomePage() {
  const [colors, setColors] = useState([
    {
      id: 0,
      color: "#48BB78",
    },
    {
      id: 1,
      color: "#4299e1",
    },
    {
      id: 2,
      color: "#0BC5EA",
    },
    {
      id: 3,
      color: "#F56565",
    },
    {
      id: 4,
      color: "#38B2AC",
    },
  ]);

  const toast = useToast();

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
      render: ({ onClose }) => (
        <Flex
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          p={3}
          bg={"gray.700"}
          fontWeight={"bold"}
          color={"white"}
          rounded={"full"}
          w={40}
          onClick={onClose}
          cursor={"pointer"}
        >
          <MdCheck />
          Copied!
        </Flex>
      ),
    });
  };
  return (
    <Box minH={"100vh"}>
      <Header />
      <Container maxW={"container.lg"} pt={10}>
        <Flex alignItems={"flex-end"} justifyContent={"space-between"} my={8}>
          <Stack spacing={0}>
            <Text fontSize={"small"} fontWeight={"bold"} color={"gray.400"}>
              Color Palette
            </Text>
            <HStack>
              <Icon as={BsStars} color="cyan.400" />
              <Editable defaultValue="Color name" fontSize={"xl"}>
                <EditablePreview fontWeight={"bold"} />
                <EditableInput fontWeight={"bold"} />
              </Editable>
            </HStack>
          </Stack>
          <HStack>
            <Button variant={"preLarge"} leftIcon={<MdSettingsSuggest />}>
              Adjust
            </Button>
            <Button variant={"preLarge"} leftIcon={<MdFavoriteBorder />}>
              Saved
            </Button>
          </HStack>
        </Flex>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {colors.map(({ color, id }) => {
            const rgbColor = `rgb(${chroma(color).rgb().join(", ")})`;
            return (
              <GridItem key={id}>
                <ColorBoxContainer>
                  <Box
                    rounded={"2xl"}
                    w="100%"
                    h={80}
                    bg={color}
                    boxShadow={"0 10px 18px 0 " + chroma(color).luminance(0.7)}
                  />

                  <chakra.input
                    type="color"
                    mt={10}
                    rounded={"full"}
                    sx={{
                      "::-webkit-color-swatch-wrapper": {
                        padding: 0,
                        h: 12,
                        w: 12,
                      },
                      "::-webkit-color-swatch": {
                        rounded: "full",
                        border: "4px",
                        borderColor: chroma(color).luminance(0.6).hex(),
                      },
                    }}
                    value={color}
                    onChange={(e) => {
                      setColors((prev) => {
                        return prev.map((item) => {
                          if (item.id === id) {
                            return {
                              ...item,
                              color: e.target.value,
                            };
                          }
                          return item;
                        });
                      });
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
