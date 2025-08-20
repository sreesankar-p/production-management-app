import { Search, Home, Users, BarChart3, Building2, Megaphone, User, Settings } from "lucide-react"
import Image from "next/image"

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm border-r">
      {/* Logo */}
      <div className="p-6">
       
         <div className="relative h-12 w-48 transition-transform duration-300 hover:scale-105">
                      <Image
                        src="/images/firstLogo.png"
                        alt="Company Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Search Here"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3">
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 bg-green-600 text-white rounded-lg">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Users className="w-4 h-4" />
            <span className="text-sm">Our Clients</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">YTD Statements & Reports</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">Department Manager</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Megaphone className="w-4 h-4" />
            <span className="text-sm">Staff Announcements</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <User className="w-4 h-4" />
            <span className="text-sm">My Profile</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings & Preferences</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
