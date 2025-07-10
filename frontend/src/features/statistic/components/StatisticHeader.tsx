"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, TrendingUpIcon } from "lucide-react";

export default function StatisticHeader() {
  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <TrendingUpIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thống kê</h1>
            <p className="text-sm text-gray-600">Tổng quan hiệu suất nội dung</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {["Từ ngày", "Đến ngày"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 min-w-[70px]">{label}</span>
              <div className="relative">
                <input
                  type="date"
                  defaultValue={index === 0 ? "2025-03-01" : "2025-06-01"}
                  className="pl-10 pr-4 py-2 w-44 border border-gray-200 rounded-lg text-sm 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           bg-white/80 backdrop-blur-sm transition-all duration-200"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6">
            Cập nhật
          </Button>
        </div>
      </div>
    </Card>
  );
}
