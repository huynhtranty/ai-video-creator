"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import SearchBar from "@/features/listProject/components/SearchBar";

export default function ListProjectPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem 0 0 0",
          background: "url('/Bg.svg') no-repeat center top",
          backgroundSize: "cover",
          marginLeft: "50px", // Đảm bảo main không bị che bởi Sidebar cố định
        }}
      >
        <SearchBar/>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem",
            marginBottom: "2rem",
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
                transform: "scale(0.8)", // Giảm kích thước nút xuống 80% kích thước gốc
                transition: "transform 0.2s, opacity 0.2s", // Thêm hiệu ứng chuyển động mượt mà
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(0.9)"; // Tăng kích thước nhẹ khi hover
                e.currentTarget.style.opacity = "0.8"; // Giảm độ mờ khi hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(0.8)"; // Quay lại kích thước ban đầu
                e.currentTarget.style.opacity = "1"; // Quay lại độ mờ ban đầu
              }}
            >
              <img src="/Swap.svg" alt="Swap" />              
            </button>
          </h2>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            Ngày sửa đổi gần nhất: 12/06/2025 14:07
          </button>
        </div>
        <div style={{ padding: "0 2rem", marginTop: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ cursor: "pointer", textAlign: "center" }}>
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <p style={{ marginTop: "0.5rem" }}>Xín chào Việt Nam</p>
            </div>
            <div style={{ cursor: "pointer", textAlign: "center" }}>
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <p style={{ marginTop: "0.5rem" }}>Cơn mưa đầu tiên</p>
            </div>
            <div style={{ cursor: "pointer", textAlign: "center" }}>
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <p style={{ marginTop: "0.5rem" }}>Đào, pháo và piano</p>
            </div>
            <div style={{ cursor: "pointer", textAlign: "center" }}>
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <p style={{ marginTop: "0.5rem" }}>Việt điệu cầu chuyền hạ binh</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}