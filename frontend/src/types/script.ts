
export interface ScriptItemResponse {
  id: string;
  content: string;
  projectId: string;
  order: number;
  media?: ImageResponse | null;
  voice?: string | null;
}

export interface ScriptResponse {
  context: string;
  language: string;
  scripts: ScriptItemResponse[];
}

export interface ScriptRequest {
  prompt: string;
  provider: string;
  projectId: string;
}

export interface ScriptContent {
  description: string;
  subtitles: string[];
}

export interface ImageResponse {
  id: string;
  text: string;
  provider: string;
  url: string;
  projectId: string;
  scriptId: string;
}

export interface GeneratedResource {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string;
  audioSrc?: string;
  description: string;
  isImageLoading?: boolean;
  isImageError?: boolean;
  isAudioLoading?: boolean;
  isAudioError?: boolean;
}
