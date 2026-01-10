import { query } from "@/lib/db";

export async function GET() {
  const res = await query("SELECT NOW()");
  return Response.json({ time: res.rows[0].now });
}
