import React, { useEffect, useRef, useState } from 'react';
import { fetchEvent } from '../types';
// import { MarkerClusterer, MarkerF } from '@react-google-maps/api';
import selectedTrashBag from '../assets/trash-pile-50.png';
import eventIcon from '../assets/eventIcon.svg';
import type { Marker } from '@googlemaps/markerclusterer';
import selectedEventIcon from '../assets/selectedEventIcon.svg';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { Card } from '@mui/material';
type props = {
  data: fetchEvent;
  index: number;
  markerClickHandler: (index: number) => void;
  setFocusedEvent: React.Dispatch<React.SetStateAction<number | null>>;
  focusedEvent: number | null;
  setMarkerRef: (marker: Marker | null, key: number) => void;
  setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
};
type GeoPosition = google.maps.LatLngLiteral;

const iconStyle = {
  cursor: 'pointer',
};
function EventMarker({
  data,
  index,
  markerClickHandler,
  setFocusedEvent,
  focusedEvent,
  setMarkerRef,
  setCenter,
}: props) {
  // const markerRef = useRef(AdvancedMarker);
  const map = useMap();
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const position: GeoPosition = {
    lat: data.location.latitude,
    lng: data.location.longitude,
  };
  const isSelected = focusedEvent === index;
  const imgSrc = isSelected ? selectedEventIcon : eventIcon;
  console.log(data);
  console.log(focusedEvent);
  //@ts-ignore
  // markerRef.current?.addListener('click', () => {
  //   console.log(`index ${index} was clicked`);
  // });
  return (
    <>
      {/* {isClicked ? ( */}
      <AdvancedMarker
        position={position}
        style={{ cursor: 'hover' }}
        // icon='https://img.icons8.com/ios-filled/40/null/trash-pile.png'
        ref={marker => setMarkerRef(marker, index)}
        onClick={() => {
          //fixed click same marker twice bug
          if (focusedEvent === index) {
            return;
          }
          //changes center to be align base on screensize
          if (map) {
            const div = map.getDiv();
            map.panTo(position);
            const mdBreakingPoint = 800;
            if (div.offsetWidth <= mdBreakingPoint) {
              map.panBy(-(div.offsetWidth / 4), 0);
            }
          }
          setFocusedEvent(index);
          setCounter(curr => curr + 1);
          console.log(counter);
        }}>
        <img src={imgSrc} alt='' style={{ width: '60px', height: '60px' }} />

        {/* <img
          src={
            isClicked
              ? selectedTrashBag
              : 'https://img.icons8.com/ios-filled/40/null/trash-pile.png'
          }
          style={iconStyle}
          alt=''
          onClick={() => setIsClicked(true)}
        /> */}
      </AdvancedMarker>
      {/* ) : (
        <AdvancedMarker
          position={position}
          icon={selectedTrashBag}
          onClick={() => {
            setIsClicked(true);
            markerClickHandler(index);
          }}
        />
      )} */}
    </>
  );
}

export default EventMarker;
