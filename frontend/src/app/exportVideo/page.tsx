// D:\OneDrive - VNU-HCMUS\OneDrive - VNU-HCMUS\HCMUS - The third year\HK2\github\ai-video-creator\frontend\src\app\exportVideo\page.tsx
"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import MainContent from "@/features/exportVideo/components/MainContent";

export default function ExportVideoPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <MainContent />
    </div>
  );
}