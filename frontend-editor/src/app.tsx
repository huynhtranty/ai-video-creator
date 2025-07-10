import { useEffect, useState } from "react";
import Editor from "./features/editor";
import useDataState from "./features/editor/store/use-data-state";
import { getCompactFontData } from "./features/editor/utils/fonts";
import { FONTS } from "./features/editor/data/fonts";

interface SessionVideoData {
  id: string;
  originalData: any;
  apiData: {
    id: string;
    assets: {
      imageUrls: string[];
      audioUrls: string[];
      srtContent: string;
    };
    config: any;
  };
  timestamp: string;
}

export default function App() {
  const { setCompactFonts, setFonts } = useDataState();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [waitingForData, setWaitingForData] = useState(false);

  // Function to get video ID from URL params
  const getVideoId = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('videoId');
  };

  // Function to save video data to sessionStorage
  const saveToSessionStorage = (videoId: string, receivedData: SessionVideoData) => {
    try {
      const sessionKey = `video_editor_${videoId}`;
      const sessionData = {
        ...receivedData,
        savedAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString()
      };
      
      sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
      console.log(`💾 Saved video data to sessionStorage: ${sessionKey}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to save to sessionStorage:', error);
      return false;
    }
  };

  // Function to load video data from sessionStorage
  const loadFromSessionStorage = (videoId: string): SessionVideoData | null => {
    try {
      const sessionKey = `video_editor_${videoId}`;
      const sessionData = sessionStorage.getItem(sessionKey);
      
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        console.log(`📂 Loaded video data from sessionStorage: ${sessionKey}`);
        
        // Update last accessed time
        parsed.lastAccessed = new Date().toISOString();
        sessionStorage.setItem(sessionKey, JSON.stringify(parsed));
        
        return parsed;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Failed to load from sessionStorage:', error);
      return null;
    }
  };

  // Function to convert session data to editor format
  const convertToEditorFormat = (sessionData: SessionVideoData) => {
    const { apiData, originalData } = sessionData;
    
    return {
      videoName: originalData?.title || "Untitled Video",
      videoId: apiData.id,
      imageUrls: apiData.assets.imageUrls || [],
      audioUrls: apiData.assets.audioUrls || [],
      srtCaption: apiData.assets.srtContent || ""
    };
  };

  // Setup PostMessage listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: Check origin
      if (event.origin !== 'http://localhost:3000') {
        console.warn('❌ Received message from unauthorized origin:', event.origin);
        return;
      }

      console.log('📨 Received message from creator:', event.data);

      if (event.data.type === 'VIDEO_DATA') {
        const receivedData = event.data.payload;
        
        try {
          // Save to sessionStorage first
          const videoId = getVideoId();
          if (videoId) {
            const saveSuccess = saveToSessionStorage(videoId, receivedData);
            if (!saveSuccess) {
              console.warn('⚠️ Failed to save to sessionStorage, but continuing...');
            }
          }

          // Convert to editor format
          const editorData = convertToEditorFormat(receivedData);
          console.log('✅ Successfully converted video data:', editorData);
          
          setVideoData(editorData);
          setWaitingForData(false);
          setIsLoading(false);
          setError(null);

          // Send confirmation back to creator
          if (event.source) {
            (event.source as Window).postMessage({
              type: 'DATA_RECEIVED',
              videoId: receivedData.id,
              status: 'success'
            }, 'http://localhost:3000');
          }

        } catch (error) {
          console.error('❌ Error processing received data:', error);
          setError('Failed to process video data');
          setIsLoading(false);
        }
      }
    };

    // Add message listener
    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Initialize app
  useEffect(() => {
    const initializeApp = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if we have a video ID
        const videoId = getVideoId();
        
        if (videoId) {
          console.log(`🔍 Looking for video data with ID: ${videoId}`);
          
          // Try to load from sessionStorage first
          const sessionData = loadFromSessionStorage(videoId);
          
          if (sessionData) {
            // Found data in sessionStorage
            try {
              const editorData = convertToEditorFormat(sessionData);
              console.log('✅ Loaded video data from sessionStorage:', editorData);
              
              setVideoData(editorData);
              setIsLoading(false);
              setError(null);
              return; // Exit early, we have the data
            } catch (error) {
              console.error('❌ Error converting sessionStorage data:', error);
              // Continue to wait for PostMessage
            }
          }
          
          // No sessionStorage data, wait for PostMessage
          console.log(`⏳ No sessionStorage data, waiting for PostMessage...`);
          setWaitingForData(true);
          
          // Set a timeout in case data never arrives
          const timeout = setTimeout(() => {
            if (waitingForData) {
              setError(`Timeout: No data received for video ID "${videoId}". Please try again.`);
              setIsLoading(false);
              setWaitingForData(false);
            }
          }, 15000); // 15 second timeout

          return () => clearTimeout(timeout);
        } else {
          // No video ID, show error or prompt
          setError('No video ID provided. Please open this editor from the creator app.');
          setIsLoading(false);
        }

      } catch (error) {
        console.error('❌ Error initializing app:', error);
        setError('Failed to initialize editor.');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Initialize fonts
  useEffect(() => {
    setCompactFonts(getCompactFontData(FONTS));
    setFonts(FONTS);
  }, []);

  // Add cleanup function to clear old sessionStorage data
  useEffect(() => {
    const cleanupOldSessionData = () => {
      try {
        const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hour
        
        for (let i = sessionStorage.length - 1; i >= 0; i--) {
          const key = sessionStorage.key(i);
          
          if (key && key.startsWith('video_editor_')) {
            try {
              const data = JSON.parse(sessionStorage.getItem(key) || '');
              const savedTime = new Date(data.savedAt).getTime();
              
              if (savedTime < oneHourAgo) {
                sessionStorage.removeItem(key);
                console.log(`🗑️ Cleaned up old session data: ${key}`);
              }
            } catch (error) {
              // Remove corrupted data
              sessionStorage.removeItem(key);
              console.log(`🗑️ Removed corrupted session data: ${key}`);
            }
          }
        }
      } catch (error) {
        console.error('Error cleaning up session data:', error);
      }
    };

    cleanupOldSessionData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '24px' }}>🔄</div>
        <div>
          {waitingForData ? 'Waiting for video data...' : 'Loading editor...'}
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {waitingForData 
            ? `Video ID: ${getVideoId()}` 
            : 'Initializing video editor...'}
        </div>
        {waitingForData && (
          <div style={{ 
            fontSize: '12px', 
            color: '#999', 
            textAlign: 'center',
            marginTop: '16px' 
          }}>
            💡 Make sure you opened this from the creator app.<br/>
            Data should arrive automatically via PostMessage.
          </div>
        )}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{ fontSize: '48px' }}>❌</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Error</div>
        <div style={{ color: '#666', whiteSpace: 'pre-line' }}>{error}</div>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reload
          </button>
          
          <button 
            onClick={() => {
              const creatorUrl = 'http://localhost:3000/projects/new';
              window.open(creatorUrl, '_blank');
            }}
            style={{
              padding: '12px 24px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Open Creator
          </button>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>How to use:</strong>
          <ol style={{ textAlign: 'left', marginTop: '8px' }}>
            <li>Go to the creator app (localhost:3000)</li>
            <li>Create or edit your video content</li>
            <li>Click "Sửa video" button</li>
            <li>This editor will open automatically with your data</li>
          </ol>
        </div>
      </div>
    );
  }

  // Render editor with loaded data
  if (!videoData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>No video data available</div>
      </div>
    );
  }

  return (
    <Editor
      videoName={videoData.videoName}
      videoId={videoData.videoId}
      imageUrls={videoData.imageUrls}
      audioUrls={videoData.audioUrls}
      srtCaption={videoData.srtCaption}
    />
  );
}
