import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  // Clear the session cookie
  cookieStore.set("session", "", { 
    maxAge: 0, 
    path: "/" 
  });

  return NextResponse.json({ success: true });
}