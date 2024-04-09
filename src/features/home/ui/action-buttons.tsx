import { Button, HStack, Text } from "@chakra-ui/react";
import { MdFavoriteBorder, MdNotes } from "react-icons/md";

export function ActionButtons() {
  return (
    <HStack>
      <Button
        variant={"preLarge"}
        leftIcon={
          <Text as="span" transform="rotateY(180deg)">
            <MdNotes />
          </Text>
        }
      >
        View tones
      </Button>
      <Button variant={"preLarge"} leftIcon={<MdNotes />}>
        View Shades
      </Button>
      <Button variant={"preLarge"} leftIcon={<MdFavoriteBorder />}>
        Saved
      </Button>
    </HStack>
  );
}
