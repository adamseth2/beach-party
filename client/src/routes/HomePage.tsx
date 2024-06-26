import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import heroImage from '../assets/heropage1.jpg';
import { event } from '../types';
import { useFeedback } from '../context/FeedbackContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
// import from ''

type Props = {};

const HomePage = (props: Props) => {
  const { setStatus, setStatusMessage } = useFeedback();
  const { user } = UserAuth();
  const navigate = useNavigate();
  const organizeCleanUpHandler = () => {
    setStatus('info');
    setStatusMessage('Please log in first');
  };
  useEffect(() => {
    if (user) {
      console.log('user should be redirected');
      navigate('/home');
      return;
      // }
    }
  }, [user]);

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 4rem)',
        position: 'relative',
      }}>
      {/* background img */}
      <img
        id='hero-img'
        style={{
          position: 'absolute',
          zIndex: '-1',
          padding: '0',
          margin: '0',
          objectFit: 'cover',
          filter: 'brightness(30%)',
          width: '100%',
          height: '100%',
        }}
        src={heroImage}
        alt='Family and kids cleaning up the beach'
      />
      <Grid
        container
        direction='column'
        justifyContent='center'
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: '1500px',
          margin: 'auto',
          paddingLeft: '5%',
        }}>
        <Typography variant='h1' color='white' fontWeight={'700'}>
          Join the
          <br />
          Movement.
        </Typography>
        <Typography variant='body1' color='white' py='1rem'>
          Join the +10,000 of volunteers helping to clean our beautiful beaches
          one piece of garbage at a time
        </Typography>
        <Box>
          <Stack direction='row' spacing={2}>
            <Link to='/find-event/'>
              <Button color='primary' variant='contained'>
                Sign Up
              </Button>
            </Link>
            <Button
              color='secondary'
              variant='outlined'
              onClick={organizeCleanUpHandler}>
              Organize Cleanup
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default HomePage;
