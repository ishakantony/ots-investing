import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetIndustry = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['industry', { id }],
    queryFn: async () => {
      const response = await client.api.industries[':id'].$get({
        param: { id },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch industry')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
