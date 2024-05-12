import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdFavorite, MdFavoriteBorder, MdMenu, MdNotes } from "react-icons/md";
import { useLocalStorage } from "usehooks-ts";

import { ColorMode } from "../types/color-mode";
import { IPalette } from "../types/palette";
import { useSearchParams } from "react-router-dom";

interface SavePaletteForm extends Omit<IPalette, "id"> {}

interface ActionButtonsProps {
  onToggleColorMode: () => void;
  colorMode: ColorMode;
}

export function ActionButtons({
  onToggleColorMode,
  colorMode,
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

  const [localColors, setLocalColors] = useLocalStorage<IPalette[]>(
    "palettes",
    []
  );

  const [params] = useSearchParams();

  const colors = params.get("colors");

  const isSaved = localColors.find((color) => color.id === colors);

  const isColorViewMode = colorMode === "color";
  const buttonText = isColorViewMode ? "View Shades" : "View Colors";
  const buttonIcon = isColorViewMode ? (
    <MdNotes />
  ) : (
    <Text as="span" transform="rotateZ(90deg)">
      <MdMenu />
    </Text>
  );

  const placeholderDescription = colors;

  const submit = (data: SavePaletteForm) => {
    if (placeholderDescription) {
      const { name, description } = data;
      const paletteName = name.trim();
      const paletteDescription = description.trim();
      const paletteId = placeholderDescription;

      const toSave: IPalette = {
        name: paletteName,
        description: paletteDescription,
        id: paletteId,
      };

      // TODO check if exist, to update
      setLocalColors((prev) => [...prev, toSave]);
      onClose();
    }
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
          leftIcon={isSaved ? <MdFavorite /> : <MdFavoriteBorder />}
        >
          {isSaved ? "Saved" : "Save"}
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
                <FormControl isRequired>
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
                        placeholder={
                          placeholderDescription ??
                          "Super color palette description"
                        }
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
