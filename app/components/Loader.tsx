'use client';

import { PuffLoader } from 'react-spinners';

/**
 * Loader component displays a loading animation while waiting for data.
 * 
 * @returns {JSX.Element} Loader element containing the loading animation.
 */
const Loader = () => {
  return (
    <div className="
      flex 
      flex-col 
      h-[70vh] 
      justify-center 
      items-center">
      <PuffLoader 
        size={100} 
        color="blue" />
    </div>
  );
};

export default Loader;