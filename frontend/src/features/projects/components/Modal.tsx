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
        <div style={{ flex: 3, marginRight: "1rem" }}>
          <img
            src="/videoTemp.svg"
            alt={project.alt ?? "Project Thumbnail"}
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
        <div style={{ flex: 2, display: "flex" }}>
          <div
            style={{
              width: "60px",
              background: "#D3D3D3", // Gray background
              padding: "0.5rem 0",
              borderRadius: "10px 0 0 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/tiktok-icon.svg" alt="TikTok" style={{ width: "48px", height: "48px", marginTop: "0.25rem" }} />
            <img src="/facebook-icon.svg" alt="Facebook" style={{ width: "48px", height: "48px", marginBottom: "0.25rem" }} />
            <img src="/youtube-icon.svg" alt="YouTube" style={{ width: "35px", height: "35px", marginTop: "0.25rem" }} />
          </div>
          <div
            style={{
              flex: 1,
              background: "linear-gradient(to bottom, #D8B4FE, #F5EBFF)",
              padding: "1rem",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Tiêu đề</p>
              <input
                type="text"
                placeholder="Nhập tiêu đề"
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  border: "2px solid transparent",
                  borderRadius: "20px",
                  marginBottom: "0.5rem",
                  backgroundColor: "#ffffff", // Light background for textarea
                  background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Mô tả</p>
              <textarea
                placeholder="Nhập mô tả"
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  border: "2px solid transparent",
                  borderRadius: "20px",
                  minHeight: "100px",
                  resize: "vertical",
                  backgroundColor: "#ffffff", // Light background for textarea
                  background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
                }}
              ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                style={{
                  background: "linear-gradient(to right, #5DEFFF, #4105F5)",
                  color: "white",
                  padding: "0.5rem 2.5rem", // Increased horizontal padding
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Lưu Video
              </button>
              <button
                style={{
                  background: "linear-gradient(to right, #5DEFFF, #4105F5)",
                  color: "white",
                  padding: "0.5rem 3rem", // Increased horizontal padding
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;