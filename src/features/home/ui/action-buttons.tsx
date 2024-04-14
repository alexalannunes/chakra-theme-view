import {
  Button,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Box,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { MdFavoriteBorder, MdMenu, MdNotes } from "react-icons/md";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { ColorMode } from "../types/color-mode";
import { toSlug } from "../helpers";
import { IColor } from "../types/colors";
import { IPalette } from "../types/palette";

interface SavePaletteForm extends Omit<IPalette, "id"> {}

interface ActionButtonsProps {
  onToggleColorMode: () => void;
  colorMode: ColorMode;
  colors: IColor[];
}

export function ActionButtons({
  onToggleColorMode,
  colorMode,
  colors,
}: ActionButtonsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<SavePaletteForm>({
    defaultValues: {
      name: "",
    },
  });

  const paletteNameRef = useRef<HTMLInputElement>(null);

  const isColorViewMode = colorMode === "color";
  const buttonText = isColorViewMode ? "View Shades" : "View Colors";
  const buttonIcon = isColorViewMode ? (
    <MdNotes />
  ) : (
    <Text as="span" transform="rotateZ(90deg)">
      <MdMenu />
    </Text>
  );

  const placeholderDescription = colors
    .map(({ color }) => color.replace("#", ""))
    .join("-");

  const submit = (data: SavePaletteForm) => {
    const colorPaletteId = placeholderDescription;
    console.log(data, toSlug(data.name), colorPaletteId);
  };

  return (
    <>
      <HStack>
        <Button
          variant={"preLarge"}
          leftIcon={buttonIcon}
          onClick={() => onToggleColorMode()}
        >
          {buttonText}
        </Button>
        <Button
          onClick={onOpen}
          variant={"preLarge"}
          leftIcon={<MdFavoriteBorder />}
        >
          Save
        </Button>
      </HStack>
      <Modal
        initialFocusRef={paletteNameRef}
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={() => reset()}
        size={"lg"}
      >
        <ModalOverlay />
        <Box as="form" onSubmit={handleSubmit(submit)}>
          <ModalContent>
            <ModalHeader>Save palette</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Palette name</FormLabel>

                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        autoComplete="off"
                        maxLength={100}
                        type="text"
                        ref={paletteNameRef}
                        placeholder="Super color palette name"
                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        maxLength={256}
                        autoComplete="off"
                        placeholder={placeholderDescription}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button type="button" variant={"ghost"} mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" isDisabled={!isValid}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  );
}
