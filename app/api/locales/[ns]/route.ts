import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ns: string }> }
) {
  const { ns } = await params;

  if (!/^[a-z0-9-]+$/i.test(ns)) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const filePath = join(process.cwd(), "public", "locales", `${ns}.json`);
    const content = readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({}, { status: 404 });
  }
}