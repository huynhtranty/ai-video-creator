"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateProject } from "@/features/projects/api/project";
import { CreateProjectRequest } from "@/types/project";

export default function NewProjectBar() {
  const [projectTitle, setProjectTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const createProjectMutation = useCreateProject();

  const handleCreateProject = async () => {
    if (!user || !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!projectTitle.trim()) {
      alert("Please enter a project title");
      return;
    }

    setIsCreating(true);

    const newProjectData: CreateProjectRequest = {
      name: projectTitle.trim(),
      userId: user.id,
    };

    createProjectMutation.mutate(newProjectData, {
      onError: (err) => {
        console.error("Error creating project:", err);
        alert("Failed to create project. Please try again.");
        setIsCreating(false);
      },
      onSuccess: () => {
        setIsCreating(false);
        setProjectTitle("");
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateProject();
    }
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <div style={{ position: "relative", display: "inline-block", width: "60%" }}>
        <input
          type="text"
          placeholder="Enter project title to create new video..."
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isCreating}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 140px 0.5rem 2rem",
            width: "100%",
            height: "110px",
            border: "2px solid transparent",
            borderRadius: "20px",
            outline: "none",
            fontSize: "16px",
            transition: "box-shadow 0.2s ease-in-out",
            background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #61FFF2, #300DF4) border-box",
            opacity: isCreating ? 0.7 : 1,
          }}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)")}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
        <button
          onClick={handleCreateProject}
          disabled={isCreating || !projectTitle.trim()}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "12px 24px",
            backgroundColor: isCreating || !projectTitle.trim() ? "#ccc" : "#8362E5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: isCreating || !projectTitle.trim() ? "not-allowed" : "pointer",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (!isCreating && projectTitle.trim()) {
              e.currentTarget.style.backgroundColor = "#7151D3";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isCreating && projectTitle.trim()) {
              e.currentTarget.style.backgroundColor = "#8362E5";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }
          }}
        >
          {isCreating ? (
            <>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #ffffff30",
                  borderTop: "2px solid #ffffff",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Creating...
            </>
          ) : (
            "Create Project"
          )}
        </button>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}