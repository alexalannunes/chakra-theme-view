import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";

interface ShadesRangeSliderProps {
  value: number[];
  onShadesCountChange: (value: number[]) => void;
}

export function ShadesRangeSlider({
  value,
  onShadesCountChange,
}: ShadesRangeSliderProps) {
  return (
    <Box w={96}>
      <RangeSlider
        max={50}
        min={2}
        onChange={onShadesCountChange}
        value={value}
      >
        <RangeSliderTrack bg="gray.100">
          <RangeSliderFilledTrack bg="gray.300" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Text fontSize={"small"} fontWeight={"semibold"}>
            {value[0]}
          </Text>
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  );
}
