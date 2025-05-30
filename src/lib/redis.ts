import Redis from "ioredis";

// Gunakan TLS kalau pakai Upstash
const redis = new Redis(process.env.REDIS_URL!, {
  tls: {}, // aman untuk production
});

export default redis;
