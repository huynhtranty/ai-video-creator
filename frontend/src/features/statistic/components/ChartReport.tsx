"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUpIcon, BarChartIcon, PieChartIcon } from "lucide-react";

export default function ChartReport() {
  // Mock data for different charts
  const viewsData = [
    { name: 'T1', youtube: 5 },
    { name: 'T2', youtube: 8 },
    { name: 'T3', youtube: 3 },
    { name: 'T4', youtube: 12 },
    { name: 'T5', youtube: 7 },
    { name: 'T6', youtube: 15 },
  ];

  const engagementData = [
    { name: 'Likes', value: 75, color: '#3b82f6' },
    { name: 'Comments', value: 15, color: '#10b981' },
    { name: 'Shares', value: 5, color: '#f59e0b' },
    { name: 'Saves', value: 5, color: '#ef4444' },
  ];

  const performanceMetrics = [
    { metric: 'Generated Leads', value: 8, color: '#ef4444', target: 20 },
    { metric: 'Submitted Tickets', value: 2, color: '#10b981', target: 10 },
    { metric: 'Server Allocation', value: 25, color: '#3b82f6', target: 50 },
    { metric: 'Content Quality', value: 65, color: '#f59e0b', target: 80 },
  ];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; dataKey: string; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
          <BarChartIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Báo cáo chi tiết</h3>
          <p className="text-sm text-gray-600">Phân tích dữ liệu đa chiều</p>
        </div>
      </div>

      <Tabs defaultValue="views" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="views" className="flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4" />
            Lượt xem
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Tương tác
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            Hiệu suất
          </TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="space-y-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="youtube" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="youtube" stackId="1" stroke="#ef4444" fill="url(#youtube)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>YouTube</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {engagementData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                  <span className="text-sm font-bold text-gray-900">{metric.value}%</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${metric.value}%`, 
                      backgroundColor: metric.color,
                    }}
                  ></div>
                  <div 
                    className="absolute top-0 h-3 w-1 bg-gray-600 rounded-full"
                    style={{ left: `${metric.target}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current: {metric.value}%</span>
                  <span>Target: {metric.target}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-700 font-medium text-sm">
              📈 +2.1% tăng trưởng tài nguyên server so với tháng trước
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
