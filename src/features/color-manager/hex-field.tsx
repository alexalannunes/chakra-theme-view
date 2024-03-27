import { FormControl, FormLabel } from "@chakra-ui/react";
import { UnstyledInput } from "./unstyled-input";

interface HexFieldProps {
  hexColor: string;
  onHexChange: (value: string) => void;
}

export function HexField({ hexColor, onHexChange }: HexFieldProps) {
  return (
    <FormControl w={40}>
      <FormLabel fontSize={"small"} color={"gray.500"}>
        HEX
      </FormLabel>
      <UnstyledInput
        value={"#" + hexColor.toUpperCase()}
        onChange={(e) => onHexChange(e.target.value)}
        maxLength={7}
      />
    </FormControl>
  );
}
