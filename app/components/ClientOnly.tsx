'use client';

import { useEffect, useState } from "react";

// Defining the props required for the ClientOnly component.
interface ClientOnlyProps {
  children: React.ReactNode;
}

/**
 * ClientOnly component renders its children only on the client-side.
 * 
 * @param {ClientOnlyProps} props - Props for the ClientOnly component.
 * @returns {JSX.Element | null} Rendered child components or null if not mounted.
 */
const ClientOnly: React.FC<ClientOnlyProps> = ({
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  setHasMounted(true);
}, []);

if (!hasMounted) {
  return null;
}
  return( 
    <>
    {children}
    </>
  );
}

export default ClientOnly;