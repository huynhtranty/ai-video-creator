"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResourceSettingProps {
  onGenerateResources: (scriptStyle: string, imageStyle: string, voiceStyle: string) => Promise<void>;
  isGenerating: boolean;
}

export default function ResourceSetting({ onGenerateResources, isGenerating }: ResourceSettingProps) {
  const [scriptStyle, setScriptStyle] = useState("Chuyên nghiệp");
  const [imageStyle, setImageStyle] = useState("Thực tế");
  const [voiceStyle, setVoiceStyle] = useState("Nam thanh niên");

  const scriptStyles = ["Chuyên nghiệp", "Thân thiện", "Hài hước", "Nghiêm túc", "Sáng tạo"];
  const imageStyles = ["Thực tế", "Hoạt hình", "Nghệ thuật", "Tối giản", "Cổ điển"];
  const voiceStyles = ["Nam thanh niên", "Nữ thanh niên"];

  const handleGenerateResources = async () => {
    await onGenerateResources(scriptStyle, imageStyle, voiceStyle);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Cài đặt tài nguyên
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Script Style Settings */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Phong cách kịch bản
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-10 px-3 py-2 border-2 border-transparent bg-gradient-to-r from-[#61FFF2]/20 to-[#300DF4]/20 hover:from-[#61FFF2]/30 hover:to-[#300DF4]/30 focus:border-[#61FFF2] focus:ring-2 focus:ring-[#61FFF2]/20"
              >
                {scriptStyle}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {scriptStyles.map((style) => (
                <DropdownMenuItem
                  key={style}
                  onClick={() => setScriptStyle(style)}
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-[#61FFF2]/10 hover:to-[#300DF4]/10"
                >
                  {style}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Image Style Settings */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Phong cách hình ảnh
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-10 px-3 py-2 border-2 border-transparent bg-gradient-to-r from-[#61FFF2]/20 to-[#300DF4]/20 hover:from-[#61FFF2]/30 hover:to-[#300DF4]/30 focus:border-[#61FFF2] focus:ring-2 focus:ring-[#61FFF2]/20"
              >
                {imageStyle}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {imageStyles.map((style) => (
                <DropdownMenuItem
                  key={style}
                  onClick={() => setImageStyle(style)}
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-[#61FFF2]/10 hover:to-[#300DF4]/10"
                >
                  {style}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Voice Style Settings */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Giọng nói
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-10 px-3 py-2 border-2 border-transparent bg-gradient-to-r from-[#61FFF2]/20 to-[#300DF4]/20 hover:from-[#61FFF2]/30 hover:to-[#300DF4]/30 focus:border-[#61FFF2] focus:ring-2 focus:ring-[#61FFF2]/20"
              >
                {voiceStyle}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {voiceStyles.map((style) => (
                <DropdownMenuItem
                  key={style}
                  onClick={() => setVoiceStyle(style)}
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-[#61FFF2]/10 hover:to-[#300DF4]/10"
                >
                  {style}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <Button
            onClick={handleGenerateResources}
            disabled={isGenerating}
            className="w-full text-white py-2.5 rounded-lg transition-colors font-medium"
            style={{
              background: isGenerating 
                ? "linear-gradient(to right, #9CA3AF, #6B7280)" 
                : "linear-gradient(to right, #61FFF2, #300DF4)",
              opacity: isGenerating ? 0.6 : 1,
            }}
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tạo...
              </div>
            ) : (
              "Tạo tài nguyên"
            )}
          </Button>
          <Button
            className="w-full bg-[#8362E5] text-white py-2.5 rounded-lg hover:bg-[#6F4EC8] transition-colors font-medium"
          >
            Áp dụng cài đặt
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Đặt lại mặc định
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}