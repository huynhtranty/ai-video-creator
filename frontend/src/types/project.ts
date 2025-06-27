export interface Project {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  status?: 'draft' | 'processing' | 'completed' | 'failed';
  thumbnailUrl?: string;
  duration?: number;
  userId: string;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  status?: 'draft' | 'processing' | 'completed' | 'failed';
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}
