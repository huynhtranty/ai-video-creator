"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import SearchBar from "@/features/list-video/components/SearchBar";
import Header from "@/features/list-video/components/Header";
import DateButton from "@/features/list-video/components/DateButton";
import VideoGrid from "@/features/list-video/components/VideoGrid";
import { useListVideos } from "@/features/videos/api/video";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function ListVideoPageContent() {
  const { data: videos = [], isLoading, error } = useListVideos();

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
            Đang tải danh sách video...
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
              Không thể tải danh sách video. Vui lòng thử lại.
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
        <VideoGrid videos={videos} />
      </main>
    </div>
  );
}

export default function ListVideoPage() {
  return (
    <ProtectedRoute>
      <ListVideoPageContent />
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </ProtectedRoute>
  );
}