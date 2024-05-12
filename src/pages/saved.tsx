import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { MdClose, MdLink } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import { Header } from "../components/header";
import { IPalette } from "../features/home/types/palette";
import { CopiedToastContainer } from "../features/home/ui/copied-toast";

function SavedPaletteView() {
  const [colors, setColors] = useLocalStorage<IPalette[]>("palettes", []);

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
      render: CopiedToastContainer,
    });
  };

  const renderColors = (colorId: string) => {
    const splitColors = colorId.split("-").map((color) => `#${color}`);

    return splitColors.map((color) => (
      <Box
        key={color}
        sx={{
          "&:first-of-type": {
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          },
          "&:last-of-type": {
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
          },
        }}
        flex={1}
        bg={color}
        h="full"
        cursor={"pointer"}
        onClick={() => handleCopy(color)}
      />
    ));
  };

  const handleRemove = (colorId: string) => {
    setColors((prev) => prev.filter((color) => color.id !== colorId));
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {colors.map((color) => (
        <GridItem key={color.id} w="100%">
          <Card maxW="sm" variant={"outline"}>
            <CardBody>
              <Stack spacing={4}>
                <Flex h="40">{renderColors(color.id)}</Flex>
                <Heading as={"h5"} fontWeight={"semibold"} fontSize={"18px"}>
                  {color.name}
                </Heading>
              </Stack>
            </CardBody>
            <Divider borderColor={"gray.200"} />
            <CardFooter p={2}>
              <ButtonGroup spacing="2">
                <Button
                  as={Link}
                  to={{
                    pathname: "/",
                    search: "colors=" + color.id.split("-").join("-"),
                  }}
                  leftIcon={<MdLink />}
                >
                  View
                </Button>
                <Button
                  onClick={() => handleRemove(color.id)}
                  variant="ghost"
                  color={"red.300"}
                  leftIcon={<MdClose />}
                >
                  Remove
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

function NoColorsSaved() {
  return <Heading>You haven't saved anything yet</Heading>;
}

export function SavedPalettePage() {
  const [colors] = useLocalStorage<IPalette[]>("palettes", []);

  const hasColors = !!colors.length;

  return (
    <Box minH={"100vh"}>
      <Header onClickNew={() => {}} />
      <Container maxW={"container.lg"} pt={10}>
        <HStack mb={10}>
          <Icon as={BsStars} color="cyan.400" />
          <Heading size={"lg"}>Saved colors</Heading>
        </HStack>

        {!hasColors ? <NoColorsSaved /> : <SavedPaletteView />}
      </Container>
    </Box>
  );
}
