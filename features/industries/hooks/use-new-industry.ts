import { create } from 'zustand'

type NewIndustryState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewIndustry = create<NewIndustryState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
