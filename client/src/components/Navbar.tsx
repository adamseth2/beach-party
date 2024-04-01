import {
  AppBar,
  Toolbar,
  Icon,
  Typography,
  Stack,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import beachPartyLogo from '../assets/beach-party-logo.svg';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AddIcon from '@mui/icons-material/Add';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { TravelExplore } from '@mui/icons-material';
const Navbar: React.FC = () => {
  const { user, logOut } = UserAuth();
  console.count();
  const [anchorProfileElement, setAnchorProfileElement] =
    React.useState<null | HTMLElement>(null);

  const profileMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfileElement(event.currentTarget);
  };

  const closeProfileMenuHandler = () => {
    setAnchorProfileElement(null);
  };

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
          height: '4rem',
        }}>
        <Toolbar>
          <Button
            href={user ? '/home' : '/'}
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
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              gap: '1rem',
            }}>
            <Button
              href='/find-event'
              variant='contained'
              color='secondary'
              sx={{ my: 2 }}
              endIcon={<TravelExplore />}>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  maxHeight: '150px',
                }}>
                Find Event
              </Box>
              {/* <Typography variant='body2'>Find Event</Typography> */}
            </Button>
            {user && (
              <Button
                href='/create-event'
                variant='contained'
                color='secondary'
                sx={{ my: 2 }}
                endIcon={<AddLocationAltIcon />}>
                <Box
                  sx={{
                    maxHeight: '150px',
                    display: { xs: 'none', sm: 'block' },
                  }}>
                  Create Event
                </Box>
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                {/* <Button variant='contained' onClick={signOutHandler}>
                  Log Out
                </Button> */}

                <Button onClick={profileMenuHandler} color='inherit'>
                  <>
                    <Typography
                      variant='body1'
                      component='h2'
                      sx={{ flexGrow: 1 }}>
                      {user.displayName.substring(0, 25)}
                    </Typography>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                  </>
                </Button>
                <Menu
                  anchorEl={anchorProfileElement}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorProfileElement)}
                  onClose={closeProfileMenuHandler}>
                  <MenuItem onClick={logOut}>
                    <Typography textAlign='center'>Log out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button href='/log-in' variant='contained' color='secondary'>
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
