"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`text-red-500 hover:text-red-700 hover:bg-red-50 ${className}`}
    >
      Đăng xuất
    </Button>
  );
}
