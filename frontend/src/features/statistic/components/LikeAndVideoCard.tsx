"use client";
import React from "react";

export default function LikeAndVideoCard() {
  return (
    <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
      {/* Likes */}
      <div
        style={{
          flex: 1,
          padding: "1.5rem",
          borderRadius: "12px",
          background: "linear-gradient(to bottom, #00CFFF 0%, #FAF3F3 70%, #FAF3F3 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
          Tổng số lượt thích trên các nền tảng
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/Like-Statistic.svg" alt="Like icon" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000" }}>10K</span>
        </div>
      </div>

      {/* Video Count */}
      <div
        style={{
          flex: 1,
          padding: "1.5rem",
          borderRadius: "12px",
          background: "linear-gradient(to bottom, #D9D9C8 0%, #FAF3F3 70%, #FAF3F3 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
          Tổng số Video trên các nền tảng
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/Video-Statistic.svg" alt="Video icon" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000" }}>10K</span>
        </div>
      </div>
    </div>
  );
}
