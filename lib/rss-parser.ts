import { XMLParser } from "fast-xml-parser";

interface RSSItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  author?: string;
  contentSnippet?: string;
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

  async parseMultipleFeeds(
    feedUrls: string[],
    maxItems: number = 5,
  ): Promise<RSSFeed[]> {
    const promises = feedUrls.map(async (url) => {
      try {
        const result = await this.parseURL(url);
        return {
          ...result,
          items: result.items.slice(0, maxItems),
        };
      } catch (error) {
        console.error(`Failed to parse feed: ${url}`, error);
        return {
          url,
          title: "Failed to load",
          items: [],
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    return Promise.all(promises);
  }
}

// Export a singleton instance
export const rssParser = new RSSParser();

export { RSSParser };
