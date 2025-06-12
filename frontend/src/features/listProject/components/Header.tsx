"use client";

import React from "react";

const Header = () => {
  return (
    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center" }}>
      Dự án 
      <button
        style={{
          fontSize: "0.8rem",
          verticalAlign: "middle",
          background: "none",
          border: "none",
          marginLeft: "0.5rem",
          transform: "scale(0.8)",
          transition: "transform 0.2s, opacity 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(0.9)";
          e.currentTarget.style.opacity = "0.8";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(0.8)";
          e.currentTarget.style.opacity = "1";
        }}
      >
        <img src="/Swap.svg" alt="Swap" />              
      </button>
    </h2>
  );
};

export default Header;