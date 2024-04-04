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
} from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { MdFavoriteBorder, MdSettingsSuggest } from "react-icons/md";
import { Header } from "../components/header";
import { ReactNode } from "react";

function ColorBoxContainer({ children }: { children: ReactNode }) {
  return (
    <Stack alignItems={"center"} spacing={0}>
      {children}
    </Stack>
  );
}

export function HomePage() {
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
          <GridItem>
            <ColorBoxContainer>
              <Box rounded={"2xl"} w="100%" h={80} bg="green.400" />
              <Box
                h="12"
                w="12"
                bg="green.400"
                border={"4px"}
                borderColor={"green.200"}
                rounded={"full"}
                mt={10}
              />
              <Button
                fontWeight={"semibold"}
                variant={"ghost"}
                color={"gray.500"}
                mt={4}
              >
                #827366
              </Button>
              <Button size={"sm"} variant={"ghost"} color={"gray.400"}>
                rgb(244, 42, 4)
              </Button>
            </ColorBoxContainer>
          </GridItem>
          <GridItem>
            <ColorBoxContainer>
              <Box rounded={"2xl"} w="100%" h={80} bg="blue.400" />
              <Box
                h="12"
                w="12"
                bg="blue.400"
                border={"4px"}
                borderColor={"blue.200"}
                rounded={"full"}
                mt={10}
              />
              <Button variant={"ghost"} color={"gray.500"} mt={4}>
                #827366
              </Button>
              <Button size={"sm"} variant={"ghost"} color={"gray.400"}>
                #827366
              </Button>
            </ColorBoxContainer>
          </GridItem>
          <GridItem>
            <ColorBoxContainer>
              <Box rounded={"2xl"} w="100%" h={80} bg="cyan.400" />
              <Box
                h="12"
                w="12"
                bg="cyan.400"
                border={"4px"}
                borderColor={"cyan.200"}
                rounded={"full"}
                mt={10}
              />
              <Button variant={"ghost"} color={"gray.500"} mt={4}>
                #827366
              </Button>
              <Button size={"sm"} variant={"ghost"} color={"gray.400"}>
                #827366
              </Button>
            </ColorBoxContainer>
          </GridItem>
          <GridItem>
            <ColorBoxContainer>
              <Box rounded={"2xl"} w="100%" h={80} bg="red.400" />
              <Box
                h="12"
                w="12"
                bg="red.400"
                border={"4px"}
                borderColor={"red.200"}
                rounded={"full"}
                mt={10}
              />
              <Button variant={"ghost"} color={"gray.500"} mt={4}>
                #827366
              </Button>
              <Button size={"sm"} variant={"ghost"} color={"gray.400"}>
                #827366
              </Button>
            </ColorBoxContainer>
          </GridItem>
          <GridItem>
            <ColorBoxContainer>
              <Box rounded={"2xl"} w="100%" h={80} bg="teal.400" />
              <Box
                h="12"
                w="12"
                bg="teal.400"
                border={"4px"}
                borderColor={"teal.200"}
                rounded={"full"}
                mt={10}
              />
              <Button variant={"ghost"} color={"gray.500"} mt={4}>
                #827366
              </Button>
              <Button size={"sm"} variant={"ghost"} color={"gray.400"}>
                #827366
              </Button>
            </ColorBoxContainer>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
