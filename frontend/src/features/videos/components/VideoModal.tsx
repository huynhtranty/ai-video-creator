"use client";

import React from "react";
import ProjectPreview from "./ProjectPreview";
import SocialButtons from "./SocialButtons";
import ModalContent from "./ModalContent";

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
  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  // Handle background click to close modal
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={handleBackgroundClick}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          width: "90%",
          maxWidth: "1000px",
          maxHeight: "90vh",
          overflow: "hidden",
          animation: "modalOpen 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
            padding: "16px 24px",
            color: "white",
          }}
        >
          <div>
            <h2 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              margin: 0,
              fontFamily: "'Inter', sans-serif"
            }}>
              Chi tiết Video
            </h2>
            {video.title && (
              <p style={{ 
                fontSize: "14px", 
                opacity: 0.9, 
                margin: "4px 0 0 0",
                fontFamily: "'Inter', sans-serif"
              }}>
                {video.title}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "white",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div 
          style={{ 
            display: "flex", 
            minHeight: "500px",
            maxHeight: "calc(90vh - 80px)",
            overflow: "auto"
          }}
        >
          <ProjectPreview project={video} />
          <div style={{ flex: 2, display: "flex" }}>
            <SocialButtons />
            <ModalContent video={video} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalOpen {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoModal;
