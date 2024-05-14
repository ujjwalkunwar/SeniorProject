import { create } from 'zustand';

// Interface representing the state of the search modal.
interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Custom hook to manage the state of the search modal.
 * 
 * @returns {SearchModalStore} The state of the search modal.
 */
const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSearchModal;