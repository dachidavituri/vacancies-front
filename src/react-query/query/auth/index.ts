import { getCurrentUser } from "@/api/auth/auth";
import type { User } from "@/api/auth/index.types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CURRENCT_USER_QUERY_KEYS } from "./enum";

export const useCurrentUser = (): UseQueryResult<User | null, Error> => {
  return useQuery<User | null, Error>({
    queryKey: [CURRENCT_USER_QUERY_KEYS.CURRENCT_USER],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
