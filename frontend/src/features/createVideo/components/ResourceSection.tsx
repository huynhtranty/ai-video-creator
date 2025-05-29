import React from "react";
import ResourceItem from "./ResourceItem";

export default function ResourceSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Tài nguyên</h2>
      <div
        style={{
          maxHeight: "calc(100vh - 200px)", // Chiều cao đủ để hiển thị 3 đoạn (~600px cho 3 đoạn)
          overflowY: "auto", // Cho phép cuộn dọc khi vượt quá 3 đoạn
          marginBottom: "1rem",
        }}
      >
        <div className="space-y-3 lg:pr-4">
          {/* Resource Item 1 */}
          <ResourceItem
            imageSrc="/rand1.svg"
            imageAlt="Tank entering Saigon"
            textContent={
              <p className="text-gray-600">
                50 năm thống nhất đất nước: Hòa bình, thống nhất và khắc vùng vươn lên. Những dấu xe
                tăng hằn mạnh của quân giải phóng tiến vào Sài Gòn ngày 30/4/1975, đánh dấu thời khắc
                lịch sử của chiến dịch Hồ Chí Minh lịch sử, cuộc kháng chiến chống Mỹ và mở ra một
                chương mới cho đất nước.
              </p>
            }
          />
          {/* Resource Item 2 */}
          <ResourceItem
            imageSrc="/rand2.svg"
            imageAlt="Independence Palace"
            textContent={
              <>
                <p className="text-gray-600">
                  Là cơ hội trưng bày Dinh Độc Lập, biểu trưng cho sự toàn thắng của cuộc kháng chiến,
                  của ý chí độc lập và khát vọng hòa bình của dân tộc Việt Nam, sau chiến tranh, hòa
                  bình, phát triển, hội nhập quốc tế và vươn lên mạnh mẽ.
                </p>
              </>
            }
          />
          {/* Resource Item 3 */}
          <ResourceItem
            imageSrc="/rand3.svg"
            imageAlt="People welcoming liberation army"
            textContent={
              <p className="text-gray-600">
                Người dân Sài Gòn hoàn thành đón quân giải phóng, ngày đất nước thống nhất trở về ven,
                non sông liền một dải, Bắc - Nam sum họp một nhà
              </p>
            }
          />
          {/* Add Item Section */}
          <div className="flex flex-col lg:flex-row gap-0 items-start">
            <div
              className="w-full flex items-center justify-center"
              style={{
                border: "2px dashed #a855f7",
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
    </div>
  );
}