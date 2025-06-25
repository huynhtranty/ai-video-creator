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
      className="rounded-lg p-4 mb-3 w-full text-gray-700"
      style={{
        border: "2px solid transparent",
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
        resize: "vertical",
        minHeight: "60px",
      }}
      placeholder="Nhập từ khóa hoặc nội dung"
      rows={1}
      onChange={handleInput}
    ></textarea>
  );
}