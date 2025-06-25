export interface ScriptResponse {
  context: string;
  language: string;
  scripts: string[];
}

export interface ScriptRequest {
  prompt: string;
}

// Legacy types for backward compatibility
export interface ScriptSubtitle {
  text: string;
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
}
