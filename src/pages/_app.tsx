import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && !router.pathname.startsWith('/auth')) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
}

export default MyApp;