"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import SearchBar from "@/features/listProject/components/SearchBar";

export default function ListProjectPage() {
  const projects = [
    { id: 1, alt: "Video 1" },
    { id: 2, alt: "Video 2" },
    { id: 3, alt: "Video 3" },
    { id: 4, alt: "Video 4" },
    { id: 5, alt: "Video 5" },
    { id: 6, alt: "Video 6" },
    { id: 7, alt: "Video 7" },
    { id: 8, alt: "Video 8" },
    { id: 9, alt: "Video 9" },
  ];
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem 2rem 4rem 50px", // Thêm padding-bottom 4rem để tạo khoảng cách với đáy trang
          background: "url('/Bg.svg') no-repeat center top",
          backgroundSize: "cover",
        }}
      >
        <SearchBar />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem",
            marginBottom: "1rem",
            marginTop: "4rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center" }}>
            Dự án 
            <button
              style={{
                fontSize: "0.8rem",
                verticalAlign: "middle",
                background: "none",
                border: "none",
                marginLeft: "0.5rem",
                transform: "scale(0.8)",
                transition: "transform 0.2s, opacity 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(0.9)";
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(0.8)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              <img src="/Swap.svg" alt="Swap" />              
            </button>
          </h2>
          <button
            style={{
              background: "none",
              border: "2px solid #ccc",
              borderRadius: "7px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              padding: "0.25rem 0.5rem",
              display: "flex",
              alignItems: "center",
              transition: "border-color 0.2s, background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#000";
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#ccc";
              e.currentTarget.style.backgroundColor = "none";
            }}
          >
            <img src="/PickDate.svg" alt="Calendar" style={{ marginRight: "0.5rem", width: "16px", height: "16px" }} />
            Ngày sửa đổi gần nhất
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
            gap: "1rem",
            padding: "0 2rem",
            paddingBottom: "2rem",
          }}
        >
          {projects.map((project) => (
            <div key={project.id}>
              <div
                style={{
                  padding: "1rem",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  width: "100%",
                  height: "180px",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <img src="/videoTemp.svg" alt={project.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "5px 15px", background: "white" }}>
                <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}