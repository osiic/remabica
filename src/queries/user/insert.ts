import { db } from "@/db";
import { usersTable, InsertUser } from "@/db/schema";

export async function insertUser(data: InsertUser) {
  const result = await db
    .insert(usersTable)
    .values({ ...data, updatedAt: new Date() })
    .returning();
  return result[0];
}
