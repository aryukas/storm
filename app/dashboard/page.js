"use client";
import { Typography, Grid, Card, CardContent, Box, Chip, Button, ButtonGroup } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import GavelIcon from "@mui/icons-material/Gavel";
import AddIcon from "@mui/icons-material/Add";
import TargetIcon from "@mui/icons-material/MyLocation"; // Using a real MUI icon instead of emoji

export default function DashboardPage() {
  const stats = [
    { label: "TOTAL INDENTS", value: "no.", sub: "All time volume", active: true },
    { label: "BIDS RECEIVED", value: "no.", icon: <TargetIcon fontSize="small" /> },
    { label: "AWARDED", value: "no.", icon: <GavelIcon color="primary" fontSize="small" /> },
    { label: "ACTIVE OPS", value: "no." },
    { label: "BID CLOSED", value: "no." },
    { label: "RE-BID REQ.", value: "no." },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="overline" sx={{ fontWeight: "bold", color: "text.secondary", letterSpacing: 1.2 }}>
          PROCUREMENT PULSE
        </Typography>
        <Chip 
          label=" TOTAL INDENTS" 
          color="success" 
          variant="outlined" 
          sx={{ bgcolor: "#e8f5e9", fontWeight: "bold", border: 'none' }} 
          size="small" 
        />
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} lg={1.71} key={stat.label}> 
            {/* Note: lg={1.71} roughly splits 7 items across 12 columns, or use md={3} for standard wrapping */}
            <Card 
              elevation={0} 
              sx={{ 
                height: "100%", 
                borderRadius: 3,
                border: "1px solid",
                borderColor: stat.active ? "transparent" : "#eceff1",
                bgcolor: stat.active ? "#1a237e" : "white",
                color: stat.active ? "white" : "text.primary",
                transition: "0.3s",
                "&:hover": { boxShadow: 1 }
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 2, '&:last-child': { pb: 2 } }}>
                <Box display="flex" justifyContent="center" alignItems="center" gap={0.5} mb={1}>
                  {stat.icon && (
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      {stat.icon}
                    </Box>
                  )}
                  <Typography variant="caption" sx={{ fontWeight: "bold", opacity: 0.8, whiteSpace: 'nowrap' }}>
                    {stat.label}
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                {stat.sub && (
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, fontSize: '0.65rem' }}>
                    {stat.sub}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter Tabs and Action Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <ButtonGroup 
          variant="outlined" 
          sx={{ 
            borderRadius: 2, 
            '& .MuiButton-root': { textTransform: 'none', px: 3 } 
          }}
        >
          <Button variant="contained" sx={{ bgcolor: "#1a237e", '&:hover': { bgcolor: '#0d1440' } }}>
            ACTIVE BIDS
          </Button>
          <Button sx={{ borderColor: '#eceff1', color: 'text.secondary' }}>BIDS CLOSED</Button>
          <Button sx={{ borderColor: '#eceff1', color: 'text.secondary' }}>BIDS AWARDED</Button>
        </ButtonGroup>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ 
            borderRadius: 2, 
            bgcolor: "#2979ff", 
            textTransform: "none",
            px: 4,
            boxShadow: '0px 4px 10px rgba(41, 121, 255, 0.3)'
          }}
        >
          NEW INDENT
        </Button>
      </Box>
    </Box>
  );
}