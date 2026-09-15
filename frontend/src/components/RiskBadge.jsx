import React from "react";

export function RiskBadge({ level }) {
  const norm = String(level || "LOW").toLowerCase();
  
  let badgeClass = "low";
  let label = "LOW";

  if (norm.includes("crit") || norm.includes("high")) {
    badgeClass = "high";
    label = norm.includes("crit") ? "CRITICAL" : "HIGH";
  } else if (norm.includes("med") || norm.includes("warn")) {
    badgeClass = "medium";
    label = "MEDIUM";
  } else {
    badgeClass = "low";
    label = "LOW";
  }

  return (
    <span className={`risk-badge ${badgeClass}`}>
      <span>●</span>
      <span>{label}</span>
    </span>
  );
}
