"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";

export default function StatisticPage() {
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
        
      </main>
    </div>
  );
}