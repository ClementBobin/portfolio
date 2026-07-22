/**
 * GET /api/contributions
 * Returns private/non-showable contributions with metadata.
 */
export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/contributions`, { next: { revalidate: 3600 } });
      if (res.ok) return Response.json(await res.json(), {
        headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
      });
    } catch { /* fall through */ }
  }

  return Response.json({ error: "Unable to fetch contributions" }, { status: 500 });
}