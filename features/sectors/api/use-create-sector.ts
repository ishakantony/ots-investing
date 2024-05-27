import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.sectors.$post>
type RequestType = InferRequestType<typeof client.api.sectors.$post>['json']

export const useCreateSector = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.sectors.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Sector created')
      queryClient.invalidateQueries({
        queryKey: ['sectors'],
      })
    },
    onError: () => {
      toast.error('Failed to create sector')
    },
  })

  return mutation
}
