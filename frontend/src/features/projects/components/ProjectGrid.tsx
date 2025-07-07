"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal"; // Adjust the import path as needed

interface Project {
  id: string | number;
  alt?: string;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
        <div key={project.id} onClick={() => openModal(project)} style={{ cursor: "pointer" }}>
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
      ))}

      <Modal isOpen={isModalOpen} project={selectedProject} onClose={closeModal} />
    </div>
  );
};

export default ProjectGrid;