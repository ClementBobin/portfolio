import type { LocalizedString } from "./global";

/**
 * Represents a single navigation item
 */
export type NodeNavigationItem = {
  id: string;
  label: LocalizedString;
  description: LocalizedString;
  color: string;
  external?: boolean;
};

/**
 * Represents a collection of navigation items
 */
export type NodeNavigation = {
  nodes: NodeNavigationItem[];
};
