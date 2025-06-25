import React from "react";
import Image from "next/image";

interface ResourceItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  textContent: string | React.JSX.Element;
  audioSrc?: string;
  onDelete: (resourceId: string) => void;
}

export default function ResourceItem({ id, imageSrc, imageAlt, textContent, audioSrc, onDelete }: ResourceItemProps) {
  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này không?")) {
      onDelete(id);
    }
  };

  const handleRegenerateImage = () => {
    // TODO: Implement image regeneration when API is available
    alert("Tính năng tạo lại ảnh sẽ được triển khai sau!");
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
            <Image
              src={imageSrc}
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
            className="w-full bg-[#8362E5] text-white py-2 rounded-lg hover:bg-[#6F4EC8] text-sm transition-colors"
          >
            Tạo lại ảnh
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