import { db } from "@/db";
import { postsTable, InsertPost } from "@/db/schema";

export async function insertPost(data: InsertPost) {

  const result = await db
    .insert(postsTable)
    .values({ ...data, updatedAt: new Date() }) // ✅ new Date(), bukan new date()
    .returning();

  return result[0];
}
