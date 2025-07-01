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
    onError: () => {},
  });
};

export const generateImageForScript = async (context: string, prompt: string): Promise<string> => {
  const response = await apiClient.post("/contents/image", { context, prompt });
  const imageUrl = response.data.imageUrl || response.data;
  if (!imageUrl) {
    throw new Error('No image URL received from API');
  }
  
  return imageUrl;
};
