import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface HeaderSectionProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onEdit:(e: React.FormEvent) => void;
}

export default function HeaderSection({ title, onTitleChange, onSubmit /*, onEdit*/ }: HeaderSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onTitleChange(localTitle);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    onTitleChange(localTitle);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  return (
    <div className="flex flex-col lg:flex-row gap-20 items-center mb-4">
      <div className="flex lg:w-7/8 items-center">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="text-3xl font-bold mr-4 bg-transparent border-b-2 border-blue-500 outline-none"
          />
        ) : (
          <h1 className="text-3xl font-bold mr-4">{title}</h1>
        )}
        <div className="lg:w-1/30">
          <button 
            onClick={handleEditClick}
            className="w-full text-white px-2 py-2 rounded-full hover:bg-gradient-to-bl from-[#edfffe] to-[#482af0]"
          >
            <Image src="/editBtn.svg" alt="Edit title" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="flex gap-1 lg:w-1/8 lg:pl-4">
        <button
          onClick={onSubmit}
          className="w-full bg-[#8362E5] hover:bg-[#6F4EC8] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Tạo video
        </button>
        {/*<button */}
        {/*  onClick={onEdit}*/}
        {/*  className="w-full text-white px-4 py-2 rounded-lg"*/}
        {/*  style={{*/}
        {/*    background: "linear-gradient(to right, #61FFF2, #300DF4)",*/}
        {/*    backgroundColor: "#61FFF2", // Fallback color*/}
        {/*    transition: "background 0.3s ease", // Smooth transition for hover*/}
        {/*  }}*/}
        {/*  onMouseEnter={(e) => {*/}
        {/*    e.currentTarget.style.background = "linear-gradient(to right, #4DE6D9, #260BC7)";*/}
        {/*  }}*/}
        {/*  onMouseLeave={(e) => {*/}
        {/*    e.currentTarget.style.background = "linear-gradient(to right, #61FFF2, #300DF4)";*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Sửa video*/}
        {/*</button>*/}
      </div>
    </div>
  );
}