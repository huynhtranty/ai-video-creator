"use client";
import React from "react";

export default function StatisticHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <h1 style={{ color: "#000", fontSize: "2rem", fontWeight: "bold" }}>
        Thống kê
      </h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {["Từ ngày", "Đến ngày"].map((label, index) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ padding: "0.5rem", fontSize: "16px" }}>{label}</span>
            <input
              type="date"
              defaultValue={index === 0 ? "2025-03-01" : "2025-06-01"}
              style={{
                padding: "0.5rem 1rem",
                width: "350px",
                height: "50px",
                border: "2px solid transparent",
                borderRadius: "20px",
                outline: "none",
                fontSize: "16px",
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
