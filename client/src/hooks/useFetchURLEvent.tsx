import { useEffect, useState } from 'react';
import { axiosGetResponse, eventUser, fetchEvent, user } from '../types';
import axios from 'axios';
import { useParams } from 'react-router';

// type useFetchEvent = () => {};

const useFetchURLEvent = () => {
  const { eventUuid } = useParams();
  const [event, setEvent] = useState<fetchEvent | null>(null);
  const [error, setError] = useState<any>(null);
  const [organizer, setOrganizer] = useState<eventUser | null>(null);
  console.log(event);
  useEffect(() => {
    async function fetchEventData() {
      try {
        let response: axiosGetResponse<fetchEvent> = await axios.get(
          `${process.env.REACT_APP_REST_API}/events/${eventUuid}`
        );
        const eventData = response.data;
        console.log(eventData);
        setEvent(eventData);
        // set organizer
        if (eventData === null) {
          return;
        }
        eventData.volunteers.forEach(user => {
          if (user.role === 'Organizer') {
            setOrganizer(user);
          }
        });
      } catch (e) {
        setError(e);
        console.error(e);
      }
    }
    fetchEventData();
  }, [eventUuid]);
  return { event, organizer, error };
};
export default useFetchURLEvent;
