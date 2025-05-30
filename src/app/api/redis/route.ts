import { NextResponse } from "next/server";
import { getOrSetCache } from "@/lib/cache";

export async function GET() {
  const data = await getOrSetCache("redis", async () => {
    const res = "Hello from Redis!";
    return res;
  });

  return NextResponse.json({ message: data });
}
