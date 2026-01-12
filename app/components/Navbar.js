"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const [dateTime, setDateTime] = useState({ time: "", date: "" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateTime({
        // 24-hour format (hourCycle: 'h23')
        time: now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        // Full day name and date
        date: now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });
    };

    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Stay above Sidebar
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)", // Modern glass effect
        color: "text.primary",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton 
            edge="start" 
            onClick={onMenuClick}
            sx={{ mr: 2, color: "primary.main" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            DASHBOARD
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          {/* Time and Date Display */}
          <Box textAlign="right" sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontFamily: "monospace" }}>
              {dateTime.time}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dateTime.date}
            </Typography>
          </Box>

          {/* User Profile */}
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box textAlign="right" sx={{ display: { xs: "none", md: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.email?.split('@')[0]}
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ display: 'block', lineHeight: 1 }}>
                ● Online
              </Typography>
            </Box>
            <Avatar 
              sx={{ 
                bgcolor: "primary.main", 
                width: 38, 
                height: 38,
                fontSize: "1rem",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              {user?.email?.[0]?.toUpperCase()}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}