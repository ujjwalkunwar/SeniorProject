'use client';
import EmptyState from './components/EmptyState';
import { useEffect } from 'react';

// ErrorStateProps interface.
interface ErrorStateProps {
  error: Error;
}

/**
 * Component for displaying an error state.
 * 
 * @param {ErrorStateProps} props - The props for the Error component.
 * @returns {JSX.Element} JSX element representing the error state.
 */
const Error: React.FC<ErrorStateProps> = ({ 
  error 
}) => {
  useEffect(() => {console.error(error);}, [error]);

  return <EmptyState 
            title="*" 
            subtitle="Something went wrong" />;
};

export default Error;