"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import type { GraphData, NodeObject } from "react-force-graph-2d";

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

export function MindmapNavigation() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ExtendedNodeObject | null>(
    null,
  );
  const pathname = usePathname();
  const router = useRouter();
  const fgRef = useRef<any>(null);

  // Load graph data from JSON
  useEffect(() => {
    fetch("/navigation-graph.json")
      .then((res) => res.json())
      .then((data: NavigationGraphData) => {
        setGraphData({
          nodes: data.nodes,
          links: data.links,
        });
      })
      .catch((err) => console.error("Failed to load navigation graph:", err));
  }, []);

  // Get the current path without locale
  const currentPath = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "/";
    // Remove locale (first segment) to get the actual path
    if (parts.length === 1 && parts[0].length === 2) return "/";
    return `/${parts.slice(1).join("/")}` || "/";
  }, [pathname]);

  // Handle node click for navigation
  const handleNodeClick = useCallback(
    (node: NodeObject) => {
      const extNode = node as ExtendedNodeObject;
      const nodeId = extNode.id as string;
      if (extNode.external) {
        // Open external links in a new tab
        window.open(nodeId, "_blank", "noopener,noreferrer");
      } else {
        // Navigate to internal routes
        const locale = pathname.split("/")[1];
        const targetPath = nodeId === "/" ? `/${locale}` : `/${locale}${nodeId}`;
        router.push(targetPath);
      }
    },
    [pathname, router],
  );

  // Custom node rendering with color based on current/visited state
  const paintNode = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D) => {
      const extNode = node as ExtendedNodeObject;
      const label = extNode.label || "";
      const nodeId = extNode.id as string;
      const isCurrent = nodeId === currentPath;
      const isVisited = sessionStorage.getItem(`visited_${nodeId}`) === "true";

      // Mark current path as visited
      if (isCurrent) {
        sessionStorage.setItem(`visited_${nodeId}`, "true");
      }

      // Node styling
      const size = isCurrent ? 8 : 6;
      const baseColor = extNode.color || "#94a3b8";

      // Determine node color
      let nodeColor = baseColor;
      if (isCurrent) {
        nodeColor = "#ef4444"; // Red for current page
      } else if (isVisited) {
        nodeColor = "#a78bfa"; // Purple for visited
      }

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x || 0, node.y || 0, size, 0, 2 * Math.PI);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Draw outer ring for current node
      if (isCurrent) {
        ctx.beginPath();
        ctx.arc(node.x || 0, node.y || 0, size + 2, 0, 2 * Math.PI);
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw label
      ctx.font = isCurrent ? "bold 12px Inter, sans-serif" : "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, node.x || 0, (node.y || 0) - size - 8);
    },
    [currentPath],
  );

  // Tooltip rendering
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
        <div style="color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">${extNode.id}</div>
        <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">${extNode.description}</div>
      </div>
    `;
  }, []);

  if (!graphData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Loading navigation graph...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border bg-background/50 backdrop-blur-sm">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel={nodeLabel}
        nodeCanvasObject={paintNode}
        onNodeClick={handleNodeClick}
        onNodeHover={(node) => setHoveredNode(node as ExtendedNodeObject)}
        linkColor={() => "rgba(148, 163, 184, 0.3)"}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        backgroundColor="transparent"
        cooldownTicks={100}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        nodeRelSize={6}
      />
    </div>
  );
}
