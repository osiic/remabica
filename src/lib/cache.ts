import redis from "./redis";

// Cara Pakai
// import { getOrSetCache } from "@/lib/cache";

// export async function GET() {
//   const data = await getOrSetCache("some-key", async () => {
//     const res = await fetch("https://api.example.com");
//     return res.json();
//   });

//   return Response.json(data);
// }

const DEFAULT_EXPIRATION = 3600; // 1 jam

export async function getOrSetCache<T>(
  key: string,
  cb: () => Promise<T>,
  expiration: number = DEFAULT_EXPIRATION,
): Promise<T> {
  const cached = await redis.get(key);
  if (cached !== null) {
    try {
      return JSON.parse(cached) as T;
    } catch (e) {
      console.error("❗ Cache JSON parse error:", e);
    }
  }

  const fresh = await cb();
  await redis.set(key, JSON.stringify(fresh), "EX", expiration);
  return fresh;
}

export async function invalidateCache(key: string) {
  await redis.del(key);
}
