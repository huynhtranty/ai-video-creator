/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/projects/components/HeaderSection";
import TextInput from "@/features/projects/components/TextInput";
import ResourceSection from "@/features/projects/components/ResourceSection";
import TemplateChooserPopup, { VideoConfig } from "@/components/videoTemplates/TemplateChooserPopup";
import { extractDataToAPI } from "@/utils/dataExtractor";
import { useVideoRender } from "@/features/videoRender/hooks/useVideoRender";
import { handleVideoComplete, handleVideoError } from "@/utils/videoActions";

export default function CreateVideoPage() {
  const [showTemplateChooser, setShowTemplateChooser] = useState(false);

  const {
    renderVideo,
    status,
    isRendering,
    error,
    progress,
    currentVideoId,
    cancelRender
  } = useVideoRender({
    onComplete: handleVideoComplete,
    onError: handleVideoError,
    onProgress: (status) => {
      console.log(`Render progress: ${status.progress}%`);
    }
  });

  const data = {
    title: "Sức khỏe là vốn quý nhất của con người",
    context: "Một cái ngữ cảnh gì đó để sinh ảnh cho giống nhau",
    contents: [
      {
        description: "Một cái mô tả gì đó",
        image: "https://www.shutterstock.com/shutterstock/photos/1931719025/display_1500/stock-photo-blood-sugar-testing-equipment-for-diabetics-with-monitor-and-lancing-device-and-heath-foods-below-1931719025.jpg",
        subtitles: [
          {
            text: "Trong guồng quay hối hả của cuộc sống hiện đại, chúng ta thường mải miết theo đuổi danh vọng, tiền tài, mà đôi khi quên đi một điều giản dị nhưng vô cùng quan trọng: **sức khỏe**.",
            audio: "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3",
            duration: 7500,
          },
          {
            text: "Sức khỏe không chỉ là sự vắng mặt của bệnh tật, mà là trạng thái hoàn hảo về thể chất, tinh thần và xã hội, là nền tảng vững chắc cho mọi ước mơ và hoài bão của mỗi người.",
            audio: "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3",
            duration: 10500,
          },
        ]
      },
      {
        description: "Một cái mô tả khác",
        image: "https://www.shutterstock.com/shutterstock/photos/1931719025/display_1500/stock-photo-blood-sugar-testing-equipment-for-diabetics-with-monitor-and-lancing-device-and-heath-foods-below-1931719025.jpg",
        subtitles: [
          {
            text: "Bạn có thể có tất cả của cải trên đời, nhưng nếu không có sức khỏe, liệu bạn có thể tận hưởng chúng một cách trọn vẹn? Một cơ thể cường tráng, một tinh thần minh mẫn chính là chìa khóa để ta làm việc, học tập và trải nghiệm cuộc sống.",
            audio: "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3",
            duration: 11000,
          },
        ]
      },
      {
        description: "Một cái mô tả khác nữa",
        image: "https://www.shutterstock.com/shutterstock/photos/1931719025/display_1500/stock-photo-blood-sugar-testing-equipment-for-diabetics-with-monitor-and-lancing-device-and-heath-foods-below-1931719025.jpg",
        subtitles: [
          {
            text: "Hãy tưởng tượng một ngày bạn thức dậy tràn đầy năng lượng, sẵn sàng đối mặt với mọi thử thách. Đó là món quà vô giá mà sức khỏe mang lại, giúp bạn theo đuổi đam mê và đạt được thành công.",
            audio: "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3",
            duration: 12500,
          },
          {
            text: "Để giữ gìn vốn quý này, hãy bắt đầu từ những thói quen nhỏ: ăn uống khoa học, tập luyện đều đặn, ngủ đủ giấc và giữ tinh thần lạc quan. Đừng chờ đến khi mất đi mới hối tiếc.",
            audio: "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3",
            duration: 11000,
          }
        ]
      },
      {
        description: "Một cái mô tả khác nữa",
        image: "https://www.shutterstock.com/shutterstock/photos/1931719025/display_1500/stock-photo-blood-sugar-testing-equipment-for-diabetics-with-monitor-and-lancing-device-and-heath-foods-below-1931719025.jpg",
        subtitles: [
          {
            text: "Hãy nhớ rằng, **sức khỏe chính là tài sản quý giá nhất mà bạn có**. Hãy trân trọng và bảo vệ nó mỗi ngày.",
            audio: "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3",
            duration: 4500,
          }
        ]
      }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTemplateChooser(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Extract data in API format with default settings
      const apiData = extractDataToAPI(data, {
        width: 1920,
        height: 1080,
        fps: 30,
        enableTransitions: true,
        transitionDuration: 1000,
        defaultFitMode: 'cover',
        defaultTransition: 'fade'
      });

      // Add audio configuration
      (apiData.config as any).audioConfig = 'background';

      // Generate unique ID for this video
      const videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Prepare video data
      const videoData = {
        id: videoId,
        originalData: data,
        apiData: apiData,
        timestamp: new Date().toISOString()
      };

      console.log('📤 Preparing to send video data:', videoData);

      // Open editor in new tab
      const editorUrl = `http://localhost:5173/?videoId=${videoId}`;
      const editorWindow = window.open(editorUrl, '_blank');

      if (!editorWindow) {
        alert('❌ Popup blocked! Please allow popups for this site.');
        return;
      }

      // Wait for editor window to load, then send data
      const sendDataWhenReady = () => {
        const maxAttempts = 50; // 10 seconds max
        let attempts = 0;

        const trySendData = () => {
          attempts++;
          
          try {
            editorWindow.postMessage({
              type: 'VIDEO_DATA',
              payload: videoData
            }, 'http://localhost:5173');
            
          } catch (error) {
            console.log(`Attempt ${attempts} failed, retrying...`);
            
            if (attempts < maxAttempts) {
              setTimeout(trySendData, 200);
            } else {
              console.error('❌ Failed to send data after max attempts');
              alert('❌ Failed to send data to editor. Please try again.');
            }
          }
        };

        // Start trying after a short delay
        setTimeout(trySendData, 1000);
      };

      sendDataWhenReady();

    } catch (error) {
      console.error('❌ Error preparing video data:', error);
      alert('Lỗi khi chuẩn bị dữ liệu!');
    }
  }

  const handleTemplateSelect = async (config: VideoConfig) => {
    // Extract data with selected template configuration
    const apiData = extractDataToAPI(data, {
      width: config.width,
      height: config.height,
      fps: config.fps,
      enableTransitions: config.enableTransitions,
      transitionDuration: config.transitionDuration,
      defaultFitMode: config.fitMode,
      defaultTransition: config.transitionEffect
    });

    // Add audio configuration
    (apiData.config as any).audioConfig = config.audioConfig;

    console.log("Selected Template:", config.template.name);
    console.log("API Data:", apiData);
    
    // Start rendering
    await renderVideo(apiData);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "1rem 2rem",
          backgroundSize: "cover",
          marginLeft: "50px",
        }}
        className="overflow-hidden"
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            paddingBottom: "10px",
          }}
        >
          <HeaderSection onSubmit={handleSubmit} onEdit={handleEdit}/>
          {/* <TextInput /> */}
        </div>
        
        {/* Template Chooser Popup */}
        <TemplateChooserPopup
          isOpen={showTemplateChooser}
          onClose={() => setShowTemplateChooser(false)}
          onSelect={handleTemplateSelect}
        />
        
        {/* Render Progress Display */}
        {isRendering && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'white',
            border: '2px solid #3b82f6',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            minWidth: '300px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, color: '#1f2937' }}>🎬 Rendering Video...</h3>
              <button
                onClick={cancelRender}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                title="Cancel render"
              >
                ✕
              </button>
            </div>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#6b7280' }}>
              Progress: {progress}%
              {status?.state && ` • ${status.state}`}
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#3b82f6',
                transition: 'width 0.3s ease'
              }} />
            </div>
            {currentVideoId && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#9ca3af' }}>
                ID: {currentVideoId}
              </div>
            )}
            {error && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#ef4444' }}>
                Error: {error}
              </div>
            )}
          </div>
        )}
      
        {/* Resource Section */}
        {/* <ResourceSection /> */}
      </main>
    </div>
  );
}