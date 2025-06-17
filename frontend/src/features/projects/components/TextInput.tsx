import React, { useRef, useEffect } from "react";

export default function TextInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height để tính lại
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao dựa trên nội dung
    }
  }, []);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height để tính lại
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao dựa trên nội dung
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="rounded-lg p-4 mb-3 w-full text-gray-700"
      style={{
        border: "2px solid transparent",
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
        resize: "vertical",
        minHeight: "60px",
      }}
      placeholder="Nhập từ khóa hoặc nội dung"
      rows={1}
      onInput={handleInput}
    ></textarea>
  );
}