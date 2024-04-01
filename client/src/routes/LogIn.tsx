import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Grid, Typography } from '@mui/material';
import beachPartyLogo from '../assets/beach-party-logo.svg';

type Props = {};

function LogIn({}: Props) {
  const { user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate('/homepage');
    }
  }, [user]);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        // position='absolute'
        sx={{
          minHeight: 'calc(100vh - 4rem)',
          // left: '50vw', top: '50%',
        }}>
        <Grid item xs={3}></Grid>
        <Card elevation={4} sx={{ padding: '2rem 4rem 10rem 4rem' }}>
          <Typography variant='h3'>Sign in to</Typography>
          <Container
            sx={{
              background: '#65A48B',
              margin: '3rem 0',
              height: 60,
            }}>
            <img
              src={beachPartyLogo}
              alt='beachpartylogo icon'
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Container>
          <Typography variant='body1' sx={{ paddingBottom: '2rem' }}>
            Log in to create and register for events
          </Typography>
          <GoogleButton onClick={handleGoogleSignIn} />
        </Card>
      </Grid>
    </>
  );
}

export default LogIn;
