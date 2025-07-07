"use client";
import React from "react";

export default function ChartReport() {
  const charts = [
    { label: "63% Generated Leads", percent: 63, color: "#ff4d4f" },
    { label: "32% Submitted Tickets", percent: 32, color: "#52c41a" },
    { label: "71% Server Allocation", percent: 71, color: "#1890ff" },
    { label: "41% Generated Leads", percent: 41, color: "#fa8c16" },
  ];

  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        padding: "1.5rem 1.5rem 0 1.5rem",
        borderRadius: "10px",
      }}
    >
      <h3 style={{ fontWeight: "bold", paddingBottom: "10px" }}>CHART REPORTS</h3>
      {charts.reduce((acc: any[][], val, i) => {
        const group = Math.floor(i / 2);
        acc[group] = acc[group] || [];
        acc[group].push(val);
        return acc;
      }, []).map((group, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "1rem", gap: "200px" }}>
          {group.map(({ label, percent, color }) => (
            <div key={label}>
              <p>{label}</p>
              <div style={{ width: "300px", background: "#ddd", borderRadius: "5px" }}>
                <div style={{ width: `${percent}%`, height: "10px", background: color, borderRadius: "5px" }}></div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <p style={{ color: "#fa8c16" }}>+17.5% increased server resources</p>
      <div style={{ width: "100%", marginTop: "1rem" }}>
        <img
          src="/chart-temp 1.svg"
          alt="Chart"
          style={{ width: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
    </div>
  );
}
