export interface ScriptSubtitle {
  text: string;
}

export interface ScriptContent {
  description: string;
  subtitles: string[];
}

export interface ScriptResponse {
  contents: ScriptContent[];
  context: string;
}

export interface ScriptRequest {
  prompt: string;
}

export interface GeneratedResource {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string;
  audioSrc?: string;
  subtitles: string[];
  description: string;
}
