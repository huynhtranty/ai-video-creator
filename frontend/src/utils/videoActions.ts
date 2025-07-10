// utils/videoActions.ts
export const handleVideoComplete = (videoUrl: string) => {
  const downloadConfirm = window.confirm(
    `🎉 Video rendering completed successfully!\n\nClick OK to download the video, or Cancel to copy the URL to clipboard.`
  );

  if (downloadConfirm) {
    // Open video in new tab for download
    window.open(videoUrl, '_blank');
  } else {
    // Copy URL to clipboard
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