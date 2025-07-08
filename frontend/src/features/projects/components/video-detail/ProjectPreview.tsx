// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\projects\components\video-detail\ProjectPreview.tsx
"use client";

import React from "react";

interface Project {
  id: string | number;
  alt?: string;
}

interface ProjectPreviewProps {
  project: Project | null;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <div style={{ flex: 3, marginRight: "1rem" }}>
      <img
        src="/videoTemp.svg"
        alt={project?.alt ?? "Project Thumbnail"}
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
      />
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
        Project Name
      </div>
    </div>
  );
};

export default ProjectPreview;