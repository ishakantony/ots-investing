import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.industries.$post>
type RequestType = InferRequestType<typeof client.api.industries.$post>['json']

export const useCreateIndustry = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.industries.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Industry created')
      queryClient.invalidateQueries({
        queryKey: ['industries'],
      })
    },
    onError: () => {
      toast.error('Failed to create industry')
    },
  })

  return mutation
}
