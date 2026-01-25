'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface BusinessAccount {
  email: string;
  companyName: string;
  companyCode: string;
  phone: string;
  registeredAt: string;
}

type UserMode = 'standard' | 'business';

interface BusinessAuthContextType {
  // Check if user HAS a business account registered
  hasBusinessAccount: boolean;
  // Check if user is CURRENTLY using business mode
  isBusinessMode: boolean;
  businessAccount: BusinessAccount | null;
  discountRate: number;
  currentMode: UserMode;
  setBusinessAccount: (account: BusinessAccount | null) => void;
  clearBusinessAccount: () => void;
  switchToBusinessMode: () => void;
  switchToStandardMode: () => void;
}

const BusinessAuthContext = createContext<BusinessAuthContextType | undefined>(undefined);

export function BusinessAuthProvider({ children }: { children: React.ReactNode }) {
  const [businessAccount, setBusinessAccountState] = useState<BusinessAccount | null>(null);
  const [currentMode, setCurrentMode] = useState<UserMode>('standard');
  const { user } = useAuth();
  const discountRate = 5; // 5% discount for business users

  // Load business account and mode from localStorage when user logs in
  useEffect(() => {
    if (user) {
      // Load business account data
      const storedData = localStorage.getItem('businessAccount');
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          if (parsed.email === user.email) {
            setBusinessAccountState(parsed);
          } else {
            localStorage.removeItem('businessAccount');
            setBusinessAccountState(null);
          }
        } catch (error) {
          console.error('Error parsing business account data:', error);
          localStorage.removeItem('businessAccount');
        }
      }

      // Load user's preferred mode
      const storedMode = localStorage.getItem(`userMode_${user.uid}`) as UserMode;
      if (storedMode === 'business' || storedMode === 'standard') {
        setCurrentMode(storedMode);
      }
    } else {
      setBusinessAccountState(null);
      setCurrentMode('standard');
    }
  }, [user]);

  const setBusinessAccount = (account: BusinessAccount | null) => {
    if (!user && account) {
      console.error('Cannot set business account without authenticated user');
      return;
    }

    if (account && user && account.email !== user.email) {
      console.error('Business account email must match authenticated user email');
      return;
    }

    setBusinessAccountState(account);
    if (account) {
      localStorage.setItem('businessAccount', JSON.stringify(account));
    } else {
      localStorage.removeItem('businessAccount');
    }
  };

  const clearBusinessAccount = () => {
    setBusinessAccountState(null);
    localStorage.removeItem('businessAccount');
    setCurrentMode('standard');
    if (user) {
      localStorage.removeItem(`userMode_${user.uid}`);
    }
  };

  const switchToBusinessMode = () => {
    if (!businessAccount) {
      console.warn('Cannot switch to business mode without business account');
      return;
    }
    setCurrentMode('business');
    if (user) {
      localStorage.setItem(`userMode_${user.uid}`, 'business');
    }
  };

  const switchToStandardMode = () => {
    setCurrentMode('standard');
    if (user) {
      localStorage.setItem(`userMode_${user.uid}`, 'standard');
    }
  };

  const hasBusinessAccount = !!user && !!businessAccount;
  const isBusinessMode = hasBusinessAccount && currentMode === 'business';

  return (
    <BusinessAuthContext.Provider
      value={{
        hasBusinessAccount,
        isBusinessMode,
        businessAccount,
        discountRate,
        currentMode,
        setBusinessAccount,
        clearBusinessAccount,
        switchToBusinessMode,
        switchToStandardMode,
      }}
    >
      {children}
    </BusinessAuthContext.Provider>
  );
}

export function useBusinessAuth() {
  const context = useContext(BusinessAuthContext);
  if (context === undefined) {
    throw new Error('useBusinessAuth must be used within a BusinessAuthProvider');
  }
  return context;
}