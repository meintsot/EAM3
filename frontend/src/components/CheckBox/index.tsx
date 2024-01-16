import * as React from "react";
import { Checkbox, Tooltip } from "@mui/material";
import { CheckBoxProps } from "../../model";

const CheckBox: React.FC<CheckBoxProps> = ({ tooltip = "" }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Tooltip title={tooltip}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Tooltip>
  );
};

export default CheckBox;
