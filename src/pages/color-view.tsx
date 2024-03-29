import { Container, Flex, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export function ColorViewPage() {
  const { color: rawColor } = useParams();
  const color = `#${rawColor}`;

  return (
    <Container mt={10} maxW={"container.lg"}>
      <Flex
        h="80"
        alignItems={"center"}
        justifyContent={"center"}
        rounded={"2xl"}
        w="full"
        bg={color}
      >
        <Heading>{color.toUpperCase()}</Heading>
      </Flex>
    </Container>
  );
}
