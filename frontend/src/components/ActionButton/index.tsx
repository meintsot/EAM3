import React from "react";
import { ActionButtonProps } from "../../model";
import { IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  tooltip = "",
}) => {
  const renderIcon = () => {
    switch (type) {
      case "view":
        return <InfoOutlinedIcon />;
      case "add":
        return <AddCircleOutlineIcon />;
      case "edit":
        return <EditIcon />;
      case "delete":
        return <DeleteIcon />;
      default:
        <></>;
    }
  };
  return (
    <Tooltip title={tooltip} placement="top">
      <IconButton onClick={onClick}>{renderIcon()}</IconButton>
    </Tooltip>
  );
};

export default ActionButton;
