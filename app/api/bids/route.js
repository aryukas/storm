import { NextResponse } from "next/server";
import { query } from "@/lib/db";

/* ================= GET BIDS ================= */
export async function GET() {
  try {
    const { rows } = await query(
      `
      SELECT 
        b.id,
        b.bidder_name,
        b.bid_amount,
        b.created_at,
        p.name AS product_name
      FROM bids b
      JOIN products p ON b.product_id = p.id
      ORDER BY b.created_at DESC
      `
    );

    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

/* ================= ADD BID ================= */
export async function POST(req) {
  try {
    const { product_id, bidder_name, bid_amount } = await req.json();

    if (!product_id || !bidder_name || !bid_amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* Optional: ensure bid is higher than current max */
    const { rows: maxBid } = await query(
      `SELECT MAX(bid_amount) AS max FROM bids WHERE product_id = $1`,
      [product_id]
    );

    if (maxBid[0].max && Number(bid_amount) <= Number(maxBid[0].max)) {
      return NextResponse.json(
        { error: "Bid must be higher than current highest bid" },
        { status: 400 }
      );
    }

    const { rows } = await query(
      `
      INSERT INTO bids (product_id, bidder_name, bid_amount)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [product_id, bidder_name, bid_amount]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
