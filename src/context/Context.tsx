import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

interface UserContextType {
  cc?: string;
  setCC: (cc: string) => void;
  position?: string;
  setPosition: (position: string) => void;
  employeeName?: string;
  setEmployeeName: (employee: string) => void;
  status?: number;
  setStatus: (status: number) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

const USER_STORAGE_KEY = import.meta.env.REACT_APP_USER_STORAGE_KEY;

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cc, setCC] = useState<string | undefined>(
    () => sessionStorage.getItem(`${USER_STORAGE_KEY}_cc`) || undefined,
  );
  const [position, setPosition] = useState<string | undefined>(
    () => sessionStorage.getItem(`${USER_STORAGE_KEY}_position`) || undefined,
  );
  const [employeeName, setEmployeeName] = useState<string | undefined>(
    () =>
      sessionStorage.getItem(`${USER_STORAGE_KEY}_employeeName`) || undefined,
  );
  const [status, setStatus] = useState<number | undefined>(() => {
    const storedstatus = sessionStorage.getItem(`${USER_STORAGE_KEY}_status`);
    return storedstatus ? parseInt(storedstatus, 10) : undefined;
  });

  useEffect(() => {
    if (cc !== undefined) sessionStorage.setItem(`${USER_STORAGE_KEY}_cc`, cc);
  }, [cc]);

  useEffect(() => {
    if (position !== undefined)
      sessionStorage.setItem(`${USER_STORAGE_KEY}_position`, position);
  }, [position]);

  useEffect(() => {
    if (employeeName !== undefined)
      sessionStorage.setItem(`${USER_STORAGE_KEY}_employeeName`, employeeName);
  }, [employeeName]);

  useEffect(() => {
    if (status !== undefined)
      sessionStorage.setItem(`${USER_STORAGE_KEY}_status`, status.toString());
  }, [status]);

  return (
    <UserContext.Provider
      value={{
        cc,
        setCC,
        position,
        setPosition,
        employeeName,
        setEmployeeName,
        status,
        setStatus,
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
