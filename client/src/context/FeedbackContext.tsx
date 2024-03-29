import { AlertColor } from '@mui/material';
import { useState, useContext, createContext } from 'react';
const FeedbackContext = createContext<any>(undefined);
export const FeedBackContextProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<AlertColor | null>(null);
  // if statusMessage is null, then don't display
  const [statusMessage, setStatusMessage] = useState<String | null>(null);
  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        setIsLoading,
        status,
        setStatus,
        statusMessage,
        setStatusMessage,
      }}>
      {children}
    </FeedbackContext.Provider>
  );
};
export const useFeedback = () => {
  return useContext(FeedbackContext);
};
