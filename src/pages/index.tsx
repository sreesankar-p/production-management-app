// pages/indext.tsx
// import { useSelector } from 'react-redux';
// import type { RootState } from '@/lib/store';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // if (!isAuthenticated) return null;

  return (
      <>
      <Navbar />
      <main className="container min-h-screen mx-auto px-4 py-16 bg-gray-50">
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Shree Green Consultants
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A Sustainable Environment for Tomorrow
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/p1/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Go to Dashboard
            </a>
            <button className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </>
  );
}