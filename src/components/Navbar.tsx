
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, ChevronDown, Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import type { RootState, AppDispatch } from '@/lib/store';
import Image from 'next/image';
import { logoutUser } from '@/features/auth/authThunk';


export function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  console.log("Redux auth state:", { isAuthenticated, user });

  // const userData = localStorage.getItem("auth")
  // console.log("user Data name : ",userData)
  // console.log("userrr", user?.name)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      dispatch(logoutUser());
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { href: '/p1/dashboard', label: 'Dashboard' },
    { href: '/p1/companies', label: 'Companies' },
  ];


  return (
    <div className="bg-white  px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <div className="relative h-12 w-48 transition-transform duration-300 hover:scale-105">
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
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${router.pathname === link.href
                ? 'border-blue-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>

              <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded text-white text-sm font-medium flex items-center justify-center">
                    JM
                  </div>
                  <span className="text-sm font-medium hidden md:inline-block mr-1 text-gray-700">{user?.name || 'Account'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </button>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </>

          ) : (
            <Link
              href="/auth/login"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </div >
  )
}

export default Navbar
