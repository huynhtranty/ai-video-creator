"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, EyeIcon, PlayIcon, HeartIcon, MessageCircleIcon, VideoIcon } from "lucide-react";
import { getAllVideoStats, VideoOverallStats, calculateOverallStats } from "../api/statistic";

export default function StatisticCards() {
  const [stats, setStats] = useState<VideoOverallStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const videoStatsArray = await getAllVideoStats();
        const overallStats = calculateOverallStats(videoStatsArray);
        setStats(overallStats);
      } catch (error) {
        console.error('Failed to fetch video stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="p-4 bg-gray-100 animate-pulse">
            <div className="h-20"></div>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Tổng số video",
      value: stats?.totalVideos?.toLocaleString() || "0",
      change: "+12%",
      trend: "up",
      icon: VideoIcon,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Tổng lượt xem",
      value: stats?.totalViews?.toLocaleString() || "0",
      change: "+25%",
      trend: "up",
      icon: EyeIcon,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Lượt xem YouTube",
      value: stats?.youtubeViews?.toLocaleString() || "0",
      change: "+25%", 
      trend: "up",
      icon: PlayIcon,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Tổng lượt thích",
      value: stats?.totalLikes?.toLocaleString() || "0",
      change: "+18%",
      trend: "up",
      icon: HeartIcon,
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      title: "Tổng bình luận",
      value: stats?.totalComments?.toLocaleString() || "0",
      change: "+15%",
      trend: "up",
      icon: MessageCircleIcon,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
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
