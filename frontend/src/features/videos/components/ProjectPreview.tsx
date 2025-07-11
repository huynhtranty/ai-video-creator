"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Video {
  id: string | number;
  title?: string;
  description?: string;
  filePath?: string;
  status?: "PENDING" | "COMPLETED" | "FAILED";
  platform?: "NONE" | "YOUTUBE" | "TIKTOK" | "FACEBOOK";
  duration?: number;
  thumbnailUrl?: string;
  alt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectPreviewProps {
  project: Video | null;
  variant?: "modal" | "card";
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, variant = "modal" }) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      COMPLETED: { color: "#10b981", bg: "#d1fae5", text: "Completed", icon: "✓" },
      PENDING: { color: "#f59e0b", bg: "#fef3c7", text: "Processing", icon: "⏳" },
      FAILED: { color: "#ef4444", bg: "#fee2e2", text: "Failed", icon: "✗" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { color: "#6b7280", bg: "#f3f4f6", text: status, icon: "?" };
    
    return (
      <div
        style={{
          backgroundColor: config.bg,
          color: config.color,
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          border: `1px solid ${config.color}30`,
        }}
      >
        <span>{config.icon}</span>
        {config.text}
      </div>
    );
  };

  const getPlatformBadge = (platform?: string) => {
    if (!platform || platform === "NONE") return null;
    
    const platformConfig = {
      YOUTUBE: { color: "#FF0000", icon: "📺", name: "YouTube" },
      TIKTOK: { color: "#000000", icon: "🎵", name: "TikTok" },
      FACEBOOK: { color: "#1877F2", icon: "👥", name: "Facebook" }
    };
    
    const config = platformConfig[platform as keyof typeof platformConfig];
    if (!config) return null;
    
    return (
      <div
        style={{
          backgroundColor: `${config.color}15`,
          color: config.color,
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "10px",
          fontWeight: "600",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          alignItems: "center",
          gap: "3px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        <span>{config.icon}</span>
        {config.name}
      </div>
    );
  };

  if (variant === "card") {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))",
          borderRadius: "20px",
          padding: "24px",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(10px)",
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
            marginBottom: "16px",
          }}
        >
          {project?.thumbnailUrl && !imageError ? (
            <>
              {isImageLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f9fafb",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid #e5e7eb",
                      borderTop: "3px solid #8b5cf6",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
              )}
              <img
                src={project.thumbnailUrl}
                alt={project?.title || project?.alt || "Video Thumbnail"}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: isImageLoading ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "12px",
              }}
            >
              <Image
                src="/videoTemp.svg"
                width={60}
                height={60}
                alt="Video placeholder"
                style={{ opacity: 0.3 }}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {imageError ? "Image unavailable" : "No thumbnail"}
              </p>
            </div>
          )}
          
          {/* Duration overlay */}
          {project?.duration && (
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "600",
              }}
            >
              {formatDuration(project.duration)}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Status and Platform */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {project?.status && getStatusBadge(project.status)}
            {getPlatformBadge(project?.platform)}
          </div>
          
          {/* Title */}
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              lineHeight: "1.3",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project?.title || project?.alt || "Untitled Video"}
          </h3>
          
          {/* Description */}
          {project?.description && (
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Modal variant (original enhanced)
  return (
    <div style={{ flex: 1, paddingRight: "24px" }}>
      {/* Video Thumbnail */}
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#f9fafb",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          aspectRatio: "16/9",
          marginBottom: "16px",
        }}
      >
        {project?.thumbnailUrl && !imageError ? (
          <>
            {isImageLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f9fafb",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid #e5e7eb",
                    borderTop: "3px solid #8b5cf6",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            )}
            <img
              src={project.thumbnailUrl}
              alt={project?.title || project?.alt || "Video Thumbnail"}
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isImageLoading ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "12px",
            }}
          >
            <Image
              src="/videoTemp.svg"
              width={60}
              height={60}
              alt="Video placeholder"
              style={{ opacity: 0.3 }}
            />
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
                margin: 0,
              }}
            >
              {imageError ? "Image unavailable" : "No thumbnail available"}
            </p>
          </div>
        )}
        
        {/* Duration overlay */}
        {project?.duration && (
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
            {formatDuration(project.duration)}
          </div>
        )}
      </div>

      {/* Video Info Card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.05))",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid rgba(139, 92, 246, 0.2)",
        }}
      >
        {/* Status and Platform Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          {project?.status && getStatusBadge(project.status)}
          {getPlatformBadge(project?.platform)}
        </div>
        
        {/* Title */}
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
          {project?.title || project?.alt || "Untitled Video"}
        </h2>
        
        {/* Date */}
        {project?.createdAt && (
          <p
            style={{
              fontSize: "12px",
              color: "#8b5cf6",
              margin: "8px 0 0 0",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "500",
            }}
          >
            Created {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
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

export default ProjectPreview;