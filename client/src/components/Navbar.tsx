import {
  AppBar,
  Toolbar,
  Icon,
  Typography,
  Stack,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import beachPartyLogo from '../assets/beach-party-logo.svg';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import React from 'react';
import { UserAuth } from '../context/AuthContext';
const Navbar: React.FC = () => {
  const { user, logOut } = UserAuth();

  const signOutHandler = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar
        sx={{
          background: '#7DAA92',
          position: 'relative',
          zIndex: theme => theme.zIndex.drawer + 1,
        }}>
        <Toolbar>
          <Button
            href='/home'
            color='inherit'
            sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
            {/* <img src={beachPartyLogo} alt='' /> */}
            <Box
              component='img'
              sx={{
                height: 60,
                // width: 200,
              }}
              alt='Beach Party Logo'
              src={beachPartyLogo}
            />
            {/* <BeachAccessIcon fontSize='large' /> */}
            {/* <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Beach Party
            </Typography> */}
          </Button>
          <Stack direction='row' spacing={2}>
            <Button href='/find-event' variant='contained' color='secondary'>
              Find Event
            </Button>
            {user ? (
              <>
                <Button
                  href='/create-event'
                  variant='contained'
                  color='secondary'>
                  Create Event
                </Button>
                <Button variant='contained' onClick={signOutHandler}>
                  Log Out
                </Button>
                <Button href='/profile/' color='inherit'>
                  <Typography
                    variant='body1'
                    component='h2'
                    sx={{ flexGrow: 1 }}>
                    {user.displayName}
                  </Typography>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </Button>
              </>
            ) : (
              <Button href='/log-in' variant='contained' color='secondary'>
                Log In
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
