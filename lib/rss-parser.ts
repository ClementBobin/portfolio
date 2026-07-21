import { XMLParser } from "fast-xml-parser";

interface RSSItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  author?: string;
  contentSnippet?: string;
  image?: string;
}

interface RSSFeed {
  url: string;
  title: string;
  items: RSSItem[];
  error?: string;
}

class RSSParser {
  private timeout: number;
  private parser: XMLParser;

  constructor(timeout: number = 10000) {
    this.timeout = timeout;
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseAttributeValue: true,
      trimValues: true,
      ignoreDeclaration: true,
    });
  }

  private extractImage(item: any): string | undefined {
    // Media RSS
    if (item["media:thumbnail"]?.url) return item["media:thumbnail"].url;
    if (item["media:content"]?.url) return item["media:content"].url;

    // Enclosure
    if (item.enclosure?.url && item.enclosure?.type?.startsWith("image")) {
      return item.enclosure.url;
    }

    // Fallback: extract first <img> from HTML
    const html = item["content:encoded"] || item.description;
    if (typeof html === "string") {
      const match = html.match(/<img[^>]+src="([^">]+)"/);
      if (match) return match[1];
    }

    return undefined;
  }

  private async fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; RSS-Server-Parser/1.0)",
          Accept: "application/rss+xml, application/xml, text/xml",
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private normalizeFeedData(parsedData: any): {
    title: string;
    items: RSSItem[];
  } {
    // Handle RSS format
    if (parsedData.rss?.channel) {
      const channel = parsedData.rss.channel;
      const items = Array.isArray(channel.item)
        ? channel.item
        : channel.item
          ? [channel.item]
          : [];

      return {
        title: channel.title || "Untitled",
        items: items.map((item: any) => ({
          title: item.title || "",
          link: item.link || "",
          description: item.description,
          pubDate: item.pubDate,
          author: item.author || item["dc:creator"],
          contentSnippet: item["content:encoded"] || item.description,
          image: this.extractImage(item),
        })),
      };
    }

    // Handle Atom format
    if (parsedData.feed) {
      const feed = parsedData.feed;
      const entries = Array.isArray(feed.entry)
        ? feed.entry
        : feed.entry
          ? [feed.entry]
          : [];

      return {
        title: feed.title || "Untitled",
        items: entries.map((entry: any) => {
          const link =
            typeof entry.link === "object"
              ? entry.link.href || entry.link["#text"]
              : entry.link;

          return {
            title: entry.title || "",
            link: link || "",
            description: entry.summary || entry.content,
            pubDate: entry.published || entry.updated,
            author:
              entry.author?.name ||
              (typeof entry.author === "string" ? entry.author : ""),
            contentSnippet: entry.summary || entry.content,
            image: this.extractImage(entry),
          };
        }),
      };
    }

    throw new Error("Unsupported feed format");
  }

  async parseURL(url: string): Promise<RSSFeed> {
    try {
      const response = await this.fetchWithTimeout(url);
      const xmlText = await response.text();
      const parsedData = this.parser.parse(xmlText);

      const { title, items } = this.normalizeFeedData(parsedData);

      return {
        url,
        title,
        items,
      };
    } catch (error) {
      return {
        url,
        title: "Failed to load",
        items: [],
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const rssParser = new RSSParser();

export { RSSParser };