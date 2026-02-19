"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });
  const pathname = usePathname();
  const router = useRouter();
  const fgRef = useRef<any>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: width || 800, height: 400 });
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
        // Navigate to internal routes
        const locale = pathname.split("/")[1];
        const targetPath =
          nodeId === "/" ? `/${locale}` : `/${locale}${nodeId}`;
        router.push(targetPath);
      }
    },
    [pathname, router],
  );

  // Custom node rendering with color based on current/visited state
  const paintNode = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as ExtendedNodeObject;
      if (!node.x || !node.y) return;

      // ---- RESET TRANSFORM (CRITICAL) ----
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const x = node.x;
      const y = node.y;
      const size = 6;
      const label = n.label ?? "";

      // ---- NODE ----
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = n.color ?? "#94a3b8";
      ctx.fill();

      // ---- TEXT ----
      const fontSize = Math.max(10, 14 / globalScale);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const textY = y + size + 2;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.strokeText(label, x, textY);

      ctx.fillStyle = "#000";
      ctx.fillText(label, x, textY);

      ctx.restore();
    },
    [],
  );

  if (!graphData) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-[400px] flex items-center justify-center bg-muted/50 rounded-lg"
      >
        <p className="text-muted-foreground">Loading navigation graph...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-[400px] rounded-lg overflow-hidden border bg-background/50 backdrop-blur-sm"
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObject={paintNode}
        onNodeClick={handleNodeClick}
        autoPauseRedraw={false}
        warmupTicks={120}
        d3VelocityDecay={0.3}
        linkColor={() => "rgba(148,163,184,0.3)"}
        onEngineStop={() => fgRef.current?.zoomToFit(300, 40)}
        backgroundColor="transparent"
      />
    </div>
  );
}
