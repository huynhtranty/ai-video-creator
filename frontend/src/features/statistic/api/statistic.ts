import apiClient from "@/lib/api-client";

export interface VideoStats {
  views: number;
  likes: number;
  comments: number;
}

export interface VideoOverallStats {
  totalVideos: number;
  totalViews: number;
  youtubeViews: number;
  totalLikes: number;
  totalComments: number;
}

export const getYouTubeVideoStats = async (youtubeId: string): Promise<VideoStats> => {
  const response = await apiClient.get<VideoStats>(`/videos/youtube/${youtubeId}/analytics`);
  return response.data;
};

export const calculateOverallStats = (videoStats: VideoStats[]): VideoOverallStats => {
  const totalVideos = videoStats.length;
  const totalViews = videoStats.reduce((sum, stat) => sum + stat.views, 0);
  const totalLikes = videoStats.reduce((sum, stat) => sum + stat.likes, 0);
  const totalComments = videoStats.reduce((sum, stat) => sum + stat.comments, 0);
  
  return {
    totalVideos,
    totalViews,
    youtubeViews: totalViews, // All stats are from YouTube
    totalLikes,
    totalComments
  };
};

export const getAllVideoStats = async (): Promise<VideoStats[]> => {
  const response = await apiClient.get<VideoStats[]>("/videos/stats");
  return response.data;
};
