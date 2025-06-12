"use client";

import React from "react";

interface Project {
     id: string | number;
     alt?: string;
     // add other fields as needed
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
     <div key={project.id}>
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
          <img src="/videoTemp.svg" alt={project.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "5px 15px", background: "white" }}>
          <p style={{ fontSize: "14px", color: "#00000", fontFamily: "'Inter', cursive" }}>#VideoEditing</p>
          </div>
     </div>
     ))}
</div>
);
};

export default ProjectGrid;