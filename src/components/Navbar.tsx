import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import type { RootState } from '@/lib/store'; // Import your RootState type
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    try {
      // Clear token cookie
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      dispatch(logout());
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };




  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex  gap-90">
            <div className="flex-shrink-0 flex items-center">
              <Link href={"/dashboard"}>
                <div className="relative h-15 transition-transform duration-300 hover:scale-105 w-58">
                  <Image
                    src="/images/firstLogo.png"
                    alt="Company Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/p1/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${router.pathname === '/dashboard'
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                Dashboard
              </Link>
              <Link
                href="/companies"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${router.pathname.startsWith('/companies')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                Companies
              </Link>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                Login
              </button>
            </div>

          )}
        </div>
      </div>
    </nav>
  );
}
