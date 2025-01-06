import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MdAdd, MdDarkMode, MdFavorite, MdLightMode } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header({ onClickNew }: { onClickNew: () => void }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleGoToSaved = () => {
    navigate("/saved");
  };

  const hiddenPaths = ["/saved"];
  const displayButtons = !hiddenPaths.includes(pathname);

  const colorModeIcon = colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />;

  return (
    <Box w={"full"} borderBottom={"1px"} borderBottomColor={"gray.100"}>
      <Container maxW={"container.lg"}>
        <Flex alignItems={"center"} justifyContent={"space-between"} h={14}>
          <HStack>
            <Box h={6} w={6} bg="cyan.300" rounded={"full"} />
            <Heading as="h4" size="md">
              <Link to={"/"}>Supa Colors</Link>
            </Heading>
          </HStack>
          <HStack gap={4}>
            {displayButtons && (
              <>
                <Button onClick={handleGoToSaved} leftIcon={<MdFavorite />}>
                  Saved
                </Button>
                <Button onClick={onClickNew} leftIcon={<MdAdd />}>
                  New
                </Button>
              </>
            )}
            <IconButton
              onClick={toggleColorMode}
              aria-label="Toggle theme"
              icon={colorModeIcon}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
