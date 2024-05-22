import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetIndustries = () => {
  const query = useQuery({
    queryKey: ['industries'],
    queryFn: async () => {
      const response = await client.api.industries.$get()

      if (!response.ok) {
        throw new Error('Failed to fetch industries')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
