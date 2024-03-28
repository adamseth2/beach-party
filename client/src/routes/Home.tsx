import React, { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  collectionGroup,
  where,
  query,
  FieldPath,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import EventCard from '../components/EventCard';

//get the user's events equal to today's date or later
const userRef = doc(db, 'users/insertEmail---change');
const attendeeQuery = query(
  collectionGroup(db, 'attendees'),
  where('userRef', '==', userRef)
);

const today = new Date();
const eventQuery = query(collection(db, 'events'), where('date', '>=', today));

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {}, []);

  const getEvents = async () => {
    const snapshot = await getDocs(eventQuery);
    const eventData = snapshot.docs.map(doc => doc.data());
    setData(eventData);
  };
  return (
    <div className='upcomingEvents'>
      {/* have to list out user's upcoming events
      - use the map to render the event card objects
      - have to figure out which events are upcoming for user
          - get the list using a query
          - convert to an array so can pass to a event card component
      */}
      <p>Hello!</p>
      <EventCard
        userImage='https://media.istockphoto.com/id/1442179368/photo/maldives-island.jpg?b=1&s=170667a&w=0&k=20&c=i8wK-BoIq_B365rf0oMRBNmuMc4U1zlTUllMuyr_QNw='
        title='Beach fun!!'
        description='join us for a day of fun on the beach.'
        date='02/03/2023'
        address='Coast Beach, Seattle, WA'
      />
    </div>
  );
};

export default Home;
