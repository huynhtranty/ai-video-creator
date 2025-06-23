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
            width: "90%",
            margin: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                flex: "0 0 80%", // Chiếm 80% chiều rộng
                textAlign: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  paddingBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <div style={{ background: "#e0c4f0", padding: "5px", marginBottom: "10px" }}>
                  Player
                </div>
                <img
                  src="/Screen.svg" // Thay bằng đường dẫn hình ảnh thực tế
                  alt="House"
                  style={{ 
                    width: "90%", 
                    borderRadius: "5px",
                    display: "block",
                    margin: "0 auto" // Center the image
                  }}
                />
              </div>
              <div style={{ background: "#e0c4f0", padding: "5px", marginTop: "10px", textAlign: "center",border: "1px solid #ddd",
                  borderRadius: "10px", }}>
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
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "0",
              }}
            >
              <div style={{ background: "#e0c4f0", padding: "5px", marginBottom: "10px", textAlign: "center", width: "100%", height: "35px" }}>
              </div>
              <button
                style={{
                  background: "#d8b4e2",
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
                  e.currentTarget.style.background = "#fdf2f8";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(255, 192, 203, 0.2)";
                  e.currentTarget.style.transform = "translateY(-0.5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#d8b4e2";
                  e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img src="/Download.svg" alt="Download" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                <span style={{ fontSize: "17px", fontWeight: "500", color: "#000", transition: "color 300ms ease" }}>
                  Download
                </span>
              </button>
              <button
                style={{
                  background: "#d8b4e2",
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
                  e.currentTarget.style.background = "#fdf2f8";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(255, 192, 203, 0.2)";
                  e.currentTarget.style.transform = "translateY(-0.5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#d8b4e2";
                  e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img src="/Vector.svg" alt="Exit" style={{ width: "16px", height: "16px", marginRight: "24px",}} />
                <span style={{ fontSize: "17px", fontWeight: "500", color: "#000", transition: "color 300ms ease", marginRight: "24px", }}>
                  Exit
                </span>
              </button>
              <button
                style={{
                  background: "#d8b4e2",
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
                  e.currentTarget.style.background = "#fdf2f8";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(255, 192, 203, 0.2)";
                  e.currentTarget.style.transform = "translateY(-0.5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#d8b4e2";
                  e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img src="/Edit_Pencil_01.svg" alt="Edit Video" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                <span style={{ fontSize: "17px", fontWeight: "500", color: "#000", transition: "color 300ms ease" }}>
                  Edit Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}