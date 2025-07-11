// utils/videoActions.ts
interface ProjectData {
  projectId: string;
  projectTitle: string;
  context?: string;
}

interface VideoCompleteData {
  videoUrl: string;
  projectData: ProjectData;
}

export const handleVideoComplete = (
  videoUrl: string, 
  onVideoSaved?: (data: VideoCompleteData) => void,
  projectData?: ProjectData
) => {
  // Show success message
  const downloadConfirm = window.confirm(
    `🎉 Video rendering completed successfully!\n\nClick OK to download the video, or Cancel to view video details.`
  );

  if (downloadConfirm) {
    // Open video in new tab for download
    window.open(videoUrl, '_blank');
  }

  // If we have video save callback and project data, trigger it
  if (onVideoSaved && projectData) {
    onVideoSaved({
      videoUrl,
      projectData
    });
  } else {
    // Fallback: copy URL to clipboard
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video URL copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = videoUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Video URL copied to clipboard!');
    });
  }
};

export const handleVideoError = (error: string) => {
  alert(`❌ ${error}`);
};

export const showErrorNotification = (message: string) => {
  // You can replace this with a proper notification system later
  alert(`⚠️ ${message}`);
};