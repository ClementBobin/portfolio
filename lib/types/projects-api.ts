/**
 * Type definitions for the portfolio application.
 * Following KDoc-style documentation for TypeScript types.
 */

/**
 * Represents a GitHub repository with relevant metadata.
 *
 * @property id - Unique identifier for the repository
 * @property name - Name of the repository
 * @property full_name - Full name including owner (e.g., "owner/repo")
 * @property description - Optional description of the repository
 * @property html_url - URL to view the repository on GitHub
 * @property created_at - ISO 8601 timestamp of repository creation
 * @property updated_at - ISO 8601 timestamp of last update
 * @property pushed_at - ISO 8601 timestamp of last push
 * @property language - Primary programming language used
 * @property stargazers_count - Number of stars the repository has
 * @property forks_count - Number of times the repository has been forked
 * @property open_issues_count - Number of open issues
 * @property visibility - Repository visibility (public, private, etc.)
 * @property owner - Information about the repository owner
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  visibility: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

/**
 * Response structure from GitHub API for fetching repositories.
 *
 * @property personal - Array of personal repositories
 * @property org - Array of organization repositories
 */
export interface GitHubProjectsResponse {
  personal: GitHubRepository[];
  org: GitHubRepository[];
}

/**
 * Structure for projects grouped by year and month.
 *
 * @example
 * {
 *   "2024": {
 *     "January": [repo1, repo2],
 *     "February": [repo3]
 *   }
 * }
 */
export type GroupedProjects = Record<
  string,
  Record<string, GitHubRepository[]>
>;
