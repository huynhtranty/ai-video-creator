"use client";
import React from "react";

export default function StatisticCards() {
  const cards = [
    {
      title: "Tổng tất cả lượt xem",
      value: "10K",
      icon: "/View-Statistic.svg",
      bg: "linear-gradient(to bottom, #4FF900 0%,#FAF3F3 60%, #FAF3F3 100%)",
      iconWidth: "80px",
      iconHeight: "80px",
      iconMargin: "5px 0",
      border: "2px solid #1890ff",
    },
    {
      title: "Số lượt xem trên Youtube",
      value: "10K",
      icon: "/Youtube-Statistic.svg",
      bg: "linear-gradient(to bottom, #ff4d4f 0%, #FAF3F3 60%,#FAF3F3 100%)",
      iconWidth: "55px",
      iconHeight: "65px",
      iconMargin: "15px 0 12px 0",
    },
    {
      title: "Số lượt xem trên Facebook",
      value: "10K",
      icon: "/Fb-Statistic.svg",
      bg: "linear-gradient(to bottom, #3F00EA 0%,#FAF3F3 60%, #FAF3F3 100%)",
      iconWidth: "70px",
      iconHeight: "70px",
      iconMargin: "10px 0 8px 0",
    },
    {
      title: "Số lượt xem trên Tiktok",
      value: "10K",
      icon: "/Tiktok-Statistic.svg",
      bg: "linear-gradient(to bottom, #434343 0%, #FAF3F3 60%, #FAF3F3 100%)",
      iconWidth: "70px",
      iconHeight: "70px",
      iconMargin: "12px 0 7px 0",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", flex: 1 }}>
      {cards.map((item, i) => (
        <div
          key={i}
          style={{
            background: item.bg,
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            ...(item.border ? { border: item.border } : {}),
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={item.icon}
              alt={item.title}
              style={{
                width: item.iconWidth,
                height: item.iconHeight,
                objectFit: "contain",
                margin: item.iconMargin,
              }}
            />
          </div>
          <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{item.title}</p>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
