import apiClient from "@/lib/api-client";
import { ImageRequest, ImageResponse } from "@/types/resource";

export const generateImageForScript = async (request: ImageRequest): Promise<ImageResponse> => {
  const response = await apiClient.post("/contents/image/generate", request);
  const data = response.data;
  return data;
};
