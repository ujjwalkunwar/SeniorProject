'use client';

// Props interface for the Heading component.
interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

/**
 * Heading component renders a title and optional subtitle.
 * This component provides a customizable heading with a title and an optional subtitle.
 * It supports center alignment for the text if specified.
 * 
 * @param {HeadingProps} props - Props for the Heading component.
 * @returns {JSX.Element} Heading element containing the title and subtitle.
 */
const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="
        text-2xl 
        font-bold">
        {title}
      </div>
      <div className="
        font-light
        text-neutral-500 
        mt-2">
        {subtitle}
      </div>
    </div>
   );
}

export default Heading;