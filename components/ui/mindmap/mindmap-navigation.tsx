"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GraphData, NodeObject } from "react-force-graph-2d";
import type {
  NodeNavigationItem,
  NodeNavigation,
} from "@/lib/types/navigation";
import type { LocalizedString } from "@/lib/types/global";
import { fetchWithCache } from "@/lib/cache";

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface NavigationNode {
  id: string;
  label: string;
  description: string;
  color: string;
  external?: boolean;
}

interface NavigationLink {
  source: string;
  target: string;
}

interface NavigationGraphData {
  nodes: NavigationNode[];
  links: NavigationLink[];
}

interface ExtendedNodeObject extends NodeObject {
  id: string;
  label: string;
  description: string;
  color: string;
  external?: boolean;
}

// Local nodes configuration
const LOCAL_NODES: NodeNavigationItem[] = [
  {
    id: "/",
    label: { en: "Home", fr: "Accueil" },
    description: {
      en: "Portfolio home page with overview of projects and skills",
      fr: "Page d'accueil du portfolio avec un aperçu des projets et des compétences",
    },
    color: "#8b5cf6",
  },
  {
    id: "/projects",
    label: { en: "Projects", fr: "Projets" },
    description: {
      en: "GitHub projects and open source contributions",
      fr: "Projets GitHub et contributions open source",
    },
    color: "#3b82f6",
  },
  {
    id: "/rss",
    label: { en: "RSS Feed", fr: "Flux RSS" },
    description: {
      en: "Latest blog posts and updates from my Obsidian notes",
      fr: "Derniers articles de blog et mises à jour de mes notes Obsidian",
    },
    color: "#10b981",
  },
];

// Helper function to get localized string
function getLocalizedString(
  localizedStr: LocalizedString,
  locale: string
): string {
  // Try exact locale match (e.g., "en-US")
  if (localizedStr[locale]) {
    return localizedStr[locale];
  }
  
  // Try language code only (e.g., "en" from "en-US")
  const langCode = locale.split("-")[0];
  if (localizedStr[langCode]) {
    return localizedStr[langCode];
  }
  
  // Fallback to English
  if (localizedStr.en) {
    return localizedStr.en;
  }
  
  // Return first available value
  const values = Object.values(localizedStr);
  return (values[0] as string) || "";
}

// Helper function to convert localized nodes to navigation nodes
function convertToNavigationNodes(
  apiNodes: NodeNavigationItem[],
  locale: string
): NavigationNode[] {
  return apiNodes.map((node) => ({
    id: node.id,
    label: getLocalizedString(node.label, locale),
    description: getLocalizedString(node.description, locale),
    color: node.color,
    external: node.external,
  }));
}

// Helper function to generate links between nodes
function generateLinks(
  localNodes: NavigationNode[],
  externalNodes: NavigationNode[]
): NavigationLink[] {
  const links: NavigationLink[] = [];
  const mainNode = localNodes.find((node) => node.id === "/");
  
  if (!mainNode) return links;
  
  // Link all local nodes to each other
  for (const node of localNodes) {
    if (node.id !== "/") {
      // Link node to home
      links.push({ source: node.id, target: "/" });
      // Link home to node
      links.push({ source: "/", target: node.id });
      
      // Link to other local nodes
      for (const otherNode of localNodes) {
        if (otherNode.id !== "/" && otherNode.id !== node.id) {
          links.push({ source: node.id, target: otherNode.id });
        }
      }
    }
  }
  
  // Link main node to all external nodes
  for (const extNode of externalNodes) {
    links.push({ source: "/", target: extNode.id });
    links.push({ source: extNode.id, target: "/" });
  }
  
  return links;
}

