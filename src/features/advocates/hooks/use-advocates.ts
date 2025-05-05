import { useQuery } from "@tanstack/react-query";
import { Advocate } from "../../../types/advocate";

interface UseAdvocatesOptions {
  searchTerm?: string;
}

export const useAdvocates = ({ searchTerm = "" }: UseAdvocatesOptions = {}) => {
  return useQuery({
    queryKey: ["advocates", searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/api/advocates?search=${encodeURIComponent(searchTerm)}`
        : "/api/advocates";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("There was an issue finding advocates.");
      }
      const jsonResponse = await response.json();
      return jsonResponse.data as Advocate[];
    },
  });
};
