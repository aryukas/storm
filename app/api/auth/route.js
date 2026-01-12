import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { cookies } from "next/headers";

export async function POST(req) {
  const { mode, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const cleanEmail = email.toLowerCase();

  // ---------- SIGNUP ----------
  if (mode === "signup") {
    const hashed = await hashPassword(password);

    try {
      await query(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)`,
        [cleanEmail, hashed]
      );
    } catch {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true });
  }

  // ---------- LOGIN ----------
  if (mode === "login") {
    const res = await query(
      `SELECT id, password_hash, is_active
       FROM users WHERE email = $1`,
      [cleanEmail]
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = res.rows[0];

    if (!user.is_active) {
      return NextResponse.json({ error: "Account disabled" }, { status: 403 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ FIX: Await cookies() before using .set()
    const cookieStore = await cookies();
    cookieStore.set("session", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Better for local development
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
}