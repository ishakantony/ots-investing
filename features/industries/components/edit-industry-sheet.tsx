'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useOpenIndustry } from '../hooks/use-open-industry'
import { IndustryForm } from './industry-form'
import { insertIndustrySchema } from '@/db/schema'
import { z } from 'zod'
import { useGetIndustry } from '../api/use-get-industry'
import { useEditIndustry } from '../api/use-edit-industry'
import { Loader2 } from 'lucide-react'
import { useDeleteIndustry } from '../api/use-delete-industry'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertIndustrySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditIndustrySheet = () => {
  const { isOpen, onClose, id } = useOpenIndustry()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this industry'
  )

  const accountQuery = useGetIndustry(id)
  const editMutation = useEditIndustry(id)
  const deleteMutation = useDeleteIndustry(id)

  const isLoading = accountQuery.isLoading

  const isPending = editMutation.isPending || deleteMutation.isPending

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        },
      })
    }
  }

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: '',
      }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Industry</SheetTitle>
            <SheetDescription>Edit existing industry</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <IndustryForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
