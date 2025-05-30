import { LoginForm } from "@/features/auth/components/LoginForm"
import { SocialLoginOptions } from "@/features/auth/components/SocialLoginOptions"

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Bg.svg')" }}>
      {/* Purple gradient header */}
      <div className="h-24 bg-gradient-to-r from-purple-400 via-purple-300 to-pink-200"></div>

      <div className="flex items-center justify-center p-4 sm:p-8 -mt-12 min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Login Form */}
          <div className="w-full">
            <LoginForm />
          </div>

          {/* Right side - Social Login Options */}
          <SocialLoginOptions />
        </div>
      </div>
    </div>
  )
}
