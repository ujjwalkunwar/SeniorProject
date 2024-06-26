'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

// Component for rendering the logo.
const Logo = () => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/')
  };

  return(
    <Image 
      onClick={handleLogoClick}
      alt="Logo"
      className="
        hidden 
        md:block 
        cursor-pointer"
      height="100"
      width="100"
      src="/images/websitelogo.png"
    />
  )
}

export default Logo;
