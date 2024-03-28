import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export function LayoutPage() {
  return (
    <Box minH={"100vh"}>
      <Flex
        as="header"
        justifyContent={"space-between"}
        px={10}
        h={14}
        borderBottom={"1px"}
        borderBottomColor={"gray.200"}
      >
        <Flex alignItems={"center"} gap={1}>
          <Text>supa</Text>
          <Text fontWeight={"semibold"}>colors</Text>
        </Flex>
        <HStack>
          <Link to={"/signin"}>Sign in</Link>
        </HStack>
      </Flex>
      <Outlet />
    </Box>
  );
}
