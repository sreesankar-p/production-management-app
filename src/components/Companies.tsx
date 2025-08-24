import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const Companies = () => {
  // Dummy data (later replace with API fetch)
  const companies = [
    { id: 1, name: "TechCorp", state: "Kerala", country: "India" },
    { id: 2, name: "InnoSoft", state: "Karnataka", country: "India" },
    { id: 3, name: "GlobalSolutions", state: "California", country: "USA" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Page Title */}
      <h1 className="text-gray-700 font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
        Companies
      </h1>

      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <span className="text-base sm:text-lg font-semibold text-gray-600">
          Company List
        </span>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition w-full sm:w-auto">
          + Add Company
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full border-collapse bg-white text-sm sm:text-base">
          <thead>
            <tr className="bg-green-500 text-white text-left">
              <th className="px-3 sm:px-4 py-2">No</th>
              <th className="px-3 sm:px-4 py-2">Name</th>
              <th className="px-3 sm:px-4 py-2">State</th>
              <th className="px-3 sm:px-4 py-2">Country</th>
              <th className="px-3 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={company.id}
                className="border-green-300 text-gray-800 hover:bg-green-100 transition"
              >
                <td className="px-3 sm:px-4 py-2">{index + 1}</td>
                <td className="px-3 sm:px-4 py-2">{company.name}</td>
                <td className="px-3 sm:px-4 py-2">{company.state}</td>
                <td className="px-3 sm:px-4 py-2">{company.country}</td>
                <td className="px-3 sm:px-4 py-2 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800 transition">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Companies;
