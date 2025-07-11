// utils/videoTemplates.ts
export interface VideoTemplate {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  aspectRatio: string;
  fps: number;
  description: string;
  icon: string;
  recommended?: boolean;
  maxDuration?: number; // in seconds
}

export interface TransitionEffect {
  id: string;
  name: string;
  description: string;
  preview?: string;
}

export const VIDEO_TEMPLATES: VideoTemplate[] = [
  {
    id: 'youtube-landscape',
    name: 'YouTube Landscape',
    platform: 'YouTube',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    fps: 30,
    description: 'Standard YouTube videos, tutorials, vlogs',
    icon: '📺',
    recommended: true
  },
  {
    id: 'youtube-shorts',
    name: 'YouTube Shorts',
    platform: 'YouTube',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    fps: 30,
    description: 'Vertical short-form content',
    icon: '📱',
    maxDuration: 60
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    platform: 'TikTok',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    fps: 30,
    description: 'Vertical videos for TikTok',
    icon: '🎵',
    maxDuration: 180
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    platform: 'Instagram',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    fps: 30,
    description: 'Stories and Reels',
    icon: '📸',
    maxDuration: 60
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    platform: 'Instagram',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    fps: 30,
    description: 'Square format posts',
    icon: '⬜',
    maxDuration: 60
  },
  {
    id: 'facebook-video',
    name: 'Facebook Video',
    platform: 'Facebook',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    fps: 30,
    description: 'Facebook video posts',
    icon: '👥'
  },
  {
    id: 'twitter-video',
    name: 'Twitter Video',
    platform: 'Twitter/X',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    fps: 30,
    description: 'Twitter/X video posts',
    icon: '🐦',
    maxDuration: 140
  },
  {
    id: 'linkedin-video',
    name: 'LinkedIn Video',
    platform: 'LinkedIn',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    fps: 30,
    description: 'Professional content',
    icon: '💼'
  },
  {
    id: 'custom',
    name: 'Custom',
    platform: 'Custom',
    width: 1920,
    height: 1080,
    aspectRatio: 'Custom',
    fps: 30,
    description: 'Set your own dimensions',
    icon: '⚙️'
  }
];

export const TRANSITION_EFFECTS: TransitionEffect[] = [
  {
    id: 'fade',
    name: 'Fade',
    description: 'Smooth fade in/out transition'
  },
  {
    id: 'slide',
    name: 'Slide',
    description: 'Slide from one side to another'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Zoom in/out effect'
  },
  {
    id: 'wipe',
    name: 'Wipe',
    description: 'Wipe across the screen'
  },
  {
    id: 'dissolve',
    name: 'Dissolve',
    description: 'Gradual dissolve between scenes'
  },
  {
    id: 'none',
    name: 'No Transition',
    description: 'Direct cut between scenes'
  }
];

export const FPS_OPTIONS = [
  { value: 24, label: '24 FPS', description: 'Cinematic' },
  { value: 30, label: '30 FPS', description: 'Standard' },
  { value: 60, label: '60 FPS', description: 'Smooth' }
];

export const FIT_MODES = [
  { value: 'cover', label: 'Cover', description: 'Fill screen, may crop' },
  { value: 'contain', label: 'Contain', description: 'Fit entirely, may letterbox' },
  { value: 'fill', label: 'Fill', description: 'Stretch to exact size' }
];