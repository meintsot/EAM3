import * as React from "react";
import { AppBar, Box, Link, Toolbar } from "@mui/material";
import UserButton from "../UserButton";

import "./Navbar.css";

import logo from "../../assets/img/Logo.png";

export default function NavBar() {
  const [auth, setAuth] = React.useState(true);

  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar-container">
      <AppBar
        position="sticky"
        className="nav-bar"
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar className="toolbar-items">
          <Link href="/">
            <img alt="Logo" src={logo} className="logo" />
          </Link>
          {auth && (
            <div>
              <UserButton />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
