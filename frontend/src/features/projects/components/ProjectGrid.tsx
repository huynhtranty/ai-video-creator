"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string | number;
  alt?: string;
  title?: string;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "0 2rem",
        paddingBottom: "2rem",
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
                width={200}
                height={180}
                alt={project.alt ?? "thumbnail"}
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
  );
};

export default ProjectGrid;