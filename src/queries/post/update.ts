import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updatePost(
  id: number,
  data: Partial<{ title: string; content: string }>,
) {
  const result = await db
    .update(postsTable)
    .set({ ...data, updatedAt: new Date() }) // penting untuk update timestamp
    .where(eq(postsTable.id, id))
    .returning();
  return result[0];
}
