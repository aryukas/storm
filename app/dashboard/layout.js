"use client";
import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar"; 
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      <Sidebar open={open} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? 260 : 70}px)` },
          transition: "margin 0.3s, width 0.3s",
        }}
      >
        <Toolbar /> {/* Spacer for the fixed AppBar */}
        {children}
      </Box>
    </Box>
  );
}