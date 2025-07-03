"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import SearchBar from "@/features/projects/components/SearchBar";
import Header from "@/features/projects/components/Header";
import DateButton from "@/features/projects/components/DateButton";
import ProjectGrid from "@/features/projects/components/ProjectGrid";

export default function ListProjectPage() {
  const projects = [
    { id: "1-my-first-video", alt: "Video 1", title: "My First Video" },
    { id: "2-tutorial-video", alt: "Video 2", title: "Tutorial Video" },
    { id: "3-product-demo", alt: "Video 3", title: "Product Demo" },
    { id: "4-marketing-video", alt: "Video 4", title: "Marketing Video" },
    { id: "5-educational-content", alt: "Video 5", title: "Educational Content" },
    { id: "6-presentation-video", alt: "Video 6", title: "Presentation Video" },
    { id: "7-social-media-post", alt: "Video 7", title: "Social Media Post" },
    { id: "8-explainer-video", alt: "Video 8", title: "Explainer Video" },
    { id: "9-brand-story", alt: "Video 9", title: "Brand Story" },
  ];
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