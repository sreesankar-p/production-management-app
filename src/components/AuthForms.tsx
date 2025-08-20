import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '@/features/auth/authThunk';
import Link from 'next/link';
import Swal from 'sweetalert2';
import type { AppDispatch } from '@/lib/store';


interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
        router.push('/p1/dashboard');
      } else {
        await dispatch(registerUser(formData)).unwrap();
        router.push('/p1/dashboard');
      }
    } catch (error) {
      let message = 'An error occurred';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;

      Swal.fire({
        icon: 'error',
        title: isLogin ? 'Login Failed' : 'Signup Failed',
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel (branding / illustration) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-500 to-blue-400 items-center justify-center text-white p-12 relative">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            {isLogin ? "Welcome Back 👋" : "Join Us Today 🚀"}
          </h1>
          <p className="text-lg text-indigo-100">
            {isLogin
              ? "Log in to access your dashboard, manage projects, and stay productive."
              : "Create your account and start managing your projects with ease."}
          </p>
        </div>
        <div className="absolute bottom-6 text-sm opacity-75">
          © {new Date().getFullYear()} Shree Green Consultants
        </div>
      </div>

      {/* Right panel (form) */}

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-yellow-300 to-green-500 p-6 sm:p-12">
        <div className="w-full max-w-md bg-white  rounded-2xl shadow-xl p-8 ">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already registered?"}{' '}
              <Link
                href={isLogin ? '/auth/signup' : '/auth/login'}
                className="text-indigo-600 font-semibold hover:underline transition"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 text-gray-500 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl border text-gray-500 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                {isLogin && (
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                className="w-full px-4 py-3 text-gray-500 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                placeholder="your password"
                value={formData.password}
                onChange={handleChange}
              />
              {!isLogin && (
                <p className="mt-2 text-xs text-gray-500">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-400 to-blue-400 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-200 flex items-center justify-center ${loading ? 'opacity-80' : ''
                }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
