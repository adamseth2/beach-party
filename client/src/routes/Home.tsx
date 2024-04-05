import React, { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  collectionGroup,
  where,
  query,
  FieldPath,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import EventCard from '../components/EventCard';
import { axiosGetResponse, fetchEvent } from '../types';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';
import { title } from 'process';
import { Button, Grid, Typography } from '@mui/material';
import mapOfWorld from '../assets/map-design.svg';

//get the user's events equal to today's date or later
const userRef = doc(db, 'users/insertEmail---change');
const attendeeQuery = query(
  collectionGroup(db, 'attendees'),
  where('userRef', '==', userRef)
);

const today = new Date();
const eventQuery = query(collection(db, 'events'), where('date', '>=', today));

type Props = {};

const Home = (props: Props) => {
  const [eventArr, setEventArr] = useState<fetchEvent[] | null>(null);
  const { user } = UserAuth();
  const fetchEventsData = async () => {
    if (!user) {
      console.log('User does not exist');
      return;
    }
    console.log(user.uid);
    try {
      let response: axiosGetResponse<fetchEvent[]> = await axios.get(
        `http://localhost:8800/events/user/${user.uid}`
      );
      const eventData = response.data;
      if (eventData?.length < 1) {
        setEventArr(null);
        return;
      }
      console.log(eventData);
      setEventArr(eventData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchEventsData();
  }, [user]);

  // const snapshot = await getDocs(eventQuery);
  // const eventData = snapshot.docs.map(doc => doc.data());
  // setData(eventData);
  return (
    <Grid
      container
      columnSpacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'>
      {eventArr ? (
        <>
          <Typography variant='h2'>Registered Events</Typography>
          {eventArr.map(event => (
            <EventCard event={event} />
          ))}
        </>
      ) : (
        <>
          <Typography variant='h4'>
            Get started with your first Event
          </Typography>
          <img
            src={mapOfWorld}
            alt='map of the world'
            style={{ height: '300px' }}
          />

          <Button variant='outlined' size='large' sx={{ margin: '4rem 0' }}>
            Sign up for first Event
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Home;
