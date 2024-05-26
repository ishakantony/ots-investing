'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useNewIndustry } from '../hooks/use-new-industry'
import { IndustryForm } from './industry-form'
import { insertIndustrySchema } from '@/db/schema'
import { z } from 'zod'
import { useCreateIndustry } from '../api/use-create-industry'

const formSchema = insertIndustrySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewIndustrySheet = () => {
  const { isOpen, onClose } = useNewIndustry()

  const mutation = useCreateIndustry()

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
          <SheetTitle>New Industry</SheetTitle>
          <SheetDescription>Create a new industry</SheetDescription>
        </SheetHeader>
        <IndustryForm
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
