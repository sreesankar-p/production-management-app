//components/Dashboard.tsx

import { Star, FileText, Receipt, TrendingUp, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import Loading from "./Loading";


export default function Dashboard() {

  const { loading } = useSelector((state: RootState) => state.auth);

  const offers = [
    { number: "SGC/2025/120", merchant: "Merchant A", date: "01/08/2025", status: "Approved" },
    { number: "SGC/2025/119", merchant: "Merchant B", date: "29/07/2025", status: "Pending Payment" },
    { number: "SGC/2025/118", merchant: "Merchant C", date: "28/07/2025", status: "Work In Progress" },
    { number: "SGC/2025/117", merchant: "Merchant D", date: "27/07/2025", status: "Rejected" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex px-3 py-1 w-42 flex js items-center text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            {status}
          </span>
        )
      case "Pending Payment":
        return (
          <span className="inline-flex px-3 py-1 w-42 flex js items-center text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            {status}
          </span>
        )
      case "Work In Progress":
        return (
          <span className="inline-flex px-3 py-1 w-42 flex js items-center text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            {status}
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex px-3 py-1 w-42 flex js items-center text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            {status}
          </span>
        )
      default:
        return (
          <span className="inline-flex px-3 py-1 w-42 flex js items-center text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  if (loading) return <Loading />
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1">
        {/* <Navbar /> */}

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-purple-100 rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700 font-medium">Offers Generated</p>
                  <p className="text-3xl font-bold text-purple-900">1,909</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Purchase Order Received</p>
                  <p className="text-3xl font-bold text-gray-900">256</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Invoice Generated</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Payment Received</p>
                  <p className="text-2xl font-bold text-gray-900">₹1,78,76,660.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Offer Button */}
          <div className="mb-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Add New offer
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Offer Number</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Merchant</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Offer Generated On</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {offers.map((offer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{offer.number}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{offer.merchant}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{offer.date}</td>
                      <td className="px-6 py-4">{getStatusBadge(offer.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">1</button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">2</button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">3</button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">4</button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">5</button>
                  <span className="px-2 text-gray-400">...</span>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">10</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
