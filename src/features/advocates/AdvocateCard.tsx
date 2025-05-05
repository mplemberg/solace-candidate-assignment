import { Advocate } from "../../types/advocate";

interface AdvocateCardProps {
  advocate: Advocate;
}

export default function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-solace-light rounded-full flex items-center justify-center">
            <span className="text-solace-green text-xl font-bold">
              {advocate.firstName.charAt(0)}
              {advocate.lastName.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              {advocate.firstName} {advocate.lastName}
            </h3>

            <p className="text-gray-500 text-sm mt-1">{advocate.city}</p>

            {/* Specialties */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {advocate.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote from the advocate */}
            <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-600 italic">
              &ldquo;{advocate.degree} with {advocate.yearsOfExperience} years
              of experience &rdquo;
            </div>

            {/* Contact button */}
            <div className="mt-4">
              <a
                href={`tel:${advocate.phoneNumber}`}
                className="block w-full bg-solace-green text-white text-center py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Contact Advocate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
