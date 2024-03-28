import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosGetResponse, event, fetchEvent } from '../types';
import axios from 'axios';
import EventBanner from '../components/EventBanner';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { AccessTimeOutlined, LocationOnOutlined } from '@mui/icons-material';
import UserEventCard from '../components/UserEventCard';
import useFetchURLEvent from '../hooks/useFetchURLEvent';
import UserEventCardModal from '../components/UserEventCardModal';
import EventRSVPModal from '../components/EventRSVPModal';

function EventPage() {
  const { event, organizer } = useFetchURLEvent();
  return (
    <>
      {!event || !organizer ? (
        <>
          <Skeleton variant='rectangular' width={900} height={200} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='rounded' width={210} height={60} />
          // <Skeleton variant='rectangular' width={700} height={800} />
        </>
      ) : (
        <>
          <EventBanner
            title={event.title}
            name={organizer.name}
            profilePic={organizer.profilePic}
          />
          <Grid container justifyContent='center' spacing={8}>
            <Grid item xs={6}>
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  marginBottom: '3rem',
                }}
                src={event.image}
                alt=''
              />
              <Typography variant='h4' gutterBottom>
                Details
              </Typography>
              <Typography
                variant='body1'
                style={{
                  marginBottom: '2rem',
                  whiteSpace: 'pre-line',
                }}>
                {event.details}
              </Typography>
              <Typography variant='h4' gutterBottom>
                {`Volunteers (${event.volunteers.length})`}
              </Typography>
              <UserEventCardModal
                organizer={organizer}
                volunteers={event.volunteers}
              />
            </Grid>
            {/* RIGHT SIDE */}
            <Grid item xs={3}>
              <EventRSVPModal
                title={event.title}
                startDate={event.startDate}
                endDate={event.endDate}
                location={event.location}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default EventPage;
