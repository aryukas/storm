import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing");
}

/* -------------------------------------------------
   Singleton Pool (VERY IMPORTANT for Next.js)
-------------------------------------------------- */
let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for Supabase
    },
    max: 10,                     // connection limit
    idleTimeoutMillis: 30000,    // close idle clients
    connectionTimeoutMillis: 5000,
  });
}

pool = global._pgPool;

/* -------------------------------------------------
   Query Helper
-------------------------------------------------- */
export async function query(text, params = []) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error("❌ DB QUERY ERROR:", {
      text,
      params,
      message: err.message,
    });
    throw err;
  }
}
