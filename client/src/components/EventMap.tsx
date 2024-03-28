import React, { useRef, useState } from 'react';
import { event, fetchEvent } from '../types';
import EventMarker from './EventMarker';
import test from '../assets/Picture1.png';
import { Map } from '@vis.gl/react-google-maps';
type Props = {
  eventArr: fetchEvent[] | null;
  focusedEvent: number | null;
  setFocusedEvent: React.Dispatch<React.SetStateAction<number | null>>;
};
type GeoPosition = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
const center = {
  lat: 47.7511,
  lng: -120.7401,
};

const containerStyle = {
  width: '100%',
  height: '80vh',
  minHeight: '300px',
};
const options: MapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
};
function EventMap({ eventArr, focusedEvent, setFocusedEvent }: Props) {
  function markerClickHandler(index: number) {
    if (!eventArr) {
      return;
    }
    console.log(eventArr[index]);
  }
  return (
    <>
      <Map
        style={containerStyle}
        center={center}
        zoom={8}
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        minZoom={3}
        clickableIcons={false}
        streetViewControl={false}
        mapTypeControl={false}
        // options={options}
      >
        {eventArr &&
          eventArr.map((event, index) => (
            <EventMarker
              index={index}
              data={event}
              markerClickHandler={markerClickHandler}
              setFocusedEvent={setFocusedEvent}
              focusedEvent={focusedEvent}
            />
          ))}
      </Map>
    </>
  );
}

export default EventMap;
