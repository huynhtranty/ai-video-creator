"use client";

import React, { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/projects/components/HeaderSection";
import TextInput from "@/features/projects/components/TextInput";
import ResourceSection from "@/features/projects/components/ResourceSection";
import { extractDataToAPI, extractDataToAPIAdvanced } from "@/utils/dataExtractor";

interface VideoStatus {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  progress: number;
  url: string | null;
  state?: string;
}

export default function CreateVideoPage() {
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderState, setRenderState] = useState<string>('');
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

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

  // Polling function
  const pollVideoStatus = async (videoId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3100/api/render?id=${videoId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const status: VideoStatus = result.video;
      
      console.log(`Polling - Status: ${status.status}, Progress: ${status.progress}%${status.state ? `, State: ${status.state}` : ''}`);
      
      // Update UI
      setRenderProgress(status.progress);
      setRenderState(status.state || '');
      
      if (status.status === 'COMPLETED') {
        setIsRendering(false);
        setCurrentVideoId(null);
        
        // Show success alert with download link
        const videoUrl = `http://localhost:3100${status.url}`;
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
          });
        }
        
      } else if (status.status === 'FAILED') {
        setIsRendering(false);
        setCurrentVideoId(null);
        alert('❌ Video rendering failed! Please try again.');
        
      } else {
        // Continue polling after 2 seconds
        setTimeout(() => pollVideoStatus(videoId), 2000);
      }
      
    } catch (error) {
      console.error('Error polling status:', error);
      setIsRendering(false);
      setCurrentVideoId(null);
      alert('Error checking render status. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic extraction
    const apiData = extractDataToAPI(data, {
      width: 1920,
      height: 1080,
      fps: 30,
      enableTransitions: true,
      transitionDuration: 1000
    });

    console.log("API Data:", apiData);
    
    // Send to API and start polling
    sendToAPI(apiData);
  };

  const sendToAPI = async (apiData: any) => {
    try {
      setIsRendering(true);
      setRenderProgress(0);
      setRenderState('Starting...');
      
      const response = await fetch('http://localhost:3100/render-from-assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      const videoId = result.video.id;
      setCurrentVideoId(videoId);
      
      // Start polling for status updates
      setTimeout(() => pollVideoStatus(videoId), 1000);
      
    } catch (error) {
      console.error('Error sending to API:', error);
      setIsRendering(false);
      alert('Failed to start video rendering. Please try again.');
    }
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
          <HeaderSection onSubmit={handleSubmit} />
          <TextInput />
        </div>
        
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
            <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>🎬 Rendering Video...</h3>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#6b7280' }}>
              Progress: {renderProgress}%
              {renderState && ` • ${renderState}`}
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${renderProgress}%`,
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
          </div>
        )}
        
        <ResourceSection />
      </main>
    </div>
  );
}