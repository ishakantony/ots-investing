import { create } from 'zustand'

type OpenIndustryState = {
  id?: string
  isOpen: boolean
  onOpen: (id: string) => void
  onClose: () => void
}

export const useOpenIndustry = create<OpenIndustryState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}))
