"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Box, Typography, TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Stack, ToggleButton,
  ToggleButtonGroup, Grid, Card, CardContent, InputAdornment, Chip
} from "@mui/material";
import { ViewList, ViewModule, Search, Inventory } from "@mui/icons-material";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const addProduct = async () => {
    if (!name || !price) return;
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity || 0),
      }),
    });
    setName(""); setPrice(""); setQuantity(""); loadProducts();
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "white" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#5d4037", mb: 3 }}>
        Product Inventory
      </Typography>

      {/* SEARCH & VIEW TOGGLE */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TextField
          placeholder="Search products..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ bgcolor: "#fcfcfc" }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
        />
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, v) => v && setView(v)}
          size="small"
        >
          <ToggleButton value="list"><ViewList /></ToggleButton>
          <ToggleButton value="grid"><ViewModule /></ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* ADD PRODUCT FORM */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: "1px solid #eee", borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Product Name"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ bgcolor: "white" }}
          />
          <TextField label="Price" type="number" size="small" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ bgcolor: "white" }} />
          <TextField label="Quantity" type="number" size="small" value={quantity} onChange={(e) => setQuantity(e.target.value)} sx={{ bgcolor: "white" }} />
          <Button
            variant="contained"
            onClick={addProduct}
            disabled={loading}
            sx={{
              px: 4,
              // Highlighted Correct Option: Amber Gradient
              background: "linear-gradient(45deg, #ff8f00 30%, #ffb300 90%)",
              boxShadow: "0 2px 10px rgba(255, 143, 0, 0.3)",
              fontWeight: "bold",
              "&:hover": { background: "linear-gradient(45deg, #e65100 30%, #ff8f00 90%)" }
            }}
          >
            Add
          </Button>
        </Stack>
      </Paper>

      {/* PRODUCTS VIEW */}
      {view === "list" ? (
        <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: "white" }}>
              {filteredProducts.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>
                    <Chip 
                      label={p.status || "Active"} 
                      size="small" 
                      sx={{ bgcolor: "#fff3e0", color: "#e65100", fontWeight: "bold" }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card elevation={0} sx={{ border: "1px solid #eee", borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Inventory sx={{ color: "#ffb300", mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#ef6c00" }}>
                      ${p.price}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ color: "#5d4037", mb: 1 }}>{p.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">Stock:</Typography>
                    <Typography variant="body2" fontWeight="bold">{p.quantity}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}