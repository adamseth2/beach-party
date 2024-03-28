import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button, TextField } from '@mui/material';
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
// type Props = {};

const drawerWidth = 500;
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function FindEvent(props: Props) {
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  const apiIsLoaded = useApiIsLoaded();
  const { eventArr, organizerArr } = useFetchEvents();
  const [focusedEvent, setFocusedEvent] = useState<number | null>(null);

  useEffect(() => {
    console.log('In use Event useEffect:');
    console.log(eventArr);
  }, [eventArr]);

  return (
    <Box>
      <br></br>
      <br></br>
      {eventArr && focusedEvent && (
        <Drawer
          // sx={{ width: { sm: '240px' }, flexShrink: { sm: 0 }, zIndex: '3' }}
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
          <Toolbar />
          <img
            src={eventArr[focusedEvent].image}
            alt=''
            style={{ width: '400px' }}
          />
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
