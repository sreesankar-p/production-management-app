import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

function AuthChecker({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  
  // List of public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/'];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  useEffect(() => {
    // Skip auth check if we're still loading
    if (isAuthenticated === undefined) return;

    // If not authenticated and not on a public route, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      if (router.pathname !== '/auth/login') {
        router.push('/auth/login');
      }
    }
    // If authenticated and on auth page, redirect to home
    else if (isAuthenticated && isPublicRoute && router.pathname !== '/') {
      if (router.pathname !== '/') {
        router.push('/');
      }
    }
    
    setLoading(false);
  }, [isAuthenticated, isPublicRoute, router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {/* <AuthChecker> */}
            <Component {...pageProps} />
          {/* </AuthChecke r> */}
        </main>
      </div>
    </Provider>
  );
}

export default MyApp;