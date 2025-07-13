export interface ScriptItemResponse {
  id: string;
  content: string;
  projectId: string;
  order: number;
  media?: ImageResponse | null;
  voice?: TtsResponse | null;
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
  scriptStyle?: string;
  scriptModel?: string;
  audioGender?: string;
  audioLanguage?: string;
  audioSpeedRate?: number;
  audioModel?: string;
  imageStyle?: string;
}

export interface ScriptContent {
  description: string;
  subtitles: string[];
}

export interface ImageRequest {
  prompt: string;
  context: string;
  provider: string;
  projectId: string;
  scriptId: string;
  style?: string;
}

export interface ImageResponse {
  id: string;
  text: string;
  provider: string;
  url: string;
  projectId: string;
  scriptId: string;
}

export interface TtsRequest {
  text: string;
  languageCode: string;
  speakingRate: number;
  gender: string;
  projectId: string;
  scriptId: string;
  provider: string;
  model?: string;
}

export interface TtsResponse {
  audioUrl: string;
  format: string;
  duration: number;
  projectId: string;
}

export interface GeneratedResource {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string;
  audioSrc?: string;
  audioDuration?: number;
  description: string;
  isImageLoading?: boolean;
  isImageError?: boolean;
  isAudioLoading?: boolean;
  isAudioError?: boolean;
}

export interface UploadVoiceRequest {
  file: File;
  projectId: string;
  scriptId: string;
}

export interface ResourceSettings {
  script: {
    style: string;
    model: string;
  };
  audio: {
    gender: string;
    language: string;
    speedRate: number;
    model: string;
  };
  image: {
    style: string;
  };
}
