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
  youtubeId?: string; // Add youtubeId to Video type
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

// Update video request type for status, platform, title, description
export interface UpdateVideoRequest {
  status?: string;
  platform?: string;
  title?: string;
  description?: string;
}

// YouTube upload request type
export interface YouTubeUploadRequest {
  file: File;
  title: string;
  description: string;
  videoId: string; // Required for backend
}

// TikTok upload request type (simpler - only needs file and title)
export interface TikTokUploadRequest {
  file: File;
  title: string;
}

// Generic upload response type for all platforms
export interface PlatformUploadResponse {
  message: string;
  videoId?: string;
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
      const response = await apiClient.post("/videos", data);
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

// Use PUT /videos/:id/status for updating video
export const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation<Video, Error, { id: string; data: UpdateVideoRequest }>({
    mutationFn: async ({ id, data }) => {
      const params = new URLSearchParams();
      if (data.status) params.append('status', data.status);
      if (data.platform) params.append('platform', data.platform);
      if (data.title) params.append('title', data.title);
      if (data.description) params.append('description', data.description);
      const response = await apiClient.put(`/videos/${id}/status?${params.toString()}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (error) => {
      console.error("Error updating video:", error);
    },
  });
};

export const useUploadToYouTube = () => {
  return useMutation<PlatformUploadResponse, Error, YouTubeUploadRequest>({
    mutationFn: async (data: YouTubeUploadRequest) => {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('VideoId', data.videoId); // Required by backend
      const response = await apiClient.post("/upload/youtube", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Error uploading to YouTube:", error);
    },
  });
};

export const useUploadToTikTok = () => {
  return useMutation<PlatformUploadResponse, Error, TikTokUploadRequest>({
    mutationFn: async (data: TikTokUploadRequest) => {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('title', data.title);

      const response = await apiClient.post("/upload/tiktok", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Error uploading to TikTok:", error);
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (videoId: string) => {
      await apiClient.delete(`/videos/${videoId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
    onError: (error) => {
      console.error("Error deleting video:", error);
    },
  });
};

// YouTube statistics type based on backend's VideoStats
export interface YouTubeStats {
  views: number;
  likes: number;
  comments: number;
}

// Fetch YouTube stats for a video by its YouTube videoId (not UUID)
export const useGetYouTubeStats = (youtubeId: string) => {
  return useQuery<YouTubeStats | null, Error>({
    queryKey: ["youtubeStats", youtubeId],
    enabled: !!youtubeId,
    queryFn: async () => {
      if (!youtubeId) return null;
      const response = await apiClient.get(`/videos/youtube/${youtubeId}/analytics`);
      return response.data;
    },
  });
};
