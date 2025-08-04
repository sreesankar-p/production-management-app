import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '@/features/company/companyThunks';
import Swal from 'sweetalert2';

interface Product {
  _id: string;
  offerDate: string;
  offerNo: string;
  work: string;
  paymentTerms: string;
  amount: number;
  poDetails?: {
    poNumber: string;
    poDate: string;
    workPaymentTerm: string;
    poAmount: number;
  };
  status: 'pending' | 'in-progress' | 'completed';
}

interface ProductTableProps {
  products: Product[];
  companyId: string;
}

export default function ProductTable({ products, companyId }: ProductTableProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCompany(productId) as any);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Offer No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900">{product.offerNo}</div>
                <div className="text-sm text-gray-500">
                  {new Date(product.offerDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-gray-900">{product.work.substring(0, 50)}...</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900">₹{product.amount.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : product.status === 'in-progress' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href={`/companies/${companyId}/offers/${product._id}`}>
                  <a className="text-blue-600 hover:text-blue-900 mr-4">View</a>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}