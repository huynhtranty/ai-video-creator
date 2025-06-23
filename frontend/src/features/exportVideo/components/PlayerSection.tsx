// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\exportVideo\components\PlayerSection.tsx
"use client";

import React from "react";

const PlayerSection = () => {
  return (
    <div
      style={{
        flex: "0 0 80%",
        fontSize: "16px",
        fontWeight: "500",
      }}
    >
      <div
        style={{
          background: "#fff",
          paddingBottom: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(to bottom, #BA85FB, #ffffff)",
            padding: "5px 5px 5px 15px",
            marginBottom: "10px",
          }}
        >
          Player
        </div>
        <img
          src="/Screen.svg"
          alt="House"
          style={{
            width: "90%",
            borderRadius: "5px",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
      <div
        style={{
          background: "linear-gradient(to bottom, #BA85FB, #ffffff)",
          padding: "8px 8px 8px 15px",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      >
        Project Name
      </div>
    </div>
  );
};

export default PlayerSection;