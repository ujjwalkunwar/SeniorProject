'use client';

import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

// Defining the props required for the Navigationbar component.
interface NavigationbarProps{
  currentUser?: SafeUser | null;
}

/**
 * Functional component representing the navigation bar.
 * 
 * @param {NavigationbarProps} props - The props for the Navigationbar component.
 */
const Navigationbar: React.FC<NavigationbarProps> = ({
  currentUser
}) => {
  console.log({currentUser})
  return(
    <div className="
      fixed 
      w-full 
      bg-white 
      z-10 
      shadows-sm">
      <div
        className="
          py-4 
          border-b-[1px]">

        <Container>
          <div className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          ">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navigationbar;