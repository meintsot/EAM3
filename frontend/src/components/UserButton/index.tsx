import React, { useState } from "react";
import { Box, ButtonBase, MenuItem, IconButton, Menu } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import cloudUpload from "../../assets/img/CloudUpload.png";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useAuth } from "../../providers/AuthProvider";

import "./UserButton.css";

const UserButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userData } = useAuth();
  const { userType } = userData;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return userType === "guest" ? (
    <Box>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className="menuItem">
          <PersonAddIcon />
          Εγγραφή
        </MenuItem>
        <MenuItem onClick={handleClose} className="menuItem">
          <LoginIcon />
          Σύνδεση
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box className="userButtonContainer">
      <ButtonBase
        focusRipple
        key={cloudUpload}
        className="userButton"
        onClick={handleMenu}
      >
        <img src={cloudUpload} className="userImage" />
      </ButtonBase>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem sx={{ fontWeight: "bold" }} className="fullName">
          Μαρία Παρασκευοπούλου
        </MenuItem>
        <MenuItem onClick={handleClose} className="menuItem">
          <PersonOutlinedIcon />
          Προφίλ
        </MenuItem>
        <MenuItem onClick={handleClose} className="menuItem">
          <LogoutOutlinedIcon />
          Αποσύνδεση
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserButton;
