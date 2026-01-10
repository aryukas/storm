"use client";

import { useState } from "react";

export default function HomePage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    setMsg("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, email, password })
    });

    const data = await res.json();
    if (!res.ok) setMsg(data.error);
    else setMsg("Success");
  }

  return (
    <main style={{ padding: 40 }}>
      <h2>{mode === "login" ? "Login" : "Signup"}</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />

      <button onClick={submit}>
        {mode === "login" ? "Login" : "Signup"}
      </button>

      <p style={{ color: "red" }}>{msg}</p>

      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        Switch to {mode === "login" ? "Signup" : "Login"}
      </button>
    </main>
  );
}
