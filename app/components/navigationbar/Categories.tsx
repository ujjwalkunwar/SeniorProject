'use client';

import Container from "../Container";
import { GiBoatFishing, GiCactus, 
  GiCastle, GiDuck, GiForestCamp, 
  GiIsland, GiWindmill } from "react-icons/gi";
import { TbBeach, TbMountain, TbPool} from 'react-icons/tb';
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

// Interface representing a category.
export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is close to the windmills'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside'
  },
  {
    label: 'Duck',
    icon: GiDuck,
    description: 'This property has ducks'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on Island'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing facilities'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping facilities'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious'
  }
]

// Component for rendering category boxes based on the current location and category.
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname == '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
        >
          {categories.map((item)=> (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category == item.label}
              icon={item.icon}
              />
            ))}
      </div>
    </Container>
  );
}

export default Categories;