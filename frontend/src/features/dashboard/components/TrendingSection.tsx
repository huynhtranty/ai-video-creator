import React from "react";
import { useTrending } from "../api/trending";
import { KeywordTooltip } from "./KeywordTooltip";

export default function TrendingSection() {
  const { data: tags, isLoading, error } = useTrending();

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
            {tags.map((tag, index) => (
              <KeywordTooltip key={index} keyword={tag}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: "white",
                    color: "#555",
                    border: "1px solid #e1e5e9",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {tag}
                </span>
              </KeywordTooltip>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}