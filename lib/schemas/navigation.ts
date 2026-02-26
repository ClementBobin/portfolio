import { z } from "zod";
import { LocalizedStringSchema } from "./global";

export const NodeNavigationItemSchema = z.object({
  id: z.string(),
  label: LocalizedStringSchema,
  description: LocalizedStringSchema,
  color: z.string(),
  external: z.boolean().optional(),
});

export const NodeNavigationSchema = z.object({
  nodes: z.array(NodeNavigationItemSchema),
});

export type NodeNavigationItem = z.infer<typeof NodeNavigationItemSchema>;
export type NodeNavigation = z.infer<typeof NodeNavigationSchema>;
