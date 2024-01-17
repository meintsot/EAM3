import React from "react";
import { ActionButtonProps } from "../../model";
import { IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick }) => {
  let tooltip = "";

  const renderIcon = () => {
    switch (type) {
      case "view":
        tooltip = "Λεπτομέρειες";
        return <InfoOutlinedIcon />;
      case "add":
        tooltip = "Δημιουργία Βαθμολογίου";
        return <AddCircleOutlineIcon />;
      case "edit":
        tooltip = "Συνέχεια επεξεργασίας";
        return <EditIcon />;
      case "delete":
        tooltip = "Αφαίρεση μαθήματος";
        return <DeleteIcon />;
      default:
        <></>;
    }
  };
  return <IconButton onClick={onClick}>{renderIcon()}</IconButton>;
};

export default ActionButton;
