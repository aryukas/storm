import { NextResponse } from "next/server";
import { query } from "@/lib/db";

/* ================= GET PRODUCTS ================= */
export async function GET() {
  try {
    const { rows } = await query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

/* ================= ADD PRODUCT ================= */
export async function POST(req) {
  try {
    const { name, price, quantity } = await req.json();

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price required" },
        { status: 400 }
      );
    }

    const { rows } = await query(
      `INSERT INTO products (name, price, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, price, quantity || 0]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
