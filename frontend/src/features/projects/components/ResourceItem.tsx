import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Edit3, Sparkles, RotateCcw } from "lucide-react";
import { generateImageForScript } from "@/features/projects/api/image";
import CustomAudioPlayer from "@/components/ui/custom-audio-player";

interface ResourceItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string | React.JSX.Element;
  audioSrc?: string;
  onImageUpdate?: (resourceId: string, newImageSrc: string) => void;
  onAudioUpdate?: (resourceId: string, newAudioSrc: string) => void;
  onScriptUpdate?: (resourceId: string, newScript: string) => void;
  context?: string;
  isImageLoading?: boolean;
  isImageError?: boolean;
  isAudioLoading?: boolean;
  isAudioError?: boolean;
}

export default function ResourceItem({ 
  id, 
  imageSrc, 
  imageAlt, 
  textContent, 
  audioSrc, 
  onImageUpdate, 
  onAudioUpdate, 
  onScriptUpdate, 
  context, 
  isImageLoading = false, 
  isImageError = false, 
  isAudioLoading = false, 
  isAudioError = false 
}: ResourceItemProps) {
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [isRegeneratingAudio, setIsRegeneratingAudio] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const [currentAudioSrc, setCurrentAudioSrc] = useState(audioSrc);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [showContentOverlay, setShowContentOverlay] = useState(false);
  const [showAudioOverlay, setShowAudioOverlay] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editedText, setEditedText] = useState(typeof textContent === 'string' ? textContent : '');
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentImageSrc(imageSrc);
  }, [imageSrc, id]);

  useEffect(() => {
    setCurrentAudioSrc(audioSrc);
  }, [audioSrc, id]);

  const handleRegenerateImage = async () => {
    if (!context || typeof textContent !== 'string') {
      alert("Không thể tạo lại ảnh cho mục này!");
      return;
    }

    setIsRegeneratingImage(true);
    setShowImageOverlay(false);
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

  const handleUploadImage = () => {
    setShowImageOverlay(false);
    imageFileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target?.result as string;
        setCurrentImageSrc(newImageSrc);
        if (onImageUpdate) {
          onImageUpdate(id, newImageSrc);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadScript = () => {
    setShowContentOverlay(false);
    setIsEditingText(true);
  };

  const handleSaveText = () => {
    if (onScriptUpdate) {
      onScriptUpdate(id, editedText);
    }
    setIsEditingText(false);
  };

  const handleCancelEdit = () => {
    setEditedText(typeof textContent === 'string' ? textContent : '');
    setIsEditingText(false);
  };

  const handleUploadAudio = () => {
    setShowAudioOverlay(false);
    audioFileInputRef.current?.click();
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAudioSrc = e.target?.result as string;
        setCurrentAudioSrc(newAudioSrc);
        if (onAudioUpdate) {
          onAudioUpdate(id, newAudioSrc);
        }
      };
      reader.readAsDataURL(file);
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
      // const newAudioSrc = await generateTtsForScript(
      //   textContent,
      //   "vi",
      //   1.0,
      //   "MALE",
      //   "",
      //   "google"
      // );
      // setCurrentAudioSrc(newAudioSrc);
      // if (onAudioUpdate) {
      //   onAudioUpdate(id, newAudioSrc);
      // }
    } catch {
      alert("Không thể tạo lại âm thanh. Vui lòng thử lại sau!");
    } finally {
      setIsRegeneratingAudio(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row h-auto lg:h-64">
        {/* Image Section - Fixed size */}
        <div className="lg:w-2/5 relative h-48 lg:h-full flex-shrink-0">
          <div 
            className="relative w-full h-full group cursor-pointer" 
            onMouseEnter={() => setShowImageOverlay(true)}
            onMouseLeave={() => setShowImageOverlay(false)}
          >
            {(isImageError) ? (
              <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
                <span className="text-sm text-red-600">Không thể tải ảnh</span>
              </div>
            ) : (isRegeneratingImage || isImageLoading || !currentImageSrc) ? (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8362E5] mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">
                    {isRegeneratingImage ? "Đang tạo ảnh..." : "Đang tạo ảnh ban đầu..."}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src={currentImageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                {/* Hover Overlay */}
                {showImageOverlay && (
                  <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-[2px] flex items-center justify-center space-x-4 transition-all duration-300">
                    <button
                      onClick={handleRegenerateImage}
                      disabled={isRegeneratingImage}
                      className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                      title="Tạo lại ảnh"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleUploadImage}
                      className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
                      title="Tải ảnh lên"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <input
            ref={imageFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Content Section - Flexible height */}
        <div className="lg:w-3/5 flex flex-col">
          <div className="flex-1 p-6 flex flex-col justify-between min-h-0">
            {/* Text Content */}
            <div className="mb-4 relative">
              {isEditingText ? (
                <div className="space-y-3">
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#8362E5] focus:border-transparent"
                    placeholder="Nhập nội dung script..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveText}
                      className="px-3 py-1 bg-[#8362E5] text-white text-sm rounded-lg hover:bg-[#6F4EC8] transition-colors"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setShowContentOverlay(true)}
                  onMouseLeave={() => setShowContentOverlay(false)}
                >
                  <p className="text-gray-700 leading-relaxed text-base overflow-hidden" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    maxHeight: '6rem'
                  }}>{textContent}</p>
                  
                  {/* Content Hover Overlay */}
                  {showContentOverlay && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-[2px] rounded-lg flex items-center justify-center space-x-3 transition-all duration-300">
                      <button
                        onClick={handleRegenerateContent}
                        className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
                        title="Tạo lại nội dung"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleUploadScript}
                        className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
                        title="Chỉnh sửa văn bản"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Audio Section */}
            <div className="mb-4 relative">
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setShowAudioOverlay(true)}
                onMouseLeave={() => setShowAudioOverlay(false)}
              >
                {(isAudioError) ? (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
                    <span className="text-sm text-red-600">Không thể phát âm thanh</span>
                  </div>
                ) : (isRegeneratingAudio || isAudioLoading || !currentAudioSrc) ? (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8362E5]"></div>
                      <span className="text-sm text-gray-600 font-medium">
                        {isRegeneratingAudio ? "Đang tạo âm thanh..." : "Đang tạo âm thanh ban đầu..."}
                      </span>
                    </div>
                  </div>
                ) : (
                  <CustomAudioPlayer src={currentAudioSrc} />
                )}
                
                {/* Audio Hover Overlay */}
                {showAudioOverlay && currentAudioSrc && !isAudioLoading && !isAudioError && (
                  <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-[2px] rounded-lg flex items-center justify-center space-x-3 transition-all duration-300">
                    <button
                      onClick={handleRegenerateAudio}
                      disabled={isRegeneratingAudio}
                      className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                      title="Tạo lại âm thanh"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleUploadAudio}
                      className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
                      title="Tải âm thanh lên"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden File Inputs */}
            <input
              ref={audioFileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}