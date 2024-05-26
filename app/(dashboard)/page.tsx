'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { useNewIndustry } from '@/features/industries/hooks/use-new-industry'

export default function Home() {
  const { onOpen } = useNewIndustry()

  return <Button onClick={onOpen}>Add an industry</Button>
}
