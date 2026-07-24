/**
 * GET /api/contributions
 * Returns private/non-showable contributions with metadata.
 */
export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/contributions`);
      if (res.ok) return Response.json(await res.json());
    } catch { /* fall through */ }
  }

  return Response.json({ error: "Unable to fetch contributions" }, { status: 500 });
}