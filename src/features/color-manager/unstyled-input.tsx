import { Input, InputProps, forwardRef } from "@chakra-ui/react";

export const UnstyledInput = forwardRef<InputProps, "input">((props, ref) => {
  const width = String(props.value)
    ? props?.value?.toString().length + "ch"
    : "4ch";
  return (
    <Input
      fontWeight={"semibold"}
      ref={ref}
      size={"small"}
      variant={"unstyled"}
      w={width}
      autoComplete="off"
      {...props}
    />
  );
});
