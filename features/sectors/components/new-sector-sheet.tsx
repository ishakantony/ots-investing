'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useNewSector } from '../hooks/use-new-sector'
import { SectorForm } from './sector-form'
import { insertSectorSchema } from '@/db/schema'
import { z } from 'zod'
import { useCreateSector } from '../api/use-create-sector'

const formSchema = insertSectorSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewSectorSheet = () => {
  const { isOpen, onClose } = useNewSector()

  const mutation = useCreateSector()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Sector</SheetTitle>
          <SheetDescription>Create a new sector</SheetDescription>
        </SheetHeader>
        <SectorForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
