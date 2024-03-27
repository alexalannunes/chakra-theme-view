import { IconButton } from "@chakra-ui/react";
import chroma from "chroma-js";
import { MouseEvent } from "react";
import { MdCopyAll } from "react-icons/md";

export function CopyColorButton({ color }: { color: string }) {
  const handleCopy = async (event: MouseEvent) => {
    event.preventDefault();
    await navigator.clipboard.writeText(color);
  };
  return (
    <IconButton
      aria-label="Copy"
      color={chroma(color).darken(3).hex()}
      display={"none"}
      fontSize={"large"}
      rounded={"full"}
      transform={"auto"}
      variant={"ghost"}
      _hover={{
        bg: "rgba(0, 0,0,0.1)",
      }}
      onClick={handleCopy}
      icon={<MdCopyAll />}
    />
  );
}
