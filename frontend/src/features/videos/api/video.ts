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
        const response = await apiClient.get("/api/videos");
        return response.data;
      } catch (error) {
        // For testing purposes, return mock data if API fails
        console.warn("API call failed, using mock data:", error);
        return [
          {
            id: "1",
            title: "Sample Video 1",
            description: "This is a sample video for testing the modal functionality",
            filePath: "/videos/sample1.mp4",
            status: "COMPLETED" as const,
            platform: "YOUTUBE" as const,
            duration: 120,
            projectId: "project-1",
            userId: "user-1",
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            thumbnailUrl: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Video+1"
          },
          {
            id: "2",
            title: "Sample Video 2",
            description: "Another test video with different properties",
            filePath: "/videos/sample2.mp4",
            status: "PENDING" as const,
            platform: "TIKTOK" as const,
            duration: 45,
            projectId: "project-2",
            userId: "user-1",
            createdAt: "2024-01-16T14:20:00Z",
            updatedAt: "2024-01-16T14:20:00Z",
            thumbnailUrl: "https://broken-url-example.com/nonexistent-image.jpg"
          },
          {
            id: "3",
            title: "Long Title Video That Should Be Truncated in the Grid View",
            description: "This video has a very long description that should be truncated in the grid view to test the ellipsis functionality and see how it handles overflow text",
            filePath: "/videos/sample3.mp4",
            status: "FAILED" as const,
            platform: "FACEBOOK" as const,
            duration: 180,
            projectId: "project-3",
            userId: "user-1",
            createdAt: "2024-01-17T09:15:00Z",
            updatedAt: "2024-01-17T09:15:00Z",
            thumbnailUrl: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Video+3"
          },
          {
            id: "4",
            title: "Video Without Thumbnail",
            description: "This video has no thumbnail URL to test the fallback display",
            filePath: "/videos/sample4.mp4",
            status: "COMPLETED" as const,
            platform: "NONE" as const,
            duration: 60,
            projectId: "project-4",
            userId: "user-1",
            createdAt: "2024-01-18T16:45:00Z",
            updatedAt: "2024-01-18T16:45:00Z",
            thumbnailUrl: ""
          },
          {
            id: "5",
            title: "Another Broken Image Test",
            description: "Testing with another broken image URL",
            filePath: "/videos/sample5.mp4",
            status: "PENDING" as const,
            platform: "YOUTUBE" as const,
            duration: 95,
            projectId: "project-5",
            userId: "user-1",
            createdAt: "2024-01-19T11:30:00Z",
            updatedAt: "2024-01-19T11:30:00Z",
            thumbnailUrl: "https://invalid-domain-for-testing.xyz/image.png"
          }
        ] as Video[];
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
