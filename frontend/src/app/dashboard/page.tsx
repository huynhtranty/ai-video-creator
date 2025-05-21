"use client";

import React from "react";
import Image from "next/image";
import './layout.css';
import Head from "next/head";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "50px", background: "#f4f4f4" }}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1rem" }}>
          {/* Button 0 */}
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
              <Image className="CreateType" src="/NewBtn.svg" alt="Create Button" width={30} height={30} />
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

          {/* Spacer to push buttons to the bottom */}
          <div style={{ flexGrow: 1 }}></div>

          {/* Button 4 */}
          <div className="flex flex-col items-center justify-center">
            <button className="w-10 h-10 flex items-center justify-center rounded-4xl p-1 hover:bg-pink-300 transition-colors">
              <Image className="NotificationType" src="/Notification.svg" alt="Notification Button" width={20} height={20} />
            </button>
          </div>

          {/* Button 5 */}
          <div className="flex flex-col items-center justify-center" style={{ marginBottom: "10px" }}>
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
          background: "url('/Bg.svg') no-repeat center top",
          backgroundSize: "cover",
        }}
      >
        <header
          style={{
            paddingBottom: "1rem",
            textAlign: "center",
            fontSize: "50px",
            fontFamily: "'Island Moments', cursive",
            fontStyle: "italic",
          }}
        >
          <h1>Welcome to VideoCut</h1>
        </header>

        {/* Search Bar */}
        <div style={{ textAlign: "center" }}>
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

        {/* Trending Section */}
        <section style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div
            className="trending-section"
            style={{
              margin: "1rem 0 3rem 0",
              width: "60%",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2
              className="trending-title"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                fontWeight: "bold",
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              Trending:
            </h2>

            <div
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "fit-content",
              }}
            >
              <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>#VideoEditing</p>
            </div>

            <div
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "fit-content",
              }}
            >
              <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>#VlogTips</p>
            </div>

            <div
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "fit-content",
              }}
            >
              <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>#AIinVideo</p>
            </div>

            <div
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "fit-content",
              }}
            >
              <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>#ShortsEditing</p>
            </div>
          </div>
        </section>

        {/* Recent Projects Section */}
        <section style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div className="list-project-section" style={{ marginTop: "5px", width: "90%" }}>
            <h2
              className="trending-title"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                fontWeight: "bold",
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              Dự án gần đây:
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    padding: "1rem",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#EEEEEE",
                  }}
                >
                  <img src="/videoTemp.svg" alt="Video 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "5px 15px", background: "white" }}>
                  <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
                </div>
              </div>

              <div>
                <div
                  style={{
                    padding: "1rem",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#EEEEEE",
                  }}
                >
                  <img src="/videoTemp.svg" alt="Video 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "5px 15px", background: "white" }}>
                  <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
                </div>
              </div>

              <div>
                <div
                  style={{
                    padding: "1rem",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#EEEEEE",
                  }}
                >
                  <img src="/videoTemp.svg" alt="Video 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "5px 15px", background: "white" }}>
                  <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
                </div>
              </div>

              <div>
                <div
                  style={{
                    padding: "1rem",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#EEEEEE",
                  }}
                >
                  <img src="/videoTemp.svg" alt="Video 4" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "5px 15px", background: "white" }}>
                  <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}