import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.industries)[':id']['$delete']
>

export const useDeleteIndustry = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.industries[':id'].$delete({
        param: { id },
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Industry deleted')
      queryClient.invalidateQueries({
        queryKey: ['industries'],
      })
      queryClient.invalidateQueries({
        queryKey: ['industry', { id }],
      })
    },
    onError: () => {
      toast.error('Failed to delete industry')
    },
  })

  return mutation
}
