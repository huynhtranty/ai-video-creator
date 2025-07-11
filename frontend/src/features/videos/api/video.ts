import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

// Video type based on the backend VideoDto
export interface Video {
  id: string;
  title: string;
  description?: string;
  filePath: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  platform: "NONE" | "YOUTUBE" | "TIKTOK" | "FACEBOOK";
  duration: number;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

// Create video request type
export interface CreateVideoRequest {
  title: string;
  description?: string;
  filePath: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  platform: "NONE" | "YOUTUBE" | "TIKTOK" | "FACEBOOK";
  duration: number;
  projectId: string;
  userId?: string; // Optional since backend gets it from auth context
}

export const useListVideos = () => {
  return useQuery<Video[], Error>({
    queryKey: ['videos'],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/videos");
        return response.data;
      } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
      }
    },
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Video, Error, CreateVideoRequest>({
    mutationFn: async (data: CreateVideoRequest) => {
      const response = await apiClient.post("/api/videos", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch videos after successful creation
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
    onError: (error) => {
      console.error("Error creating video:", error);
    },
  });
};
