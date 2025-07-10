"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateProject } from "@/features/projects/api/project";
import { CreateProjectRequest } from "@/types/project";

export default function NewProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading } = useAuth();
  const createProjectMutation = useCreateProject();
  const projectCreationStarted = useRef(false);
  const [error, setError] = useState<string | null>(null);

  const createNewProject = useCallback(() => {
    if (!user || projectCreationStarted.current) return;

    projectCreationStarted.current = true;
    setError(null);

    const inputFromUrl = searchParams.get('input');
    const projectName = inputFromUrl ? decodeURIComponent(inputFromUrl) : "Untitled";

    const newProjectData: CreateProjectRequest = {
      name: projectName,
      userId: user.id,
    };

    createProjectMutation.mutate(newProjectData, {
      onError: (err) => {
        setError("Failed to create project. Please try again.");
        console.error("Error creating project:", err);
      },
      onSuccess: (project) => {
        // Navigate to the project page with the input text as a query parameter if it exists
        if (inputFromUrl) {
          router.push(`/projects/${project.id}?input=${inputFromUrl}`);
        } else {
          router.push(`/projects/${project.id}`);
        }
      },
    });
  }, [user, createProjectMutation, searchParams, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && !projectCreationStarted.current) {
      createNewProject();
    } else if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, user, router, createNewProject]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-2 text-red-600">Error</h1>
          <p className="mb-4">{error}</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => createNewProject()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/projects")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Creating new project...</h1>
        <p>Please wait while we set up your project.</p>
        {createProjectMutation.isPending && (
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}