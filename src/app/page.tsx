import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-[#F2F2F2]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12 bg-[#152B59] rounded-md flex items-center justify-center">
              <span className="text-[#D6AD60] font-bold text-2xl">♞</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#152B59]">Chess League</h1>
          <p className="mt-2 text-sm text-[#333333]/80">Sign in to manage your chess leagues and tournaments</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-lg">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#333333]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 border border-[#152B59]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#152B59]/50"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#333333]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2 border border-[#152B59]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#152B59]/50"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#152B59] border-[#152B59]/20 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#333333]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#152B59] hover:underline">
                  Forgot your password?
          </a>
        </div>
            </div>

            <div>
              <Link
                href="/dashboard"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#152B59] hover:bg-[#152B59]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#152B59]"
              >
                Sign in
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333333]/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#333333]/60">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-[#333333]/20 rounded-md shadow-sm bg-white text-sm font-medium text-[#333333] hover:bg-[#333333]/5"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-[#333333]/20 rounded-md shadow-sm bg-white text-sm font-medium text-[#333333] hover:bg-[#333333]/5"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#333333]/60">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-[#152B59] hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
