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
