import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  Avatar,
  Button,
  Container,
  ListItemAvatar,
  TextField,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EventCard from '../components/EventCard';

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import SideBar from '../components/SideBar';
import EventMap from '../components/EventMap';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import useFetchEvents from '../hooks/useFetchEvents';
import { APIProvider, useApiIsLoaded } from '@vis.gl/react-google-maps';
import { convertUnixFormatTime } from '../helperMethods';
import { AccessTimeOutlined, LocationOnOutlined } from '@mui/icons-material';
// type Props = {};

const drawerWidth = 400;
interface Props {
  // /**
  //  * Injected by the documentation to work in an iframe.
  //  * You won't need it on your project.
  //  */
  // window?: () => Window;
}

export default function FindEvent(props: Props) {
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  const apiIsLoaded = useApiIsLoaded();
  const { eventArr, organizerArr } = useFetchEvents();
  const [focusedEvent, setFocusedEvent] = useState<number | null>(null);

  // useEffect(() => {
  //   console.log('In use Event useEffect:');
  //   console.log(eventArr);
  // }, [eventArr]);

  return (
    <Box>
      {eventArr && focusedEvent && (
        <Drawer
          // style={{
          //   maxWidth: '300px',
          // }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            // maxWidth: 'drawerWidth',
            width: { sm: '240px' },
            maxWidth: { sm: 'drawerWidth' },
            flexShrink: { sm: 0 },
            zIndex: '3',
          }}
          //@ts-ignore
          // style={{
          //   inset: 'unset !important',
          // }}
          open={true}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          variant='persistent'
          // BackdropProps={{ invisible: true }}
        >
          <Toolbar /> {/*Purpose is to add space*/}
          <img
            src={eventArr[focusedEvent].image}
            style={{ width: 'drawerWidth' }}
          />
          <Box
            sx={{
              ml: 2,
              mr: 2,
            }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              {eventArr[focusedEvent].title}
            </Typography>
            <List>
              <ListItem sx={{ padding: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AccessTimeOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    style: { whiteSpace: 'normal' },
                  }}
                  primary={`${convertUnixFormatTime(
                    eventArr[focusedEvent].startDate
                  )} to ${convertUnixFormatTime(
                    eventArr[focusedEvent].endDate
                  )}`}
                />
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOnOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={eventArr[focusedEvent].location.mainName}
                  secondary={eventArr[focusedEvent].location.secondaryName}
                />
              </ListItem>
              <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                Details
              </Typography>
              <Typography variant='body2' style={{ width: 'drawerWidth' }}>
                {eventArr[focusedEvent].details.substring(0, 400)}...
              </Typography>
            </List>
          </Box>
          <Button
            href={`/event/${eventArr[focusedEvent].uuid}`}
            variant='contained'>
            More information
          </Button>
        </Drawer>
      )}
      {apiIsLoaded && (
        <EventMap
          eventArr={eventArr}
          focusedEvent={focusedEvent}
          setFocusedEvent={setFocusedEvent}
        />
      )}
    </Box>
  );
}
