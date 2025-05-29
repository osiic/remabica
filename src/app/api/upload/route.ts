import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const OWNER = process.env.OWNER ?? "";
const REPO = process.env.REPO ?? "";
const BRANCH = process.env.BRANCH ?? "main"; // default ke main kalau kosong

function addTimestampToFilename(filename: string): string {
  const date = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  const timestamp = `${yyyy}${mm}${dd}T${hh}${min}${ss}`;

  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return `${filename}-${timestamp}`;
  const name = filename.slice(0, lastDot);
  const ext = filename.slice(lastDot);

  return `${name}-${timestamp}${ext}`;
}

async function uploadToGitHub(
  filename: string,
  contentBase64: string,
): Promise<string> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/uploads/${filename}`;

  const body = {
    message: `Upload ${filename}`,
    content: contentBase64,
    branch: BRANCH,
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub upload failed: ${err}`);
  }

  const json = (await res.json()) as { content: { download_url: string } };
  return json.content.download_url;
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Upload API running" });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 },
      );
    }

    const newFilename = addTimestampToFilename(file.name);
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const url = await uploadToGitHub(newFilename, base64);

    return NextResponse.json({ url, filename: newFilename }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
