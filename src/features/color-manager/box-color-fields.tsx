import { Box, Flex, HStack } from "@chakra-ui/react";
import { HexField } from "./hex-field";
import { RgbField } from "./rgb-fiel";
import { CmykField } from "./cmyk-field";

interface BoxColorFieldsProps {
  baseColor: string;
  hexColor: string;
  rgbColor: {
    r: number;
    g: number;
    b: number;
  };
  cmykColor: {
    c: number;
    m: number;
    y: number;
    k: number;
  };
  onHexChange: (value: string) => void;
  onRgbChange: (value: number, key: string) => void;
  onCmykChange: (value: number, key: string) => void;
}
export function BoxColorFields({
  baseColor,
  cmykColor,
  hexColor,
  onCmykChange,
  onHexChange,
  onRgbChange,
  rgbColor,
}: BoxColorFieldsProps) {
  return (
    <Box
      rounded={"12px"}
      style={{
        background: baseColor,
      }}
      width={800}
      mx={"auto"}
      p={4}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <HStack>
          <HexField hexColor={hexColor} onHexChange={onHexChange} />

          <RgbField rgbColor={rgbColor} onRgbChange={onRgbChange} />

          <CmykField cmykColor={cmykColor} onCmykChange={onCmykChange} />
        </HStack>
      </Flex>
    </Box>
  );
}
