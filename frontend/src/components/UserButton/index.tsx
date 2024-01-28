import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, ButtonBase, MenuItem, IconButton, Menu } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useAuth } from "../../providers/AuthProvider";

import "./UserButton.css";

const UserButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userData } = useAuth();
  const { userType, userProfile } = userData;
  const navigate = useNavigate();

  const image = `http://localhost:8888/${
    userProfile.generalInformation.profilePicture?.split("/")[1]
  }`;

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
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/register");
          }}
          className="menuItem"
        >
          <PersonAddIcon />
          Εγγραφή
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/login");
          }}
          className="menuItem"
        >
          <LoginIcon />
          Σύνδεση
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box className="userButtonContainer">
      {userProfile?.generalInformation?.profilePicture &&
      userProfile?.generalInformation?.profilePicture
        ?.split("/")
        .indexOf("uploads") > -1 ? (
        <ButtonBase
          focusRipple
          key={image}
          className="userButton"
          onClick={handleMenu}
        >
          <img src={image} className="userImage" />
        </ButtonBase>
      ) : (
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      )}
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
          {userProfile.generalInformation.firstName}{" "}
          {userProfile.generalInformation.lastName}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/profile");
          }}
          className="menuItem"
        >
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
