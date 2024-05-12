import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { MdAdd, MdFavorite } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header({ onClickNew }: { onClickNew: () => void }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleGoToSaved = () => {
    navigate("/saved");
  };

  const hiddenPaths = ["/saved"];
  const displayButtons = !hiddenPaths.includes(pathname);

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
            {/* <Tooltip hasArrow label="Soon">
              <Avatar
                h={10}
                w={10}
                src="http://github.com/alexalannunes.png"
                name="me"
              />
            </Tooltip> */}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
