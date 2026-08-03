import "server-only";

export interface TechColorEntry {
  color: string;
  icon: string;
  iconHref?: string;
}

export async function getTechColors(): Promise<
  Record<string, TechColorEntry>
> {
  const apiUrl = process.env.RESSOURCE_API_URL;

  if (!apiUrl) {
    return {};
  }

  try {
    const res = await fetch(`${apiUrl}/config/techColors`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return {};
    }

    const raw = (await res.json()) as Record<string, TechColorEntry>;

    return Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k.toLowerCase(), v]),
    );
  } catch {
    return {};
  }
}
