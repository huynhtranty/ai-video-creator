"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { useDeleteProject } from "@/features/projects/api/project";
import ConfirmDialog from "@/components/ui/confirm-dialog";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const deleteProjectMutation = useDeleteProject();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProjectMutation.mutateAsync(project.id);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div
      style={{
        position: "relative",
        textDecoration: "none",
        color: "inherit"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        key={project.id} 
        href={`/projects/${project.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div 
          style={{ 
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              width: "100%",
              height: "180px",
              marginBottom: "8px",
              overflow: "hidden",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: project.thumbnailUrl ? "transparent" : "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {project.thumbnailUrl ? (
              <Image
                src={project.thumbnailUrl}
                width={200}
                height={180}
                alt={project.name ?? "thumbnail"}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#6b7280",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginBottom: "8px" }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  No thumbnail
                </span>
              </div>
            )}
          </div>
          <div style={{ padding: "5px 0", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#333", fontFamily: "'Inter', sans-serif", fontWeight: "500" }}>
              {project.name || "Untitled"}
            </p>
          </div>
        </div>
      </Link>
      
      {/* Delete Button */}
      {isHovered && (
        <button
          onClick={handleDeleteClick}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "rgba(239, 68, 68, 0.9)",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 1)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.9)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          disabled={deleteProjectMutation.isPending}
        >
          {deleteProjectMutation.isPending ? "..." : "×"}
        </button>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Xóa dự án"
        description={`Bạn có chắc chắn muốn xóa "${project.name || 'Untitled'}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
        isLoading={deleteProjectMutation.isPending}
      />
    </div>
  );
};

export default ProjectCard;
