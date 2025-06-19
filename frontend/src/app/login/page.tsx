import { LoginForm } from "@/features/auth/components/LoginForm";
import { SocialLoginOptions } from "@/features/auth/components/SocialLoginOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | VideoCut",
  description: "Login to your VideoCut account",
};

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Bg.svg')" }}>
      <div className="h-24 bg-gradient-to-r from-purple-400 via-purple-300 to-pink-200 shadow-md"></div>

      <div className="flex items-center justify-center p-4 sm:p-8 -mt-12 min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-4xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <LoginForm />
            </div>

            <div className="w-full lg:border-l lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 mt-6 lg:mt-0">
              <SocialLoginOptions mode="login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}