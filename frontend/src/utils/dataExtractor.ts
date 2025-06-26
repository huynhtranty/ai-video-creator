interface SubtitleItem {
  text: string;
  audio: string;
  duration: number;
}

interface ContentItem {
  description: string;
  image: string;
  subtitles: SubtitleItem[];
}

interface VideoData {
  title: string;
  context: string;
  contents: ContentItem[];
}

interface APIFormat {
  id: string;
  assets: {
    imageUrls: string[];
    audioUrls: string[];
    srtContent: string;
  };
  config: {
    width: number;
    height: number;
    fps: number;
    imageDurations: number[];
    imageFitModes: string[];
    transitionTypes: string[];
    enableTransitions: boolean;
    transitionDuration: number;
    audioConfig?: 'sequential' | 'simultaneous' | 'background';
  };
}

export function extractDataToAPI(
  data: VideoData,
  options: {
    width?: number;
    height?: number;
    fps?: number;
    enableTransitions?: boolean;
    transitionDuration?: number;
    defaultFitMode?: string;
    defaultTransition?: string;
  } = {}
): APIFormat {
  // Default options
  const {
    width = 1920,
    height = 1080,
    fps = 30,
    enableTransitions = true,
    transitionDuration = 1000,
    defaultFitMode = "cover",
    defaultTransition = "fade"
  } = options;

  // Generate unique ID
  const id = generateId();

  // Extract image URLs
  const imageUrls: string[] = data.contents.map(content => content.image);

  // Extract audio URLs (unique ones only)
  const audioUrls: string[] = Array.from(
    new Set(
      data.contents.flatMap(content => 
        content.subtitles.map(subtitle => subtitle.audio)
      )
    )
  );

  // Generate SRT content
  const srtContent = generateSRTContent(data.contents);

  // Calculate image durations based on subtitles
  const imageDurations: number[] = data.contents.map(content => {
    const totalDuration = content.subtitles.reduce(
      (sum, subtitle) => sum + subtitle.duration,
      0
    );
    return totalDuration;
  });

  // Generate fit modes array
  const imageFitModes: string[] = new Array(imageUrls.length).fill(defaultFitMode);

  // Generate transition types array (N-1 transitions for N images)
  const transitionTypes: string[] = new Array(Math.max(0, imageUrls.length - 1))
    .fill(defaultTransition);

  return {
    id,
    assets: {
      imageUrls,
      audioUrls,
      srtContent
    },
    config: {
      width,
      height,
      fps,
      imageDurations,
      imageFitModes,
      transitionTypes,
      enableTransitions,
      transitionDuration
    }
  };
}

function generateSRTContent(contents: ContentItem[]): string {
  let srtContent = "";
  let subtitleIndex = 1;
  let currentTime = 0; // in milliseconds

  contents.forEach(content => {
    content.subtitles.forEach(subtitle => {
      const startTime = currentTime;
      const endTime = currentTime + subtitle.duration;
      
      // Convert milliseconds to SRT time format (HH:MM:SS,mmm)
      const startTimeFormatted = formatSRTTime(startTime);
      const endTimeFormatted = formatSRTTime(endTime);
      
      // Clean text (remove markdown formatting for SRT)
      const cleanText = subtitle.text.replace(/\*\*/g, "");
      
      srtContent += `${subtitleIndex}\n`;
      srtContent += `${startTimeFormatted} --> ${endTimeFormatted}\n`;
      srtContent += `${cleanText}\n\n`;
      
      subtitleIndex++;
      currentTime = endTime;
    });
  });

  return srtContent.trim();
}

function formatSRTTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const ms = milliseconds % 1000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${ms
    .toString()
    .padStart(3, '0')}`;
}

function generateId(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Advanced version with more customization options
export function extractDataToAPIAdvanced(
  data: VideoData,
  customConfig: {
    width?: number;
    height?: number;
    fps?: number;
    enableTransitions?: boolean;
    transitionDuration?: number;
    imageFitModes?: string[]; // Custom fit mode for each image
    transitionTypes?: string[]; // Custom transition for each transition
    audioConfig?: 'sequential' | 'simultaneous' | 'background';
  } = {}
): APIFormat {
  const {
    width = 1920,
    height = 1080,
    fps = 30,
    enableTransitions = true,
    transitionDuration = 1000,
    imageFitModes,
    transitionTypes,
    audioConfig = 'background'
  } = customConfig;

  const id = generateId();
  const imageUrls: string[] = data.contents.map(content => content.image);
  const audioUrls: string[] = Array.from(
    new Set(
      data.contents.flatMap(content => 
        content.subtitles.map(subtitle => subtitle.audio)
      )
    )
  );

  const srtContent = generateSRTContent(data.contents);
  const imageDurations: number[] = data.contents.map(content => {
    const totalDuration = content.subtitles.reduce(
      (sum, subtitle) => sum + subtitle.duration,
      0
    );
    return totalDuration;
  });

  // Use custom fit modes or default to 'cover'
  const finalImageFitModes = imageFitModes || 
    new Array(imageUrls.length).fill('cover');

  // Use custom transitions or default to 'fade'
  const finalTransitionTypes = transitionTypes || 
    new Array(Math.max(0, imageUrls.length - 1)).fill('fade');

  return {
    id,
    assets: {
      imageUrls,
      audioUrls,
      srtContent
    },
    config: {
      width,
      height,
      fps,
      imageDurations,
      imageFitModes: finalImageFitModes,
      transitionTypes: finalTransitionTypes,
      enableTransitions,
      transitionDuration,
      audioConfig
    }
  };
}