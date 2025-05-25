import { eq } from 'drizzle-orm';
import { db } from '../db';
import { SelectPost, postsTable } from '@/db/schema';

export async function updatePost(id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}

