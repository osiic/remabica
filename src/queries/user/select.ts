import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllUsers() {
  return await db.select().from(usersTable);
}

export async function getUserById(id: number) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  return result[0];
}

export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return result[0];
}
