"use client";

import React, { useState } from "react";

interface SocialButtonsProps {
  onPlatformSelect?: (platform: string) => void;
  selectedPlatform?: string;
  variant?: "compact" | "expanded";
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ 
  onPlatformSelect, 
  selectedPlatform = "YOUTUBE", 
  variant = "compact" 
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const platforms = [
    {
      id: "YOUTUBE",
      name: "YouTube",
      icon: "/youtube-icon.svg",
      color: "#FF0000",
      bgColor: "rgba(255, 0, 0, 0.1)",
    },
    {
      id: "TIKTOK",
      name: "TikTok",
      icon: "/tiktok-icon.svg",
      color: "#000000",
      bgColor: "rgba(0, 0, 0, 0.1)",
    },
    {
      id: "FACEBOOK",
      name: "Facebook",
      icon: "/facebook-icon.svg",
      color: "#1877F2",
      bgColor: "rgba(24, 119, 242, 0.1)",
    },
  ];

  const handleButtonClick = (platformId: string) => {
    onPlatformSelect?.(platformId);
  };

  if (variant === "expanded") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "20px",
          background: "rgba(248, 250, 252, 0.8)",
          borderRadius: "16px",
          border: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#374151",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            marginBottom: "8px",
          }}
        >
          Share to Platform
        </h3>
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleButtonClick(platform.id)}
            onMouseEnter={() => setHoveredButton(platform.id)}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              border: selectedPlatform === platform.id ? `2px solid ${platform.color}` : "1px solid #e5e7eb",
              borderRadius: "12px",
              background: selectedPlatform === platform.id 
                ? platform.bgColor 
                : hoveredButton === platform.id 
                  ? "#f9fafb" 
                  : "#ffffff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: selectedPlatform === platform.id ? "600" : "500",
              color: selectedPlatform === platform.id ? platform.color : "#374151",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hoveredButton === platform.id ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hoveredButton === platform.id 
                ? `0 4px 12px ${platform.bgColor}` 
                : "0 1px 3px rgba(0, 0, 0, 0.1)",
              width: "100%",
              textAlign: "left",
            }}
          >
            <img
              src={platform.icon}
              alt={platform.name}
              style={{ 
                width: "24px", 
                height: "24px",
                filter: selectedPlatform === platform.id ? "none" : "grayscale(0.3)",
                transition: "filter 0.2s ease",
              }}
            />
            <span>{platform.name}</span>
            {selectedPlatform === platform.id && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "12px",
                  color: platform.color,
                }}
              >
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Compact variant (original sidebar style but modernized)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px 12px",
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
        borderRadius: "16px",
        border: "1px solid rgba(139, 92, 246, 0.1)",
        backdropFilter: "blur(10px)",
        minWidth: "80px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: "600",
          color: "#8b5cf6",
          textAlign: "center",
          marginBottom: "4px",
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Share
      </div>
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => handleButtonClick(platform.id)}
          onMouseEnter={() => setHoveredButton(platform.id)}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            background: selectedPlatform === platform.id 
              ? `linear-gradient(135deg, ${platform.color}15, ${platform.color}25)`
              : hoveredButton === platform.id 
                ? "rgba(255, 255, 255, 0.8)" 
                : "rgba(255, 255, 255, 0.5)",
            border: selectedPlatform === platform.id 
              ? `2px solid ${platform.color}40` 
              : "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            width: "56px",
            height: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hoveredButton === platform.id ? "scale(1.05)" : "scale(1)",
            boxShadow: selectedPlatform === platform.id 
              ? `0 4px 20px ${platform.color}30`
              : hoveredButton === platform.id 
                ? "0 4px 12px rgba(0, 0, 0, 0.15)" 
                : "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          title={platform.name}
        >
          <img
            src={platform.icon}
            alt={platform.name}
            style={{ 
              width: "28px", 
              height: "28px",
              filter: selectedPlatform === platform.id 
                ? "none" 
                : "grayscale(0.2) opacity(0.8)",
              transition: "all 0.2s ease",
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default SocialButtons;