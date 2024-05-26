import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.industries)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.industries)['bulk-delete']['$post']
>['json']

export const useBulkDeleteIndustries = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.industries['bulk-delete'].$post({
        json,
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Industries deleted')
      queryClient.invalidateQueries({
        queryKey: ['industries'],
      })
    },
    onError: () => {
      toast.error('Failed to bulk delete industries')
    },
  })

  return mutation
}
