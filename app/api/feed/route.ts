import { rssParser } from "@/lib/rss-parser";

const DEFAULT_FEED = "https://clementbobin.github.io/obsidian/index.xml";

/**
 * GET /api/feed?url=<rss_url>
 * Proxies an RSS feed through the server to avoid CORS issues.
 * Falls back to the default Obsidian feed if no url param provided.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get("url") ?? DEFAULT_FEED;

  const feed = await rssParser.parseURL(feedUrl);

  if (feed.error) {
    return Response.json({ error: feed.error }, { status: 502 });
  }

  return Response.json(feed, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}