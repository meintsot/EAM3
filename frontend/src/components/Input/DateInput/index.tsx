import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

import { DateInputProps } from "../../../model";

export default function DateInput({
  id,
  placeholder,
  error = false,
  errorText = "",
  required = false,

  onChange,
}: DateInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField"]}>
        <DateField
          id={id}
          label={placeholder}
          fullWidth
          required={required}
          InputProps={{ error: error }}
          InputLabelProps={{ error: error }}
          helperText={error ? errorText : ""}
          onChange={(newValue) => onChange(id, newValue)}
          sx={{ backgroundColor: "white" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
