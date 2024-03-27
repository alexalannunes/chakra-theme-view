import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import chroma from "chroma-js";
import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { CmykField } from "../features/color-manager/cmyk-field";
import { CopyColorButton } from "../features/color-manager/copy-color-button";
import { HexField } from "../features/color-manager/hex-field";
import { RgbField } from "../features/color-manager/rgb-fiel";
import { generateShades } from "../utils-temp";

const navigateOptions = {
  replace: true,
};

export function HomePage() {
  const { colorShades } = useParams();

  const [color, shades] = (colorShades || "").split("-");

  // use function to update url with debounce callback
  const navigate = useNavigate();

  const [shadesCount, setShadesCount] = useState(() => {
    return shades ? [Number(shades)] : [24];
  });

  const [baseColor, setColor] = useState(() => {
    return color ? "#" + color : "#9AE6B4";
  });

  const [hexColor, setHexColor] = useState(baseColor.replace("#", ""));

  const [rgbColor, setRgbColor] = useState(() => {
    const [r, g, b] = chroma(baseColor).rgb();
    return { r, g, b };
  });

  const [cmykColor, setCmykColor] = useState(() => {
    const [c, m, y, k] = chroma(baseColor).cmyk();
    return {
      c: Math.ceil(c * 100),
      m: Math.ceil(m * 100),
      y: Math.ceil(y * 100),
      k: Math.ceil(k * 100),
    };
  });

  const handleRgbChange = (rgbValue: number, key: string) => {
    if (isNaN(rgbValue)) return;

    const prev = { ...rgbColor };
    const value = Number(rgbValue);
    const n = {
      ...prev,
      [key]: value > 255 ? 255 : value,
    };

    const s = chroma(n.r, n.g, n.b).hex();

    const [c, m, y, k] = chroma(s).cmyk();

    setRgbColor(n);
    setColor(s);
    setHexColor(s.replace("#", ""));
    setCmykColor({
      c: Math.ceil(c * 100),
      m: Math.ceil(m * 100),
      y: Math.ceil(y * 100),
      k: Math.ceil(k * 100),
    });

    navigate(
      s.replace("#", "").toLowerCase() + "-" + shadesCount[0],
      navigateOptions
    );
  };

  const handleHexChange = (hex: string) => {
    const v = hex.replace("#", "");
    setHexColor(v);

    const isAbbrev = v.length === 3;
    const isFull = v.length === 6;

    if (isAbbrev || isFull) {
      setColor("#" + v);
      const [r, g, b] = chroma("#" + v).rgb();
      setRgbColor({ r, g, b });
      const [c, m, y, k] = chroma("#" + v).cmyk();
      setCmykColor({
        c: Math.ceil(c * 100),
        m: Math.ceil(m * 100),
        y: Math.ceil(y * 100),
        k: Math.ceil(k * 100),
      });

      navigate(v.toLowerCase() + "-" + shadesCount[0], navigateOptions);
    }
  };

  const handleCmykChange = (cmykValue: number, key: string) => {
    if (isNaN(cmykValue)) return;

    const prev = { ...cmykColor };
    const value = Number(cmykValue);
    const newValue = value > 100 ? 100 : value;
    const n = {
      ...prev,
      [key]: newValue,
    };

    const s = chroma.cmyk(n.c / 100, n.m / 100, n.y / 100, n.k / 100).hex();
    const [r, g, b] = chroma(s).rgb();

    setColor(s);
    setCmykColor(n);
    setHexColor(s.replace("#", ""));
    setRgbColor({
      r,
      g,
      b,
    });

    navigate(
      s.replace("#", "").toLowerCase() + "-" + shadesCount[0],
      navigateOptions
    );
  };

  // TODO: receive color and shade count to update url
  const updateUrlShadesCount = useDebouncedCallback((value: number) => {
    const newColor = color?.replace("#", "").toLowerCase();
    const url = `${newColor}-${value}`;

    navigate(url, navigateOptions);
  }, 800);

  const handleShadesCountChange = (value: number[]) => {
    setShadesCount(value);
    updateUrlShadesCount(value[0]);
  };

  return (
    <Box minH={"100vh"}>
      <Box>
        <Flex
          as="header"
          justifyContent={"space-between"}
          px={10}
          h={14}
          borderBottom={"1px"}
          borderBottomColor={"gray.200"}
        >
          <Flex alignItems={"center"} gap={1}>
            <Text>supa</Text>
            <Text fontWeight={"semibold"}>colors</Text>
          </Flex>
          <HStack>
            <Link>Sign in</Link>
          </HStack>
        </Flex>
        <Container mt={10} maxW={"container.lg"} p={0}>
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
                <HexField hexColor={hexColor} onHexChange={handleHexChange} />

                <RgbField rgbColor={rgbColor} onRgbChange={handleRgbChange} />

                <CmykField
                  cmykColor={cmykColor}
                  onCmykChange={handleCmykChange}
                />
              </HStack>
            </Flex>
          </Box>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={800}
            mx={"auto"}
            mt={10}
            mb={4}
          >
            <Heading size={"md"}>Shades</Heading>
            <Box w={96}>
              <RangeSlider
                max={50}
                min={2}
                onChange={handleShadesCountChange}
                value={shadesCount}
              >
                <RangeSliderTrack bg="gray.100">
                  <RangeSliderFilledTrack bg="gray.300" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Text fontSize={"small"} fontWeight={"semibold"}>
                    {shadesCount}
                  </Text>
                </RangeSliderThumb>
              </RangeSlider>
            </Box>
          </Flex>
          <Flex flexWrap={"wrap"} mt={4} w={830} mx={"auto"}>
            {generateShades(baseColor, shadesCount[0]).map((shade, index) => (
              <Link
                as={RouterLink}
                key={shade + "-" + index}
                to={`color/${shade.replace("#", "")}`}
              >
                <Flex
                  bg={shade}
                  h={108}
                  m={15}
                  rounded={"12px"}
                  width={108}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    "&:hover": {
                      button: {
                        display: "flex",
                        "&:active": {
                          transform: "scale(0.9)",
                        },
                      },
                    },
                  }}
                >
                  <CopyColorButton color={shade} />
                </Flex>
              </Link>
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
