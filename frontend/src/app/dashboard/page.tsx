"use client";

import React, { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import Header from "@/features/dashboard/components/Header";
import NewProjectBar from "@/features/dashboard/components/NewProjectBar";
import TrendingSection from "@/features/dashboard/components/TrendingSection";
import RecentProjectsSection from "@/features/dashboard/components/RecentProjectsSection";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  const [projectInput, setProjectInput] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  const handleKeywordClick = (keyword: string, summary: string) => {
    const formattedPrompt = `${summary}\n\nHãy tạo một video với đề tài ${keyword}`;
    setProjectInput(formattedPrompt);
    setProjectTitle(keyword);
  };

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "4rem 0 0 0",
            background: "url('/Bg.svg') no-repeat center top",
            backgroundSize: "cover",
          }}
        >
          <Header />
          <NewProjectBar 
            externalTitle={projectTitle}
            externalInput={projectInput}
            onInputChange={setProjectInput}
          />
          <TrendingSection onKeywordClick={handleKeywordClick} />
          <RecentProjectsSection />
        </main>
      </div>
    </ProtectedRoute>
  );
}