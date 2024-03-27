import { IconButton } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { MdCopyAll } from "react-icons/md";

export function CopyColorButton({ color }: { color: string }) {
  const handleCopy = async (event: MouseEvent) => {
    event.preventDefault();
    await navigator.clipboard.writeText(color);
  };
  return (
    <IconButton
      display={"none"}
      variant={"ghost"}
      aria-label="Copy"
      rounded={"full"}
      fontSize={"large"}
      transform={"auto"}
      _hover={{
        bg: "rgba(0, 0,0,0.1)",
      }}
      onClick={handleCopy}
      icon={<MdCopyAll />}
    />
  );
}
