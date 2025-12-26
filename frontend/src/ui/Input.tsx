import { TextField } from "@mui/material";
import { pureLabel } from "../utils/values";

type Props = {
  name: string;
  label: string;
  type?: string;
};

function Input({ name, label, type = "text" }: Props) {
  return (
    <TextField
      required
      fullWidth
      margin="normal"
      type={type}
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      slotProps={pureLabel}
    />
  );
}

export default Input;
