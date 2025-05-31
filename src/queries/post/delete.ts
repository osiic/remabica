import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deletePost(id: number) {
  const result = await db
    .delete(postsTable)
    .where(eq(postsTable.id, id))
    .returning();
  return result[0];
}
