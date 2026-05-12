import "./legend.css";
import { EDGE_COLORS } from "./edges";

const LABELS: Record<string, string> = {
  married: "Married",
  family: "Family",
  siblings: "Siblings",
  sweetheart: "Sweetheart",
  crush: "Crush",
  best_friend: "Best Friend",
  friend: "Friend",
  acquaintance: "Acquaintance",
  ex_sweethearts: "Ex-Sweethearts",
  ex_friends: "Ex-Friends",
  stranger: "Stranger",
};

export const initLegend = () => {
  const legend = document.createElement("div");
  legend.id = "legend";

  const toggle = document.createElement("div");
  toggle.id = "legend-toggle";
  toggle.textContent = "?";

  const panel = document.createElement("div");
  panel.id = "legend-panel";

  const title = document.createElement("div");
  title.className = "legend-title";
  title.textContent = "Relationship Types";
  panel.appendChild(title);

  Object.entries(LABELS).forEach(([type, label]) => {
    const row = document.createElement("div");
    row.className = "legend-row";

    const dot = document.createElement("span");
    dot.className = "legend-dot";
    dot.style.background = EDGE_COLORS[type] ?? "#ccc";

    const text = document.createElement("span");
    text.textContent = label;

    row.appendChild(dot);
    row.appendChild(text);
    panel.appendChild(row);
  });

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    panel.classList.remove("open");
  });

  legend.appendChild(toggle);
  legend.appendChild(panel);
  document.body.appendChild(legend);
};
