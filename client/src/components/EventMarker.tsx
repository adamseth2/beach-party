import React, { useRef, useState } from 'react';
import { fetchEvent } from '../types';
import { MarkerF } from '@react-google-maps/api';
import selectedTrashBag from '../assets/trash-pile-50.png';
import eventIcon from '../assets/eventIcon.svg';
import selectedEventIcon from '../assets/selectedEventIcon.svg';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Card } from '@mui/material';
type props = {
  data: fetchEvent;
  index: number;
  markerClickHandler: (index: number) => void;
  setFocusedEvent: React.Dispatch<React.SetStateAction<number | null>>;
  focusedEvent: number | null;
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
}: props) {
  const markerRef = useRef(AdvancedMarker);
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const position: GeoPosition = {
    lat: data.location.latitude,
    lng: data.location.longitude,
  };
  const isSelected = focusedEvent == index;
  const imgSrc = isSelected ? selectedEventIcon : eventIcon;
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
        onClick={() => {
          setFocusedEvent(index);
          setCounter(curr => curr + 1);
          console.log(counter);
        }}>
        {/* <Card>
          {'Test Test Things '}
          {counter} */}

        <img src={imgSrc} alt='' style={{ width: '60px', height: '60px' }} />
        {/* </Card> */}

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

    // {isClicked ?
    //   <MarkerF
    //   key={data.uuid}
    //   position={position}
    //   icon={selectedTrashBag}
    //   />
    // : (
    //   <img
    //     src="https://img.icons8.com/ios-filled/40/null/trash-pile.png'"
    //     alt=''
    //   />
    // )}
  );
}

export default EventMarker;
