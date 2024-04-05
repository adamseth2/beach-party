import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  addUserToEventUuid,
  addEvent,
  addUser,
  getAllEvents,
  getEvent,
  getUser,
  getUserEvents,
} from './database.js';
const app = express();

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Seth12',
//   database: 'beach_cleanup',
// });

// app.use(express.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json('hello');
});

app.get('/events', async (req, res) => {
  try {
    const events = await getAllEvents();
    console.log('passed here');
    res.send(events);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
  // const q = 'SELECT * FROM event';
  // db.query(q, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return res.json(err);
  //   }
  //   return res.json(data);
  // });
});
// //create new event
app.post('/events', async (req, res) => {
  // console.log(req);
  try {
    const eventValues = [
      req.body.eventData.title,
      req.body.eventData.startDate,
      req.body.eventData.endDate,
      req.body.eventData.details,
      req.body.eventData.image,
      req.body.eventData.dateCreated,
      req.body.eventData.uuid,
    ];
    const organizerUuid = req.body.eventData.organizer;
    const locationValues = [
      req.body.locationData.mainName,
      req.body.locationData.secondaryName,
      req.body.locationData.latitude,
      req.body.locationData.longitude,
      req.body.locationData.placeId,
    ];
    await addEvent(eventValues, locationValues, organizerUuid);
    res.status(200).send('event successfully created');
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/events/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const event = await getEvent(uuid);
    res.json(event);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
app.get('/events/user/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const event = await getUserEvents(uuid);
    res.json(event);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
app.post('/users', (req, res) => {
  try {
    const values = [req.body.name, req.body.profilePic, req.body.uuid];
    addUser(values);
    res.status(200).send('user successfully created');
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user = await getUser(uuid);
    res.json(user);
    res.status(200);
  } catch (e) {
    res.status(400).send(e);
  }
});
//   const q = `SELECT name, profilePic, uuid FROM user WHERE uuid = ?`;
//   db.query(q, uuid, (err, data) => {
//     if (err) {
//       return res.json(err);
//     }
//     return res.json(data);
//   });
//   // console.log(req.params.id);
//   // const q =
// });
// // app.get('/', (req, res) => {
// //   res.json('This is backend');

app.post('/event/rsvp', async (req, res) => {
  // console.log(req);
  try {
    const userUuid = req.body.userUuid;
    const eventUuid = req.body.eventUuid;
    const role = req.body.role;
    await addUserToEventUuid(userUuid, eventUuid, role);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.listen(8800, () => {
  console.log('Connected to backend');
});
