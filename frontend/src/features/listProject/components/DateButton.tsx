"use client";

import React from "react";

const DateButton = () => {
  return (
    <button
      style={{
        background: "none",
        border: "2px solid #ccc",
        borderRadius: "7px",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "bold",
        padding: "0.25rem 0.5rem",
        display: "flex",
        alignItems: "center",
        transition: "border-color 0.2s, background-color 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "#000";
        e.currentTarget.style.backgroundColor = "#f0f0f0";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "#ccc";
        e.currentTarget.style.backgroundColor = "none";
      }}
    >
      <img src="/PickDate.svg" alt="Calendar" style={{ marginRight: "0.5rem", width: "16px", height: "16px" }} />
      Ngày sửa đổi gần nhất
    </button>
  );
};

export default DateButton;