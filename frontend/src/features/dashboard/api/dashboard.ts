import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

// Types for dashboard data
interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  totalVideos: number;
}

interface RecentProject {
  id: string;
  title: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  updatedAt: string;
  thumbnailUrl?: string;
}

interface TrendingItem {
  id: string;
  title: string;
  category: string;
  views: number;
  likes: number;
}

interface DashboardData {
  stats: DashboardStats;
  recentProjects: RecentProject[];
  trending: TrendingItem[];
}

export const useDashboard = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await apiClient.get("/dashboard");
      return response.data;
    },
  });
};