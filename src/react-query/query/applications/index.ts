import type {
  GetApplicationsParams,
  GetApplicationsResponse,
} from "@/api/applications/index.types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { APPLICATIONS_QUERY_KEYS } from "./enum";
import { getApplications } from "@/api/applications";

export const useGetApplications = (
  params?: GetApplicationsParams,
): UseQueryResult<GetApplicationsResponse, Error> => {
    return useQuery<GetApplicationsResponse, Error>({
        queryKey: [
            APPLICATIONS_QUERY_KEYS.APPLICATIONS,
            params?.vacancyId,
            params?.date,
            params?.order,
            params?.sortBy
        ],
        queryFn: () => getApplications(params),
        staleTime: 1000 * 60
    })
};
