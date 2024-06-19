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
import { Link, redirect } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

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
  const [isUserLoggedInBefore, setIsUserLoggedInBefore] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const fetchEventsData = async () => {
    if (!user) {
      if (isUserLoggedInBefore) {
        console.log('user should be redirected');
        navigate('/');
        return;
      }
      console.log('User does not exist');
      return;
    }
    setIsUserLoggedInBefore(true);
    console.log(user.uid);
    try {
      let response: axiosGetResponse<fetchEvent[]> = await axios.get(
        `${process.env.REACT_APP_REST_API}/events/user/${user.uid}`
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
          {eventArr.map((event, index) => (
            <EventCard key={index} event={event} />
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
          <Link to='/find-event'>
            <Button variant='outlined' size='large' sx={{ margin: '4rem 0' }}>
              Sign up for first Event
            </Button>
          </Link>
        </>
      )}
    </Grid>
  );
};

export default Home;
