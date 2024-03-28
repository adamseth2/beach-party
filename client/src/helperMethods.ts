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
