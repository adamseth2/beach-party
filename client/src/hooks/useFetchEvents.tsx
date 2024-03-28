import { useEffect, useState } from 'react';
import { axiosGetResponse, eventUser, fetchEvent, user } from '../types';
import axios from 'axios';
import { useParams } from 'react-router';

// type useFetchEvent = () => {};

const useFetchEvents = () => {
  const { eventUuid } = useParams();
  const [eventArr, setEventArr] = useState<fetchEvent[] | null>(null);
  const [organizerArr, setOrganizerArr] = useState<eventUser[] | null>(null);

  console.log(eventArr);
  useEffect(() => {
    async function fetchEventData() {
      try {
        let response: axiosGetResponse<fetchEvent[]> = await axios.get(
          `http://localhost:8800/events`
        );
        const eventData = response.data;
        console.log(eventData);
        setEventArr(eventData);
        // set organizer
        if (eventData === null) {
          return;
        }
        const organizerArr: eventUser[] = [];
        eventData.forEach(event =>
          event.volunteers.forEach(user => {
            if (user.role === 'Organizer') {
              organizerArr.push(user);
            }
          })
        );
        setOrganizerArr(organizerArr);
      } catch (e) {
        console.error(e);
      }
    }
    fetchEventData();
  }, [eventUuid]);
  return { eventArr, organizerArr };
};
export default useFetchEvents;
