'use client';

// Props interface for the Container component.
interface Containerprop {
  children: React.ReactNode;
}

/**
 * Container component provides a responsive container for its child components.
 * 
 * @param {ContainerProps} props - Props for the Container component.
 * @returns {JSX.Element} Container element containing the child components.
 */
const Container: React.FC<Containerprop> = ({children}) => {
  return(
    <div className="
          xl:px-20
          md:px-10
          sm:px-2
          px-4
          max-w-[2520px]
          mx-auto">
      {children}
    </div>
  );
}

export default Container;