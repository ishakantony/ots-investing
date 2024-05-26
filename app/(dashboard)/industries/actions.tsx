import { Button } from '@/components/ui/button'
import { useDeleteIndustry } from '@/features/industries/api/use-delete-industry'
import { useOpenIndustry } from '@/features/industries/hooks/use-open-industry'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, Trash } from 'lucide-react'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenIndustry()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this industry'
  )
  const deleteMutation = useDeleteIndustry(id)

  const openEditIndustrySheet = () => {
    onOpen(id)
  }

  const deleteIndustry = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }

  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center justify-end space-x-2">
        <Button onClick={openEditIndustrySheet} variant="outline" size="sm">
          <Edit className="size-4 mr-2" /> Edit
        </Button>
        <Button onClick={deleteIndustry} variant="destructive" size="sm">
          <Trash className="size-4 mr-2" /> Delete
        </Button>
      </div>
    </>
  )
}
