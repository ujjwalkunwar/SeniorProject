'use client';

import { Toaster } from 'react-hot-toast'

/**
 * Component to provide a toast notification.
 * 
 * @returns {JSX.Element} JSX element representing the toaster provider.
 */
const ToasterProvider = () => {
  return(
    <Toaster />
  );
}

export default ToasterProvider;