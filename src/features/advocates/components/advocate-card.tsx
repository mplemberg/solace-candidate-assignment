import { Advocate } from "../../../types/advocate";
import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { formatPhoneNumber } from "../../../shared/utils/phone-number-helpers";

interface AdvocateCardProps {
  advocate: Advocate;
}

export default function AdvocateCard({ advocate }: AdvocateCardProps) {
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const maxVisibleSpecialties = 2;
  const specialtiesRef = useRef<HTMLDivElement>(null);
  const specialtiesContainerRef = useRef<HTMLDivElement>(null);

  const isFullView = useMediaQuery({ minWidth: 768 });

  const visibleSpecialties =
    showAllSpecialties || !isFullView
      ? advocate.specialties
      : advocate.specialties.slice(0, maxVisibleSpecialties);

  const hiddenCount = isFullView
    ? advocate.specialties.length - maxVisibleSpecialties
    : 0;

  const formattedPhoneNumber = formatPhoneNumber(String(advocate.phoneNumber));

  const handleMouseEnter = () => {
    if (isFullView) {
      setShowAllSpecialties(true);
    }
  };

  const handleMouseLeave = () => {
    if (isFullView) {
      setShowAllSpecialties(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow sm:h-[360px] xl:h-[320px] relative">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 bg-solace-light rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-solace-green text-xl font-bold">
              {advocate.firstName.charAt(0)}
              {advocate.lastName.charAt(0)}
            </span>
          </div>

          <div className="flex-1 flex flex-col h-full">
            {/* Top info section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {advocate.firstName} {advocate.lastName}
              </h3>

              <p className="text-gray-500 text-sm mt-1">{advocate.city}</p>
            </div>

            {/* Specialties */}
            <div
              ref={specialtiesContainerRef}
              className="mt-4 relative"
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={specialtiesRef}
                className={`flex flex-wrap gap-2 transition-all duration-300 ${
                  showAllSpecialties || !isFullView
                    ? "md:max-h-32 overflow-y-auto pr-1"
                    : "md:max-h-[30px]"
                }`}
              >
                {visibleSpecialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}

                {!showAllSpecialties && isFullView && hiddenCount > 0 && (
                  <span
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-gray-200"
                    onMouseEnter={handleMouseEnter}
                  >
                    +{hiddenCount} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex-grow"></div>

            <div className="mt-auto">
              <div className="pt-3 border-t border-gray-100 text-sm text-gray-600 italic">
                &ldquo;{advocate.degree} with {advocate.yearsOfExperience} years
                of experience &rdquo;
              </div>

              <div className="mt-4">
                <a
                  href={`tel:${advocate.phoneNumber}`}
                  className="block w-full bg-solace-green text-white text-center py-2 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {formattedPhoneNumber}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
