import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 gap-4">
      <p className="text-lg font-medium text-emerald-700">Loading...</p>
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
