import { Flex, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { UnstyledInput } from "./unstyled-input";

interface RgbFieldProps {
  rgbColor: {
    r: number;
    g: number;
    b: number;
  };
  onRgbChange: (value: number, key: string) => void;
}

export function RgbField({ rgbColor, onRgbChange }: RgbFieldProps) {
  return (
    <FormControl w={40}>
      <FormLabel fontSize={"small"} color={"gray.500"}>
        RGB
      </FormLabel>
      <Flex>
        <UnstyledInput
          value={rgbColor.r}
          onChange={(e) => onRgbChange(Number(e.target.value), "r")}
        />
        <Text>,</Text>
        <UnstyledInput
          id="rgba-color-g"
          value={rgbColor.g}
          onChange={(e) => onRgbChange(Number(e.target.value), "g")}
        />
        <Text>,</Text>
        <UnstyledInput
          id="rgba-color-b"
          maxLength={3}
          value={rgbColor.b}
          onChange={(e) => onRgbChange(Number(e.target.value), "b")}
        />
      </Flex>
    </FormControl>
  );
}
