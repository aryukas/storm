"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Box, Typography, TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Stack, ToggleButton,
  ToggleButtonGroup, Grid, Card, CardContent, InputAdornment,
  IconButton, Tooltip, Fade, CircularProgress, Divider, Container, Chip
} from "@mui/material";
import { 
  ViewList, ViewModule, Search, Inventory, 
  AddCircleOutline, Refresh, MoreVert
} from "@mui/icons-material";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const addProduct = async () => {
    if (!name || !price) return;
    setLoading(true);
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity || 0),
      }),
    });
    setName(""); setPrice(""); setQuantity(""); 
    await loadProducts();
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#f8fafc", // Modern slate background
      pb: 8
    }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 8 } }}>
        
        {/* HEADER SECTION */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems={{ xs: "flex-start", sm: "flex-end" }} 
          spacing={2}
          sx={{ mb: 6 }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: "#6366f1", fontWeight: 700, letterSpacing: 1.2 }}>
              Management Console
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b", mt: 1 }}>
              Inventory Overview
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Refresh Inventory">
              <IconButton onClick={loadProducts} sx={{ bgcolor: "white", border: "1px solid #e2e8f0", borderRadius: 2 }}>
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
            <Button 
              variant="contained" 
              startIcon={<AddCircleOutline />}
              onClick={() => document.getElementById('product-name-input').focus()}
              sx={{ bgcolor: "#1e293b", textTransform: "none", borderRadius: 2, px: 3, "&:hover": { bgcolor: "#0f172a" } }}
            >
              Add New
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {/* LEFT SIDE: FORM */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: 3, 
              border: "1px solid #e2e8f0", 
              bgcolor: "white",
              position: { lg: "sticky" }, 
              top: 40
            }}>
              <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: "#334155" }}>
                Product Details
              </Typography>
              <Stack spacing={2.5}>
                <TextField
                  id="product-name-input"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField 
                  label="Unit Price" 
                  type="number" 
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField 
                  label="Initial Stock" 
                  type="number" 
                  fullWidth
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={addProduct}
                  disabled={loading}
                  sx={{
                    mt: 1, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 600,
                    bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5" }, boxShadow: "none"
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Save to Inventory"}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT SIDE: LISTING */}
          <Grid item xs={12} lg={8}>
            <Stack 
              direction={{ xs: "column", md: "row" }} 
              spacing={2} 
              sx={{ mb: 3 }}
              alignItems="center"
            >
              <TextField
                placeholder="Filter by name..."
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ bgcolor: "white", "& .MuiOutlinedInput-root": { borderRadius: 3, height: 48 } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search fontSize="small" sx={{ ml: 1 }} /></InputAdornment>,
                }}
              />
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, v) => v && setView(v)}
                sx={{ bgcolor: "white", borderRadius: 3, border: "1px solid #e2e8f0", height: 48 }}
              >
                <ToggleButton value="list" sx={{ px: 2.5, border: "none" }}><ViewList fontSize="small" /></ToggleButton>
                <ToggleButton value="grid" sx={{ px: 2.5, border: "none" }}><ViewModule fontSize="small" /></ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            {view === "list" ? (
              <Fade in={true}>
                <Paper elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                  <Table>
                    <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Stock Status</TableCell>
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProducts.map((p) => (
                        <TableRow key={p.id} hover>
                          <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>{p.name}</TableCell>
                          <TableCell sx={{ color: "#334155", fontWeight: 500 }}>₹{p.price.toLocaleString()}</TableCell>
                          <TableCell>
                             <Chip 
                               label={p.quantity > 5 ? "In Stock" : "Low Stock"} 
                               size="small"
                               sx={{ 
                                 fontWeight: 700, fontSize: "0.7rem",
                                 bgcolor: p.quantity > 5 ? "#dcfce7" : "#fee2e2",
                                 color: p.quantity > 5 ? "#166534" : "#991b1b"
                               }} 
                             />
                             <Typography variant="caption" sx={{ ml: 1.5, color: "#64748b" }}>{p.quantity} units</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small"><MoreVert fontSize="small" /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Fade>
            ) : (
              <Grid container spacing={2.5}>
                {filteredProducts.map((p) => (
                  <Grid item xs={12} sm={6} key={p.id}>
                    <Fade in={true}>
                      <Card elevation={0} sx={{ 
                        borderRadius: 3, 
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": { borderColor: "#6366f1", transform: "translateY(-2px)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" justifyContent="space-between">
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#f1f5f9", display: "flex" }}>
                              <Inventory sx={{ color: "#64748b", fontSize: 20 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                              ₹{p.price.toLocaleString()}
                            </Typography>
                          </Stack>
                          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 700, color: "#334155" }}>
                            {p.name}
                          </Typography>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                            <Box>
                              <Typography variant="caption" display="block" sx={{ color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
                                Availability
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: p.quantity <= 5 ? "#ef4444" : "#10b981" }}>
                                {p.quantity} Units left
                              </Typography>
                            </Box>
                            <Button size="small" variant="outlined" sx={{ borderRadius: 1.5, textTransform: "none", fontSize: "0.75rem" }}>
                              Edit
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}