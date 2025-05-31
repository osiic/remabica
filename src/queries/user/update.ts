import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUser(
  id: number,
  data: Partial<{ name: string; email: string; password: string }>,
) {
  const result = await db
    .update(usersTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(usersTable.id, id))
    .returning();
  return result[0];
}
