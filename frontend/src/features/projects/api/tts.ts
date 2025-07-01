import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

export interface TtsRequest {
  text: string;
  languageCode: string;
  speakingRate: number;
  gender: string;
  projectId: string;
  provider: string;
}

export interface TtsResponse {
  audioUrl: string;
  format: string;
  projectId: string;
}

export const useGenerateTts = () => {
  return useMutation<TtsResponse, Error, TtsRequest>({
    mutationFn: async (data: TtsRequest) => {
      const response = await apiClient.post("/api/tts", data);
      return response.data;
    },
    onError: () => {},
  });
};

export const generateTtsForScript = async (
  text: string,
  languageCode: string = "vi",
  speakingRate: number = 1.0,
  gender: string = "MALE",
  projectId: string = "3a442ec5-cdfa-4a4c-9f11-e43afa59ba05",
  provider: string = "google"
): Promise<string> => {
  const response = await apiClient.post("/api/tts", {
    text,
    languageCode,
    speakingRate,
    gender,
    projectId,
    provider,
  });
  const audioUrl = response.data.audioUrl || response.data;
  if (!audioUrl) {
    throw new Error('No audio URL received from API');
  }
  
  return audioUrl;
};
