import { Outlet } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import { Box } from "@mui/material";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "./Shell.css";

const guestItems = [{ label: "Μαθήματα", pathname: "/courses" }];
const studentItems = [
  { label: "Μαθήματα", pathname: "/courses" },
  { label: "Βαθμολογίες", pathname: "/grades" },
  { label: "Δηλώσεις", pathname: "/declarations" },
  { label: "Πιστοποιητικά", pathname: "/certificates" },
];
const professorItems = [
  { label: "Μαθήματα", pathname: "/courses" },
  { label: "Βαθμολόγια", pathname: "/gradebooks" },
];

function Shell() {
  const { userData } = useAuth();
  const { userType } = userData;
  const sidebarItems =
    userType === "guest"
      ? guestItems
      : userType === "student"
      ? studentItems
      : professorItems;
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Sidebar sidebarItems={sidebarItems} />
      <Box sx={{ pt: "116px", pl: "12px", width: "100%", height: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Shell;
