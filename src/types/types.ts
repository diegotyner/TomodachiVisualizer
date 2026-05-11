export interface Islander {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export type RelationshipType =
  | "crush"
  | "ultra_friend"
  | "good_friend"
  | "indifferent"
  | "stranger";

export interface Relationship {
  from: string;
  to: string;
  type: RelationshipType;
  rank: 1 | 2 | 3 | null;
}

export interface GraphData {
  nodes: Islander[];
  edges: Relationship[];
}
