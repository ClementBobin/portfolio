export async function fetchGitHubProjects() {
  const [personal, org] = await Promise.all([
    fetch("https://api.github.com/users/clementbobin/repos?sort=updated&direction=desc", {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    }),
    fetch("https://api.github.com/search/repositories?q=user:Latitude-OpenDATA-SIO-Saintbe", {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    }),
  ]);

  if (!personal.ok || !org.ok) {
    throw new Error("Failed to fetch GitHub projects");
  }

  return {
    personal: await personal.json(),
    org: (await org.json()).items ?? [],
  };
}