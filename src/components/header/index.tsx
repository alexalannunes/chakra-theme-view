import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

export function Header() {
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
            <Button leftIcon={<MdAdd />}>New</Button>
            <Avatar
              h={10}
              w={10}
              src="http://github.com/alexalannunes.png"
              name="me"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
