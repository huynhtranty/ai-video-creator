import { ScriptResponse, GeneratedResource } from "@/types/script";

/**
 * Transforms the new API response format to GeneratedResource format
 */
export const transformScriptResponse = (
  response: ScriptResponse,
  getMockImage: (index: number) => string,
  getMockAudio: (index: number) => string
): GeneratedResource[] => {
  return response.scripts.map((script, index) => ({
    id: `generated-${Date.now()}-${index}`,
    imageSrc: getMockImage(index),
    imageAlt: `Generated image for script ${index + 1}`,
    textContent: script,
    audioSrc: getMockAudio(index),
    description: script
  }));
};

/**
 * Creates a shortened version of context for display
 */
export const getContextPreview = (context: string, maxLength: number = 200): string => {
  if (context.length <= maxLength) return context;
  return context.substring(0, maxLength) + "...";
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
