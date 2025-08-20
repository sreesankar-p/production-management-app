// components/Layout.tsx
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar at the top */}
                <Navbar />

                {/* Page content */}
                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
