import { LoginForm } from "@/features/auth/components/LoginForm"
import { SocialLoginOptions } from "@/features/auth/components/SocialLoginOptions"

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Bg.svg')" }}>
      <div className="h-24 bg-gradient-to-r from-purple-400 via-purple-300 to-pink-200 shadow-md"></div>

      <div className="flex items-center justify-center p-4 sm:p-8 -mt-12 min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-5xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="w-full lg:col-span-2">
              <LoginForm />
            </div>

            {/* Right side - Social Login Options */}
            <div className="w-full lg:col-span-3 lg:border-l lg:pl-10 pt-6 lg:pt-0 border-t lg:border-t-0 mt-6 lg:mt-0">
              <SocialLoginOptions />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
