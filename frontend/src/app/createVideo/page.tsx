"use client";

import React from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import "../dashboard/layout.css";

export default function CreateVideoPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem 2rem 0 2rem",
          backgroundSize: "cover",
        }}
        className="p-6 overflow-auto"
      >
        {/* Tiêu đề và nút Tạo video */}
        <div className="flex flex-col lg:flex-row gap-0 items-center mb-6">
          <div className="flex lg:w-7/8 items-center">
            <h1 className="text-3xl font-bold mr-4">Việt tiếp câu chuyện hòa bình</h1>
            <div className="lg:w-1/30">
              <button className="w-full  text-white px-2 py-2 rounded-lg hover:bg-green-600">
                <img src="/editBtn.svg" alt="" />
              </button>
            </div>
          </div>
          <div className="lg:w-1/8">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Tạo video
            </button>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Phần văn bản và hình ảnh */}
          <div className="flex-1">
            {/* Đoạn văn đầu tiên với viền xanh */}
            <div className="border-2 border-blue-400 rounded-lg p-4 mb-6">
              <p className="text-gray-700">
                50 năm sau ngày thống nhất, "Việt tiếp câu chuyện hòa bình" không chỉ là lời nhắc nhở về giá trị hòa bình mà còn là lời kêu gọi hành động cho chiến tay và tương lai. Đó là trách nhiệm của mỗi người Việt Nam, đặc biệt là thế hệ trẻ, trong việc gìn giữ hòa bình, bảo vệ đất nước, xây dựng sự đoàn kết, lòng nhân ái, bằng việc ghi nhận các hành động hòa bình, truyền thông tốt đẹp, bằng cách truyền tải câu chuyện liên quan đến hòa bình và sự phát triển của thế giới. Hòa bình không chỉ là không có chiến tranh, mà còn là sự thịnh vượng, công bằng và hạnh phúc cho mọi người dân.
              </p>
            </div>

            {/* Tiêu đề "Tài nguyên" */}
            <h2 className="text-xl font-semibold mb-4">Tài nguyên</h2>

            {/* Đoạn văn và hình ảnh */}
            <div className="space-y-6">
              {/* Đoạn 1 - Sắp xếp ngang */}
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                <div className="lg:w-1/8">
                  <img
                    src="/rand1.svg"
                    alt="Tank entering Saigon"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="lg:w-6/8 lg:border-gray-200 lg:pr-4">
                  <p className="text-gray-600">
                    50 năm thống nhất đất nước: Hòa bình, thống nhất và khắc vùng vươn lên. 
                    Những dấu xe tăng hằn mạnh của quân giải phóng tiến vào Sài Gòn ngày 30/4/1975, đánh dấu thời khắc lịch sử của chiến dịch Hồ Chí Minh lịch sử, cuộc kháng chiến chống Mỹ và mở ra một chương mới cho đất nước.
                  </p>
                </div>
                {/* Phần nút chức năng bên phải */}
                <div className="lg:w-1/8 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                    Tạo lại ảnh
                  </button>
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                    Tạo lại nội dung
                  </button>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                    Xóa mục
                  </button>
                </div>
              </div>

              {/* Đoạn 2 - Sắp xếp ngang */}
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                <div className="lg:w-1/8">
                  <img
                    src="/rand2.svg"
                    alt="Independence Palace"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="lg:w-6/8 lg:border-gray-200 lg:pr-4">
                  <p className="text-gray-700 font-semibold">
                    Là cơ hội phong trưng bày Độc Lập, biểu trưng cho sự toàn thắng của cuộc kháng chiến, của ý chí độc lập và khát vọng hòa bình của dân tộc Việt Nam
                  </p>
                  <p className="text-gray-600">
                    Là cơ hội trưng bày Dinh Độc Lập, biểu trưng cho sự toàn thắng của cuộc kháng chiến, của ý chí độc lập và khát vọng hòa bình của dân tộc Việt Nam, sau chiến tranh, hòa bình, phát triển, hội nhập quốc tế và vươn lên mạnh mẽ.
                  </p>
                </div>
                {/* Phần nút chức năng bên phải */}
                <div className="lg:w-1/8 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                    Tạo lại ảnh
                  </button>
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                    Tạo lại nội dung
                  </button>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                    Xóa mục
                  </button>
                </div>
              </div>

              {/* Đoạn 3 - Sắp xếp ngang */}
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                <div className="lg:w-1/8">
                  <img
                    src="/rand3.svg"
                    alt="People welcoming liberation army"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="lg:w-6/8 lg:border-gray-200 lg:pr-4">
                  <p className="text-gray-700 font-semibold">
                    Người dân Sài Gòn hoàn thành đón quân giải phóng, ngày đất nước thống nhất trở về ven, non sông liền một dải, Bắc - Nam sum họp một nhà
                  </p>
                </div>
                {/* Phần nút chức năng bên phải */}
                <div className="lg:w-1/8 space-y-4 lg:border-l-2 lg:border-gray-200 lg:pl-4">
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                    Tạo lại ảnh
                  </button>
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                    Tạo lại nội dung
                  </button>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                    Xóa mục
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}