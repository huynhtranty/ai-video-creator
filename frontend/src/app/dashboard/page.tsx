"use client";

import React from "react";
import Image from "next/image";
import './layout.css';

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "50px", background: "#f4f4f4"}}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem"

        }}>
          {/* Button 0*/}
          <div className="pt-4 flex flex-col items-center justify-center"> 
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Image className="MenuType" src="/detailBtn.svg" alt="Menu Button" width={20} height={20} />
            </button>
            <span className="HomeSpan">Menu</span>
          </div>

          
          {/* Button 1 */}
          <div className="pt-4 flex flex-col items-center justify-center"> 
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Image className="homeImageType" src="/HomeBtn.svg" alt="Home Button" width={20} height={20} />
            </button>
            <span className="HomeSpan">Home</span>
          </div>

          {/* Button 2 */}
          <div className="pt-1 flex flex-col items-center justify-center"> 
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Image className="CreateType" src="/NewBtn.svg" alt="Create Button" width={20} height={20} />
            </button>
            <span className="HomeSpan">Tạo</span>
          </div>

          {/* Button 3 */}
          <div className="pt-1 flex flex-col items-center justify-center"> 
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Image className="ProjectType" src="/ProjectBtn.svg" alt="Project Button" width={20} height={20} />
            </button>
            <span className="HomeSpan">Dự án</span>
          </div>

          {/* Button 4 */}
          <div className="pt-64 flex flex-col items-center justify-center"> 
            <button className="w-10 h-10 flex items-center justify-center rounded-4xl p-1 hover:bg-pink-300 transition-colors">
              <Image className="NotificationType" src="/Notification.svg" alt="Notification Button" width={20} height={20} />
            </button>
            <span className="HomeSpan">Thông báo</span>
          </div>
          {/* Button 5 */}
          <div className="pt-0 flex flex-col items-center justify-center"> 
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Image className="AvatarType" src="/Avatar.svg" alt="Avatar" width={30} height={30} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "5rem 0 0 0",
          background: "url('/Bg.svg') no-repeat center top", // Replace with your image path
          backgroundSize: "covers", // Ensures the image covers the entire area
        }}
      >
        <header
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "1rem",
            textAlign: "center",
            fontSize: "24px",
            fontFamily: "'Island Moments', cursive",
            fontStyle: "italic", // <-- Sử dụng fontStyle thay vì fontWeight nếu muốn nghiêng
          }}
        >
          <h1>Welcome to VideoCut</h1>

        </header>

        {/* Khung tìm kiếm */}
        <div style={{
          textAlign: "center",
        }}>
          <input
            type="text"
            placeholder="Tìm kiếm hoặc nhập chủ đề..."
            style={{
              marginTop: "1rem",
              padding: "0.5rem 4rem",
              width: "60%",
              height: "110px",
              border: "2px solid transparent",
              borderRadius: "20px",
              outline: "none",
              fontSize: "16px",
              transition: "box-shadow 0.2s ease-in-out",
              background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        <section style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div className="trending-section" style={{ marginTop: "1rem", width: "60%" }}>
            <h2 className="trending-title" style={{
              fontSize: "20px",
              marginBottom: "1rem",
              fontWeight: "bold",
              fontFamily: "'Segoe UI', sans-serif",
            }}>
              Trending:
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}>
              {/* Chủ đề 1 */}
              <div style={{
                padding: "1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "14px", color: "#555" }}>#VideoEditing</p>
              </div>

              {/* Chủ đề 2 */}
              <div style={{
                padding: "1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "14px", color: "#555" }}>#VlogTips</p>
              </div>

              {/* Chủ đề 3 */}
              <div style={{
                padding: "1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "14px", color: "#555" }}>#AIinVideo</p>
              </div>

              {/* Chủ đề 4 */}
              <div style={{
                padding: "1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "14px", color: "#555" }}>#ShortsEditing</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
