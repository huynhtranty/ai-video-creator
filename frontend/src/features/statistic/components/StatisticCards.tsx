"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, EyeIcon, PlayIcon, MonitorIcon } from "lucide-react";

export default function StatisticCards() {
  const cards = [
    {
      title: "Tổng tất cả lượt xem",
      value: "12.5K",
      change: "+15.3%",
      trend: "up",
      icon: EyeIcon,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Số lượt xem trên Youtube",
      value: "8.2K",
      change: "+12.1%", 
      trend: "up",
      icon: PlayIcon,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    }
  ];

  return (
    <div className="space-y-4">
      {cards.map((item, i) => (
        <Card key={i} className={`p-4 bg-gradient-to-r ${item.bgGradient} border-0 shadow-md hover:shadow-lg transition-all duration-300 group`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 leading-tight">{item.title}</p>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend === 'up' ? (
                      <TrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3" />
                    )}
                    <span>{item.change}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${item.gradient} opacity-60`}></div>
                  <p className="text-xs text-gray-500 mt-1">so với tháng trước</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
