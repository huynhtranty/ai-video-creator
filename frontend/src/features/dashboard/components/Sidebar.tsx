"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateProject } from "@/features/projects/api/project";
import { ToastProvider } from "@/components/ui/toast";
import { signOut } from "next-auth/react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CreateProjectRequest } from "@/types/project";
import { Home, Plus, BarChart3, FolderOpen, Video, User } from "lucide-react";

import "@/styles/menu.css";

export default function Sidebar() {
  const { user } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();
  const createProjectMutation = useCreateProject();

  const handleCreateProject = async () => {
    if (!user) {
      return;
    }

    const newProjectData: CreateProjectRequest = {
      name: "Untitled",
      userId: user.id,
    };

    createProjectMutation.mutate(newProjectData, {
      onError: (err) => {
        console.error("Error creating project:", err);
      },
      onSuccess: (project) => {
        // Navigate directly to the project page
        router.push(`/projects/${project.id}`);
      },
    });
  };
  
  return (
    <ToastProvider>
      <aside
        style={{
          width: "50px",
          background: "#f4f4f4",
          position: "fixed", // Cố định Sidebar
          height: "100vh", // Chiều cao toàn màn hình
          top: 0,
          left: 0,
          zIndex: 20, // Đảm bảo Sidebar nằm trên các thành phần khác
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1rem" }}>
          <div className="pt-4 flex flex-col items-center justify-center">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Home size={20} className="text-purple-600" />
            </Link>
            <span className="HomeSpan">Home</span>
          </div>

          <div className="pt-1 flex flex-col items-center justify-center">
            <button 
              onClick={handleCreateProject}
              className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors"
            >
              <Plus size={20} className="text-purple-600" />
            </button>
            <span className="HomeSpan">Tạo</span>
          </div>
          <div className="pt-1 flex flex-col items-center justify-center">
            <Link href="/statistic" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <BarChart3 size={20} className="text-purple-600" />
            </Link>
            <span className="HomeSpan">Thống kê</span>
          </div>
          <div className="pt-1 flex flex-col items-center justify-center">
            <Link href="/projects" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <FolderOpen size={20} className="text-purple-600" />
            </Link>
            <span className="HomeSpan">Dự án</span>
          </div>
          <div className="pt-1 flex flex-col items-center justify-center">
            <Link href="/videos" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
              <Video size={20} className="text-purple-600" />
            </Link>
            <span className="HomeSpan">Video</span>
          </div>

          <div style={{ flexGrow: 1 }}></div>

          <div className="flex flex-col items-center justify-center relative" style={{ marginBottom: "5px" }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {user?.name ? (
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <User size={20} className="text-purple-600" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 mr-1">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-gray-500">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Thông tin cá nhân</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Cài đặt</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 cursor-pointer" 
                  onSelect={(event) => {
                    event.preventDefault();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                {user?.name || "Tài khoản"}
              </div>
            )}
          </div>
        </div>
      </aside>
    </ToastProvider>
  );
}