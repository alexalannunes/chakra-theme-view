import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

export function ColorNameInput() {
  return (
    <Editable defaultValue="Color name" fontSize={"xl"}>
      <EditablePreview fontWeight={"bold"} />
      <EditableInput fontWeight={"bold"} />
    </Editable>
  );
}
