// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\projects\components\video-detail\SocialButtons.tsx
"use client";

import React, { useState } from "react";

const SocialButtons = () => {
  const [activeButton, setActiveButton] = useState("tiktok");

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  return (
    <div
      style={{
        width: "60px",
        background: "#D3D3D3",
        padding: "0.5rem 0",
        borderRadius: "10px 0 0 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => handleButtonClick("tiktok")}
        style={{
          background: activeButton === "tiktok" ? "#FFFFFF" : "transparent",
          border: "none",
          padding: "0",
          cursor: "pointer",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background 0.3s ease",
        }}
      >
        <img src="/tiktok-icon.svg" alt="TikTok" style={{ width: "48px", height: "48px" }} />
      </button>
      <button
        onClick={() => handleButtonClick("facebook")}
        style={{
          background: activeButton === "facebook" ? "#FFFFFF" : "transparent",
          border: "none",
          padding: "0",
          cursor: "pointer",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background 0.3s ease",
        }}
      >
        <img src="/facebook-icon.svg" alt="Facebook" style={{ width: "48px", height: "48px" }} />
      </button>
      <button
        onClick={() => handleButtonClick("youtube")}
        style={{
          background: activeButton === "youtube" ? "#FFFFFF" : "transparent",
          border: "none",
          padding: "0",
          cursor: "pointer",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background 0.3s ease",
        }}
      >
        <img src="/youtube-icon.svg" alt="YouTube" style={{ width: "35px", height: "35px", objectFit: "contain" }} />
      </button>
    </div>
  );
};

export default SocialButtons;