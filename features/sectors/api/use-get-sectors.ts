import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetSectors = () => {
  const query = useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const response = await client.api.sectors.$get()

      if (!response.ok) {
        throw new Error('Failed to fetch sectors')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
