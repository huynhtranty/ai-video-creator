"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/features/dashboard/components/Sidebar";
import HeaderSection from "@/features/projects/components/HeaderSection";
import TextInput from "@/features/projects/components/TextInput";
import ResourceSection from "@/features/projects/components/ResourceSection";
import { useGenerateScript } from "@/features/projects/api/script";
import { useGetProject, useUpdateProject } from "@/features/projects/api/project";
import { GeneratedResource } from "@/types/resource";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { transformScriptResponseWithLoading, transformProjectScriptsToResources } from "@/utils/scriptHelpers";
import { generateImageForScript } from "@/features/projects/api/image";
import { generateTtsForScript } from "@/features/projects/api/tts";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function ProjectPageContent() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  
  const [inputText, setInputText] = useState("");
  const [resources, setResources] = useState<GeneratedResource[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [context, setContext] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState("Loading...");
  const { addToast } = useToast();
  
  const generateScript = useGenerateScript();
  const updateProject = useUpdateProject();
  
  const { data: project, isLoading: isProjectLoading, error: projectError } = useGetProject(projectId);

  useEffect(() => {
    if (project) {
      const projectName = project.name || "Untitled";
      setProjectTitle(projectName);
      
      if (project.scripts && project.scripts.length > 0) {
        const existingResources = transformProjectScriptsToResources(project.scripts);
        setResources(existingResources);
        setContext('');
      }
    } else if (!isProjectLoading && projectError) {
      const isNotFound = projectError.message?.includes('404') 
        || projectError.message?.includes('Not Found') 
        || projectError.message?.includes('not found');
      
      let redirectTimeout: NodeJS.Timeout;
      
      if (isNotFound) {
        addToast("Dự án không tồn tại. Đang chuyển hướng về danh sách dự án.", "error");
        redirectTimeout = setTimeout(() => {
          router.push("/projects");
        }, 1500);
      } else {
        addToast("Không thể tải dự án. Đang chuyển hướng về danh sách dự án.", "error");
        redirectTimeout = setTimeout(() => {
          router.push("/projects");
        }, 2000);
      }
      
      return () => {
        if (redirectTimeout) {
          clearTimeout(redirectTimeout);
        }
      };
    }
  }, [project, isProjectLoading, projectError, projectId, addToast, router]);

  const handleTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle);
    
    if (project && newTitle.trim() && newTitle !== (project.name)) {
      updateProject.mutate(
        { 
          id: projectId, 
          data: { name: newTitle } 
        },
        {
          onSuccess: () => {
            addToast("Đã lưu tên dự án thành công!", "success");
          },
          onError: () => {
            addToast("Không thể lưu tên dự án!", "error");
          }
        }
      );
    }
  };

  const generateResources = async (scriptStyle: string, imageStyle: string, voiceStyle: string) => {
    if (!inputText.trim()) {
      addToast("Vui lòng nhập nội dung trước khi tạo tài nguyên!", "warning");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await generateScript.mutateAsync({ 
        prompt: inputText,
        provider: "gemini-script",
        projectId: projectId, 
      }); 
      setContext(response.context);

      const newResources: GeneratedResource[] = transformScriptResponseWithLoading(response);
      
      setResources(() => [...newResources]);
      setInputText(""); 
      addToast(`Đã tạo thành công ${newResources.length} tài nguyên!`, "success");
      
      addToast("Đang tạo hình ảnh và âm thanh...", "info"); 
      
      const resourcePromises = newResources.map(async (resource) => {
        if (typeof resource.textContent === 'string') {
          const imagePromise = generateImageForScript({
            prompt: resource.textContent,
            context: response.context,
            provider: "gemini-image",
            projectId: projectId,
            scriptId: resource.id,
          })
          .then(imageResponse => {
            const imageUrl = imageResponse.url;
            updateResource(resource.id, { imageSrc: imageUrl, isImageLoading: false });
            return imageUrl;
          })
          .catch(error => {
            console.error(`Error generating image for resource ${resource.id}:`, error);
            updateResource(resource.id, { isImageError: true, isImageLoading: false });
          });

          const audioPromise = generateTtsForScript({
            text: resource.textContent,
            languageCode: response.language || "en",
            speakingRate: 1.0,
            gender: voiceStyle === "Nữ thanh niên" ? "FEMALE" : "MALE",
            projectId,
            scriptId: resource.id,
            provider: "google"
          })
          .then(audioResponse => {
            updateResource(resource.id, { audioSrc: audioResponse.audioUrl, isAudioLoading: false });
          })
          .catch(error => {
            console.error(`Error generating audio for resource ${resource.id}:`, error);
            updateResource(resource.id, { isAudioError: true, isAudioLoading: false });
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

    const updateResource = (resourceId: string, updates: Partial<GeneratedResource>) => {
    setResources(prevResources => {
      const updatedResources = prevResources.map(resource => 
        resource.id === resourceId ? { ...resource, ...updates } : resource
      );
      return updatedResources;
    });
  };

  // LOADING STATE
  if (isProjectLoading) {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "1rem 2rem",
            backgroundSize: "cover",
            marginLeft: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
            <div 
              className="spinner"
              style={{ 
                width: "50px", 
                height: "50px", 
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #8362E5",
                borderRadius: "50%",
                margin: "0 auto 1rem auto"
              }}
            ></div>
            <div>Đang tải dự án...</div>
          </div>
        </main>
      </div>
    );
  }

  // ERROR STATE
  if (projectError && !project && !isProjectLoading) {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "1rem 2rem",
            backgroundSize: "cover",
            marginLeft: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
            <div 
              className="spinner"
              style={{ 
                width: "50px", 
                height: "50px", 
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #8362E5",
                borderRadius: "50%",
                margin: "0 auto 1rem auto"
              }}
            ></div>
          </div>
        </main>
      </div>
    );
  }

  // MAIN CONTENT
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#fafafa" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem 3rem",
          marginLeft: "50px",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
        className="overflow-hidden"
      >
        <div
          style={{
            flexShrink: 0,
            backgroundColor: "#fafafa",
            paddingBottom: "1.5rem",
          }}
        >
          <HeaderSection 
            title={projectTitle}
            onTitleChange={handleTitleChange}
          />
          <TextInput value={inputText} onChange={setInputText} />
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResourceSection 
            resources={resources}
            onGenerateResources={generateResources}
            onUpdateResource={updateResource}
            isGenerating={isGenerating}
            context={project?.imageContext || context}
            projectId={projectId}
          />
        </div>
      </main>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <ProtectedRoute>
      <ToastProvider>
        <ProjectPageContent />
      </ToastProvider>
    </ProtectedRoute>
  );
}
