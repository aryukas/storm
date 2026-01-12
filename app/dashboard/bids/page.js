"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Stack, ToggleButton, ToggleButtonGroup,
  Grid, Card, CardContent, InputAdornment
} from "@mui/material";
import { ViewList, ViewModule, Search } from "@mui/icons-material";

export default function BidsPage() {
  const [bids, setBids] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");

  const [productId, setProductId] = useState("");
  const [bidderName, setBidderName] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const loadData = async () => {
    const [bRes, pRes] = await Promise.all([
      fetch("/api/bids"),
      fetch("/api/products")
    ]);
    setBids(await bRes.json());
    setProducts(await pRes.json());
  };

  useEffect(() => { loadData(); }, []);

  const filteredBids = useMemo(() => {
    return bids.filter((bid) => {
      const matchesSearch = bid.bidder_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterProduct === "all" || bid.product_id === filterProduct;
      return matchesSearch && matchesFilter;
    });
  }, [bids, searchQuery, filterProduct]);

  const placeBid = async () => {
    if(!productId || !bidderName || !bidAmount) return;
    await fetch("/api/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, bidder_name: bidderName, bid_amount: bidAmount }),
    });
    setBidderName(""); setBidAmount(""); loadData();
  };

  return (
    <Box sx={{ 
      p: 4, 
      minHeight: "100vh",
      bgcolor: "white" // Changed from gradient to pure white
    }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#5d4037", mb: 3 }}>
        Auction Bids
      </Typography>

      {/* SEARCH & FILTER BAR */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <TextField
          placeholder="Search bidders..."
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, bgcolor: "#fcfcfc", borderRadius: 1 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
        />
        
        <Select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
          size="small"
          sx={{ minWidth: 150, bgcolor: "#fcfcfc" }}
        >
          <MenuItem value="all">All Products</MenuItem>
          {products.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
        </Select>

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

      {/* FORM: PLACE BID */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: "1px solid #eee", borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            displayEmpty
            size="small"
            sx={{ flex: 1, bgcolor: "white" }}
          >
            <MenuItem value="" disabled>Select Product</MenuItem>
            {products.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
          <TextField label="Bidder Name" size="small" sx={{bgcolor: "white"}} value={bidderName} onChange={(e) => setBidderName(e.target.value)} />
          <TextField label="Amount" type="number" size="small" sx={{bgcolor: "white"}} value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
          
          <Button 
            variant="contained" 
            onClick={placeBid}
            sx={{ 
              px: 4,
              // Highlighted Correct Option: Amber Gradient
              background: "linear-gradient(45deg, #ff8f00 30%, #ffb300 90%)",
              boxShadow: "0 2px 10px rgba(255, 143, 0, 0.3)",
              color: "white",
              fontWeight: "bold",
              "&:hover": { background: "linear-gradient(45deg, #e65100 30%, #ff8f00 90%)" }
            }}
          >
            Place Bid
          </Button>
        </Stack>
      </Paper>

      {/* VIEW RENDERER */}
      {view === "list" ? (
        <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Bidder</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: "white" }}>
              {filteredBids.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{b.product_name}</TableCell>
                  <TableCell>{b.bidder_name}</TableCell>
                  <TableCell align="right" sx={{ color: "#ef6c00", fontWeight: "bold" }}>${b.bid_amount}</TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{new Date(b.created_at).toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredBids.map((b) => (
            <Grid item xs={12} sm={6} md={4} key={b.id}>
              <Card elevation={0} sx={{ border: "1px solid #eee", borderRadius: 3, bgcolor: "white" }}>
                <CardContent>
                  <Typography variant="caption" sx={{ color: "#ff8f00", fontWeight: "bold", letterSpacing: 1 }}>
                    {b.product_name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#5d4037" }}>{b.bidder_name}</Typography>
                  <Typography variant="h5" sx={{ mt: 1, color: "#ef6c00", fontWeight: 800 }}>
                    ${b.bid_amount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(b.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}