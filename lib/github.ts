import type { GitHubProjectsResponse, GitHubRepository } from "@/lib/types/projects-api";

/**
 * Fetches GitHub projects from both personal and organization repositories.
 *
 * @returns Promise resolving to an object containing personal and org repositories
 * @throws Error if the API requests fail
 */
export async function fetchGitHubProjects(): Promise<GitHubProjectsResponse> {
  const [personal, org] = await Promise.all([
    fetch(
      "https://api.github.com/users/clementbobin/repos?sort=updated&direction=desc",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    ),
    fetch(
      "https://api.github.com/search/repositories?q=user:Latitude-OpenDATA-SIO-Saintbe",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    ),
  ]);

  if (!personal.ok || !org.ok) {
    throw new Error("Failed to fetch GitHub projects");
  }

  const personalData: GitHubRepository[] = await personal.json();
  const orgData: { items: GitHubRepository[] } = await org.json();

  return {
    personal: personalData,
    org: orgData.items ?? [],
  };
}
