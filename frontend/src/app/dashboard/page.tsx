"use client";

import React from "react";
import Sidebar from "@/features/auth/components/dashboard/Sidebar";
import Header from "@/features/auth/components/dashboard/Header";
import SearchBar from "@/features/auth/components/dashboard/SearchBar";
import TrendingSection from "@/features/auth/components/dashboard/TrendingSection";
import RecentProjectsSection from "@/features/auth/components/dashboard/RecentProjectsSection";
import "./layout.css";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "5rem 0 0 0",
          background: "url('/Bg.svg') no-repeat center top",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <SearchBar />
        <TrendingSection />
        <RecentProjectsSection />
      </main>
    </div>
  );
}