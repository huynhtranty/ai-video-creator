// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\projects\components\video-detail\Modal.tsx
"use client";

import React from "react";
import ProjectPreview from "../../videos/components/ProjectPreview";
import SocialButtons from "../../videos/components/SocialButtons";
import ModalContent from "../../videos/components/ModalContent";

interface Project {
  id: string | number;
  alt?: string;
}

interface ModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, project, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "0rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        width: "70%",
        height: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to bottom, #BA85FB, #E4D5D5)",
          padding: "3px 1rem",
          borderRadius: "5px 5px 0 0",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "black", margin: 0 }}>Chi tiết Video</h2>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", fontSize: "1.5rem", color: "white", cursor: "pointer" }}
        >
          ×
        </button>
      </div>
      <div style={{ display: "flex", padding: "1rem" }}>
        <ProjectPreview project={project} />
        <div style={{ flex: 2, display: "flex" }}>
          <SocialButtons />
          <ModalContent />
        </div>
      </div>
    </div>
  );
};

export default Modal;