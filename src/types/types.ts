export interface Islander {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export type RelationshipType =
  | "married"
  | "family"
  | "siblings"
  | "sweetheart"
  | "crush"
  | "best_friend"
  | "friend"
  | "acquaintance"
  | "ex_sweethearts"
  | "ex_friends"
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
