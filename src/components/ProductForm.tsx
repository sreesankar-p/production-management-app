import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { createOffer } from '@/features/company/companyThunks';
import Swal from 'sweetalert2';

export default function ProductForm() {
  const router = useRouter();
  const { companyId } = router.query;
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    offerDate: '',
    offerNo: '',
    work: '',
    paymentTerms: '',
    amount: 0,
    poNumber: '',
    poDate: '',
    workPaymentTerm: '',
    poAmount: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('amount') || name.includes('Amount') ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await dispatch(createOffer(companyId as string, formData) as any);
      router.push(`/companies/${companyId}`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offer Date
            </label>
            <input
              type="date"
              name="offerDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.offerDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offer Number
            </label>
            <input
              type="text"
              name="offerNo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.offerNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Description
          </label>
          <textarea
            name="work"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.work}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Terms
            </label>
            <input
              type="text"
              name="paymentTerms"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.paymentTerms}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">PO Details (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PO Number
              </label>
              <input
                type="text"
                name="poNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.poNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PO Date
              </label>
              <input
                type="date"
                name="poDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.poDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Payment Term
              </label>
              <input
                type="text"
                name="workPaymentTerm"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.workPaymentTerm}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PO Amount (₹)
              </label>
              <input
                type="number"
                name="poAmount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.poAmount}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push(`/companies/${companyId}`)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Offer'}
          </button>
        </div>
      </form>
    </div>
  );
}