"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import SearchBar from "@/features/projects/components/SearchBar";
import Header from "@/features/projects/components/Header";
import DateButton from "@/features/projects/components/DateButton";
import ProjectGrid from "@/features/projects/components/ProjectGrid";
import { useListProjects } from "@/features/projects/api/project";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function ListProjectPageContent() {
  const { data: projects = [], isLoading, error } = useListProjects();

  if (isLoading) {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "2rem 2rem 4rem 50px",
            background: "url('/Bg.svg') no-repeat center top",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
            <div 
              className="spinner"
              style={{ 
                width: "50px", 
                height: "50px", 
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #8362E5",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px"
              }}
            />
            Đang tải danh sách dự án...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "2rem 2rem 4rem 50px",
            background: "url('/Bg.svg') no-repeat center top",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
            <p style={{ color: "#e74c3c", marginBottom: "20px" }}>
              Không thể tải danh sách dự án. Vui lòng thử lại.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#8362E5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Thử lại
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem 2rem 4rem 50px",
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
          <Header />
          <DateButton />
        </div>
        <ProjectGrid projects={projects} />
      </main>
    </div>
  );
}

export default function ListProjectPage() {
  return (
    <ProtectedRoute>
      <ListProjectPageContent />
    </ProtectedRoute>
  );
}