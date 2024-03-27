import { Flex, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { UnstyledInput } from "./unstyled-input";

interface CmykFieldProps {
  cmykColor: {
    c: number;
    m: number;
    y: number;
    k: number;
  };
  onCmykChange: (value: number, key: string) => void;
}

export function CmykField({ cmykColor, onCmykChange }: CmykFieldProps) {
  return (
    <FormControl w={40}>
      <FormLabel fontSize={"small"} color={"gray.500"}>
        CMYK
      </FormLabel>
      <Flex>
        <UnstyledInput
          value={cmykColor.c}
          onChange={(e) => onCmykChange(Number(e.target.value), "c")}
          maxLength={3}
        />
        <Text>,</Text>
        <UnstyledInput
          value={cmykColor.m}
          onChange={(e) => onCmykChange(Number(e.target.value), "m")}
          id="cmyk-color-m"
          maxLength={3}
        />
        <Text>,</Text>
        <UnstyledInput
          value={cmykColor.y}
          onChange={(e) => onCmykChange(Number(e.target.value), "y")}
          id="cmyk-color-y"
          maxLength={3}
        />
        <Text>,</Text>
        <UnstyledInput
          value={cmykColor.k}
          onChange={(e) => onCmykChange(Number(e.target.value), "k")}
          id="cmyk-color-k"
          maxLength={3}
        />
      </Flex>
    </FormControl>
  );
}
