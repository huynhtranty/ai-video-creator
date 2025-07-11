"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import StatisticHeader from "@/features/statistic/components/StatisticHeader";
import ChartReport from "@/features/statistic/components/ChartReport";
import StatisticCards from "@/features/statistic/components/StatisticCards";
import LikeAndVideoCard from "@/features/statistic/components/LikeAndVideoCard";

export default function StatisticPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      <main className="ml-[50px] h-full overflow-auto">
        <div className="min-h-full p-6 space-y-6">
          <StatisticHeader />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ChartReport />
            </div>
            <div className="xl:col-span-1">
              <StatisticCards />
            </div>
          </div>
          <LikeAndVideoCard />
        </div>
      </main>
    </div>
  );
}
