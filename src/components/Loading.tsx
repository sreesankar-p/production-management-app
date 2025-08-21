import { Loader2 } from "lucide-react"; // nice spinner from lucide-react
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        <p className="mt-3 text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
