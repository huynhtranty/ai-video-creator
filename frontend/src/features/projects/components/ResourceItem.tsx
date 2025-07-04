import React, { useState, useEffect } from "react";
import Image from "next/image";
import { generateImageForScript } from "@/features/projects/api/image";
import { generateTtsForScript } from "@/features/projects/api/tts";

interface ResourceItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string | React.JSX.Element;
  audioSrc?: string;
  onDelete: (resourceId: string) => void;
  onImageUpdate?: (resourceId: string, newImageSrc: string) => void;
  onAudioUpdate?: (resourceId: string, newAudioSrc: string) => void;
  context?: string;
  isImageLoading?: boolean;
  isImageError?: boolean;
  isAudioLoading?: boolean;
  isAudioError?: boolean;
}

export default function ResourceItem({ id, imageSrc, imageAlt, textContent, audioSrc, onDelete, onImageUpdate, onAudioUpdate, context, isImageLoading = false, isImageError = false, isAudioLoading = false, isAudioError = false }: ResourceItemProps) {
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [isRegeneratingAudio, setIsRegeneratingAudio] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const [currentAudioSrc, setCurrentAudioSrc] = useState(audioSrc);

  useEffect(() => {
    setCurrentImageSrc(imageSrc);
  }, [imageSrc, id]);

  useEffect(() => {
    setCurrentAudioSrc(audioSrc);
  }, [audioSrc, id]);

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này không?")) {
      onDelete(id);
    }
  };

  const handleRegenerateImage = async () => {
    if (!context || typeof textContent !== 'string') {
      alert("Không thể tạo lại ảnh cho mục này!");
      return;
    }

    setIsRegeneratingImage(true);
    try {
      const response = await generateImageForScript({
        prompt: textContent,
        context: context,
        provider: "gemini-image",
        projectId: "",
        scriptId: id,
      });
      const newImageSrc = response.url;
      setCurrentImageSrc(newImageSrc);
      if (onImageUpdate) {
        onImageUpdate(id, newImageSrc);
      }
    } catch {
      alert("Không thể tạo lại ảnh. Vui lòng thử lại sau!");
    } finally {
      setIsRegeneratingImage(false);
    }
  };

  const handleRegenerateContent = () => {
    // TODO: Implement content regeneration when API is available
    alert("Tính năng tạo lại nội dung sẽ được triển khai sau!");
  };

  const handleRegenerateAudio = async () => {
    if (!context || typeof textContent !== 'string') {
      alert("Không thể tạo lại âm thanh cho mục này!");
      return;
    }

    setIsRegeneratingAudio(true);
    try {
      const newAudioSrc = await generateTtsForScript(
        textContent,
        "vi",
        1.0,
        "MALE",
        "",
        "google"
      );
      setCurrentAudioSrc(newAudioSrc);
      if (onAudioUpdate) {
        onAudioUpdate(id, newAudioSrc);
      }
    } catch {
      alert("Không thể tạo lại âm thanh. Vui lòng thử lại sau!");
    } finally {
      setIsRegeneratingAudio(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Main content row */}
      <div className="flex flex-col lg:flex-row gap-0 items-start">
        <div className="lg:w-5/19">
          <div className="relative w-full rounded-lg" style={{ paddingBottom: "66.67%" }}>
            {(isImageError || !currentImageSrc) ? (
              <div className="absolute inset-0 bg-red-100 rounded-lg flex items-center justify-center z-10">
                <span className="text-sm text-red-600">Không thể tải ảnh</span>
              </div>
            ) : (isRegeneratingImage || isImageLoading || !currentImageSrc) ? (
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8362E5] mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">
                    {isRegeneratingImage ? "Đang tạo ảnh..." : "Đang tạo ảnh ban đầu..."}
                  </p>
                </div>
              </div>
            ) : (
              <Image
                src={currentImageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover rounded-lg"
                priority
              />
            )}
          </div>
        </div>
        <div className="lg:w-11/19 lg:border-gray-200 lg:pl-4">
          <p className="text-gray-600 mb-3">{textContent}</p>
          
          <div className="w-full lg:pl-0">
            <div className="relative">
              {(isAudioError || !currentAudioSrc) ? (
                <div className="w-full h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-red-600">Không thể phát âm thanh</span>
                </div>
              ) : (isRegeneratingAudio || isAudioLoading || !currentAudioSrc) ? (
                <div className="w-full h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#8362E5]"></div>
                    <span className="text-sm text-gray-600">
                      {isRegeneratingAudio ? "Đang tạo âm thanh..." : "Đang tạo âm thanh ban đầu..."}
                    </span>
                  </div>
                </div>
              ) : (
                <audio 
                  controls 
                  className="w-full h-10 audio-player"
                  preload="metadata"
                  style={{
                    filter: 'sepia(20%) saturate(70%) hue-rotate(315deg) brightness(95%) contrast(105%)',
                  }}
                >
                  <source src={currentAudioSrc} type="audio/mpeg" />
                  Trình duyệt của bạn không hỗ trợ phát âm thanh.
                </audio>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-3/19 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
          <button 
            onClick={handleRegenerateImage}
            disabled={isRegeneratingImage}
            className="w-full bg-[#8362E5] text-white py-2 rounded-lg hover:bg-[#6F4EC8] disabled:bg-gray-400 disabled:cursor-not-allowed text-sm transition-colors"
          >
            {isRegeneratingImage ? "Đang tạo..." : "Tạo lại ảnh"}
          </button>
          <button 
            onClick={handleRegenerateAudio}
            disabled={isRegeneratingAudio}
            className="w-full bg-[#8362E5] text-white py-2 rounded-lg hover:bg-[#6F4EC8] disabled:bg-gray-400 disabled:cursor-not-allowed text-sm transition-colors"
          >
            {isRegeneratingAudio ? "Đang tạo..." : "Tạo lại âm thanh"}
          </button>
          <button 
            onClick={handleRegenerateContent}
            className="w-full bg-[#8362E5] text-white py-2 rounded-lg hover:bg-[#6F4EC8] text-sm transition-colors"
          >
            Tạo lại nội dung
          </button>
          <button 
            onClick={handleDelete}
            className="w-full bg-white text-red-600 py-2 rounded-lg hover:bg-red-600 text-sm border border-red-600 hover:text-white transition-colors"
          >
            Xóa mục
          </button>
        </div>
      </div>
    </div>
  );
}