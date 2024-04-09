import { Flex } from "@chakra-ui/react";
import { MdCheck } from "react-icons/md";

interface CopiedToastContainerProps {
  onClose: () => void;
}
export function CopiedToastContainer({ onClose }: CopiedToastContainerProps) {
  return (
    <Flex
      gap={2}
      alignItems={"center"}
      justifyContent={"center"}
      p={3}
      bg={"gray.700"}
      fontWeight={"bold"}
      color={"white"}
      rounded={"full"}
      w={40}
      onClick={onClose}
      cursor={"pointer"}
    >
      <MdCheck />
      Copied!
    </Flex>
  );
}
