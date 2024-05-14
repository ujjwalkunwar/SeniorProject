'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Heading  from './Heading';

// Defining the props required for the EmptyState component.
interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

/**
 * EmptyState component displays a message when no exact matches are found.
 * 
 * @param {EmptyStateProps} props - Props for the EmptyState component.
 * @returns {JSX.Element} EmptyState element containing the message and reset button.
 */
const EmptyState: React.FC<EmptyState> = ({
  title = 'No exact matches',
  subtitle = 'Try changing your search filters',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="
      h-[60vh] 
      flex 
      flex-col 
      gap-2 
      justify-center 
      items-center">
      <Heading 
        title={title} 
        center
        subtitle={subtitle} />
      <div className="
        w-48 
        mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;