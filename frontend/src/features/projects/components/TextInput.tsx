import React, { useRef, useEffect } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height để tính lại
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao dựa trên nội dung
    }
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height để tính lại
    textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao dựa trên nội dung
    onChange(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      className="rounded-xl p-4 mb-6 w-full text-gray-700 border-2 border-gray-200 focus:border-[#8362E5] focus:ring-2 focus:ring-[#8362E5]/20 transition-colors shadow-sm hover:border-gray-300"
      style={{
        resize: "vertical",
        minHeight: "80px",
        backgroundColor: "#ffffff",
      }}
      placeholder="Nhập từ khóa hoặc nội dung để tạo video..."
      rows={1}
      onChange={handleInput}
    ></textarea>
  );
}