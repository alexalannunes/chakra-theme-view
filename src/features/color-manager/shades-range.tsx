import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";

interface ShadesRangeProps {
  count: number[];
  onShadesCountChange: (value: number[]) => void;
}

export function ShadesRange({ count, onShadesCountChange }: ShadesRangeProps) {
  return (
    <Box w={96}>
      <RangeSlider
        max={50}
        min={2}
        onChange={onShadesCountChange}
        value={count}
      >
        <RangeSliderTrack bg="gray.100">
          <RangeSliderFilledTrack bg="gray.300" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Text fontSize={"small"} fontWeight={"semibold"}>
            {count[0]}
          </Text>
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  );
}
