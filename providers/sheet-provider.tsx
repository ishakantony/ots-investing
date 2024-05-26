'use client'

import { useMountedState } from 'react-use'

import { NewIndustrySheet } from '@/features/industries/components/new-industry-sheet'
import { EditIndustrySheet } from '@/features/industries/components/edit-industry-sheet'

export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <NewIndustrySheet />
      <EditIndustrySheet />
    </>
  )
}
