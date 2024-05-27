import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.sectors)[':id']['$delete']
>

export const useDeleteSector = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.sectors[':id'].$delete({
        param: { id },
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Sector deleted')
      queryClient.invalidateQueries({
        queryKey: ['sectors'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sector', { id }],
      })
    },
    onError: () => {
      toast.error('Failed to delete sector')
    },
  })

  return mutation
}
