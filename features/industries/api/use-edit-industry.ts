import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.industries)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.industries)[':id']['$patch']
>['json']

export const useEditIndustry = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.industries[':id'].$patch({
        param: { id },
        json,
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Industry edited')
      queryClient.invalidateQueries({
        queryKey: ['industries'],
      })
      queryClient.invalidateQueries({
        queryKey: ['industry', { id }],
      })
    },
    onError: () => {
      toast.error('Failed to edit industry')
    },
  })

  return mutation
}
