import { create } from 'zustand';

// interface defining the shape of the store for the login modal
interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Creating a custom hook to manage the state of the login modal.
 * 
 * @param {Function} set - A function provided by Zustand to update the store's state.
 * @returns {LoginModalStore} The state and actions for the login modal.
 */
const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useLoginModal;