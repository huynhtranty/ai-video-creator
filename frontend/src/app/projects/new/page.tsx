"use client";

import { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/projects/components/HeaderSection";
import TextInput from "@/features/projects/components/TextInput";
import ResourceSection from "@/features/projects/components/ResourceSection";
import { useGenerateScript } from "@/features/projects/api/script";
import { GeneratedResource } from "@/types/script";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { transformScriptResponseWithLoading } from "@/utils/scriptHelpers";
import { generateImageForScript } from "@/features/projects/api/image";
import { generateTtsForScript } from "@/features/projects/api/tts";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function CreateVideoPageContent() {
  const [inputText, setInputText] = useState("");
  const [resources, setResources] = useState<GeneratedResource[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [context, setContext] = useState<string>("");
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
      setContext(response.context);

      const newResources: GeneratedResource[] = transformScriptResponseWithLoading(
        response
      );
      
      setResources(newResources);
      setInputText(""); 
      addToast(`Đã tạo thành công ${newResources.length} tài nguyên!`, "success");
      
      addToast("Đang tạo hình ảnh và âm thanh...", "info");
      
      // Generate images and audio in parallel
      const resourcePromises = newResources.map(async (resource) => {
        if (typeof resource.textContent === 'string') {
          // Generate image
          const imagePromise = generateImageForScript(response.context, resource.textContent)
            .then(imageUrl => {
              updateResource(resource.id, { imageSrc: imageUrl, isImageLoading: false });
            })
            .catch(error => {
              console.error(`Error generating image for resource ${resource.id}:`, error);
            });

          // Generate audio with TTS
          const audioPromise = generateTtsForScript(
            resource.textContent,
            response.language || "vi",
            1.0,
            voiceStyle === "Nữ thanh niên" ? "FEMALE" : "MALE",
            "", // projectId - can be added later if needed
            "google"
          )
            .then(audioUrl => {
              updateResource(resource.id, { audioSrc: audioUrl, isAudioLoading: false });
            })
            .catch(error => {
              console.error(`Error generating audio for resource ${resource.id}:`, error);
            });

          return Promise.all([imagePromise, audioPromise]);
        }
      });
      
      await Promise.all(resourcePromises);
      addToast("Đã hoàn thành tạo hình ảnh và âm thanh!", "success");
    } catch (error) {
      console.error("Error generating script:", error);
      addToast("API không khả dụng!", "info");
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteResource = (resourceId: string) => {
    setResources(prevResources => prevResources.filter(resource => resource.id !== resourceId));
    addToast("Đã xóa tài nguyên thành công!", "success");
  };

  const updateResource = (resourceId: string, updates: Partial<GeneratedResource>) => {
    setResources(prevResources => {
      const updatedResources = prevResources.map(resource => 
        resource.id === resourceId ? { ...resource, ...updates } : resource
      );
      return updatedResources;
    });
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
          onUpdateResource={updateResource}
          isGenerating={isGenerating}
          context={context}
        />
      </main>
    </div>
  );
}

export default function CreateVideoPage() {
  return (
    <ProtectedRoute>
      <ToastProvider>
        <CreateVideoPageContent />
      </ToastProvider>
    </ProtectedRoute>
  );
}