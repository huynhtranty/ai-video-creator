import { ScriptResponse, GeneratedResource } from "@/types/script";
import { generateImageForScript } from "@/features/projects/api/image";

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
    imageSrc: getMockImage(index), // This will be updated with real images later
    imageAlt: `Generated image for script ${index + 1}`,
    textContent: script,
    audioSrc: getMockAudio(index),
    description: script
  }));
};

/**
 * Transforms script response with async image generation
 */
export const transformScriptResponseWithImages = async (
  response: ScriptResponse,
  getMockAudio: (index: number) => string
): Promise<GeneratedResource[]> => {
  const resourcesPromises = response.scripts.map(async (script, index) => {
    // Generate image for each script using the context and script content
    const imageUrl = await generateImageForScript(response.context, script);
    
    return {
      id: `generated-${Date.now()}-${index}`,
      imageSrc: imageUrl,
      imageAlt: `Generated image for script ${index + 1}`,
      textContent: script,
      audioSrc: getMockAudio(index),
      description: script
    };
  });

  return Promise.all(resourcesPromises);
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
