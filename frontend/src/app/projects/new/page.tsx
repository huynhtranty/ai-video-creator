"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/projects/components/HeaderSection";
import TextInput from "@/features/projects/components/TextInput";
import ResourceSection from "@/features/projects/components/ResourceSection";


export default function CreateVideoPage() {
  const data = {
    title: "Một cái tiêu đề gì đó",
    context: "Một cái ngữ cảnh gì đó để sinh ảnh cho giống nhau",
    contents: [
      {
        description: "Một cái mô tả gì đó",
        image: "https://www.shutterstock.com/image-photo/awesome-pic-natureza-600nw-2408133899.jpg",
        subtitles: [
          {
            text: "Một cái phụ đề gì đó",
            audio: "https://pub-647c59c8fa3c4daaae41ac0c0be27bf1.r2.dev/7da18f79-494b-4019-b186-037f9deaa8d2.mp3",
            duration: 10000,
          },
          {
            text: "Một cái phụ đề khác",
            audio: "https://pub-647c59c8fa3c4daaae41ac0c0be27bf1.r2.dev/7da18f79-494b-4019-b186-037f9deaa8d2.mp3",
            duration: 15000,
          },
        ]
      },
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý dữ liệu khi người dùng nhấn nút "Tạo video"
    alert("Data: " + JSON.stringify(data, null, 2));
  }

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
          <HeaderSection onSubmit={handleSubmit} />
          <TextInput />
        </div>
        <ResourceSection />
      </main>
    </div>
  );
}