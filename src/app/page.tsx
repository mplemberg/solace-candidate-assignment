"use client";

import { useState } from "react";
import AdvocateCard from "../features/advocates/components/advocate-card";
import AdvocateSearch from "../features/advocates/components/advocate-search";
import { useAdvocates } from "../features/advocates/hooks/use-advocates";
import { useDebounce } from "../shared/hooks";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const {
    data: advocates = [],
    isLoading,
    error,
  } = useAdvocates({ searchTerm: debouncedSearchTerm });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleReset = () => {
    setInputValue("");
  };

  return (
    <>
      {/* Advocates Section */}
      <section id="advocates" className="container mx-auto px-4 py-16">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <AdvocateSearch
            searchTerm={inputValue}
            onChange={handleSearchChange}
            onReset={handleReset}
          />
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-medium text-gray-700 mb-6">
            {isLoading
              ? "Loading..."
              : `${advocates.length} Advocates Available`}
          </h3>

          {isLoading ? (
            <div className="text-center py-12 bg-solace-light rounded-lg">
              <p className="text-gray-700 text-lg">Loading advocates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-solace-light rounded-lg">
              <p className="text-gray-700 text-lg">
                Error loading advocates. Please try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-solace-green hover:underline font-medium"
              >
                Retry
              </button>
            </div>
          ) : advocates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advocates.map((advocate) => (
                <AdvocateCard key={advocate.id} advocate={advocate} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-solace-light rounded-lg">
              <p className="text-gray-700 text-lg">
                No advocates found matching your search criteria.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 text-solace-green hover:underline font-medium"
              >
                View all advocates
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
