// services/videoApi.ts
export interface VideoStatus {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  progress: number;
  url: string | null;
  state?: string;
}

export interface VideoResponse {
  video: VideoStatus;
}

export interface ApiConfig {
  baseUrl?: string;
}

class VideoApiService {
  private baseUrl: string;

  constructor(config: ApiConfig = {}) {
    this.baseUrl = config.baseUrl || 'http://localhost:3100';
  }

  /**
   * Start video rendering
   */
  async startRender(apiData: any): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/render-from-assets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: VideoResponse = await response.json();
      return result.video.id;
    } catch (error) {
      console.error('Error starting render:', error);
      throw new Error(`Failed to start video rendering: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current render status
   */
  async getRenderStatus(videoId: string): Promise<VideoStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/api/render?id=${videoId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: VideoResponse = await response.json();
      return result.video;
    } catch (error) {
      console.error('Error getting render status:', error);
      throw new Error(`Failed to get render status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get full video URL
   */
  getVideoUrl(relativeUrl: string): string {
    return `${this.baseUrl}${relativeUrl}`;
  }
}

export default VideoApiService;