import React, { useState } from "react";
import { useTopicSummary } from "../api/trending";

interface TooltipProps {
  keyword: string;
  children: React.ReactNode;
}

export const KeywordTooltip: React.FC<TooltipProps> = ({ keyword, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { data, isLoading } = useTopicSummary(keyword, isHovered);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isHovered && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: "translateX(-50%) translateY(-100%)",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            maxWidth: "300px",
            wordWrap: "break-word",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
          }}
        >
          {isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid #fff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Loading summary...
            </div>
          ) : data?.summary ? (
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{keyword}</div>
              <div>{data.summary}</div>
            </div>
          ) : (
            <div>No summary available</div>
          )}
          
          {/* Tooltip arrow */}
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(0, 0, 0, 0.9)",
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
