
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

export default function HomePage() {
  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // if (!isAuthenticated) return null;

  return (
    <div className="bg-gray-700 flex flex-col items-center">
      <h1 className='bg-amber-300 text-black m-5 p-5 text-center'>Welcome to Production Management</h1>
      <p className='items-center w-fit bg-amber-200 m-5 text-amber-950 text-center w '>This is the homepage content</p>
    </div>
  );
}