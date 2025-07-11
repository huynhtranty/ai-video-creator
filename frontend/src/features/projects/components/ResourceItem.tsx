import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Edit3, Sparkles, RotateCcw, MoreVertical } from "lucide-react";
import { uploadImageFile, regenerateScriptImage } from "@/features/projects/api/image";
import { uploadVoiceFile, regenerateScriptVoice } from "@/features/projects/api/tts";
import { updateScriptContent, regenerateScriptContent } from "@/features/projects/api/script";
import CustomAudioPlayer from "@/components/ui/custom-audio-player";
import RegenerationSettingsModal from "@/components/ui/regeneration-settings-modal";

interface ResourceItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string | React.JSX.Element;
  audioSrc?: string;
  onImageUpdate?: (resourceId: string, newImageSrc: string) => void;
  onAudioUpdate?: (resourceId: string, newAudioSrc: string) => void;
  onScriptUpdate?: (resourceId: string, newScript: string) => void;
  onLoadingStateChange?: (resourceId: string, updates: { isImageLoading?: boolean; isAudioLoading?: boolean }) => void;
  context?: string;
  projectId?: string;
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
  onLoadingStateChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context, 
  projectId,
  isImageLoading = false, 
  isImageError = false, 
  isAudioLoading = false, 
  isAudioError = false 
}: ResourceItemProps) {
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isRegeneratingAudio, setIsRegeneratingAudio] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [isUpdatingScript, setIsUpdatingScript] = useState(false);
  const [isRegeneratingContent, setIsRegeneratingContent] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const [currentAudioSrc, setCurrentAudioSrc] = useState(audioSrc);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [showContentOverlay, setShowContentOverlay] = useState(false);
  const [showAudioDropdown, setShowAudioDropdown] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editedText, setEditedText] = useState(typeof textContent === 'string' ? textContent : '');
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);
  const audioDropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentImageSrc(imageSrc);
  }, [imageSrc, id]);

  useEffect(() => {
    setCurrentAudioSrc(audioSrc);
  }, [audioSrc, id]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (audioDropdownRef.current && !audioDropdownRef.current.contains(event.target as Node)) {
        setShowAudioDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-resize textarea when entering edit mode
  useEffect(() => {
    if (isEditingText && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [isEditingText]);

  const handleRegenerateWithSettings = async (type: 'script' | 'audio' | 'image', settings: any) => {
    if (!projectId) {
      alert("Không thể tạo lại cho mục này!");
      return;
    }

    try {
      switch (type) {
        case 'script':
          setIsRegeneratingContent(true);
          const scriptResponse = await regenerateScriptContent(id, settings.model?.toLowerCase() || "gemini-script", {
            style: settings.style,
            model: settings.model,
          });
          if (onScriptUpdate) {
            onScriptUpdate(id, scriptResponse.content);
          }
          break;

        case 'image':
          setIsRegeneratingImage(true);
          if (onLoadingStateChange) {
            onLoadingStateChange(id, { isImageLoading: true });
          }
          const imageResponse = await regenerateScriptImage(id, "gemini-image", {
            style: settings.style,
          });
          setCurrentImageSrc(imageResponse.url);
          if (onImageUpdate) {
            onImageUpdate(id, imageResponse.url);
          }
          if (onLoadingStateChange) {
            onLoadingStateChange(id, { isImageLoading: false });
          }
          break;

        case 'audio':
          setIsRegeneratingAudio(true);
          if (onLoadingStateChange) {
            onLoadingStateChange(id, { isAudioLoading: true });
          }
          const audioResponse = await regenerateScriptVoice(id, settings.model?.toLowerCase() || "google", {
            gender: settings.gender === "Nam" ? "MALE" : "FEMALE",
            language: settings.language === "Detect" ? "auto" : settings.language.toLowerCase(),
            speedRate: settings.speedRate,
            model: settings.model,
          });
          setCurrentAudioSrc(audioResponse.audioUrl);
          if (onAudioUpdate) {
            onAudioUpdate(id, audioResponse.audioUrl);
          }
          if (onLoadingStateChange) {
            onLoadingStateChange(id, { isAudioLoading: false });
          }
          break;
      }
    } catch (error) {
      console.error(`Error regenerating ${type}:`, error);
      alert(`Không thể tạo lại ${type}. Vui lòng thử lại sau!`);
    } finally {
      switch (type) {
        case 'script':
          setIsRegeneratingContent(false);
          break;
        case 'image':
          setIsRegeneratingImage(false);
          break;
        case 'audio':
          setIsRegeneratingAudio(false);
          break;
      }
    }
  };

  const handleUploadImage = () => {
    setShowImageOverlay(false);
    imageFileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && projectId) {
      setIsUploadingImage(true);
      try {
        const response = await uploadImageFile(file, projectId, id);
        const newImageSrc = response.url;
        setCurrentImageSrc(newImageSrc);
        if (onImageUpdate) {
          onImageUpdate(id, newImageSrc);
        }
      } catch (error) {
        console.error('Error uploading image file:', error);
        alert("Không thể tải lên ảnh. Vui lòng thử lại sau!");
      } finally {
        setIsUploadingImage(false);
        // Clear the input to allow uploading the same file again
        if (imageFileInputRef.current) {
          imageFileInputRef.current.value = '';
        }
      }
    } else if (!projectId) {
      alert("Thiếu thông tin dự án để tải lên ảnh!");
    }
  };

  const handleUploadScript = () => {
    setShowContentOverlay(false);
    setIsEditingText(true);
  };

  const handleSaveText = async () => {
    if (!projectId) {
      alert("Thiếu thông tin dự án để cập nhật script!");
      return;
    }

    // Check if content has actually changed
    const originalText = typeof textContent === 'string' ? textContent : '';
    if (editedText.trim() === originalText.trim()) {
      setIsEditingText(false);
      return;
    }

    // Check if content is not empty
    if (!editedText.trim()) {
      alert("Nội dung script không được để trống!");
      return;
    }

    setIsUpdatingScript(true);
    try {
      const response = await updateScriptContent(id, editedText.trim());
      // Update the local state with the response
      if (onScriptUpdate) {
        onScriptUpdate(id, response.content);
      }
      setIsEditingText(false);
    } catch (error) {
      console.error('Error updating script content:', error);
      alert("Không thể cập nhật nội dung script. Vui lòng thử lại sau!");
    } finally {
      setIsUpdatingScript(false);
    }
  };

  const handleCancelEdit = () => {
    if (isUpdatingScript) return; // Prevent cancel during update
    setEditedText(typeof textContent === 'string' ? textContent : '');
    setIsEditingText(false);
  };

  const handleUploadAudio = () => {
    setShowAudioDropdown(false);
    audioFileInputRef.current?.click();
  };

  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && projectId) {
      setIsUploadingAudio(true);
      try {
        const response = await uploadVoiceFile(file, projectId, id);
        const newAudioSrc = response.audioUrl;
        setCurrentAudioSrc(newAudioSrc);
        if (onAudioUpdate) {
          onAudioUpdate(id, newAudioSrc);
        }
      } catch (error) {
        console.error('Error uploading audio file:', error);
        alert("Không thể tải lên âm thanh. Vui lòng thử lại sau!");
      } finally {
        setIsUploadingAudio(false);
        // Clear the input to allow uploading the same file again
        if (audioFileInputRef.current) {
          audioFileInputRef.current.value = '';
        }
      }
    } else if (!projectId) {
      alert("Thiếu thông tin dự án để tải lên âm thanh!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row h-auto min-h-[16rem]">
        {/* Image Section - Fixed size */}
        <div className="lg:w-2/5 relative h-48 lg:h-64 flex-shrink-0 overflow-hidden rounded-l-xl">
          <div 
            className="relative w-full h-full group cursor-pointer" 
            onMouseEnter={() => setShowImageOverlay(true)}
            onMouseLeave={() => setShowImageOverlay(false)}
          >
            {(isImageError) ? (
              <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
                <span className="text-sm text-red-600">Không thể tải ảnh</span>
              </div>
            ) : (isRegeneratingImage || isUploadingImage || isImageLoading || !currentImageSrc) ? (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8362E5] mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">
                    {isRegeneratingImage ? "Đang tạo lại ảnh..." : isUploadingImage ? "Đang tải ảnh lên..." : "Đang tạo ảnh ban đầu..."}
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
                    <RegenerationSettingsModal
                      type="image"
                      onRegenerate={handleRegenerateWithSettings}
                      isLoading={isRegeneratingImage}
                    >
                      <button
                        disabled={isRegeneratingImage || isUploadingImage}
                        className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                        title="Tạo lại ảnh"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </RegenerationSettingsModal>
                    <button
                      onClick={handleUploadImage}
                      disabled={isUploadingImage || isRegeneratingImage}
                      className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
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
          <div className="flex-1 p-6 flex flex-col justify-between">
            {/* Text Content */}
            <div className="mb-4 relative flex-grow">
              {isEditingText ? (
                <div className="space-y-3">
                  <textarea
                    ref={textareaRef}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    disabled={isUpdatingScript}
                    className="w-full min-h-[6rem] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#8362E5] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Nhập nội dung script..."
                    style={{ height: 'auto', minHeight: '6rem' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveText}
                      disabled={isUpdatingScript}
                      className="px-3 py-1 bg-[#8362E5] text-white text-sm rounded-lg hover:bg-[#6F4EC8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isUpdatingScript && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      )}
                      {isUpdatingScript ? "Đang lưu..." : "Lưu"}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isUpdatingScript}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  {isRegeneratingContent ? (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center min-h-[4rem]">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8362E5]"></div>
                        <span className="text-sm text-gray-600 font-medium">Đang tạo nội dung mới...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">{textContent}</p>
                      
                      {/* Content Hover Overlay - Same style as image */}
                      {showContentOverlay && (
                        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-[2px] flex items-center justify-center space-x-4 transition-all duration-300">
                          <RegenerationSettingsModal
                            type="script"
                            onRegenerate={handleRegenerateWithSettings}
                            isLoading={isRegeneratingContent}
                          >
                            <button
                              disabled={isRegeneratingContent}
                              className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                              title="Tạo lại nội dung"
                            >
                              <Sparkles className="w-5 h-5" />
                            </button>
                          </RegenerationSettingsModal>
                          <button
                            onClick={handleUploadScript}
                            className="bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-700 p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
                            title="Chỉnh sửa văn bản"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Audio Section - Fixed at bottom */}
            <div className="relative flex-shrink-0">
              <div className="relative flex items-center gap-3">
                <div className="flex-1">
                  {(isAudioError) ? (
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
                      <span className="text-sm text-red-600">Không thể phát âm thanh</span>
                    </div>
                  ) : (isRegeneratingAudio || isUploadingAudio || isAudioLoading || !currentAudioSrc) ? (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8362E5]"></div>
                        <span className="text-sm text-gray-600 font-medium">
                          {isRegeneratingAudio ? "Đang tạo âm thanh..." : isUploadingAudio ? "Đang tải âm thanh lên..." : "Đang tạo âm thanh ban đầu..."}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <CustomAudioPlayer src={currentAudioSrc} />
                  )}
                </div>
                
                {/* Three-dots menu button positioned to the side */}
                {currentAudioSrc && !isAudioLoading && !isAudioError && !isUploadingAudio && (
                  <div className="relative" ref={audioDropdownRef}>
                    <button
                      onClick={() => setShowAudioDropdown(!showAudioDropdown)}
                      className="bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 p-2 rounded-lg shadow-sm transition-all duration-200 border border-gray-200"
                      title="Tùy chọn âm thanh"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown menu - positioned to avoid cut-off */}
                    {showAudioDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px] z-30">
                        <RegenerationSettingsModal
                          type="audio"
                          onRegenerate={handleRegenerateWithSettings}
                          isLoading={isRegeneratingAudio}
                        >
                          <button
                            disabled={isRegeneratingAudio || isUploadingAudio}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            onClick={() => setShowAudioDropdown(false)}
                          >
                            Tạo lại âm thanh
                          </button>
                        </RegenerationSettingsModal>
                        <button
                          onClick={() => {
                            handleUploadAudio();
                            setShowAudioDropdown(false);
                          }}
                          disabled={isUploadingAudio || isRegeneratingAudio}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Tải âm thanh lên
                        </button>
                      </div>
                    )}
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