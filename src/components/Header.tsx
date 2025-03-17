import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      {children}
    </header>
  );
}