"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import { useMemo } from "react";

export default function RootLayout({ children }) {
  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: "#6366f1", // Modern Indigo
        dark: "#4f46e5",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#64748b", // Slate secondary
      },
      text: {
        primary: "#1e293b", // Deep Charcoal
        secondary: "#64748b",
      },
      background: {
        default: "#f8fafc", // Clean Slate background
        paper: "#ffffff",
      },
      divider: "#e2e8f0",
    },
    shape: {
      borderRadius: 12, // More professional rounded corners
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', sans-serif",
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      button: {
        textTransform: "none", // Avoid "funky" all-caps buttons
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            border: "1px solid #e2e8f0",
          },
        },
      },
    },
  }), []);

  return (
    <html lang="en">
      <head>
        {/* Professional SaaS font import */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}