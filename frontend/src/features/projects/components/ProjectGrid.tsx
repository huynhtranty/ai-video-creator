"use client";

import React from "react";
// import Modal from "./Modal";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // const openModal = (project: Project) => {
  //   setSelectedProject(project);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedProject(null);
  // };

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
        <ProjectCard key={project.id} project={project} />
      ))}

      {/* <Modal isOpen={isModalOpen} project={selectedProject} onClose={closeModal} /> */}
    </div>
  );
};

export default ProjectGrid;