import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.sectors)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.sectors)[':id']['$patch']
>['json']

export const useEditSector = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.sectors[':id'].$patch({
        param: { id },
        json,
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Sector edited')
      queryClient.invalidateQueries({
        queryKey: ['sectors'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sector', { id }],
      })
    },
    onError: () => {
      toast.error('Failed to edit sector')
    },
  })

  return mutation
}
