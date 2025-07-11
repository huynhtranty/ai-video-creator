// hooks/useVideoRender.ts
import { useState, useCallback } from 'react';
import VideoApiService, { VideoStatus } from '../api/videoAPI';

interface UseVideoRenderOptions {
  pollingInterval?: number;
  onProgress?: (status: VideoStatus) => void;
  onComplete?: (videoUrl: string) => void;
  onError?: (error: string) => void;
}

interface UseVideoRenderReturn {
  renderVideo: (apiData: any) => Promise<void>;
  status: VideoStatus | null;
  isRendering: boolean;
  error: string | null;
  progress: number;
  videoUrl: string | null;
  currentVideoId: string | null;
  cancelRender: () => void;
}

export const useVideoRender = (options: UseVideoRenderOptions = {}): UseVideoRenderReturn => {
  const {
    pollingInterval = 2000,
    onProgress,
    onComplete,
    onError
  } = options;

  const [status, setStatus] = useState<VideoStatus | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [pollingTimeoutId, setPollingTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const apiService = new VideoApiService();

  const clearPolling = useCallback(() => {
    if (pollingTimeoutId) {
      clearTimeout(pollingTimeoutId);
      setPollingTimeoutId(null);
    }
  }, [pollingTimeoutId]);

  const pollStatus = useCallback(async (videoId: string): Promise<void> => {
    try {
      const currentStatus = await apiService.getRenderStatus(videoId);
      
      console.log(`Polling - Status: ${currentStatus.status}, Progress: ${currentStatus.progress}%${currentStatus.state ? `, State: ${currentStatus.state}` : ''}`);
      
      setStatus(currentStatus);
      
      // Call progress callback
      if (onProgress) {
        onProgress(currentStatus);
      }

      if (currentStatus.status === 'COMPLETED') {
        setIsRendering(false);
        setCurrentVideoId(null);
        clearPolling();
        
        const fullVideoUrl = apiService.getVideoUrl(currentStatus.url!);
        
        if (onComplete) {
          onComplete(fullVideoUrl);
        }
        
      } else if (currentStatus.status === 'FAILED') {
        setIsRendering(false);
        setCurrentVideoId(null);
        clearPolling();
        
        const errorMessage = 'Video rendering failed! Please try again.';
        setError(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        }
        
      } else {
        // Continue polling
        const timeoutId = setTimeout(() => pollStatus(videoId), pollingInterval);
        setPollingTimeoutId(timeoutId);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error checking render status';
      console.error('Error polling status:', err);
      
      setIsRendering(false);
      setCurrentVideoId(null);
      setError(errorMessage);
      clearPolling();
      
      if (onError) {
        onError(errorMessage);
      }
    }
  }, [onProgress, onComplete, onError, pollingInterval, clearPolling, apiService]);

  const renderVideo = useCallback(async (apiData: any) => {
    try {
      setIsRendering(true);
      setError(null);
      setStatus(null);
      
      // Start the render
      const videoId = await apiService.startRender(apiData);
      setCurrentVideoId(videoId);
      
      // Start polling after 1 second
      const timeoutId = setTimeout(() => pollStatus(videoId), 1000);
      setPollingTimeoutId(timeoutId);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start video rendering';
      setError(errorMessage);
      setIsRendering(false);
      
      if (onError) {
        onError(errorMessage);
      }
    }
  }, [pollStatus, apiService, onError]);

  const cancelRender = useCallback(() => {
    clearPolling();
    setIsRendering(false);
    setCurrentVideoId(null);
    setStatus(null);
  }, [clearPolling]);

  return {
    renderVideo,
    status,
    isRendering,
    error,
    progress: status?.progress || 0,
    videoUrl: status?.url ? apiService.getVideoUrl(status.url) : null,
    currentVideoId,
    cancelRender,
  };
};