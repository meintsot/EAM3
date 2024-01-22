import React, { useState } from "react";
import { Checkbox, Tooltip } from "@mui/material";
import { CheckBoxProps } from "../../model";

const CheckBox: React.FC<CheckBoxProps> = ({ tooltip = "", onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(!checked);
    setChecked(!checked);
  };

  return (
    <Tooltip title={tooltip} placement="top">
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Tooltip>
  );
};

export default CheckBox;
