import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

interface TopicSummaryResponse {
  summary: string;
}

export const useTrending = () => {
  return useQuery<string[], Error>({
    queryKey: ['trending'],
    queryFn: async () => {
      const response = await apiClient.get("/topics/trending");
      return response.data;
    },
  });
};

export const useTopicSummary = (keyword: string, enabled: boolean = true) => {
  return useQuery<TopicSummaryResponse, Error>({
    queryKey: ['topic-summary', keyword],
    queryFn: async () => {
      const response = await apiClient.get(`/topics/summary?keyword=${encodeURIComponent(keyword)}`);
      return response.data;
    },
    enabled: enabled && !!keyword,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour (cache time)
    retry: 2,
  });
};
