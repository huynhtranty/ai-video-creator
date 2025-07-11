"use client";

import React, { useState } from "react";
import Image from "next/image";

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

interface VideoModalProps {
  isOpen: boolean;
  video: Video | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, video, onClose }) => {
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [activeTab, setActiveTab] = useState<"details" | "share">("details");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("YOUTUBE");
  const [imageError, setImageError] = useState(false);

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Update form state when video changes
  React.useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
      setImageError(false);
    }
  }, [video]);

  if (!isOpen || !video) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    console.log("Saving video:", { id: video.id, title, description });
    // TODO: Implement actual save functionality
  };

  const handleShare = () => {
    console.log("Sharing video:", { id: video.id, platform: selectedPlatform });
    // TODO: Implement actual share functionality
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      COMPLETED: { color: "#10b981", bg: "#d1fae5", text: "Completed" },
      PENDING: { color: "#f59e0b", bg: "#fef3c7", text: "Processing" },
      FAILED: { color: "#ef4444", bg: "#fee2e2", text: "Failed" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { color: "#6b7280", bg: "#f3f4f6", text: status };
    
    return (
      <span
        style={{
          backgroundColor: config.bg,
          color: config.color,
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {config.text}
      </span>
    );
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      YOUTUBE: "/youtube-icon.svg",
      TIKTOK: "/tiktok-icon.svg",
      FACEBOOK: "/facebook-icon.svg",
    };
    return icons[platform as keyof typeof icons] || "/globe.svg";
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px",
          animation: "fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={handleBackgroundClick}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            boxShadow: "0 32px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2)",
            width: "90%",
            maxWidth: "1200px",
            maxHeight: "90vh",
            overflow: "hidden",
            animation: "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 32px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#111827",
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.025em",
                }}
              >
                Video Details
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "4px 0 0 0",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Manage your video content and sharing options
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(0, 0, 0, 0.05)",
                border: "none",
                borderRadius: "12px",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#6b7280",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.color = "#374151";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              height: "calc(90vh - 140px)",
              maxHeight: "600px",
            }}
          >
            {/* Left Panel - Video Preview */}
            <div
              style={{
                padding: "32px",
                borderRight: "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Video Thumbnail */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#f9fafb",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  aspectRatio: "16/9",
                }}
              >
                {video.thumbnailUrl && !imageError ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title || "Video thumbnail"}
                    onError={() => setImageError(true)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      gap: "16px",
                    }}
                  >
                    <Image
                      src="/videoTemp.svg"
                      width={80}
                      height={80}
                      alt="Video placeholder"
                      style={{ opacity: 0.3 }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#9ca3af",
                        fontFamily: "'Inter', sans-serif",
                        textAlign: "center",
                      }}
                    >
                      {imageError ? "Image unavailable" : "No thumbnail available"}
                    </p>
                  </div>
                )}
                
                {/* Duration overlay */}
                {video.duration && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    {formatDuration(video.duration)}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {video.status && getStatusBadge(video.status)}
                  {video.createdAt && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {new Date(video.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: "1.3",
                  }}
                >
                  {video.title || "Untitled Video"}
                </h2>
              </div>
            </div>

            {/* Right Panel - Form and Actions */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Tab Navigation */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                }}
              >
                {[
                  { id: "details", label: "Details", icon: "📝" },
                  { id: "share", label: "Share", icon: "🔗" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "details" | "share")}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
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
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
                {activeTab === "details" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Title Input */}
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter video title..."
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontFamily: "'Inter', sans-serif",
                          outline: "none",
                          transition: "all 0.2s ease",
                          backgroundColor: "#ffffff",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#8b5cf6";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#d1d5db";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Description Input */}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter video description..."
                        rows={4}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontFamily: "'Inter', sans-serif",
                          outline: "none",
                          transition: "all 0.2s ease",
                          backgroundColor: "#ffffff",
                          resize: "vertical",
                          minHeight: "100px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#8b5cf6";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#d1d5db";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={handleSave}
                      style={{
                        background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        alignSelf: "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      💾 Save Changes
                    </button>
                  </div>
                )}

                {activeTab === "share" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Platform Selection */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#374151",
                          marginBottom: "12px",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Choose Platform
                      </label>
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {["YOUTUBE", "TIKTOK", "FACEBOOK"].map((platform) => (
                          <button
                            key={platform}
                            onClick={() => setSelectedPlatform(platform)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "12px 16px",
                              border: selectedPlatform === platform ? "2px solid #8b5cf6" : "1px solid #d1d5db",
                              borderRadius: "12px",
                              background: selectedPlatform === platform ? "rgba(139, 92, 246, 0.1)" : "#ffffff",
                              color: selectedPlatform === platform ? "#8b5cf6" : "#6b7280",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "500",
                              fontFamily: "'Inter', sans-serif",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <img
                              src={getPlatformIcon(platform)}
                              alt={platform}
                              style={{ width: "20px", height: "20px" }}
                            />
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Current Platform Status */}
                    {video.platform && video.platform !== "NONE" && (
                      <div
                        style={{
                          padding: "16px",
                          backgroundColor: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img
                          src={getPlatformIcon(video.platform)}
                          alt={video.platform}
                          style={{ width: "24px", height: "24px" }}
                        />
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#16a34a",
                              margin: 0,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            Published on {video.platform}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#16a34a",
                              margin: "2px 0 0 0",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            Video is currently live on this platform
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      style={{
                        background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        alignSelf: "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(6, 182, 212, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      🚀 Share to {selectedPlatform}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default VideoModal;
