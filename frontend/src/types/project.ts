import { ImageResponse, TtsResponse } from "./resource";

export interface ProjectScript {
  id: string;
  content: string;
  media?: ImageResponse | null;
  voice?: TtsResponse | null;
}

export interface Project {
  id: string;
  userId: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  scripts?: ProjectScript[];
}

export interface CreateProjectRequest {
  name: string; 
  description?: string;
  userId?: string;
}

export interface UpdateProjectRequest {
  name?: string; 
  description?: string;
  status?: 'draft' | 'processing' | 'completed' | 'failed';
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}
