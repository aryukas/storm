"use client";

import { Box, Container, Typography } from "@mui/material";

export default function ProductsLayout({ children }) {
  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {/* Utility Top Navigation Bar */}
      <Box sx={{ borderBottom: "1px solid #e5e5e5", py: 1.5, mb: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#333" }}>
            My eBay <Typography component="span" variant="caption" sx={{ color: "#767676", ml: 1 }}>{">"} Selling {">"} Inventory</Typography>
          </Typography>
        </Container>
      </Box>
      {children}
    </Box>
  );
}