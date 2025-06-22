"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
             flex: 1,
             padding: "0 0 20px 20px",
             background: "#f0f0f0",
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
          }}
      >
          <img
            src="/TaskFunction.svg" // Thay bằng đường dẫn hình ảnh thực tế
            style={{
              width: "100%",
              height: "auto"

            }}          
          />
        <div
          style={{
          display: "flex",
          width: "80%",
          margin: "20px auto",
          }}
          >
          <div
          style={{
               background: "#fff",
               padding: "10px",
               border: "1px solid #ddd",
               borderRadius: "5px",
               flex: "0 0 80%", // Chiếm 80% chiều rộng
               textAlign: "center",
          }}
          >
          <div style={{ background: "#e0c4f0", padding: "5px", marginBottom: "10px" }}>
               Player
          </div>
          <img
               src="/path-to-your-house-image.jpg" // Thay bằng đường dẫn hình ảnh thực tế
               alt="House"
               style={{ width: "100%", borderRadius: "5px" }}
          />
          <div style={{ margin: "10px 0", color: "#000" }}>00:02</div>
          <div style={{ background: "#e0c4f0", padding: "5px", marginBottom: "10px" }}>
               Project Name
          </div>
          </div>
          <div
          style={{
               flex: "0 0 20%", // Chiếm 20% chiều rộng
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               marginLeft: "10px",
          }}
          >
          <button
               style={{
               background: "#d8b4e2",
               border: "none",
               padding: "10px",
               borderRadius: "5px",
               cursor: "pointer",
               marginBottom: "10px",
               width: "80%",
               }}
          >
               Download
          </button>
          <button
               style={{
               background: "#d8b4e2",
               border: "none",
               padding: "10px",
               borderRadius: "5px",
               cursor: "pointer",
               marginBottom: "10px",
               width: "80%",
               }}
          >
               Exit
          </button>
          <button
               style={{
               background: "#d8b4e2",
               border: "none",
               padding: "10px",
               borderRadius: "5px",
               cursor: "pointer",
               width: "80%",
               }}
          >
               Edit Video
          </button>
          </div>
          </div>
      </main>
    </div>
  );
}