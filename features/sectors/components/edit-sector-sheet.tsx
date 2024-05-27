'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useOpenSector } from '../hooks/use-open-sector'
import { SectorForm } from './sector-form'
import { insertSectorSchema } from '@/db/schema'
import { z } from 'zod'
import { useGetSector } from '../api/use-get-sector'
import { useEditSector } from '../api/use-edit-sector'
import { Loader2 } from 'lucide-react'
import { useDeleteSector } from '../api/use-delete-sector'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertSectorSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditSectorSheet = () => {
  const { isOpen, onClose, id } = useOpenSector()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this sector'
  )

  const accountQuery = useGetSector(id)
  const editMutation = useEditSector(id)
  const deleteMutation = useDeleteSector(id)

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
            <SheetTitle>Edit Sector</SheetTitle>
            <SheetDescription>Edit existing sector</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <SectorForm
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
