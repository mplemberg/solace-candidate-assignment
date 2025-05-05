import React from "react";

interface AdvocateSearchProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function AdvocateSearch({
  searchTerm,
  onChange,
  onReset,
}: AdvocateSearchProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-2xl font-serif text-gray-800 mb-4">
        Find Your Advocate
      </h2>
      <p className="text-gray-600 mb-6">
        Find an advocate who will help untangle your healthcare by phone or
        video—no matter what you need —{" "}
        <span className="font-bold">covered by Medicare.</span>
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={onChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-solace-green"
            placeholder="Search by name, specialty, or location..."
          />
          {searchTerm && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <button
                onClick={onReset}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onReset}
          className="bg-solace-gold text-gray-800 py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Find an Advocate
        </button>
      </div>

      {searchTerm && (
        <div className="mt-4 text-gray-600">
          Showing results for:{" "}
          <span className="font-medium text-gray-800">{searchTerm}</span>
        </div>
      )}
    </div>
  );
}
