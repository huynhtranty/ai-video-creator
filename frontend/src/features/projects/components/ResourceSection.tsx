import React from "react";
import ResourceItem from "./ResourceItem";
import ResourceSetting from "./ResourceSetting";

export default function ResourceSection() {
  const resources = [
    {
      imageSrc: "/rand1.svg",
      imageAlt: "Tank entering Saigon",
      textContent: "50 năm thống nhất đất nước: Hòa bình, thống nhất và khắc vùng vươn lên. Những dấu xe tăng hằn mạnh của quân giải phóng tiến vào Sài Gòn ngày 30/4/1975, đánh dấu thời khắc lịch sử của chiến dịch Hồ Chí Minh lịch sử, cuộc kháng chiến chống Mỹ và mở ra một chương mới cho đất nước.",
    },
    {
      imageSrc: "/rand2.svg",
      imageAlt: "Independence Palace",
      textContent: "Là cơ hội trưng bày Dinh Độc Lập, biểu trưng cho sự toàn thắng của cuộc kháng chiến, của ý chí độc lập và khát vọng hòa bình của dân tộc Việt Nam, sau chiến tranh, hòa bình, phát triển, hội nhập quốc tế và vươn lên mạnh mẽ.",
    },
    {
      imageSrc: "/rand3.svg",
      imageAlt: "People welcoming liberation army",
      textContent: "Người dân Sài Gòn hoàn thành đón quân giải phóng, ngày đất nước thống nhất trở về ven, non sông liền một dải, Bắc - Nam sum họp một nhà.",
    },
  ];

  return (
    <div className="flex gap-6">
      {/* ResourceSetting on the left */}
      <div className="w-80 flex-shrink-0">
        <ResourceSetting />
      </div>
      
      {/* Resource items on the right */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold pb-2.5">Tài nguyên</h2>
        <div
          style={{
            maxHeight: "calc(100vh - 200px)", 
            overflowY: "auto", 
            marginBottom: "1rem",
          }}
        >
          <div className="space-y-5 lg:pr-4 lg:pb-4">
            {resources.map((resource, index) => (
              <ResourceItem
                key={index}
                imageSrc={resource.imageSrc}
                imageAlt={resource.imageAlt}
                textContent={resource.textContent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
