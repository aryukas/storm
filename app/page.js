"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress, 
  Paper, 
  Stack 
} from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ text: data.error || "Action failed", type: "error" });
        setLoading(false);
        return;
      }

      if (mode === "login") {
        setMessage({ text: "Success! Redirecting...", type: "success" });
        router.push("/dashboard");
        router.refresh(); 
      } else {
        setMessage({ text: "Account created! You can now login.", type: "success" });
        setMode("login");
        setLoading(false);
      }
    } catch (err) {
      setMessage({ text: "Connection error. Please try again.", type: "error" });
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f0f2f5" }}>
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Box text-align="center">
              <Typography variant="h4" fontWeight="bold" color="primary" align="center">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                {mode === "login" ? "Enter your credentials to access your account" : "Sign up to get started with Storm"}
              </Typography>
            </Box>

            {message.text && (
              <Alert severity={message.type === "error" ? "error" : "success"}>
                {message.text}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (mode === "login" ? "Login" : "Sign Up")}
              </Button>
              
              <Button
                fullWidth
                variant="text"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setMessage({ text: "", type: "" });
                }}
              >
                {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}