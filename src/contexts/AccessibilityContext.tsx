"use client"

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

type AccessibilityContextType = {
  isLargeText: boolean;
  toggleLargeText: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const largeText = localStorage.getItem('large-text') === 'true';
    const highContrast = localStorage.getItem('high-contrast') === 'true';
    setIsLargeText(largeText);
    setIsHighContrast(highContrast);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', isLargeText);
    localStorage.setItem('large-text', String(isLargeText));
  }, [isLargeText]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
    localStorage.setItem('high-contrast', String(isHighContrast));
  }, [isHighContrast]);

  const toggleLargeText = () => setIsLargeText(prev => !prev);
  const toggleHighContrast = () => setIsHighContrast(prev => !prev);
  
  const value = useMemo(() => ({
    isLargeText,
    toggleLargeText,
    isHighContrast,
    toggleHighContrast,
  }), [isLargeText, isHighContrast]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
