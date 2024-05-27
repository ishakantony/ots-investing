import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.sectors)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.sectors)['bulk-delete']['$post']
>['json']

export const useBulkDeleteSectors = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.sectors['bulk-delete'].$post({
        json,
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Sectors deleted')
      queryClient.invalidateQueries({
        queryKey: ['sectors'],
      })
    },
    onError: () => {
      toast.error('Failed to bulk delete sectors')
    },
  })

  return mutation
}
