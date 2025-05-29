"use client";

import React, { useRef, useEffect } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import "../dashboard/layout.css";

export default function CreateVideoPage() {
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
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "1rem 2rem",
          backgroundSize: "cover",
          marginLeft: "50px", // Đảm bảo main không bị che bởi Sidebar cố định
        }}
        className="overflow-hidden" // Ngăn main cuộn toàn bộ
      >
        {/* Phần cố định: Tiêu đề, nút Tạo video, textarea, và tiêu đề Tài nguyên */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white", // Đảm bảo phần cố định không bị trong suốt
            paddingBottom: "10px", // Khoảng cách dưới cùng
          }}
        >
          {/* Tiêu đề và nút Tạo video */}
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-4">
            <div className="flex lg:w-7/8 items-center">
              <h1 className="text-3xl font-bold mr-4">Việt tiếp câu chuyện hòa bình</h1>
              <div className="lg:w-1/30">
                <button className="w-full text-white px-2 py-2 rounded-full hover:bg-green-600">
                  <img src="/editBtn.svg" alt="" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/8 lg:pl-4">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Tạo video
              </button>
            </div>
          </div>

          {/* Khu vực nhập văn bản với viền gradient */}
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

          {/* Tiêu đề "Tài nguyên" */}
          <h2 className="text-xl font-semibold">Tài nguyên</h2>
        </div>

        {/* Phần cuộn: Nội dung Tài nguyên */}
        <div
          style={{
            maxHeight: "calc(100vh - 200px)", // Chiều cao đủ để hiển thị 3 đoạn (~600px cho 3 đoạn)
            overflowY: "auto", // Cho phép cuộn dọc khi vượt quá 3 đoạn
            marginBottom: "1rem",
          }}
        >
          {/* Đoạn văn và hình ảnh */}
          <div className="space-y-3 lg:pr-4">
            {/* Đoạn 1 - Sắp xếp ngang */}
            <div className="flex flex-col lg:flex-row gap-0 items-start">
              <div className="lg:w-1/9">
                <img
                  src="/rand1.svg"
                  alt="Tank entering Saigon"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="lg:w-7/9 lg:border-gray-200 lg:pl-4">
                <p className="text-gray-600">
                  50 năm thống nhất đất nước: Hòa bình, thống nhất và khắc vùng vươn lên. 
                  Những dấu xe tăng hằn mạnh của quân giải phóng tiến vào Sài Gòn ngày 30/4/1975, đánh dấu thời khắc lịch sử của chiến dịch Hồ Chí Minh lịch sử, cuộc kháng chiến chống Mỹ và mở ra một chương mới cho đất nước.
                </p>
              </div>
              {/* Phần nút chức năng bên phải */}
              <div className="lg:w-1/9 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 text-sm">
                  Tạo lại ảnh
                </button>
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 text-sm">
                  Tạo lại nội dung
                </button>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm">
                  Xóa mục
                </button>
              </div>
            </div>

            {/* Đoạn 2 - Sắp xếp ngang */}
            <div className="flex flex-col lg:flex-row gap-0 items-start">
              <div className="lg:w-1/9">
                <img
                  src="/rand2.svg"
                  alt="Independence Palace"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="lg:w-7/9 lg:border-gray-200 lg:pl-4">
                <p className="text-gray-700 font-semibold">
                  Là cơ hội phong trưng bày Độc Lập, biểu trưng cho sự toàn thắng của cuộc kháng chiến, của ý chí độc lập và khát vọng hòa bình của dân tộc Việt Nam
                </p>
                <p className="text-gray-600">
                  Là cơ hội trưng bày Dinh Độc Lập, biểu trưng cho sự toàn thắng của cuộc kháng chiến, của ý chí độc lập và khát vọng hòa bình của dân tộc Việt Nam, sau chiến tranh, hòa bình, phát triển, hội nhập quốc tế và vươn lên mạnh mẽ.
                </p>
              </div>
              {/* Phần nút chức năng bên phải */}
              <div className="lg:w-1/9 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 text-sm">
                  Tạo lại ảnh
                </button>
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 text-sm">
                  Tạo lại nội dung
                </button>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm">
                  Xóa mục
                </button>
              </div>
            </div>

            {/* Đoạn 3 */}
            <div className="flex flex-col lg:flex-row gap-0 items-start">
              <div className="lg:w-1/9">
                <img
                  src="/rand3.svg"
                  alt="People welcoming liberation army"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="lg:w-7/9 lg:border-gray-200 lg:pl-4">
                <p className="text-gray-700 font-semibold">
                  Người dân Sài Gòn hoàn thành đón quân giải phóng, ngày đất nước thống nhất trở về ven, non sông liền một dải, Bắc - Nam sum họp một nhà
                </p>
              </div>
              {/* Phần nút chức năng bên phải */}
              <div className="lg:w-1/9 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 text-sm">
                  Tạo lại ảnh
                </button>
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 text-sm">
                  Tạo lại nội dung
                </button>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm">
                  Xóa mục
                </button>
              </div>
            </div>

            {/* Đoạn 4 */}
            <div className="flex flex-col lg:flex-row gap-0 items-start">
              <div
                className="w-full flex items-center justify-center"
                style={{
                  border: "2px dashed #a855f7", // Dashed purple border
                  backgroundColor: "#ffffff",
                  height: "0",
                  paddingBottom: "11.1111%",
                  position: "relative",
                  borderRadius: "10px",
                }}
              >
                <button
                  className="text-fuchsia-700 px-4 py-2 rounded-lg"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  Thêm mục
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}