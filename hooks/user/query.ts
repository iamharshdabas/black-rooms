import { useQuery } from "@tanstack/react-query"

import { getUserByClerkIdAction } from "@/server/action/user"

export function useQueryUserByClerkId(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => await getUserByClerkIdAction(id),
  })
}
