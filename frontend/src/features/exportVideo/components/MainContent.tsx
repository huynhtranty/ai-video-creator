// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\exportVideo\components\MainContent.tsx
"use client";

import React from "react";
// Make sure PlayerSection.tsx exists in the same folder, or update the path if needed
import PlayerSection from "./PlayerSection";
import ActionButtons from "./ActionButtons";

const MainContent = () => {
  return (
    <main
      style={{
        flex: 1,
        padding: "0 0 20px 20px",
        background: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="/TaskFunction.svg"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div
        style={{
          width: "90%",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <PlayerSection />
          <ActionButtons />
        </div>
      </div>
    </main>
  );
};

export default MainContent;