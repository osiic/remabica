import { NextResponse } from "next/server";
import { createPostSchema } from "@/schema/post";
import { insertPost } from "@/queries/post/insert";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createPostSchema.parse(body);

    await insertPost({
      title: validated.title,
      content: validated.content,
      userId: 2, // ⬅️ pastikan baris ini ada
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal" },
      { status: 400 },
    );
  }
}
