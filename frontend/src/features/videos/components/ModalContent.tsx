"use client";

import React, { useState, useEffect } from "react";

interface Video {
  id: string;
  title?: string;
  description?: string;
  filePath?: string;
  status?: "PENDING" | "COMPLETED" | "FAILED";
  platform?: "NONE" | "YOUTUBE" | "TIKTOK" | "FACEBOOK";
  duration?: number;
  projectId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnailUrl?: string;
  alt?: string;
}

interface ModalContentProps {
  video?: Video | null;
  onSave?: (data: { title: string; description: string }) => void;
  onShare?: (platform: string) => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ video, onSave, onShare }) => {
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [activeTab, setActiveTab] = useState<"edit" | "analytics" | "settings">("edit");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
    }
  }, [video]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave?.({ title, description });
      console.log("Saving video:", { id: video?.id, title, description });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = (platform: string) => {
    onShare?.(platform);
    console.log("Sharing video:", { id: video?.id, platform });
  };

  const getAnalyticsData = () => {
    // Mock analytics data
    return {
      views: Math.floor(Math.random() * 10000),
      likes: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
    };
  };

  const analytics = getAnalyticsData();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.02), rgba(236, 72, 153, 0.02))",
        borderRadius: "0 16px 16px 0",
        overflow: "hidden",
      }}
    >
      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {[
          { id: "edit", label: "Edit", icon: "✏️" },
          { id: "analytics", label: "Analytics", icon: "📊" },
          { id: "settings", label: "Settings", icon: "⚙️" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "edit" | "analytics" | "settings")}
            style={{
              flex: 1,
              padding: "16px 20px",
              border: "none",
              background: "transparent",
              fontSize: "14px",
              fontWeight: activeTab === tab.id ? "600" : "500",
              color: activeTab === tab.id ? "#8b5cf6" : "#6b7280",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              borderBottom: activeTab === tab.id ? "2px solid #8b5cf6" : "2px solid transparent",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, padding: "24px", overflow: "auto" }}>
        {activeTab === "edit" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Title Section */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Video Title
              </label>
              <input
                type="text"
                placeholder="Enter a compelling title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#8b5cf6";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  margin: "4px 0 0 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {title.length}/100 characters
              </p>
            </div>

            {/* Description Section */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Description
              </label>
              <textarea
                placeholder="Describe your video content..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backgroundColor: "#ffffff",
                  resize: "vertical",
                  minHeight: "120px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#8b5cf6";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  margin: "4px 0 0 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {description.length}/500 characters
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", paddingTop: "16px" }}>
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  background: isSaving 
                    ? "linear-gradient(135deg, #d1d5db, #9ca3af)"
                    : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: isSaving ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: "140px",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {isSaving ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid transparent",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Saving...
                  </>
                ) : (
                  <>💾 Save Changes</>
                )}
              </button>

              <button
                onClick={() => handleShare("YOUTUBE")}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🚀 Quick Share
              </button>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Video Performance
            </h3>

            {/* Analytics Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { label: "Views", value: analytics.views.toLocaleString(), icon: "👁️", color: "#3b82f6" },
                { label: "Likes", value: analytics.likes.toLocaleString(), icon: "❤️", color: "#ef4444" },
                { label: "Shares", value: analytics.shares.toLocaleString(), icon: "📤", color: "#10b981" },
                { label: "Comments", value: analytics.comments.toLocaleString(), icon: "💬", color: "#f59e0b" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      marginBottom: "8px",
                    }}
                  >
                    {metric.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: metric.color,
                      fontFamily: "'Inter', sans-serif",
                      marginBottom: "4px",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      fontFamily: "'Inter', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Chart Placeholder */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                textAlign: "center",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📈</div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 8px 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Performance Trends
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Detailed analytics charts coming soon
              </p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Video Settings
            </h3>

            {/* Privacy Settings */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 16px 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                🔒 Privacy
              </h4>
              
              {["Public", "Unlisted", "Private"].map((option) => (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <input
                    type="radio"
                    name="privacy"
                    value={option.toLowerCase()}
                    defaultChecked={option === "Public"}
                    style={{
                      width: "16px",
                      height: "16px",
                      accentColor: "#8b5cf6",
                    }}
                  />
                  <span style={{ color: "#374151" }}>{option}</span>
                </label>
              ))}
            </div>

            {/* Quality Settings */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 16px 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                🎥 Quality
              </h4>
              
              <select
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <option value="auto">Auto (Recommended)</option>
                <option value="1080p">1080p HD</option>
                <option value="720p">720p HD</option>
                <option value="480p">480p SD</option>
              </select>
            </div>

            {/* Danger Zone */}
            <div
              style={{
                background: "rgba(254, 226, 226, 0.7)",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#dc2626",
                  margin: "0 0 12px 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                ⚠️ Danger Zone
              </h4>
              
              <button
                onClick={() => console.log("Delete video:", video?.id)}
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🗑️ Delete Video
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ModalContent;