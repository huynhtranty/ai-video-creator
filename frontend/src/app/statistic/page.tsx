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
          padding: "2.5rem 0 0 0",
          background: "url('/Bg.svg') no-repeat center top",
          backgroundSize: "cover",
          position: "relative",
          marginLeft: "50px",
        }}
      >
        <div style={{ padding: "0 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
            <h1 style={{ color: "#000", fontSize: "2rem", fontWeight: "bold" }}>Thống kê</h1>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ padding: "0.5rem", borderRadius: "20px", fontSize: "16px" }}>Từ ngày</span>
                <input
                  id="startDate"
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
                    transition: "box-shadow 0.2s ease-in-out",
                    background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
                  }}
                  onFocus={(e) => { e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)"; }}
                  onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ padding: "0.5rem", borderRadius: "20px", fontSize: "16px" }}>Đến ngày</span>
                <input
                  id="endDate"
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
                    transition: "box-shadow 0.2s ease-in-out",
                    background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
                  }}
                  onFocus={(e) => { e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)"; }}
                  onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
            <div style={{ flex: 1, background: "#fff", padding: "1.5rem 1.5rem 0rem 1.5rem", borderRadius: "10px" }}>
              <h3 style={{ fontWeight: "bold", paddingBottom: "10px" }}>CHART REPORTS</h3>
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
              <div style={{ height: "100%", width: "100%"}}>
                <img
                  src="/chart-temp 1.svg"
                  alt="Chart"
                  style={{
                    maxHeight: "100%",
                    width: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", flex: 1 }}>
              <div style={{ background: "#95de64", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
                <p>Tổng lượt xem</p>
                <p style={{ fontSize: "2rem", color: "#fff" }}>10K</p>
              </div>
              <div style={{ background: "#ff4d4f", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
                <p>Số lượt xem trên Youtube</p>
                <p style={{ fontSize: "2rem", color: "#fff" }}>10K</p>
              </div>
              <div style={{ background: "#597ef7", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
                <p>Số lượt xem trên Facebook</p>
                <p style={{ fontSize: "2rem", color: "#fff" }}>10K</p>
              </div>
              <div style={{ background: "#434343", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
                <p>Số lượt xem trên Tiktok</p>
                <p style={{ fontSize: "2rem", color: "#fff" }}>10K</p>
              </div>
            </div>
          </div>

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
