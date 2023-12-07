import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type Field = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
};

export default function Field(props: Field) {
  const { id, name, type, label, placeholder, autoComplete } = props;

  return (
    <FormControl isRequired>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        backgroundColor="white"
      />
    </FormControl>
  );
}
