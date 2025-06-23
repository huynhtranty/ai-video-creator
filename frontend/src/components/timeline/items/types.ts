export type TimelineItemType = "image" | "text" | "audio" | "video";

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  content: string; // For image/audio/video, this is the URL; for text, the string content
}
