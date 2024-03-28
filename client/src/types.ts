import { Duration } from '@mui/material';

type MapOptions = google.maps.MapOptions;

export interface userAuth {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export type GMLocation = {
  mainName: string;
  secondaryName: string;
  placeId: string;
  longitude: number;
  latitude: number;
};
//sql database
export type event = {
  title: string;
  startDate: number;
  endDate: number;
  details: string;
  image: string;
  dateCreated: number;
  uuid: string;
};
export type user = {
  id?: number;
  name: string;
  profilePic: string;
  uuid: string;
};
export type eventUser = user & {
  role: string;
};
export type fetchEvent = event & {
  volunteers: eventUser[];
  location: GMLocation;
};

export type axiosGetResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};
export type axiosError = {
  data: {
    code: string;
    errno: number;
  };
  status: number;
  statusText: string;
};
export type fetchGeocode = {
  formatted_address: string;
  place_id: string;
  types: string[];
};

//CHANGE LATER
export type point = number[];

export interface eventAPIData {}
