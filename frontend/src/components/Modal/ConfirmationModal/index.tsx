import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { ConfirmationModalProps } from "../../../model";

import "./ConfirmationModal.css";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  text,
  open,
  onOpen,
  onConfirm,
}) => {
  const handleClose = () => onOpen(false);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalContent">
        <Typography
          id="modal-modal-title"
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "medium" }}
        >
          {text}
        </Typography>
        <Box className="button-group">
          <Button
            color="inherit"
            variant="contained"
            fullWidth
            sx={{ fontWeight: "bold" }}
            onClick={handleClose}
          >
            ακυρωση
          </Button>
          <Button
            variant="contained"
            className="main-action-button"
            fullWidth
            sx={{ fontWeight: "bold" }}
            onClick={handleConfirm}
          >
            οριστικη υποβολη
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
