"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "250px", background: "#f4f4f4", padding: "1rem" }}>
        <h2>Sidebar</h2>
        <ul>
          <li>Overview</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <header
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          <h1>Dashboard</h1>
        </header>
        <section>
          <p>Welcome to your dashboard! Here you can manage your application.</p>
        </section>
      </main>
    </div>
  );
}
