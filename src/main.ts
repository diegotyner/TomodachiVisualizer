import "./index.css";
import * as d3 from "d3";
import testData from "./data/testData";
import { buildEdgeData, drawEdges, updateEdgePaths } from "./graph/edges";
import { drawNodes } from "./graph/nodes";
import { createSimulation } from "./graph/simulation";
import { initLegend } from "./graph/legend";

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("cursor", "grab");

const container = svg.append("g").attr("id", "container");
const zoom = d3
  .zoom<SVGSVGElement, unknown>()
  .scaleExtent([0.2, 4]) // min 20% zoom, max 400%
  .on("zoom", (event) => {
    container.attr("transform", event.transform);
  });

svg.call(zoom);
svg
  .on("mousedown", () => svg.style("cursor", "grabbing"))
  .on("mouseup", () => svg.style("cursor", "grab"));

initLegend();

const edgeData = buildEdgeData(testData.edges);
const simulation = createSimulation(testData.nodes, edgeData, width, height);
const edges = drawEdges(container as any, edgeData); // edges drawn first = behind nodes
const nodes = drawNodes(
  container as any,
  testData.nodes,
  simulation,
  testData.edges,
);

simulation.on("tick", () => {
  updateEdgePaths(edges as any);
  nodes.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
});
