import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetSector = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['sector', { id }],
    queryFn: async () => {
      const response = await client.api.sectors[':id'].$get({
        param: { id },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch sector')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
