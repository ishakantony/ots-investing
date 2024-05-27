import { Button } from '@/components/ui/button'
import { useDeleteSector } from '@/features/sectors/api/use-delete-sector'
import { useOpenSector } from '@/features/sectors/hooks/use-open-sector'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, Trash } from 'lucide-react'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenSector()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this sector'
  )
  const deleteMutation = useDeleteSector(id)

  const openEditSectorSheet = () => {
    onOpen(id)
  }

  const deleteSector = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }

  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center justify-end space-x-2">
        <Button onClick={openEditSectorSheet} variant="outline" size="sm">
          <Edit className="size-4 mr-2" /> Edit
        </Button>
        <Button onClick={deleteSector} variant="destructive" size="sm">
          <Trash className="size-4 mr-2" /> Delete
        </Button>
      </div>
    </>
  )
}
