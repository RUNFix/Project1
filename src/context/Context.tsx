// UserContext.tsx

import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
  cc?: string;
  setCC: (cc: string) => void;
  position?: string;
  setPosition: (position: string) => void;
  employeeName?: string;
  setEmployeeName: (employee: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cc, setCC] = useState<string | undefined>();
  const [position, setPosition] = useState<string | undefined>();
  const [employeeName, setEmployeeName] = useState<string | undefined>();

  return (
    <UserContext.Provider
      value={{
        cc,
        setCC,
        position,
        setPosition,
        employeeName,
        setEmployeeName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
