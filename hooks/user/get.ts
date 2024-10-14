import { useQuery } from "@tanstack/react-query"

import { getUser } from "@/server/action/user"

export function useGetUser(clerkId: string) {
  return useQuery({
    queryKey: ["user", clerkId],
    queryFn: async () => await getUser(clerkId),
    enabled: !!clerkId,
  })
}
