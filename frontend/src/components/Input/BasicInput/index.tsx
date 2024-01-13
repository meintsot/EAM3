import { TextField, InputAdornment } from "@mui/material";

import { BasicInputProps } from "../../../model";

export default function BasicInput({
  id,
  placeholder,
  error = false,
  errorText = "",
  required = false,
  onChange,
}: BasicInputProps) {
  return (
    <TextField
      id={id}
      label={placeholder}
      variant="outlined"
      fullWidth
      required={required}
      error={error}
      helperText={error ? errorText : ""}
      onChange={(e) => onChange(id, e.target.value)}
    />
  );
}
