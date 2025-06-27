import React, { useState } from "react";
import Image from "next/image";
import { generateImageForScript } from "@/features/projects/api/image";

interface ResourceItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string | React.JSX.Element;
  audioSrc?: string;
  onDelete: (resourceId: string) => void;
  onImageUpdate?: (resourceId: string, newImageSrc: string) => void;
  context?: string;
}

export default function ResourceItem({ id, imageSrc, imageAlt, textContent, audioSrc, onDelete, onImageUpdate, context }: ResourceItemProps) {
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);

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
      const newImageSrc = await generateImageForScript(context, textContent);
      setCurrentImageSrc(newImageSrc);
      if (onImageUpdate) {
        onImageUpdate(id, newImageSrc);
      }
    } catch (error) {
      console.error("Error regenerating image:", error);
      alert("Có lỗi xảy ra khi tạo lại ảnh!");
    } finally {
      setIsRegeneratingImage(false);
    }
  };

  const handleRegenerateContent = () => {
    // TODO: Implement content regeneration when API is available
    alert("Tính năng tạo lại nội dung sẽ được triển khai sau!");
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Main content row */}
      <div className="flex flex-col lg:flex-row gap-0 items-start">
        <div className="lg:w-5/19">
          <div className="relative w-full rounded-lg" style={{ paddingBottom: "66.67%" }}>
            {isRegeneratingImage && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8362E5] mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Đang tạo ảnh...</p>
                </div>
              </div>
            )}
            <Image
              src={currentImageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
        <div className="lg:w-11/19 lg:border-gray-200 lg:pl-4">
          <p className="text-gray-600 mb-3">{textContent}</p>
          
          <div className="w-full lg:pl-0">
            <div className="relative">
              <audio 
                controls 
                className="w-full h-10 audio-player"
                preload="metadata"
                style={{
                  filter: 'sepia(20%) saturate(70%) hue-rotate(315deg) brightness(95%) contrast(105%)',
                }}
              >
                {audioSrc ? (
                  <source src={audioSrc} type="audio/mpeg" />
                ) : (
                  <>
                    <source src="https://www.soundjay.com/misc/sounds/bell-ringing-01c.wav" type="audio/wav" />
                    <source src="https://www.soundjay.com/misc/sounds/bell-ringing-01c.mp3" type="audio/mpeg" />
                  </>
                )}
                Trình duyệt của bạn không hỗ trợ phát âm thanh.
              </audio>
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