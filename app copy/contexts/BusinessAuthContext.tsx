'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BusinessAccount {
  email: string;
  companyName: string;
  companyCode: string;
  phone: string;
  registeredAt: string;
}

interface BusinessAuthContextType {
  isBusinessUser: boolean;
  businessAccount: BusinessAccount | null;
  discountRate: number;
  setBusinessAccount: (account: BusinessAccount | null) => void;
  clearBusinessAccount: () => void;
}

const BusinessAuthContext = createContext<BusinessAuthContextType | undefined>(undefined);

export function BusinessAuthProvider({ children }: { children: React.ReactNode }) {
  const [businessAccount, setBusinessAccountState] = useState<BusinessAccount | null>(null);
  const [isBusinessUser, setIsBusinessUser] = useState(false);
  const discountRate = 10; // 10% discount for business users

  useEffect(() => {
    // Load business account from localStorage on mount
    const storedData = localStorage.getItem('businessAccount');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setBusinessAccountState(parsed);
        setIsBusinessUser(true);
      } catch (error) {
        console.error('Error parsing business account data:', error);
      }
    }
  }, []);

  const setBusinessAccount = (account: BusinessAccount | null) => {
    setBusinessAccountState(account);
    setIsBusinessUser(!!account);
    if (account) {
      localStorage.setItem('businessAccount', JSON.stringify(account));
    } else {
      localStorage.removeItem('businessAccount');
    }
  };

  const clearBusinessAccount = () => {
    setBusinessAccountState(null);
    setIsBusinessUser(false);
    localStorage.removeItem('businessAccount');
  };

  return (
    <BusinessAuthContext.Provider
      value={{
        isBusinessUser,
        businessAccount,
        discountRate,
        setBusinessAccount,
        clearBusinessAccount,
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