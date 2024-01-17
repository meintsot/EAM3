import * as React from "react";
import { Checkbox } from "@mui/material";
import { CheckBoxProps } from "../../model";

const CheckBox: React.FC<CheckBoxProps> = ({}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default CheckBox;
