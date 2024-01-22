import * as React from "react";
import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { DropdownInputProps } from "../../../model";

export default function DropdownInput({
  id,
  items,
  placeholder,
  error = false,
  errorText = "",
  required = false,
  size = "medium",
  onChange,
}: DropdownInputProps) {
  const [selected, setSelected] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel
          id={id}
          required={required}
          error={error}
          size={size === "medium" ? "normal" : "small"}
        >
          {placeholder}
        </InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={selected}
          label={placeholder}
          onChange={(e) => {
            onChange(id, e.target.value);
            handleChange(e);
          }}
          error={error}
          size={size}
          sx={{ backgroundColor: "white" }}
        >
          {items.map((item, index) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="password-helper-label" sx={{ color: "error.main" }}>
          {error ? errorText : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
