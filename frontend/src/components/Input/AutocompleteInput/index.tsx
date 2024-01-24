import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { AutocompleteInputProps } from "../../../model";

export default function AutocompleteInput({
  id,
  items,
  placeholder,
  error = false,
  errorText = "",
  required = false,
  onChange,
}: AutocompleteInputProps) {
  return (
    <Autocomplete
      disablePortal
      id={id}
      options={items}
      fullWidth
      getOptionLabel={(option) => option}
      onChange={(e, newValue) => {
        onChange(id, newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          error={error}
          helperText={error ? errorText : ""}
          required={required}
          sx={{ backgroundColor: "white" }}
        />
      )}
    />
  );
}
