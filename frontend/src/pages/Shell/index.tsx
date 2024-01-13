import { Outlet } from "react-router";
import { Box } from "@mui/material";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "./Shell.css";

const items = [
  { name: "Μαθήματα", pathname: "courses" },
  { name: "Βαθμολογίες", pathname: "grades" },
];

function Shell() {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Sidebar sidebarItems={items} />
      <Box sx={{ pt: "116px", pl: "12px", width: "100%", height: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Shell;
