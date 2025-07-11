import React, { useState } from "react";
import { useTrending } from "../api/trending";
import { KeywordTooltip } from "./KeywordTooltip";
import apiClient from "@/lib/api-client";

interface TrendingSectionProps {
  onKeywordClick?: (keyword: string, summary: string) => void;
}

export default function TrendingSection({ onKeywordClick }: TrendingSectionProps) {
  const { data: tags, isLoading, error } = useTrending();
  const [clickedKeyword, setClickedKeyword] = useState<string | null>(null);

  const handleKeywordClick = async (keyword: string) => {
    if (!onKeywordClick) return;
    
    setClickedKeyword(keyword);
    
    try {
      // Get the summary for the keyword using the API client
      const response = await apiClient.get(`/topics/summary?keyword=${encodeURIComponent(keyword)}`);
      const summary = response.data?.summary || "Chủ đề trending hiện tại";
      
      onKeywordClick(keyword, summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      // Fallback with a default summary
      onKeywordClick(keyword, "Chủ đề trending hiện tại");
    } finally {
      setClickedKeyword(null);
    }
  };

  return (
    <section style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        className="trending-section"
        style={{
          margin: "1rem 0 3rem 0",
          maxWidth: "800px",
          width: "90%",
          textAlign: "center",
        }}
      >

        {isLoading && (
          <p style={{ color: "#666", fontSize: "14px" }}>Đang tải từ khóa...</p>
        )}
        
        {error && (
          <p style={{ color: "#e74c3c", fontSize: "14px" }}>Không thể tải từ khóa</p>
        )}
        
        {tags && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tags.map((tag, index) => {
              const isClicked = clickedKeyword === tag;
              return (
                <KeywordTooltip key={index} keyword={tag}>
                  <span
                    onClick={() => handleKeywordClick(tag)}
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      background: isClicked ? "#f0f0f0" : "white",
                      color: isClicked ? "#999" : "#555",
                      border: "1px solid #e1e5e9",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: isClicked ? "wait" : "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      userSelect: "none",
                      opacity: isClicked ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isClicked) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isClicked) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                      }
                    }}
                  >
                    {isClicked ? "⏳ " : ""}{tag}
                  </span>
                </KeywordTooltip>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}