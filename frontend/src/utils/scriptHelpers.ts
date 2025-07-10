import { ScriptResponse, GeneratedResource } from "@/types/resource";
import { ProjectScript } from "@/types/project";

/**
 * Transforms script response with loading state (images and audio will be generated in background)
 */
export const transformScriptResponseWithLoading = (
  response: ScriptResponse
): GeneratedResource[] => {
  return response.scripts.map((script) => ({
    id: script.id,
    imageSrc: script.media?.url || '', 
    imageAlt: `generated-${Date.now()}-${script.order}`,
    textContent: script.content,
    audioSrc: script.voice?.audioUrl,
    audioDuration: script.voice?.duration,
    description: script.content,
    isImageLoading: !script.media,
    isAudioLoading: !script.voice
  }));
};

/**
 * Transforms project scripts to GeneratedResource format
 */
export const transformProjectScriptsToResources = (
  scripts: ProjectScript[]
): GeneratedResource[] => {
  return scripts.map((script) => ({
    id: script.id,
    imageSrc: script.media?.url || '',
    imageAlt: `script-${script.id}`,
    textContent: script.content,
    audioSrc: script.voice?.audioUrl,
    audioDuration: script.voice?.duration,
    description: script.content,
    isImageLoading: !script.media,
    isAudioLoading: !script.voice
  }));
};

/**
 * Formats language code for display
 */
export const formatLanguageDisplay = (languageCode: string): string => {
  const languageMap: Record<string, string> = {
    'en': 'English',
    'vi': 'Tiếng Việt',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'zh': '中文',
    'ja': '日本語',
    'ko': '한국어'
  };
  
  return languageMap[languageCode] || languageCode.toUpperCase();
};
