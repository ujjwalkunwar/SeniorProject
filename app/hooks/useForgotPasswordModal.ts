import { create } from 'zustand';

// Interface defining the shape of the store for the forgot password modal
interface ForgotPasswordModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Creating a custom hook to manage the state of the forgot password modal.
 * 
 * @param {Function} set - A function provided by Zustand to update the store's state.
 * @returns {ForgotPasswordModalStore} The state and actions for the forgot password modal.
 */
const useForgotPasswordModal = create<ForgotPasswordModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useForgotPasswordModal;