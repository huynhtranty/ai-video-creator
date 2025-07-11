"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { HeartIcon, PlayCircleIcon, UsersIcon, TrendingUpIcon } from "lucide-react";

export default function LikeAndVideoCard() {
  const stats = [
    {
      title: "Tổng số lượt thích",
      subtitle: "YouTube",
      value: "3",
      change: "+50%",
      icon: HeartIcon,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      details: [
        { platform: "YouTube", count: "3", color: "bg-red-500" },
      ]
    },
    {
      title: "Tổng số Video",
      subtitle: "YouTube", 
      value: "1",
      change: "+100%",
      icon: PlayCircleIcon,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      details: [
        { platform: "YouTube", count: "1", color: "bg-red-500" },
      ]
    },
    {
      title: "Tổng số người theo dõi",
      subtitle: "YouTube",
      value: "28.1K",
      change: "+25.1%",
      icon: UsersIcon,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      details: [
        { platform: "YouTube", count: "28.1K", color: "bg-red-500" },
      ]
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`p-6 bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUpIcon className="h-4 w-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className={`h-1 w-full rounded-full bg-gradient-to-r ${stat.gradient} opacity-60`}></div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nền tảng</p>
            {stat.details.map((detail, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${detail.color}`}></div>
                  <span className="text-sm text-gray-600">{detail.platform}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{detail.count}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
