import * as d3 from "d3";
import type { Islander } from "../types/types";
import type { createSimulation } from "./simulation";
import { showTooltip, moveTooltip, hideTooltip } from "./tooltip";
import type { Relationship } from "../types/types";

export const NODE_W = 90;
export const NODE_H = 54;

type Simulation = ReturnType<typeof createSimulation>;

export const drawNodes = (
  svg: d3.Selection<SVGGElement | SVGSVGElement, unknown, HTMLElement, any>,
  nodeData: Islander[],
  simulation: Simulation,
  allEdges: Relationship[],
) => {
  const drag = d3
    .drag<SVGGElement, any>()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, _) => {
      if (!event.active) simulation.alphaTarget(0);
      // keep fx/fy set — node stays pinned where you dropped it
    });

  const nodes = svg
    .append("g")
    .selectAll<SVGGElement, Islander>("g")
    .data(nodeData)
    .join("g")
    .call(drag)
    .on("mouseenter", (event: MouseEvent, d: Islander) =>
      showTooltip(event, d, allEdges),
    )
    .on("mousemove", (event: MouseEvent) => moveTooltip(event))
    .on("mouseleave", () => hideTooltip());

  // rest of your rect + text appends unchanged
  nodes
    .append("rect")
    .attr("width", NODE_W)
    .attr("height", NODE_H)
    .attr("x", -NODE_W / 2)
    .attr("y", -NODE_H / 2)
    .attr("rx", 12)
    .attr("ry", 12)
    .attr("fill", (d) => d.color)
    .attr("stroke", "#fff")
    .attr("stroke-width", 3);

  nodes
    .append("text")
    .text((d) => d.emoji)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("y", -8)
    .attr("font-size", 18)
    .style("user-select", "none");

  nodes
    .append("text")
    .text((d) => d.name)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("y", 14)
    .attr("font-size", 12)
    .attr("font-family", "Fredoka One, cursive")
    .attr("fill", "#333")
    .style("user-select", "none");

  return nodes;
};
