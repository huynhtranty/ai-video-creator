import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Project, CreateProjectRequest, UpdateProjectRequest } from "@/types/project";

export const useCreateProject = () => {
  return useMutation<Project, Error, CreateProjectRequest>({
    mutationFn: async (data: CreateProjectRequest) => {
      const response = await apiClient.post("/projects", data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });
};

export const useListProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await apiClient.get("/projects");
      return response.data;
    },
  });
};

export const useListRecentProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ['projects', 'recent'],
    queryFn: async () => {
      const response = await apiClient.get("/projects?v=recent");
      return response.data;
    },
  });
};

export const useGetProject = (projectId?: string) => {
  return useQuery<Project, Error>({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await apiClient.get(`/projects/${projectId}`);
      return response.data;
    },
    enabled: !!projectId,
  });
};

export const useUpdateProject = () => {
  return useMutation<Project, Error, { id: string; data: UpdateProjectRequest }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put(`/projects/${id}`, data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (projectId: string) => {
      await apiClient.delete(`/projects/${projectId}`);
    },
    onSuccess: () => {
      // Invalidate and refetch projects after successful deletion
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'recent'] });
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });
};