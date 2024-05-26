'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewIndustry } from '@/features/industries/hooks/use-new-industry'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useGetIndustries } from '@/features/industries/api/use-get-industries'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeleteIndustries } from '@/features/industries/api/use-bulk-delete-industries'

const IndustriesPage = () => {
  const newIndustry = useNewIndustry()
  const deleteIndustries = useBulkDeleteIndustries()
  const industriesQuery = useGetIndustries()

  const data = industriesQuery.data || []
  const isDisabled = industriesQuery.isLoading || deleteIndustries.isPending

  if (industriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Industries Page
          </CardTitle>
          <Button onClick={newIndustry.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="name"
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id)
              deleteIndustries.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default IndustriesPage
