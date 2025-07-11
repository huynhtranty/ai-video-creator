"use client";

import React, { useState } from "react";
import Image from "next/image";
import VideoModal from "../../videos/components/VideoModal";

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
  // For backward compatibility with mock data
  alt?: string;
}

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleImageError = (videoId: string) => {
    setImageErrors(prev => new Set(prev).add(videoId));
  };

  // ...existing helper functions...
  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "COMPLETED":
        return "#28a745";
      case "PENDING":
        return "#ffc107";
      case "FAILED":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getPlatformDisplay = (platform?: string) => {
    switch (platform) {
      case "YOUTUBE":
        return "YouTube";
      case "TIKTOK":
        return "TikTok";
      case "FACEBOOK":
        return "Facebook";
      case "NONE":
        return "Not Published";
      default:
        return platform;
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
          padding: "0 2rem",
          paddingBottom: "2rem",
        }}
      >
        {videos.map((video) => (
          <div key={video.id} onClick={() => handleVideoClick(video)}>
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                height: "320px",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Video Thumbnail */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "180px",
                  backgroundColor: "#f8f9fa",
                  overflow: "hidden",
                }}
              >
                {video.thumbnailUrl && !imageErrors.has(video.id) ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title || video.alt || "Video thumbnail"}
                    onError={() => handleImageError(video.id)}
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
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#e9ecef",
                      gap: "8px",
                    }}
                  >
                    <Image
                      src="/videoTemp.svg"
                      width={60}
                      height={60}
                      alt={video.title || video.alt || "Video thumbnail"}
                      style={{ opacity: 0.4 }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6c757d",
                        fontFamily: "'Inter', sans-serif",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      {imageErrors.has(video.id) ? "Hình ảnh không khả dụng" : "Không có hình thu nhỏ"}
                    </span>
                  </div>
                )}
                
                {/* Duration badge */}
                {video.duration && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {formatDuration(video.duration)}
                  </div>
                )}
                
                {/* Status badge */}
                {video.status && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      backgroundColor: getStatusColor(video.status),
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "10px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    {video.status}
                  </div>
                )}
              </div>

              {/* Video Details */}
              <div style={{ 
                padding: "16px", 
                flex: "1", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                minHeight: "140px" // Fixed height for content area
              }}>
                {/* Title and Description Container */}
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#212529",
                      fontFamily: "'Inter', sans-serif",
                      margin: "0 0 8px 0",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.title || video.alt || "Untitled Video"}
                  </h3>

                  {video.description && (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6c757d",
                        fontFamily: "'Inter', sans-serif",
                        margin: "0",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {video.description}
                    </p>
                  )}
                </div>

                {/* Platform and Date Container */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {video.platform && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#8362E5",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "500",
                        backgroundColor: "#f8f6ff",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {getPlatformDisplay(video.platform)}
                    </span>
                  )}

                  {video.createdAt && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#adb5bd",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default VideoGrid;
