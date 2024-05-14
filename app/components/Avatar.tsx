'use client';

import Image from "next/image"

// Defining the props required for the Avatar component.
interface AvatarProps {
  src: string | null | undefined;
}

/**
 * Functional component representing the avatar.
 * 
 * @param {AvatarProps} props - The props for the Avatar component.
 */
const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return(
    <Image
      className="rounded-full"
      height="32"
      width="32"
      alt="Avatar"
      src={src || "/images/userlogo.jpg"}
    />
  )
}

export default Avatar;