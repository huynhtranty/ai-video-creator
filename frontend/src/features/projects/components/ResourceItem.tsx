import React from "react";
import { jsx } from "react/jsx-runtime";

interface ResourceItemProps {
  imageSrc: string;
  imageAlt: string;
  textContent: string | React.JSX.Element;
}

export default function ResourceItem({ imageSrc, imageAlt, textContent }: ResourceItemProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-0 items-start">
      <div className="lg:w-3/19">
        <div className="relative w-full rounded-lg" style={{ paddingBottom: "66.67%" /* 2/3 để tạo tỉ lệ 3:2 */ }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="lg:w-13/19 lg:border-gray-200 lg:pl-4">{textContent}</div>
      <div className="lg:w-3/19 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
        <button className="w-full bg-[#8362E5] text-white py-2 rounded-lg hover:bg-[#6F4EC8] text-sm">
          Tạo lại ảnh
        </button>
        <button className="w-full bg-[#8362E5] text-white py-2 rounded-lg hover:bg-[#6F4EC8] text-sm">
          Tạo lại nội dung
        </button>
        <button className="w-full bg-white text-red-600 py-2 rounded-lg hover:bg-red-600 text-sm border border-red-600 hover:text-white">
          Xóa mục
        </button>
      </div>
    </div>
  );
}