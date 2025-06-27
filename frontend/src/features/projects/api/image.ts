import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

export interface ImageRequest {
  context: string;
  prompt: string;
}

export interface ImageResponse {
  imageUrl: string;
}

export const useGenerateImage = () => {
  return useMutation<ImageResponse, Error, ImageRequest>({
    mutationFn: async (data: ImageRequest) => {
      const response = await apiClient.post("/contents/image", data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error generating image:", error);
    },
  });
};

export const generateImageForScript = async (context: string, prompt: string): Promise<string> => {
  try {
    const response = await apiClient.post("/contents/image", { context, prompt });
    return response.data.imageUrl || response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    // Return a fallback image on error
    const mockImages = ["/rand1.svg", "/rand2.svg", "/rand3.svg"];
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  }
};
