import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SidebarProps } from "../../model";

import "./Sidebar.css";

const drawerWidth = 240;

export default function Sidebar({ sidebarItems }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          boxShadow: 5,
          zIndex: "auto",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar className="toolbar" />
      <Divider />
      <List sx={{ p: 0 }}>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{
                pt: "16px",
                pr: "24px",
                pl: "24px",
                pb: "16px",
                "&:hover": { backgroundColor: "#e5eff9" },
                "&:focus": { backgroundColor: "#afc8e1" },
              }}
              onClick={() => {
                navigate(item.pathname);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
