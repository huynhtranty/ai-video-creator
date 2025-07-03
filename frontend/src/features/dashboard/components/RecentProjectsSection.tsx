import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecentProjectsSection() {
  const projects = [
    { id: "1-recent-video-1", alt: "Video 1", title: "Recent Video 1" },
    { id: "2-recent-video-2", alt: "Video 2", title: "Recent Video 2" },
    { id: "3-recent-video-3", alt: "Video 3", title: "Recent Video 3" },
    { id: "4-recent-video-4", alt: "Video 4", title: "Recent Video 4" },
  ];

  return (
    <section style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="list-project-section" style={{ marginTop: "5px", width: "90%" }}>
        <h2
          className="trending-title"
          style={{
            fontSize: "20px",
            marginBottom: "5px",
            fontWeight: "bold",
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          Dự án gần đây:
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ cursor: "pointer" }}>
                <div
                  style={{
                    padding: "1rem",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#EEEEEE",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Image 
                    src="/videoTemp.svg" 
                    alt={project.alt} 
                    width={200}
                    height={180}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div style={{ padding: "5px 15px", background: "white" }}>
                  <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}