"use client"

import { Search, Home, Users, BarChart3, Building2, Megaphone, User, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  toggle: () => void
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/p1/dashboard", label: "Dashboard", icon: Home },
    { href: "/p1/companies", label: "Our Clients", icon: Users },
    { href: "/p1/statements", label: "YTD Statements & Reports", icon: BarChart3 },
    { href: "/p1/department", label: "Department Manager", icon: Building2 },
    { href: "/p1/announcements", label: "Staff Announcements", icon: Megaphone },
    { href: "/p1/profile", label: "My Profile", icon: User },
    { href: "/p1/settings", label: "Settings & Preferences", icon: Settings },
  ]

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-sm transition-all duration-300 z-40
        ${isOpen ? "w-64" : "w-16 "}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 flex justify-center">
          {isOpen && (
            <div className="relative h-12 w-40">
              <Image src="/images/firstLogo.png" alt="Company Logo" fill className="object-contain" priority />
            </div>
          )}
        </div>

        {/* Search (visible if sidebar open) */}
        {isOpen && (
          <div className="px-6 mb-6 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                placeholder="Search Here"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link key={href} href={href}>
                  <div
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition
                      ${active
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:bg-green-400 hover:text-white"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {isOpen && <span className="text-sm font-medium">{label}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
