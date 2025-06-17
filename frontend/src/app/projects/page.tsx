"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import SearchBar from "@/features/projects/components/SearchBar";
import Header from "@/features/projects/components/Header";
import DateButton from "@/features/projects/components/DateButton";
import ProjectGrid from "@/features/projects/components/ProjectGrid";

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