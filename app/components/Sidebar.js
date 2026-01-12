"use client";

import { styled } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import GavelIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";

import { useRouter } from "next/navigation";

const DRAWER_WIDTH = 240;

/* ================= OPENED MIXIN ================= */
const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
  color: "#ffffff",
});

/* ================= CLOSED MIXIN ================= */
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "#1e293b",
  color: "#ffffff",
});

/* ================= DRAWER ================= */
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/* ================= SIDEBAR ================= */
export default function Sidebar({ open }) {
  const router = useRouter();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard", // redirects to /dashboard/products
      color: "#60a5fa",
    },
    {
      text: "Products",
      icon: <InventoryIcon />,
      path: "/dashboard/products",
      color: "#34d399",
    },
    {
      text: "Bids",
      icon: <GavelIcon />,
      path: "/dashboard/bids",
      color: "#fbbf24",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      path: "/",
      color: "#f87171",
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar />
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

      <List sx={{ px: 1.5 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: "block", mb: 1 }}
          >
            <ListItemButton
              onClick={() => router.push(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "12px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: item.color,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                sx={{
                  opacity: open ? 1 : 0,
                  "& .MuiTypography-root": {
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
