import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputProps,
  Link,
  Text,
  forwardRef,
} from "@chakra-ui/react";
import chroma from "chroma-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateShades } from "../utils-temp";

const UnstyledInput = forwardRef<InputProps, "input">((props, ref) => (
  <Input
    fontWeight={"semibold"}
    variant={"unstyled"}
    size={"small"}
    ref={ref}
    {...props}
  />
));

export function HomePage() {
  const { color } = useParams();

  const nac = useNavigate();

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

  const { r, g, b } = rgbColor;
  const { c, m, y, k } = cmykColor;

  const rs = r.toString().length + "ch";
  const gs = g.toString().length + "ch";
  const bs = b.toString().length + "ch";

  const cs = c.toString().length + "ch";
  const ms = m.toString().length + "ch";
  const ys = y.toString().length + "ch";
  const ks = k.toString().length + "ch";

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

    nac(s.replace("#", ""), { replace: true });
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

      nac(v, { replace: true });
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

    nac(s.replace("#", ""), { replace: true });
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
                <FormControl w={40}>
                  <FormLabel fontSize={"small"} color={"gray.500"}>
                    HEX
                  </FormLabel>
                  <UnstyledInput
                    value={"#" + hexColor.toUpperCase()}
                    onChange={(e) => handleHexChange(e.target.value)}
                    maxLength={7}
                  />
                </FormControl>

                <FormControl w={40}>
                  <FormLabel fontSize={"small"} color={"gray.500"}>
                    RGB
                  </FormLabel>
                  <Flex>
                    <UnstyledInput
                      value={rgbColor.r}
                      onChange={(e) =>
                        handleRgbChange(Number(e.target.value), "r")
                      }
                      w={rs}
                    />
                    <Text>,</Text>
                    <UnstyledInput
                      id="rgba-color-g"
                      value={rgbColor.g}
                      onChange={(e) =>
                        handleRgbChange(Number(e.target.value), "g")
                      }
                      w={gs}
                    />
                    <Text>,</Text>
                    <UnstyledInput
                      id="rgba-color-b"
                      maxLength={3}
                      value={rgbColor.b}
                      onChange={(e) =>
                        handleRgbChange(Number(e.target.value), "b")
                      }
                      w={bs}
                    />
                  </Flex>
                </FormControl>

                {/* remove this form control to prevent errors */}
                <FormControl w={40}>
                  <FormLabel fontSize={"small"} color={"gray.500"}>
                    CMYK
                  </FormLabel>
                  <Flex>
                    <UnstyledInput
                      value={cmykColor.c}
                      onChange={(e) =>
                        handleCmykChange(Number(e.target.value), "c")
                      }
                      w={cs}
                      maxLength={3}
                    />
                    <Text>,</Text>
                    <UnstyledInput
                      value={cmykColor.m}
                      onChange={(e) =>
                        handleCmykChange(Number(e.target.value), "m")
                      }
                      id="cmyk-color-m"
                      w={ms}
                      maxLength={3}
                    />
                    <Text>,</Text>
                    <UnstyledInput
                      value={cmykColor.y}
                      onChange={(e) =>
                        handleCmykChange(Number(e.target.value), "y")
                      }
                      id="cmyk-color-y"
                      w={ys}
                      maxLength={3}
                    />
                    <Text>,</Text>
                    <UnstyledInput
                      value={cmykColor.k}
                      onChange={(e) =>
                        handleCmykChange(Number(e.target.value), "k")
                      }
                      id="cmyk-color-k"
                      w={ks}
                      maxLength={3}
                    />
                  </Flex>
                </FormControl>
              </HStack>
            </Flex>
          </Box>

          <Box w={800} mx={"auto"} mt={10} mb={4}>
            <Heading size={"md"}>Shades</Heading>
          </Box>
          <Flex flexWrap={"wrap"} mt={4} w={830} mx={"auto"}>
            {generateShades(baseColor, 24).map((shade, index) => (
              <Box
                key={shade + "-" + index}
                h={108}
                width={108}
                m={15}
                bg={shade}
                rounded={"12px"}
              />
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
