import LoginForm from '@/components/authentication/LoginForm';
import SocialLoginButtons from '@/components/authentication/SocialLoginButtons';
import GuestContinueCard from '@/components/authentication/GuestContinueCard';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Sign in to continue your wellness journey
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          <LoginForm />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLoginButtons />
        </div>

        <GuestContinueCard />

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}