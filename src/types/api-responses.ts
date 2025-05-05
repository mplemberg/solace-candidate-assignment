import { Advocate } from "./advocate";

export interface AdvocatesResponse {
  data: Advocate[];
  pagination: {
    total: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
}
