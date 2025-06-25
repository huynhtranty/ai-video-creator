"use client";

import { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/projects/components/HeaderSection";
import TextInput from "@/features/projects/components/TextInput";
import ResourceSection from "@/features/projects/components/ResourceSection";
import { useGenerateScript } from "@/features/projects/api/script";
import { GeneratedResource } from "@/types/script";
import { ToastProvider, useToast } from "@/components/ui/toast";

function CreateVideoPageContent() {
  const [inputText, setInputText] = useState("");
  const [resources, setResources] = useState<GeneratedResource[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { addToast } = useToast();
  
  const generateScript = useGenerateScript();

  const generateResources = async (scriptStyle: string, imageStyle: string, voiceStyle: string) => {
    if (!inputText.trim()) {
      addToast("Vui lòng nhập nội dung trước khi tạo tài nguyên!", "warning");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await generateScript.mutateAsync({ prompt: inputText });
      
      // Convert API response to GeneratedResource format
      const newResources: GeneratedResource[] = response.contents.map((content, index) => ({
        id: `generated-${Date.now()}-${index}`,
        imageSrc: getMockImage(index),
        imageAlt: `Generated image for: ${content.description.substring(0, 50)}...`,
        textContent: content.description,
        audioSrc: getMockAudio(index),
        subtitles: content.subtitles,
        description: content.description
      }));
      
      setResources(newResources);
      setInputText(""); 
      addToast(`Đã tạo thành công ${newResources.length} tài nguyên!`, "success");
    } catch (error) {
      console.error("Error generating script:", error);
      // Fallback to mock data if API fails
      const mockResources = generateMockResources(inputText, scriptStyle, imageStyle, voiceStyle);
      setResources(mockResources);
      addToast("API không khả dụng, sử dụng dữ liệu mẫu!", "info");
    } finally {
      setIsGenerating(false);
    }
  };

  const getMockImage = (index: number): string => {
    const mockImages = ["/rand1.svg", "/rand2.svg", "/rand3.svg"];
    return mockImages[index % mockImages.length];
  };

  const getMockAudio = (index: number): string => {
    const mockAudios = [
      "https://www.soundjay.com/misc/sounds/bell-ringing-01a.mp3",
      "https://www.soundjay.com/misc/sounds/bell-ringing-01b.mp3", 
      "https://www.soundjay.com/misc/sounds/bell-ringing-01c.mp3"
    ];
    return mockAudios[index % mockAudios.length];
  };

  const generateMockResources = (text: string, scriptStyle: string, imageStyle: string, voiceStyle: string): GeneratedResource[] => {
    const mockImages = ["/rand1.svg", "/rand2.svg", "/rand3.svg"];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    return sentences.slice(0, 3).map((sentence, index) => ({
      id: `mock-${Date.now()}-${index}`,
      imageSrc: mockImages[index % mockImages.length],
      imageAlt: `Mock image ${index + 1}`,
      textContent: `${sentence.trim()}. (Tạo với phong cách: ${scriptStyle}, ${imageStyle}, ${voiceStyle})`,
      audioSrc: getMockAudio(index),
      subtitles: [sentence.trim()],
      description: sentence.trim()
    }));
  };

// ...existing code...

  const deleteResource = (resourceId: string) => {
    setResources(prevResources => prevResources.filter(resource => resource.id !== resourceId));
    addToast("Đã xóa tài nguyên thành công!", "success");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "1rem 2rem",
          backgroundSize: "cover",
          marginLeft: "50px", // Đảm bảo main không bị che bởi Sidebar cố định
        }}
        className="overflow-hidden" // Ngăn main cuộn toàn bộ
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white", // Đảm bảo phần cố định không bị trong suốt
            paddingBottom: "10px", // Khoảng cách dưới cùng
          }}
        >
          <HeaderSection />
          <TextInput value={inputText} onChange={setInputText} />
        </div>
        <ResourceSection 
          resources={resources}
          onGenerateResources={generateResources}
          onDeleteResource={deleteResource}
          isGenerating={isGenerating}
        />
      </main>
    </div>
  );
}

export default function CreateVideoPage() {
  return (
    <ToastProvider>
      <CreateVideoPageContent />
    </ToastProvider>
  );
}