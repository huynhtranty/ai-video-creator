import React from "react";
import Image from "next/image";

type HeaderSectionProps = {
  onSubmit: (e: React.FormEvent) => void;
  onEdit:(e: React.FormEvent) => void;
};

export default function HeaderSection({ onSubmit, onEdit }: HeaderSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-20 items-center mb-4">
      <div className="flex lg:w-6/8 items-center">
        <h1 className="text-3xl font-bold mr-4">Việt tiếp câu chuyện hòa bình</h1>
        <button className="w-1/30 text-white px-2 py-2 rounded-full hover:bg-gradient-to-bl from-[#edfffe] to-[#482af0]">
          <Image src="/editBtn.svg" alt="Edit" width={24} height={24} />
        </button>
      </div>
      <div className="flex gap-1 lg:w-2/8 lg:pl-4">
        <button
          onClick={onSubmit}
          className="w-full text-white px-4 py-2 rounded-lg"
          style={{
            background: "linear-gradient(to right, #61FFF2, #300DF4)",
            backgroundColor: "#61FFF2", // Fallback color
            transition: "background 0.3s ease", // Smooth transition for hover
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #4DE6D9, #260BC7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #61FFF2, #300DF4)";
          }}
        >
          Tạo video
        </button>
        <button 
        onClick={onEdit}
          className="w-full text-white px-4 py-2 rounded-lg"
          style={{
            background: "linear-gradient(to right, #61FFF2, #300DF4)",
            backgroundColor: "#61FFF2", // Fallback color
            transition: "background 0.3s ease", // Smooth transition for hover
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #4DE6D9, #260BC7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(to right, #61FFF2, #300DF4)";
          }}
        >
          Sửa video
        </button>
      </div>
    </div>
  );
}