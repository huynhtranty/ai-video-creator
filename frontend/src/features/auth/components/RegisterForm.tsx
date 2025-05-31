"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import { useRegister } from "../api/auth";
import { useState } from "react";

const registerSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useRegister();

  const handleSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Title */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">Tạo tài khoản mới</h1>
        <p className="text-gray-600 mt-1 text-sm">Đăng ký để bắt đầu sáng tạo video</p>
      </div>

      {registerMutation.error && (
        <ErrorMessage message={(registerMutation.error as Error).message || "Đăng ký thất bại"} className="mb-3" />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="relative group">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <div className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 p-0.5 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <FormControl>
                      <Input
                        placeholder="Nhập tên đăng nhập"
                        className="h-11 rounded-xl border-0 bg-white px-4 text-gray-600 placeholder:text-gray-400 focus:shadow-md focus:shadow-pink-200"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-0.5 px-2 text-xs font-medium text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="relative group">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <div className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 p-0.5 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <FormControl>
                      <Input
                        placeholder="Nhập email của bạn"
                        className="h-11 rounded-xl border-0 bg-white px-4 text-gray-600 placeholder:text-gray-400 focus:shadow-md focus:shadow-pink-200"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-0.5 px-2 text-xs font-medium text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="relative group">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <div className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 p-0.5 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="h-11 rounded-xl border-0 bg-white px-4 text-gray-600 placeholder:text-gray-400 focus:shadow-md focus:shadow-pink-200"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-0.5 px-2 text-xs font-medium text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-bold text-base shadow-md hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 transform hover:-translate-y-0.5"
            disabled={registerMutation.isPending || isLoading}
          >
            {registerMutation.isPending || isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Đang tạo tài khoản...</span>
              </div>
            ) : (
              "Đăng ký"
            )}
          </Button>

          <div className="text-center text-gray-500 font-medium relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs">hoặc</span>
            </div>
          </div>

          <Link href="/" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-base border-0 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
            >
              Đăng nhập
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}