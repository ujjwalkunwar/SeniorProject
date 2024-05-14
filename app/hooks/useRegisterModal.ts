import { create } from 'zustand';

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Creating a custom hook to manage the state of the register modal.
 * 
 * @param {Function} set - A function provided by Zustand to update the store's state.
 * @returns {RegisterModalStore} The state and actions for the register modal.
 */
const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useRegisterModal;