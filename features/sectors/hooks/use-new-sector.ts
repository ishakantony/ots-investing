import { create } from 'zustand'

type NewSectorState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewSector = create<NewSectorState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
