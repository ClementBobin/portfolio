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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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

  if (!graphData) {
    return (
      <div 
        ref={containerRef}
        className="w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center bg-muted/50 rounded-lg"
      >
        <p className="text-muted-foreground">Loading navigation graph...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden border bg-background/50 backdrop-blur-sm"
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObject={paintNode}
        onNodeClick={handleNodeClick}
        autoPauseRedraw={false}
        warmupTicks={100}
        cooldownTicks={100}
        d3VelocityDecay={0.3}
        d3AlphaDecay={0.02}
        linkColor={() => "rgba(148,163,184,0.3)"}
        linkWidth={1.5}
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
