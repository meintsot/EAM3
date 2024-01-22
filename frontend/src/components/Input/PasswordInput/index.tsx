import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { PasswordInputProps } from "../../../model";

export default function PasswordInput({
  id,
  placeholder,
  error = false,
  errorText = "",
  required = false,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth required={required} error={error}>
      <InputLabel htmlFor="password">{placeholder}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        onChange={(e) => onChange(id, e.target.value)}
        sx={{ backgroundColor: "white" }}
      />
      <FormHelperText id="password-helper-text" sx={{ color: "error.main" }}>
        {error ? errorText : ""}
      </FormHelperText>
    </FormControl>
  );
}
