import type { GraphData } from "../types/types";

const testData: GraphData = {
  nodes: [
    { id: "diego", name: "Diego", color: "#FF6B6B", emoji: "🏀" },
    { id: "kevin", name: "Kevin", color: "#A8E6CF", emoji: "🦔" },
    { id: "alex", name: "Alex", color: "#EEE60F", emoji: "🎧" },
    { id: "marco", name: "Marco", color: "#c7e881", emoji: "🐋" },
  ],
  edges: [
    { from: "diego", to: "kevin", type: "stranger", rank: null },
    { from: "diego", to: "alex", type: "crush", rank: 2 },
    { from: "kevin", to: "diego", type: "stranger", rank: null },
    { from: "kevin", to: "alex", type: "stranger", rank: null },
    { from: "alex", to: "diego", type: "stranger", rank: null },
    { from: "alex", to: "kevin", type: "good_friend", rank: 3 },
    { from: "marco", to: "diego", type: "indifferent", rank: 1 },
    { from: "diego", to: "marco", type: "crush", rank: null },
    { from: "marco", to: "kevin", type: "stranger", rank: null },
    { from: "kevin", to: "marco", type: "ultra_friend", rank: 2 },
    { from: "marco", to: "alex", type: "stranger", rank: null },
    { from: "alex", to: "marco", type: "stranger", rank: null },
  ],
};

export default testData;
