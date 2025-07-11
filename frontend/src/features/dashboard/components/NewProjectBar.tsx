"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateProject } from "@/features/projects/api/project";
import { CreateProjectRequest } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight } from "lucide-react";

interface NewProjectBarProps {
  externalTitle?: string;
  externalInput?: string;
  onInputChange?: (value: string) => void;
}

export default function NewProjectBar({ externalInput, onInputChange, externalTitle }: NewProjectBarProps) {
  const [projectInput, setProjectInput] = useState(externalInput || "");
  const [projectTitle, setProjectTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const createProjectMutation = useCreateProject();

  useEffect(() => {
    if (externalTitle !== undefined && externalInput !== undefined) {
      setProjectInput(externalInput);
      setProjectTitle(externalTitle);
    }
  }, [externalTitle, externalInput]);

  const handleInputChange = (value: string) => {
    if (value.length <= 500) {
      setProjectTitle("Untitled");
      setProjectInput(value);
      if (onInputChange) {
        onInputChange(value);
      }
    }
  };

  const handleCreateProject = async () => {
    if (!user || !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!projectInput.trim()) {
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
        setIsCreating(false);
      },
      onSuccess: (project) => {
        // Navigate to the project page with the input text as a query parameter
        const encodedInput = encodeURIComponent(projectInput.trim());
        router.push(`/projects/${project.id}?input=${encodedInput}`);
        setIsCreating(false);
        setProjectTitle("");
        setProjectInput("");
        if (onInputChange) {
          onInputChange("");
        }
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleCreateProject();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative group">
        <div className={`
          relative transition-all duration-300 ease-out
          ${isFocused ? 'scale-[1.02] shadow-2xl shadow-purple-500/20' : 'shadow-lg hover:shadow-xl'}
        `}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl opacity-10" />
          
          <div className="relative bg-card border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
            <Textarea
              placeholder="Nhập ý tưởng video của bạn... (ví dụ: 'Tạo video quảng cáo 30 giây về năng lượng bền vững với nhạc vui tươi và đồ họa hiện đại')"
              value={projectInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isCreating}
              rows={4}
              className="w-full resize-none border-0 bg-transparent text-base placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-0 p-0 shadow-none"
            />
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded border">⌘</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded border">Enter</kbd>
                  <span className="hidden sm:inline">để tạo</span>
                </span>
                <span className="text-xs opacity-70">
                  {projectInput.length}/500
                </span>
              </div>
              
              <Button
                onClick={handleCreateProject}
                disabled={isCreating || !projectInput.trim()}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    Tạo dự án
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}