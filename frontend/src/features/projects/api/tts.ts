import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { TtsRequest, TtsResponse } from "@/types/resource";

export const useGenerateTts = () => {
  return useMutation<TtsResponse, Error, TtsRequest>({
    mutationFn: async (data: TtsRequest) => {
      const response = await apiClient.post("/api/tts", data);
      return response.data;
    },
    onError: () => {},
  });
};

export const generateTtsForScript = async (request: TtsRequest): Promise<TtsResponse> => {
  const response = await apiClient.post("/contents/voice/generate", request);
  return response.data;
};

export const uploadVoiceFile = async (
  file: File,
  projectId: string,
  scriptId: string
): Promise<TtsResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);
  formData.append('scriptId', scriptId);

  const response = await apiClient.post("/contents/voice/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const regenerateScriptVoice = async (
  scriptId: string,
  provider: string = "google"
): Promise<TtsResponse> => {
  const response = await apiClient.post(`/contents/voice/${scriptId}/regenerate`, {
    provider: provider
  });
  return response.data;
};
