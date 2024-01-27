import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { MultipleAutocompleteInputProps } from "../../../model";

const MultipleAutocompleteInput: React.FC<MultipleAutocompleteInputProps> = ({
  id,
  placeholder = "",
  error = false,
  errorText = "",
  required = false,
  items,
  onChange,
  defaultValues = [],
}) => {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        id={id}
        options={items}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        onChange={(e, newValue) => {
          onChange(id, newValue);
        }}
        defaultValue={defaultValues}
        renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder}
            placeholder={placeholder}
            error={error}
            helperText={error ? errorText : ""}
            required={required}
            sx={{ backgroundColor: "white" }}
          />
        )}
      />
    </Stack>
  );
};

export default MultipleAutocompleteInput;
