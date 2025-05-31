import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(id: number) {
  const result = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning();
  return result[0];
}
