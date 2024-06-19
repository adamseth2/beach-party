import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Link,
  Button,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Grid } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { event, fetchGeocode, GMLocation } from '../types';
import DateHourPicker from '../components/input/DateHourPicker';
import GoogleMapAutocomplete from '../components/input/GoogleMapAutocomplete';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useStorage from '../hooks/useStorage';
import { UserAuth } from '../context/AuthContext';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { LoadGoogleMaps as LoadGoogleMaps } from '../helperMethods';
// import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { formatLocation } from '../helperMethods';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useNavigate } from 'react-router';
import { useFeedback } from '../context/FeedbackContext';
type Props = {};

type formInput = event & {
  imageFile: File | null;
  startHour: number;
  endHour: number;
  termsOfServiceAgreement: boolean;
};
type formLocation = Omit<GMLocation, 'placeId' | 'longitude' | 'latitude'>;
const INITIAL_DATA: formInput = {
  title: '',
  startDate: 0,
  startHour: 0,
  endDate: 0,
  endHour: 0,
  details: '',
  imageFile: null,
  image: '',
  dateCreated: 0,
  uuid: '',
  termsOfServiceAgreement: false,
};
const timeOptions = [
  '30 mins',
  '1 hour',
  '1 hour 30 mins',
  '2 hour',
  '2 hour 30 mins',
  '3 hour',
  '3 hour 30 mins',
  '4 hour',
  '4 hour 30 mins',
  '5 hour',
];
const isFormDataValid = (data: formInput, location: formLocation | null) => {
  return (
    data.title &&
    data.startDate &&
    data.startHour &&
    data.endDate &&
    data.endHour &&
    data.details &&
    data.imageFile &&
    data.termsOfServiceAgreement &&
    location?.mainName &&
    location?.secondaryName
  );
};
export const CreateEvent = (props: Props) => {
  //loads GoogleMap Places library
  const placesLib = useMapsLibrary('places');
  const [formInfo, setFormInfo] = useState<formInput>(INITIAL_DATA);
  const [location, setLocation] = useState<formLocation | null>(null);
  const { uploadImage } = useStorage();
  const { user } = UserAuth();
  const isLibLoaded = useRef(false);
  const navigate = useNavigate();
  const { setStatusMessage, setStatus, setIsLoading } = useFeedback();
  useEffect(() => {
    if (!placesLib) {
      return;
    }
    isLibLoaded.current = true;
    console.log('placeslib is loaded');
    console.log(isLibLoaded.current);
  }, [placesLib]);

  const formHandler = (key: string, value: any) => {
    console.log(value);

    setFormInfo({ ...formInfo, [key]: value });
  };
  const eToKeyValueHandler: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = e => {
    console.log(e);
    formHandler(e.target.id, e.target.value);
  };
  const fileToKeyValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    formHandler(e.target.id, e.target.files[0]);
  };
  const locationHandler = (mainName: string, secondaryName: string) => {
    setLocation({ mainName, secondaryName });
  };
  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    console.log(formInfo);
    if (!isFormDataValid(formInfo, location)) {
      setStatusMessage('Form Invalid');
      setStatus('error');
      return;
    }
    console.log('GOING TO WORK');
    const uuid = uuidv4().substring(0, 13);
    let url;
    try {
      url = await uploadImage(uuid, formInfo.imageFile);
    } catch (e) {
      setStatusMessage('Error with uploading image');
      setStatus('error');
      return;
    }
    console.log('URL IS ' + url);
    const eventData: any = structuredClone(formInfo);
    const userUUID = user.uid;
    eventData.organizer = userUUID;
    delete eventData.startHour;
    delete eventData.endHour;
    delete eventData.imageFile;
    delete eventData.termOfService;
    // DELETE LATER
    if (!url) {
      console.log('url IS NULL');
      return;
    }
    if (!location) {
      console.log('location is NULL');
      return;
    }
    //gets geocatching TO DO???
    let results;
    try {
      results = await getGeocode({ address: formatLocation(location) });
    } catch (e) {
      setStatusMessage("Error occurred with Google Maps' Geocode");
      setStatus('error');
      return;
    }
    console.log(results);
    const { place_id, types } = results[0];
    const { lat, lng } = await getLatLng(results[0]);
    console.log(lat, lng);
    const locationData: GMLocation = {
      mainName: location.mainName,
      secondaryName: location.secondaryName,
      latitude: lat,
      longitude: lng,
      placeId: place_id,
    };
    console.log('locationData', locationData);
    eventData.image = url;
    eventData.dateCreated = Date.now();
    eventData.uuid = uuid;

    console.log(eventData);
    const postData = { locationData, eventData };
    try {
      setIsLoading(true);
      console.log('GOT POSTED??');
      console.log(
        await axios.post(`${process.env.REACT_APP_REST_API}/events`, postData)
      );
      console.log('GOT POSTED');
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/event/${uuid}`);
      }, 1000);
    } catch (err) {
      console.log(err);
      setStatusMessage('An error occurred. Please try submitting again ');
      setStatus('error');
    }
  };
  return (
    <>
      <Container
        maxWidth='md'
        // display='flex'
        // justifyContent='center'
        style={
          {
            // padding: '0.25rem',
            // backgroundColor: 'rgb(235, 242, 255)',
          }
        }>
        <Paper
          elevation={3}
          style={{
            padding: '3rem',
            //   backgroundColor: 'rgb(235, 242, 255)',
          }}>
          <Typography
            variant='h2'
            style={{
              marginBottom: '2rem',
            }}>
            Create an Event
          </Typography>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            justifyContent='flex-start'>
            <Grid item xs={12}>
              <TextField
                id='title'
                fullWidth
                label='Event Name'
                variant='standard'
                onChange={e => eToKeyValueHandler(e)}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateHourPicker
                dateLabel='Start Date'
                dateId='startDate'
                dateHelperText='MM/DD/YYYY'
                hourLabel='Start Time'
                hourId='startHour'
                formHandler={formHandler}
              />
              <DateHourPicker
                dateLabel='End Date'
                dateId='endDate'
                dateHelperText='MM/DD/YYYY'
                hourLabel='End Time'
                hourId='endHour'
                formHandler={formHandler}
              />
            </LocalizationProvider>
            {/* <Grid item xs={12}>
              <Autocomplete
                id='eventEnd'
                disablePortal
                onChange={(e, value) => formHandler('eventEnd', value)}
                options={timeOptions}
                // sx={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label='Duration' />
                )}
                // defaultValue={timeOptions[3]}
              />
            </Grid> */}
            {formInfo.imageFile && (
              <Grid item xs={5}>
                <img
                  src={URL.createObjectURL(formInfo.imageFile)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </Grid>
            )}
            <Grid item xs={7}>
              <Button
                component='label'
                // variant='contained'
                startIcon={<AddPhotoAlternateIcon />}>
                <input
                  id='imageFile'
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={e => fileToKeyValueHandler(e)}
                  hidden
                />
                {!formInfo.imageFile
                  ? 'Upload Cover Image'
                  : formInfo.imageFile?.name}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <GoogleMapAutocomplete
                isLibLoaded={isLibLoaded.current}
                handler={locationHandler}
              />
            </Grid>
            <Grid item xs={6}>
              {location && (
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
                  // pointer-events: unset !i
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    &q=${location.mainName} ${location.secondaryName}`}></iframe>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='details'
                fullWidth
                label='Description'
                multiline
                rows={8}
                helperText='*Let your volunteers know what to expect, what they need to bring, and how to find the group'
                onChange={e => eToKeyValueHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id='termsOfServiceAgreement'
                      onChange={e => formHandler(e.target.id, e.target.checked)}
                    />
                  }
                  label={
                    <Typography>
                      I have read and agree to the <Link>terms of service</Link>
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <Button size='large' variant='contained' onClick={submitHandler}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
