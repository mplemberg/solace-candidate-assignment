import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Advocate } from "../../../types/advocate";
import { AdvocatesResponse } from "../../../types/api-responses";

interface UseAdvocatesOptions {
  searchTerm?: string;
  limit?: number;
}

export const useAdvocates = ({
  searchTerm = "",
  limit = 3,
}: UseAdvocatesOptions = {}) => {
  const result = useInfiniteQuery<
    AdvocatesResponse,
    Error,
    AdvocatesResponse,
    [string, string, number],
    string | null
  >({
    queryKey: ["advocates", searchTerm, limit],
    queryFn: async ({ pageParam }) => {
      const url = new URL("/api/advocates", window.location.origin);

      if (searchTerm) {
        url.searchParams.append("search", searchTerm);
      }

      url.searchParams.append("limit", limit.toString());

      if (pageParam) {
        url.searchParams.append("cursor", pageParam);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("There was an issue finding advocates.");
      }
      return (await response.json()) as AdvocatesResponse;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined;
    },
    initialPageParam: null as string | null,
  });

  const advocatesList: Advocate[] = [];
  const queryData = result.data as InfiniteData<AdvocatesResponse> | undefined;

  let pagination = {
    total: 0,
    hasNextPage: false,
    nextCursor: null as string | null,
  };

  if (queryData) {
    for (const page of queryData.pages) {
      advocatesList.push(...page.data);
    }

    if (queryData.pages.length > 0) {
      pagination = queryData.pages[queryData.pages.length - 1].pagination;
    }
  }

  return {
    ...result,
    data: advocatesList,
    pagination,
  };
};
