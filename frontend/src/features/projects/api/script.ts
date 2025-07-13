import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ScriptRequest, ScriptResponse, ScriptItemResponse } from "@/types/resource";

export const useGenerateScript = () => {
  return useMutation<ScriptResponse, Error, ScriptRequest>({
    mutationFn: async (data: ScriptRequest) => {
      await apiClient.delete(`/projects/${data.projectId}/assets`);
      const response = await apiClient.post("/contents/script/generate", data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error generating script:", error);
    },
  });
};

export const updateScriptContent = async (
  scriptId: string,
  content: string
): Promise<ScriptItemResponse> => {
  const response = await apiClient.put(`/contents/script/${scriptId}`, {
    content: content
  });
  return response.data;
};

export const regenerateScriptContent = async (
  scriptId: string,
  provider: string = "gemini-script",
  settings?: {
    style?: string;
    model?: string;
  }
): Promise<ScriptItemResponse> => {
  const response = await apiClient.post(`/contents/script/${scriptId}/regenerate`, {
    provider: provider,
    ...(settings && {
      scriptStyle: settings.style,
      scriptModel: settings.model,
    })
  });
  return response.data;
};