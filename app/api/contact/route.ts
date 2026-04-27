import type { NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await post(`${apiUrl}/contact`, { next: { revalidate: 3600 } });
    } catch {
      /* fall through */
    }
  }
}