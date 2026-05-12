import * as d3 from "d3";
import type { Relationship } from "../types/types";

export const EDGE_COLORS: Record<string, string | null> = {
  married: "#ffb3c6",
  family: "#ffb3c6",
  siblings: "#ffb3c6",
  sweetheart: "#ffb3c6",
  crush: "#ffb3c6",
  best_friend: "#ffd700",
  friend: "#b7e1cd",
  acquaintance: "#b4a7d6",
  ex_sweethearts: "#341539",
  ex_friends: "#341539",
  stranger: null,
};

export type EdgeDatum = {
  source: string;
  target: string;
  type: string;
};

export const buildEdgeData = (edges: Relationship[]): EdgeDatum[] =>
  edges.map((e) => ({ source: e.from, target: e.to, type: e.type }));

export const drawEdges = (
  svg: d3.Selection<SVGGElement | SVGSVGElement, unknown, HTMLElement, any>,
  edgeData: EdgeDatum[],
) => {
  const defs = svg.append("defs");

  Object.entries(EDGE_COLORS).forEach(([type, color]) => {
    if (!color) return;
    defs
      .append("marker")
      .attr("id", `arrow-${type}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", color);
  });

  return svg
    .append("g")
    .selectAll("path")
    .data(edgeData)
    .join("path")
    .attr("fill", "none")
    .attr("stroke", (d) => EDGE_COLORS[d.type] ?? "none")
    .attr("stroke-width", (d) => (d.type === "crush" ? 2.5 : 1.5))
    .attr("stroke-opacity", (d) => (d.type === "stranger" ? 0 : 0.8))
    .attr("marker-end", (d) =>
      d.type === "stranger" ? null : `url(#arrow-${d.type})`,
    );
};

export const updateEdgePaths = (
  edges: d3.Selection<SVGPathElement, EdgeDatum, SVGGElement, unknown>,
) => {
  edges.attr("d", (d: any) => {
    const sx = d.source.x;
    const sy = d.source.y;
    const tx = d.target.x;
    const ty = d.target.y;

    const dx = tx - sx;
    const dy = ty - sy;
    const len = Math.sqrt(dx * dx + dy * dy);

    // Shorten the end point so it stops at the node border not the center
    const NODE_W = 90;
    const NODE_H = 54;
    const padX = (NODE_W / 2 + 6) * (dx / len);
    const padY = (NODE_H / 2 + 6) * (dy / len);
    const ex = tx - padX;
    const ey = ty - padY;

    // Control point — perpendicular offset from midpoint
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;
    const offset = 40;
    const cx = mx - (dy / len) * offset;
    const cy = my + (dx / len) * offset;

    return `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
  });
};
