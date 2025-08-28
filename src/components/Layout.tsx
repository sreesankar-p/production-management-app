"use client"

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 left-6 z-50 rounded-full p-2 bg-emerald-600 shadow-md hover:bg-emerald-900 transition"
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </div>
  )
}
