// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\features\exportVideo\components\ActionButtons.tsx
"use client";

import React from "react";

const ActionButtons = () => {
  return (
    <div
      style={{
        flex: "0 0 20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "10px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "0",
      }}
    >
      <div
        style={{
          background: "linear-gradient(to bottom, #BA85FB, #ffffff)",
          padding: "5px",
          marginBottom: "10px",
          textAlign: "center",
          width: "100%",
          height: "35px",
        }}
      />
      <button
        style={{
          background: "linear-gradient(to right, #BA85FB, #E4D5D5)",
          border: "1px solid #e5e7eb",
          padding: "10px 15px",
          borderRadius: "15px",
          cursor: "pointer",
          marginBottom: "15px",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 300ms ease",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(to right, #BA85FB, #E4D5D5)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(255, 192, 203, 0.2)";
          e.currentTarget.style.transform = "translateY(-0.5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(to right, #BA85FB, #E4D5D5)";
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img src="/Download.svg" alt="Download" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
        <span
          style={{
            fontSize: "17px",
            fontWeight: "500",
            color: "#000",
            transition: "color 300ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#333"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#000"; }}
        >
          Download
        </span>
      </button>
      <button
        style={{
          background: "linear-gradient(to right, #BA85FB, #E4D5D5)",
          border: "1px solid #e5e7eb",
          padding: "10px 15px",
          borderRadius: "15px",
          cursor: "pointer",
          marginBottom: "15px",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 300ms ease",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(to right, #BA85FB, #E4D5D5)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(255, 192, 203, 0.2)";
          e.currentTarget.style.transform = "translateY(-0.5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(to right, #BA85FB, #E4D5D5)";
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img src="/Vector.svg" alt="Exit" style={{ width: "16px", height: "16px", marginRight: "24px" }} />
        <span
          style={{
            fontSize: "17px",
            fontWeight: "500",
            color: "#000",
            transition: "color 300ms ease",
            marginRight: "24px",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#333"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#000"; }}
        >
          Exit
        </span>
      </button>
      <button
        style={{
          background: "linear-gradient(to right, #BA85FB, #E4D5D5)",
          border: "1px solid #e5e7eb",
          padding: "10px 15px",
          borderRadius: "15px",
          cursor: "pointer",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 300ms ease",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(to right, #BA85FB, #E4D5D5)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(255, 192, 203, 0.2)";
          e.currentTarget.style.transform = "translateY(-0.5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(to right, #BA85FB, #E4D5D5)";
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img src="/Edit_Pencil_01.svg" alt="Edit Video" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
        <span
          style={{
            fontSize: "17px",
            fontWeight: "500",
            color: "#000",
            transition: "color 300ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#333"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#000"; }}
        >
          Edit Video
        </span>
      </button>
    </div>
  );
};

export default ActionButtons;