import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const Companies = () => {
  // Dummy data (later replace with API fetch)
  // const companies = [
  //   { id: 1, name: "TechCorp", state: "Kerala", country: "India" },
  //   { id: 2, name: "InnoSoft", state: "Karnataka", country: "India" },
  //   { id: 3, name: "GlobalSolutions", state: "California", country: "USA" },
  // ];

  const [companies, setCompanies] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    registeredId: "",
    name: "",
    gstNumber: ""
  });

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("/api/products")
        setCompanies(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCompanies();
  }, [])

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Submit new company
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/products", form)
      // ✅ Success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Company registered successfully 🎉",
      });

      setCompanies([...companies, res.data]) //update list
      setIsModalOpen(false)
      setForm({ registeredId: "", name: "", gstNumber: "" })
    } catch (error) {
      console.error(error)
      // For Axios errors, response might exist
      let errorMessage = "Something went wrong!";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Handle multiple errors or single message
          if (error.response.data.errors) {
            errorMessage = error.response.data.errors.join("\n");
          } else {
            errorMessage =
              error.response.data.message || error.response.statusText;
          }
        } else if (error.request) {
          errorMessage = "No response from server!";
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,

      });
    }
  }


  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Page Title */}
      <h1 className="text-gray-700 font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
        Companies
      </h1>

      {/* Header with Add Button */}
      {/* <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center mb-4 gap-3"> */}
      {/* <span className="text-base sm:text-lg font-semibold text-gray-600">
          Company List
        </span> */}
      {/* <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition w-full sm:w-auto">
          + Add Company
        </button> */}
      {/* </div> */}
      {/* Header with Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          + Add Company
        </button>
      </div>

      {/* Table */}
     <div className="overflow-x-auto rounded-xl shadow">
  <table className="min-w-full border-collapse bg-white text-xs sm:text-sm lg:text-base">
    <thead>
      <tr className="bg-green-500 text-white text-left">
        <th className="px-2 sm:px-4 py-2">No</th>
        <th className="px-2 sm:px-4 py-2">Registerd Id</th>
        <th className="px-2 sm:px-4 py-2">Company Name</th>
        <th className="px-2 sm:px-4 py-2">Gst Number</th>
        <th className="px-2 sm:px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {companies.map((company, index) => (
        <tr
          key={company._id}
          className="border-green-300 text-gray-800 hover:bg-green-100 transition"
        >
          <td className="px-2 sm:px-4 py-2">{index + 1}</td>
          <td className="px-2 sm:px-4 py-2">{company.registeredId}</td>
          <td className="px-2 sm:px-4 py-2">{company.name}</td>
          <td className="px-2 sm:px-4 py-2">{company.gstNumber}</td>
          <td className="px-2 sm:px-4 py-2 flex gap-2 sm:gap-3">
            <button className="text-blue-600 hover:text-blue-800 transition">
              <Pencil size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button className="text-red-600 hover:text-red-800 transition">
              <Trash2 size={16} className="sm:w-5 sm:h-5" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Modal */}
      {isModalOpen && (
       <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] bg-black/30 px-4">
  <div className="bg-emerald-200 shadow-emerald-500/50 p-6 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg text-gray-600">
    <h2 className="text-lg font-bold mb-4">Add Company</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        min="1000"
        name="registeredId"
        value={form.registeredId}
        onChange={handleChange}
        placeholder="Registered Id"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Company Name"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="gstNumber"
        value={form.gstNumber}
        onChange={handleChange}
        placeholder="GST Number"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <div className="flex justify-end gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="px-3 sm:px-4 py-2 border rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 cursor-pointer text-white px-3 sm:px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

      )}
    </div>
  );
};

export default Companies;
