export interface ScriptResponse {
  context: string;
  language: string;
  scripts: string[];
}

export interface ScriptRequest {
  prompt: string;
}

export interface ScriptContent {
  description: string;
  subtitles: string[];
}

export interface GeneratedResource {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string;
  audioSrc?: string;
  description: string;
  isImageLoading?: boolean;
  isAudioLoading?: boolean;
}
