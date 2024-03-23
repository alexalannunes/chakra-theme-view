import { Box, ChakraProvider, Flex } from "@chakra-ui/react";

function Other() {
  return (
    <Box p={4} flex={1}>
      <Flex gap={2} flexWrap={"wrap"}>
        Initial
      </Flex>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Flex minH={"100vh"}>
        <Box width={96} bg="red.100">
          remove this
        </Box>
        <Other />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
