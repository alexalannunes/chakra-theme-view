import { Container, Flex, Heading } from "@chakra-ui/react";
import chroma from "chroma-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { BoxColorFields } from "../features/color-manager/box-color-fields";
import { ColorBox } from "../features/color-manager/color-box";
import { ShadesRangeSlider } from "../components/shades-range-slider";
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
      "/" + s.replace("#", "").toLowerCase() + "-" + shadesCount[0],
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

      navigate("/" + v.toLowerCase() + "-" + shadesCount[0], navigateOptions);
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
      "/" + s.replace("#", "").toLowerCase() + "-" + shadesCount[0],
      navigateOptions
    );
  };

  // TODO: receive color and shade count to update url
  const updateUrlShadesCount = useDebouncedCallback((value: number) => {
    const newColor = (color || baseColor)?.replace("#", "").toLowerCase();
    const url = `/${newColor}-${value}`;

    navigate(url, navigateOptions);
  }, 800);

  const handleShadesCountChange = (value: number[]) => {
    setShadesCount(value);
    updateUrlShadesCount(value[0]);
  };

  return (
    <Container mt={10} maxW={"container.lg"} p={0}>
      <BoxColorFields
        baseColor={baseColor}
        cmykColor={cmykColor}
        hexColor={hexColor}
        onCmykChange={handleCmykChange}
        onHexChange={handleHexChange}
        onRgbChange={handleRgbChange}
        rgbColor={rgbColor}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={800}
        mx={"auto"}
        mt={10}
        mb={4}
      >
        <Heading size={"md"}>Shades</Heading>
        <ShadesRangeSlider
          value={shadesCount}
          onShadesCountChange={handleShadesCountChange}
        />
      </Flex>
      <Flex flexWrap={"wrap"} mt={4} w={830} mx={"auto"}>
        {generateShades(baseColor, shadesCount[0]).map((shade, index) => (
          <ColorBox color={shade} key={color + "-" + index} />
        ))}
      </Flex>
    </Container>
  );
}
