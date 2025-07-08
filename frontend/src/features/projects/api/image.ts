import apiClient from "@/lib/api-client";
import { ImageRequest, ImageResponse } from "@/types/resource";

export const generateImageForScript = async (request: ImageRequest): Promise<ImageResponse> => {
  const response = await apiClient.post("/contents/image/generate", request);
  const data = response.data;
  return data;
};

export const regenerateScriptImage = async (
  scriptId: string,
  provider: string = "gemini-image"
): Promise<ImageResponse> => {
  const response = await apiClient.post(`/contents/image/${scriptId}/regenerate`, {
    provider: provider
  });
  return response.data;
};

export const uploadImageFile = async (
  file: File,
  projectId: string,
  scriptId: string
): Promise<ImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);
  formData.append('scriptId', scriptId);

  const response = await apiClient.post("/contents/image/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
