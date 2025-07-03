import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ScriptRequest, ScriptResponse } from "@/types/script";

export const useGenerateScript = () => {
  return useMutation<ScriptResponse, Error, ScriptRequest>({
    mutationFn: async (data: ScriptRequest) => {
      const response = await apiClient.post("/contents/script/generate", data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error generating script:", error);
    },
  });
};