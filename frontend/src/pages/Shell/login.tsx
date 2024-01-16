import { Outlet } from "react-router";
import { Box } from "@mui/material";
import NavBar from "../../components/Navbar";

import "./Shell.css";

function LoginShell() {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box sx={{ pt: "116px", width: "100%", height: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default LoginShell;
