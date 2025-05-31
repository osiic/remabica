import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllPosts() {
  return await db.select().from(postsTable);
}

export async function getPostById(id: number) {
  const result = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, id));
  return result[0];
}
