"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/features/auth/hooks/useAuth";
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

import "@/styles/menu.css";

export default function Sidebar() {
  const { user } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
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
            <Image className="homeImageType" src="/HomeBtn.svg" alt="Home Button" width={20} height={20} />
          </Link>
          <span className="HomeSpan">Home</span>
        </div>

        <div className="pt-1 flex flex-col items-center justify-center">
          <Link href="/projects/new" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
            <Image className="CreateType" src="/NewBtn.svg" alt="Create Button" width={30} height={30} />
          </Link>
          <span className="HomeSpan">Tạo</span>
        </div>
        <div className="pt-1 flex flex-col items-center justify-center">
          <Link href="/statistic" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
            <Image className="StatisticsType" src="/chart-icon.svg" alt="Statistics Button" width={30} height={30} />
          </Link>
          <span className="HomeSpan">Thống kê</span>
        </div>
        <div className="pt-1 flex flex-col items-center justify-center">
          <Link href="/projects" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
            <Image className="ProjectType" src="/ProjectBtn.svg" alt="Project Button" width={20} height={20} />
          </Link>
          <span className="HomeSpan">Dự án</span>
        </div>
        <div className="pt-1 flex flex-col items-center justify-center">
          <Link href="/videos" className="w-10 h-10 flex items-center justify-center rounded-lg border p-1 hover:bg-pink-300 transition-colors">
            <Image className="VideoType" src="/videoTemp.svg" alt="Videos Button" width={20} height={20} />
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
                  <Image className="AvatarType" src="/Avatar.svg" alt="Avatar" width={30} height={30} />
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
  );
}