"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ErrorMessage } from "@/components/errors/ErrorMessage"
import Link from "next/link"
import { useLogin } from "../api/auth"

const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const loginMutation = useLogin()

  const handleSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">ĐĂNG NHẬP</h1>
      </div>

      {loginMutation.error && (
        <ErrorMessage message={(loginMutation.error as Error).message || "Đăng nhập thất bại"} className="mb-4" />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 p-0.5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên đăng nhập"
                        className="h-14 rounded-2xl border-0 bg-white px-6 text-gray-600 placeholder:text-gray-400 focus:shadow-md focus:shadow-pink-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mx-2.5 flex items-center text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 p-0.5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="h-14 rounded-2xl border-0 bg-white px-6 text-gray-600 placeholder:text-gray-400 focus:shadow-md focus:shadow-pink-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mx-2.5 flex items-center text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white font-bold text-lg shadow-md"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
          </Button>

          <div className="text-center text-gray-500 font-medium">hoặc</div>

          <Link href="/register" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-lg border-0 shadow-md"
            >
              ĐĂNG KÝ
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  )
}
