'use client';

// Defining the props required for the MenuItem component.
interface MenuItemProps {
  onClick: () => void;
  label: string;
}

/**
 * Functional component representing a menu item.
 * 
 * @param {MenuItemProps} props - The props for the MenuItem component.
 */
const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
  }) => {
  return(
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
      ">
        {label}
    </div>
  );
}

export default MenuItem;