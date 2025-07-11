// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\projects\components\video-detail\ProjectPreview.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Video {
  id: string | number;
  title?: string;
  description?: string;
  filePath?: string;
  status?: string;
  platform?: string;
  duration?: number;
  thumbnailUrl?: string;
  alt?: string;
}

interface ProjectPreviewProps {
  project: Video | null;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div style={{ flex: 3, marginRight: "1rem" }}>
      {project?.thumbnailUrl && !imageError ? (
        <img
          src={project.thumbnailUrl}
          alt={project?.title || project?.alt || "Video Thumbnail"}
          onError={handleImageError}
          style={{ 
            width: "100%", 
            height: "auto", 
            borderRadius: "10px", 
            maxHeight: "300px", 
            objectFit: "cover" 
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            border: "2px dashed #dee2e6",
          }}
        >
          <Image
            src="/videoTemp.svg"
            width={80}
            height={80}
            alt="Video placeholder"
            style={{ opacity: 0.4 }}
          />
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#6c757d",
                fontFamily: "'Inter', sans-serif",
                margin: "0 0 4px 0",
                fontWeight: "500",
              }}
            >
              {imageError ? "Hình ảnh không khả dụng" : "Không có hình thu nhỏ"}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#adb5bd",
                fontFamily: "'Inter', sans-serif",
                margin: 0,
              }}
            >
              {project?.title || "Video Preview"}
            </p>
          </div>
        </div>
      )}
      <div
        style={{
          background: "linear-gradient(to bottom, #BA85FB, #ffffff)",
          padding: "8px 8px 8px 15px",
          marginTop: "0",
          border: "1px solid #ddd",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {project?.title || project?.alt || "Untitled Video"}
      </div>
    </div>
  );
};

export default ProjectPreview;