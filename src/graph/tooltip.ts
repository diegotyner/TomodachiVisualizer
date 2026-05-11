import "./tooltip.css";
import type { Islander, Relationship } from "../types/types";
import { EDGE_COLORS } from "./edges";

const TYPE_LABELS: Record<string, string> = {
  crush: "crush", //💘",
  ultra_friend: "ultra friend", // ⭐",
  good_friend: "good friend", // 💚",
  indifferent: "indifferent", // 😐",
};

const el = document.createElement("div");
el.id = "tooltip";
document.body.appendChild(el);

export const showTooltip = (
  event: MouseEvent,
  d: Islander,
  allEdges: Relationship[],
) => {
  const outgoing = allEdges.filter(
    (e) => e.from === d.id && e.type !== "stranger",
  );

  const ranked = outgoing
    .filter((e) => e.rank !== null)
    .sort((a, b) => (a.rank as number) - (b.rank as number));

  const unranked = outgoing.filter((e) => e.rank === null);

  const makeRow = (e: Relationship, showRank: boolean) => {
    const color = EDGE_COLORS[e.type] ?? "#ccc";
    const rank = showRank
      ? `<span class="tooltip-rank">#${e.rank}</span>`
      : `<span class="tooltip-rank" style="visibility:hidden">#0</span>`;
    return `
      <div class="tooltip-row">
        ${rank}
        <span class="tooltip-dot" style="background:${color}"></span>
        <span>${e.to} — ${TYPE_LABELS[e.type] ?? e.type}</span>
      </div>`;
  };

  const rankedHTML = ranked.map((e) => makeRow(e, true)).join("");
  const dividerHTML =
    ranked.length && unranked.length ? `<hr class="tooltip-divider">` : "";
  const unrankedHTML = unranked.map((e) => makeRow(e, false)).join("");

  const emptyHTML = !outgoing.length
    ? `<div style="color:#aaa; font-size:12px">no notable relationships</div>`
    : "";

  el.innerHTML = `
    <div class="tooltip-name">${d.emoji} ${d.name}</div>
    ${rankedHTML}
    ${dividerHTML}
    ${unrankedHTML}
    ${emptyHTML}
  `;

  positionTooltip(event);
  el.style.opacity = "1";
};

export const moveTooltip = (event: MouseEvent) => {
  positionTooltip(event);
};

export const hideTooltip = () => {
  el.style.opacity = "0";
};

const positionTooltip = (event: MouseEvent) => {
  const pad = 14;
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  // flip left if too close to right edge, flip up if too close to bottom
  const x =
    event.clientX + pad + w > window.innerWidth
      ? event.clientX - w - pad
      : event.clientX + pad;

  const y =
    event.clientY + pad + h > window.innerHeight
      ? event.clientY - h - pad
      : event.clientY + pad;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
};