export function MindmapNavigation() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const pathname = usePathname();
  const router = useRouter();
  const fgRef = useRef<any>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load graph data from API and merge with local nodes
  useEffect(() => {
    const loadGraphData = async () => {
      try {
        // Get current locale from pathname
        const locale = pathname.split("/")[1] || "en-US";
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

        // Build locale-aware local nodes, prefixing with NEXT_PUBLIC_SITE_URL when set.
        const localNodesWithUrl: NodeNavigationItem[] = LOCAL_NODES.map(
          (node) => ({
            ...node,
            id: siteUrl
              ? node.id === "/"
                ? `${siteUrl}/${locale}`
                : `${siteUrl}/${locale}${node.id}`
              : node.id,
          }),
        );

        // Fetch external nodes from API (in-memory cached).
        const apiUrl = process.env.NEXT_PUBLIC_MIRAGE_API_URL;
        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_MIRAGE_API_URL is not set");
        }
        const remoteUrl = `${apiUrl}/config/navigation`;
        const apiData = await fetchWithCache<NodeNavigation>(
          remoteUrl,
          () =>
            fetch(remoteUrl).then((res) => {
              if (!res.ok)
                throw new Error(
                  `Failed to fetch navigation from ${remoteUrl}: ${res.status} ${res.statusText}`,
                );
              return res.json() as Promise<NodeNavigation>;
            }),
        );
        
        // Mark external nodes
        const externalNodesWithFlag: NodeNavigationItem[] = apiData.nodes.map(
          (node: NodeNavigationItem) => ({
            ...node,
            external: true,
          }),
        );

        // Convert both local and external nodes to navigation format
        const localNodesConverted = convertToNavigationNodes(
          localNodesWithUrl,
          locale,
        );
        const externalNodesConverted = convertToNavigationNodes(
          externalNodesWithFlag,
          locale,
        );

        // Combine all nodes
        const allNodes = [...localNodesConverted, ...externalNodesConverted];

        // Generate links
        const links = generateLinks(localNodesConverted, externalNodesConverted);

        setGraphData({
          nodes: allNodes,
          links: links,
        });
      } catch (err) {
        console.error("Failed to load navigation graph:", err);

        // Fallback to local nodes only
        const locale = pathname.split("/")[1] || "en-US";
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
        const fallbackNodes: NodeNavigationItem[] = LOCAL_NODES.map((node) => ({
          ...node,
          id: siteUrl
            ? node.id === "/"
              ? `${siteUrl}/${locale}`
              : `${siteUrl}/${locale}${node.id}`
            : node.id,
        }));
        const localNodesConverted = convertToNavigationNodes(
          fallbackNodes,
          locale,
        );
        const links = generateLinks(localNodesConverted, []);

        setGraphData({
          nodes: localNodesConverted,
          links: links,
        });
      }
    };
    
    loadGraphData();
  }, [pathname]);

  // Center the graph after it's loaded and positioned
  useEffect(() => {
    if (graphData && fgRef.current) {
      // Wait for the simulation to stabilize, then center the view
      const timer = setTimeout(() => {
        if (fgRef.current) {
          fgRef.current.zoomToFit(600, 80);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [graphData]);

  // Handle container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: width || 800,
          height: height || Math.min(500, Math.max(300, width * 0.5))
        });
      }
    };

    // Initial size
    updateDimensions();

    // Listen for window resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle node click for navigation
  const handleNodeClick = useCallback(
    (node: NodeObject) => {
      const extNode = node as ExtendedNodeObject;
      const nodeId = extNode.id as string;
      if (extNode.external) {
        // Open external links in a new tab
        window.open(nodeId, "_blank", "noopener,noreferrer");
      } else {
        // Navigate to internal routes.
        // When NEXT_PUBLIC_SITE_URL is set the nodeId is already a full URL.
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        if (siteUrl && nodeId.startsWith(siteUrl)) {
          window.location.href = nodeId;
        } else {
          const locale = pathname.split("/")[1];
          const targetPath =
            nodeId === "/" ? `/${locale}` : `/${locale}${nodeId}`;
          router.push(targetPath);
        }
      }
    },
    [pathname, router],
  );

  // Custom node rendering with color based on current/visited state
  const paintNode = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as ExtendedNodeObject;
      if (!node.x || !node.y) return;

      const x = node.x;
      const y = node.y;
      const size = 8 / globalScale;
      const label = n.label ?? "";

      // Draw node circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = n.color ?? "#94a3b8";
      ctx.fill();

      // Draw text label below node
      const fontSize = 12 / globalScale;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const textY = y + size + 4;

      // White outline for better readability
      ctx.lineWidth = 3 / globalScale;
      ctx.strokeStyle = "white";
      ctx.strokeText(label, x, textY);

      // Black text
      ctx.fillStyle = "#000";
      ctx.fillText(label, x, textY);
    },
    [],
  );

  // Tooltip rendering for nodes
  const nodeLabel = useCallback((node: NodeObject) => {
    const extNode = node as ExtendedNodeObject;
    return `
      <div style="
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        max-width: 200px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      ">
        <div style="font-weight: bold; margin-bottom: 4px;">${extNode.label}</div>
        <div style="color: rgba(255, 255, 255, 0.7); margin-bottom: 4px; font-size: 11px;">${extNode.id}</div>
        <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">${extNode.description}</div>
      </div>
    `;
  }, []);

  if (!graphData) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-muted/50 rounded-lg"
      >
        <p className="text-muted-foreground">Loading navigation graph...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg overflow-hidden border bg-background/50 backdrop-blur-sm"
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObject={paintNode}
        nodeLabel={nodeLabel}
        onNodeClick={handleNodeClick}
        autoPauseRedraw={false}
        warmupTicks={100}
        cooldownTicks={100}
        d3VelocityDecay={0.3}
        d3AlphaDecay={0.02}
        linkColor={() => "rgba(148,163,184,0.3)"}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        onEngineStop={() => {
          if (fgRef.current) {
            // Center the graph with generous padding when simulation stops
            fgRef.current.zoomToFit(600, 80);
          }
        }}
        backgroundColor="transparent"
        enableZoomInteraction={true}
        enablePanInteraction={true}
        nodeRelSize={4}
      />
    </div>
  );
}
