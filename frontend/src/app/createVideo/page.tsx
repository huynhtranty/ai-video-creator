"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/createVideo/components/HeaderSection";
import TextInput from "@/features/createVideo/components/TextInput";
import ResourceSection from "@/features/createVideo/components/ResourceSection";
import ResourceItem from "@/features/createVideo/components/ResourceItem";
import "../dashboard/layout.css";

export default function CreateVideoPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "1rem 2rem",
          backgroundSize: "cover",
          marginLeft: "50px", // Đảm bảo main không bị che bởi Sidebar cố định
        }}
        className="overflow-hidden" // Ngăn main cuộn toàn bộ
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white", // Đảm bảo phần cố định không bị trong suốt
            paddingBottom: "10px", // Khoảng cách dưới cùng
          }}
        >
          <HeaderSection />
          <TextInput />
        </div>
        <ResourceSection />
      </main>
    </div>
  );
}