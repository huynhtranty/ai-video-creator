export interface Project {
  id: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  scripts?: {
    content: string;
    metadata?: {
      context?: string;
      language?: string;
      timestamp?: string;
    };
    resources?: Array<{
      id: string;
      imageSrc?: string;
      audioSrc?: string;
      textContent: string;
      description?: string;
    }>;
  }[]; 
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
