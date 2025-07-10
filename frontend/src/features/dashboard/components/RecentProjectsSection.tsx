import React from "react";
import { useListRecentProjects } from "@/features/projects/api/project";
import ProjectCard from "@/features/projects/components/ProjectCard";

export default function RecentProjectsSection() {
  const { data: projects = [], isLoading, error } = useListRecentProjects();

  if (isLoading) {
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
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <div 
              className="spinner"
              style={{ 
                width: "30px", 
                height: "30px", 
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #8362E5",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px"
              }}
            />
            Đang tải dự án gần đây...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
          <div style={{ textAlign: "center", padding: "40px", color: "#e74c3c" }}>
            Không thể tải dự án gần đây. Vui lòng thử lại.
          </div>
        </div>
      </section>
    );
  }

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

        {projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Chưa có dự án nào gần đây.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}