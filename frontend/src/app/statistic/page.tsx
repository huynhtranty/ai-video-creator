"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { MarginIcon } from "@radix-ui/react-icons";

export default function StatisticPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2.5rem 0 0 0",
          background: "url('/Bg.svg') no-repeat center top",
          backgroundSize: "cover",
          position: "relative",
          marginLeft: "50px",
        }}
      >
        <div style={{ padding: "0 1.25rem" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2.5rem",
            }}
          >
            <h1 style={{ color: "#000", fontSize: "2rem", fontWeight: "bold" }}>
              Thống kê
            </h1>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {/* Start Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ padding: "0.5rem", fontSize: "16px" }}>Từ ngày</span>
                <input
                  type="date"
                  defaultValue="2025-03-01"
                  style={{
                    padding: "0.5rem 1rem",
                    width: "350px",
                    height: "50px",
                    border: "2px solid transparent",
                    borderRadius: "20px",
                    outline: "none",
                    fontSize: "16px",
                    background:
                      "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {/* End Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ padding: "0.5rem", fontSize: "16px" }}>Đến ngày</span>
                <input
                  type="date"
                  defaultValue="2025-06-01"
                  style={{
                    padding: "0.5rem 1rem",
                    width: "350px",
                    height: "50px",
                    border: "2px solid transparent",
                    borderRadius: "20px",
                    outline: "none",
                    fontSize: "16px",
                    background:
                      "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", gap: "2rem" }}>
            {/* Chart Box */}
            <div
              style={{
                flex: 1,
                background: "#fff",
                padding: "1.5rem 1.5rem 0 1.5rem",
                borderRadius: "10px",
              }}
            >
              <h3 style={{ fontWeight: "bold", paddingBottom: "10px" }}>
                CHART REPORTS
              </h3>

              {/* Progress Bars */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", gap: "200px" }}>
                <div>
                  <p>63% Generated Leads</p>
                  <div style={{ width: "300px", background: "#ddd", borderRadius: "5px" }}>
                    <div style={{ width: "63%", height: "10px", background: "#ff4d4f", borderRadius: "5px" }}></div>
                  </div>
                </div>
                <div>
                  <p>32% Submitted Tickets</p>
                  <div style={{ width: "300px", background: "#ddd", borderRadius: "5px" }}>
                    <div style={{ width: "32%", height: "10px", background: "#52c41a", borderRadius: "5px" }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", gap: "200px" }}>
                <div>
                  <p>71% Server Allocation</p>
                  <div style={{ width: "300px", background: "#ddd", borderRadius: "5px" }}>
                    <div style={{ width: "71%", height: "10px", background: "#1890ff", borderRadius: "5px" }}></div>
                  </div>
                </div>
                <div>
                  <p>41% Generated Leads</p>
                  <div style={{ width: "300px", background: "#ddd", borderRadius: "5px" }}>
                    <div style={{ width: "41%", height: "10px", background: "#fa8c16", borderRadius: "5px" }}></div>
                  </div>
                </div>
              </div>

              <p style={{ color: "#fa8c16" }}>+17.5% increased server resources</p>
              <div style={{ width: "100%", marginTop: "1rem" }}>
                <img
                  src="/chart-temp 1.svg"
                  alt="Chart"
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* Stats Cards with Icons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", flex: 1 }}>
              {[
                {
                  title: "Tổng tất cả lượt xem",
                  value: "10K",
                  icon: "/View-Statistic.svg",
                  bg: "linear-gradient(to bottom, #4FF900, #ffffff)",
                  border: "2px solid #1890ff",
                  iconWidth: "80px",
                  iconHeight: "80px",
                  iconMargin: "5px 0 5px 0", // Custom margin for View-Statistic
                },
                {
                  title: "Số lượt xem trên Youtube",
                  value: "10K",
                  icon: "/Youtube-Statistic.svg",
                  bg: "linear-gradient(to bottom, #ff4d4f, #ffffff)",
                  iconWidth: "55px",
                  iconHeight: "65px",
                  iconMargin: "15px 0 12px 0", // Custom margin for Youtube-Statistic
                },
                {
                  title: "Số lượt xem trên Facebook",
                  value: "10K",
                  icon: "/Fb-Statistic.svg",
                  bg: "linear-gradient(to bottom, #3F00EA, #ffffff)",
                  iconWidth: "70px",
                  iconHeight: "70px",
                  iconMargin: "10px 0 8px 0", // Custom margin for Fb-Statistic
                },
                {
                  title: "Số lượt xem trên Tiktok",
                  value: "10K",
                  icon: "/Tiktok-Statistic.svg",
                  bg: "linear-gradient(to bottom, #434343, #ffffff)",
                  iconWidth: "70px",
                  iconHeight: "70px",
                  iconMargin: "12px 0 7px 0", // Custom margin for Tiktok-Statistic
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: item.bg,
                    borderRadius: "20px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    ...(item.border ? { border: item.border } : {}),
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        width: item.iconWidth,
                        height: item.iconHeight,
                        objectFit: "contain",
                        margin: item.iconMargin,
                      }}
                    />
                  </div>
                  <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{item.title}</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Likes and Video Count */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
            <div style={{ flex: 1, background: "#bae0ff", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
              <p>Tổng số lượt thích trên các nền tảng</p>
              <p style={{ fontSize: "2rem", color: "#fff" }}>10K</p>
            </div>
            <div style={{ flex: 1, background: "#d9f7be", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
              <p>Tổng số Video trên các nền tảng</p>
              <p style={{ fontSize: "2rem", color: "#fff" }}>10K</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}