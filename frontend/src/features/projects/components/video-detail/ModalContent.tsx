// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\projects\components\video-detail\ModalContent.tsx
"use client";

import React from "react";

const ModalContent = () => {
  return (
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
            backgroundColor: "#ffffff",
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
            backgroundColor: "#ffffff",
            background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
          }}
        ></textarea>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            background: "linear-gradient(to right, #5DEFFF, #4105F5)",
            color: "white",
            padding: "0.5rem 2.5rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #4105F5, #FF5FFF)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #5DEFFF, #4105F5)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Lưu Video
        </button>
        <button
          style={{
            background: "linear-gradient(to right, #5DEFFF, #4105F5)",
            color: "white",
            padding: "0.5rem 3rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #4105F5, #FF5FFF)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #5DEFFF, #4105F5)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Chia sẻ
        </button>
      </div>
    </div>
  );
};

export default ModalContent;