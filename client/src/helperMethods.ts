import { useLoadScript } from '@react-google-maps/api';
import { GMLocation } from './types';
export function LoadGoogleMaps(): any {
  const { isLoaded: isGMLoaded } = useLoadScript({
    //@ts-ignore
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });
  console.log('helperMethod Reloadsss');
  // return { isGMLoaded };
}
type formLocation = Omit<GMLocation, 'placeId' | 'longitude' | 'latitude'>;
export function formatLocation(location: GMLocation | formLocation): string {
  return location.mainName + ' ' + location.secondaryName;
}
export function feedbackNotLoggedInStatus(
  setStatus: (status: string) => void,
  setStatusMessage: (statusMessage: string) => void
) {
  setStatus('error');
  setStatusMessage('Please log in first');
}
export function convertUnixFormatTime(unix: number) {
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
}
