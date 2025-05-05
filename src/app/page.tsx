"use client";

import { useEffect, useState } from "react";
import { Advocate } from "../types/advocate";
import AdvocateCard from "../features/advocates/AdvocateCard";
import AdvocateSearch from "../features/advocates/AdvocateSearch";
import Link from "next/link";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(newSearchTerm.toLowerCase())
        ) ||
        advocate.yearsOfExperience.toString().includes(newSearchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <>
      {/* Advocates Section */}
      <section id="advocates" className="container mx-auto px-4 py-16">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <AdvocateSearch
            searchTerm={searchTerm}
            onChange={handleSearchChange}
            onReset={handleReset}
          />
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-medium text-gray-700 mb-6">
            {filteredAdvocates.length} Advocates Available
          </h3>

          {filteredAdvocates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdvocates.map((advocate) => (
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
