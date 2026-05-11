import * as d3 from "d3";
import type { Islander } from "../types/types";
import type { EdgeDatum } from "./edges";

export const createSimulation = (
  nodes: Islander[],
  edges: EdgeDatum[],
  width: number,
  height: number,
) =>
  d3
    .forceSimulation(nodes as any)
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "link",
      d3
        .forceLink(edges)
        .id((d: any) => d.id)
        .distance(150),
    );
