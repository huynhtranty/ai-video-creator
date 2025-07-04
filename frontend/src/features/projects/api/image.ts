import apiClient from "@/lib/api-client";

export interface ImageRequest {
  prompt: string;
  context: string;
  provider: string;
  projectId: string;
  scriptId: string;
}

export interface ImageResponse {
  id: string;
  text: string;
  provider: string;
  url: string;
  projectId: string;
  scriptId: string;
}

export const generateImageForScript = async (request: ImageRequest): Promise<ImageResponse> => {
  return await apiClient.post("/contents/image/generate", request);
};
