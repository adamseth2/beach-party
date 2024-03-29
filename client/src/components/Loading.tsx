import { Backdrop, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useFeedback } from '../context/FeedbackContext';

function Loading() {
  const { isLoading, setIsLoading } = useFeedback();

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={e => setIsLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}

export default Loading;
