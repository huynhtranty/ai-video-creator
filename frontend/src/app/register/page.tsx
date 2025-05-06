import Image from "next/image";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | VideoCut",
  description: "Create your VideoCut account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Register Form */}
        <div className="w-full">
          <RegisterForm />
        </div>

        {/* Right side - Social Register Options */}
        <div className="w-full space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-8">Or sign up with</h2>
          
          <button className="w-full flex items-center justify-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
            <Image src="/google.svg" alt="Google" width={24} height={24} />
            <span>Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
            <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
            <span>Continue with Facebook</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
            <Image src="/tiktok.svg" alt="TikTok" width={24} height={24} />
            <span>Continue with TikTok</span>
          </button>
        </div>
      </div>
    </div>
  );
}