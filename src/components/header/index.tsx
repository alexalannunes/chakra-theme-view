import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { MdAdd, MdFavorite } from "react-icons/md";

export function Header({ onClickNew }: { onClickNew: () => void }) {
  return (
    <Box w={"full"} py={2} borderBottom={"1px"} borderBottomColor={"gray.100"}>
      <Container maxW={"container.lg"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Box h={6} w={6} bg="cyan.300" rounded={"full"} />
            <Heading as="h4" size="md">
              Supa Colors
            </Heading>
          </HStack>
          <HStack gap={4}>
            <Tooltip hasArrow label="Soon">
              <Button onClick={onClickNew} leftIcon={<MdFavorite />}>
                Saved
              </Button>
            </Tooltip>
            <Button onClick={onClickNew} leftIcon={<MdAdd />}>
              New
            </Button>
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
