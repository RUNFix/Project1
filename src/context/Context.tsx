import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';


interface Item {
  name: string;
  quantity: number;
  sparePrice: number;
  totalPriceSpare: number;
}

interface UserContextType {
  cc?: string;
  setCC: (cc: string) => void;
  position?: string;
  setPosition: (position: string) => void;
  employeeName?: string;
  setEmployeeName: (employee: string) => void;
  status?: number;
  setStatus: (status: number) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  items: Item[];
  setItems: (items: Item[]) => void;
  urlPDF: string;
  setUrlPDF: (cc: string) => void;
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
  const [totalPrice, setTotalPrice] = useState<number>(() => {
    const storedTotalPrice = sessionStorage.getItem(
      `${USER_STORAGE_KEY}_totalPrice`,
    );
    return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
  });

const [items, setItems] = useState<Item[]>(() => {
  const storedCartItems = sessionStorage.getItem(
    `${USER_STORAGE_KEY}_cartItems`,
  );
  return storedCartItems ? JSON.parse(storedCartItems) : [];
});

    const [urlPDF, setUrlPDF] = useState<string | undefined>(
      () => sessionStorage.getItem(`${USER_STORAGE_KEY}_urlPDF`) || undefined,
    );

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

   useEffect(() => {
     sessionStorage.setItem(
       `${USER_STORAGE_KEY}_totalPrice`,
       totalPrice.toString(),
     );
   }, [totalPrice]);

   useEffect(() => {
     sessionStorage.setItem(
       `${USER_STORAGE_KEY}_items`,
       JSON.stringify(items),
     );
   }, [items]);
   


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
        totalPrice,
        setTotalPrice,
        items,
        setItems,
        urlPDF,
        setUrlPDF,
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
