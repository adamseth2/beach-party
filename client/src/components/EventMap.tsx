import React, { useEffect, useRef, useState } from 'react';
import { event, fetchEvent } from '../types';
import EventMarker from './EventMarker';
import test from '../assets/Picture1.png';
import { Map, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer, type Marker } from '@googlemaps/markerclusterer';

type Props = {
  eventArr: fetchEvent[] | null;
  focusedEvent: number | null;
  setFocusedEvent: React.Dispatch<React.SetStateAction<number | null>>;
};
type GeoPosition = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

// let height = 'calc(100vh - 4rem)';
const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 4rem)',
  minHeight: '300px',
};
const options: MapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
};

// prevents google maps from downloading roboto font causing my fonts to become bold
//https://stackoverflow.com/questions/25523806/google-maps-v3-prevent-api-from-loading-roboto-font/35993046#35993046
const head = document.head;
const insertBefore = head.insertBefore;
head.insertBefore = <T extends Node>(
  newElement: T,
  referenceElement: Node
): T => {
  if (
    newElement instanceof Element &&
    newElement?.hasAttribute('href') &&
    newElement?.getAttribute('href')?.includes('fonts.googleapis')
  ) {
    return newElement;
  }

  insertBefore.call(head, newElement, referenceElement);
  return newElement;
};

function EventMap({ eventArr, focusedEvent, setFocusedEvent }: Props) {
  const map = useMap();
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [markers, setMarkers] = useState<{ [key: number]: Marker }>({});
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 47.7511,
    lng: -120.7401,
  });
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);
  useEffect(() => {
    console.log(Date.now());
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);
  function setMarkerRef(marker: Marker | null, key: number) {
    if (marker && markers[key]) {
      return;
    }
    if (!marker && !markers[key]) {
      return;
    }
    setMarkers(prev => {
      if (marker) {
        return { ...prev, [key]: marker };
      }
      const newMarkers = { ...prev };
      delete newMarkers[key];
      return newMarkers;
    });
  }
  console.log(markers);
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
              setMarkerRef={setMarkerRef}
              setCenter={setCenter}
            />
          ))}
      </Map>
    </>
  );
}

export default EventMap;
