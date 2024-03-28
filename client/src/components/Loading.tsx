import { Backdrop, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useLoading } from '../context/LoadingContext';

function Loading() {
  const { isLoading, setIsLoading } = useLoading();
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
