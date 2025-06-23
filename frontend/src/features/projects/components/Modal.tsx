"use client";

import React from "react";

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
        width: "80%",
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
        <div style={{ flex: 1, marginRight: "1rem" }}>
          <img
            src="/videoTemp.svg"
            alt={project.alt ?? "Project Thumbnail"}
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
          />
          <p style={{ color: "#666", marginTop: "0.5rem" }}>Project Name</p>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginTop: "0rem" }}>
            <input
              type="text"
              placeholder="Tiêu đề"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "2px solid #ccc",
                borderRadius: "5px",
                marginBottom: "0.5rem",
              }}
            />
            <textarea
              placeholder="Nhập mô tả"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "2px solid #ccc",
                borderRadius: "5px",
                minHeight: "100px",
                resize: "vertical",
              }}
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button
              style={{ background: "#00f", color: "white", padding: "0.5rem 1rem", borderRadius: "5px" }}
            >
              Lưu Video
            </button>
            <button
              style={{ background: "#f00", color: "white", padding: "0.5rem 1rem", borderRadius: "5px" }}
            >
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;