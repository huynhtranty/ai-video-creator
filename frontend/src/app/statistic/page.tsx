"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import StatisticHeader from "@/features/statistic/components/StatisticHeader";
import ChartReport from "@/features/statistic/components/ChartReport";
import StatisticCards from "@/features/statistic/components/StatisticCards";
import LikeAndVideoCard from "@/features/statistic/components/LikeAndVideoCard";

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
          <StatisticHeader />
          <div style={{ display: "flex", gap: "2rem" }}>
            <ChartReport />
            <StatisticCards />
          </div>
          <LikeAndVideoCard />
        </div>
      </main>
    </div>
  );
}
