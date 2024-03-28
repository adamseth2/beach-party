import { useState, useEffect, useContext, createContext } from 'react';
const LoadingContext = createContext<any>(undefined);

export const LoadingContextProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
export const useLoading = () => {
  return useContext(LoadingContext);
};
