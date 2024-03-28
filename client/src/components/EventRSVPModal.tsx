import { AccessTimeOutlined, LocationOnOutlined } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { UserAuth } from '../context/AuthContext';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router';
import { GMLocation, axiosError } from '../types';
import { useLoading } from '../context/LoadingContext';
import Loading from './Loading';

type props = {
  title: string;
  startDate: number;
  endDate: number;
  location: GMLocation;
};

function EventRSVPModal({ title, startDate, endDate, location }: props) {
  const { user } = UserAuth();
  const { eventUuid } = useParams();
  const { setIsLoading } = useLoading();
  const rsvpHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLoading(true);
    try {
      console.log('GOT POSTED??');
      const postData = {
        eventUuid: eventUuid,
        userUuid: user.uid,
        role: 'Volunteer',
      };
      console.log('postData', postData);
      await axios.post('http://localhost:8800/event/rsvp', postData);
      console.log('GOT POSTED');
    } catch (err: any) {
      const axiosErr = err.response as axiosError;
      if ((axiosErr.data.code = 'ER_DUP_ENTRY')) {
        console.log('dupplicated error');
      }
      console.log(err);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  const convertUnixFormatTime = (unix: number) => {
    let a = new Date(unix);
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let day = a.getDay();
    let dayOfTheWeek = weekday[a.getDay()];
    let hour24 = a.getHours() + 1;
    let minute = a.getMinutes();
    let min = minute < 10 ? '0' + minute : minute;
    let hourAndMin =
      hour24 >= 12 ? `${hour24 - 12}:${min} PM` : `${hour24}:${min} AM`;
    // let hour
    return `${dayOfTheWeek}, ${month} ${day}, ${year} at ${hourAndMin}`;
  };

  return (
    <>
      <Loading />
      <Paper
        elevation={2}
        style={{
          position: 'fixed',
        }}>
        <List
          sx={{
            // width: '50%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            mr: -4,
          }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                style: { whiteSpace: 'normal', paddingRight: '1rem' },
              }}
              primary={`${convertUnixFormatTime(
                startDate
              )} to ${convertUnixFormatTime(endDate)}`}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={location.mainName}
              secondary={location.secondaryName}
            />
          </ListItem>
        </List>
        <iframe
          width='300'
          height='300'
          // style='border:0'
          scrolling='no'
          style={{
            overflow: 'hidden',
            border: '0',
          }}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&q=place_id:${location.placeId}`}></iframe>
        <Typography variant='h5'>{title}</Typography>
        <Grid item xs={8}></Grid>
        <Button onClick={rsvpHandler} variant='contained' fullWidth>
          RSVP
        </Button>
        {/* <ListItemText primary={event.title}></ListItemText> */}
      </Paper>
    </>
  );
}

export default EventRSVPModal;