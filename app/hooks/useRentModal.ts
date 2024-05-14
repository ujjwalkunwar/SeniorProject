import { create } from 'zustand';

// Interface representing the state of the rent modal.
interface RentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Custom hook to manage the state of the rent modal.
 * 
 * @returns {RentModalStore} The state of the rent modal.
 */
const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useRentModal;