import mysql from 'mysql2';

const db = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'Seth12',
    database: 'beach_cleanup',
  })
  .promise();

export async function getLocation(id) {
  const locationQ =
    'Select mainName, secondaryName, latitude, longitude, placeId FROM location WHERE id = ?';
  const [row] = await db.query(locationQ, id);
  const location = row[0];
  return location;
}

export async function getAllEvents() {
  const eventArr = await getEventHelper();
  console.log(eventArr);
  await Promise.all(
    eventArr.map(async curr => {
      console.log(curr.id);
      curr.volunteers = await getVolunteers(curr.id);
      //returning event so deleting ID so the user does not have access
      delete curr.id;
    })
  );

  return eventArr;
}
export async function getEvent(uuid) {
  let event = await getEventHelper(uuid);
  if (!event) {
    return null;
  }
  const currEvent = event[0];
  currEvent.volunteers = await getVolunteers(currEvent.id);
  //returning event so deleting ID so the user does not have access
  delete currEvent.id;
  return currEvent;
}

async function getEventHelper(uuid) {
  let locationQ = getEventQuery(uuid);
  let events;
  //find one event
  console.log(locationQ);
  if (uuid) {
    const [row] = await db.query(locationQ, uuid);
    events = row;
    //find all events
  } else {
    const [rows] = await db.query(locationQ);
    events = rows;
  }
  // events.forEach(curr => {
  //   curr.location = curr[locationJSONQ];
  //   delete curr[locationJSONQ];
  // });
  console.log(events[0]);
  return events;

  // const eventIdQ = `SELECT id, title, startDate, endDate, location, details, image, dateCreated FROM Event WHERE uuid = ?`;
  const event = row[0];
  event.location = event[locationJSONQ];
  delete event[locationJSONQ];
  const eventId = event.id;
  //returning event so deleting ID so the user does not have access
  delete event.id;

  event.volunteers = getVolunteers(event);
  // const eventLocationId = event.location;

  //replaces locationId with json of info instead
  // event.location = await getLocation(eventLocationId);
  return event;
}
function getEventQuery(uuid) {
  const locationKeys = [
    'mainName',
    'secondaryName',
    'latitude',
    'longitude',
    'placeId',
  ];
  const locationJSONQ = JSONQuery(locationKeys);

  if (uuid) {
    return `SELECT Event.id, title, startDate, endDate, location, details, image, dateCreated, ${locationJSONQ} AS location
    FROM Event
    INNER JOIN Location ON Event.location = location.id
    WHERE uuid = ?`;
  }
  // also returns Event.uuid
  return `SELECT Event.id, Event.uuid, title, startDate, endDate, location, details, image, dateCreated, ${locationJSONQ} AS location
  FROM Event
  INNER JOIN Location ON Event.location = location.id`;
}
async function getVolunteers(eventId) {
  const volunteersQ = `SELECT name, profilePic, u.uuid, role
  FROM UserEventAttend UEA
  INNER JOIN User u ON u.id = UEA.userId
  WHERE UEA.eventId = ?`;
  const [volunteers] = await db.query(volunteersQ, eventId);
  // event.volunteers = volunteers;
  return volunteers;
}
export async function getUserId(uuid) {
  const q = `SELECT id FROM User WHERE uuid = ?`;
  const [rows] = await db.query(q, uuid);
  const id = rows[0].id;
  return id;
}
export async function addEvent(eventValues, locationValues, organizerUuid) {
  const role = 'Organizer';
  const q =
    'INSERT INTO Event (title, startDate, endDate, details, image, dateCreated, uuid, location) VALUES (?)';

  const organizerId = await getUserId(organizerUuid);
  const locationId = await addLocation(locationValues);
  eventValues.push(locationId);
  console.log(eventValues);
  const [{ insertId: eventId }] = await db.query(q, [eventValues]);
  await addUserToEventId(organizerId, eventId, role);
}
export async function addLocation(locationValues) {
  console.log(locationValues);
  const q = `INSERT IGNORE INTO Location(mainName, secondaryName, latitude, longitude, placeId) VALUES (?)
  ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`;
  const [result] = await db.query(q, [locationValues]);
  console.log('insertId: ', result.insertId);
  //returns location generated id
  return result.insertId;
}
export async function addUserToEventId(userId, eventId, role) {
  const q = 'INSERT INTO UserEventAttend (userId, eventId, role) VALUES (?)';
  const values = [userId, eventId, role];
  await db.query(q, [values]);
}

export async function addUser(values) {
  const q = 'INSERT INTO User (name, profilePic, uuid) VALUES (?)';
  await db.query(q, [values]);
}
export async function getUser(uuid) {
  const q = `SELECT name, profilePic, uuid FROM user WHERE uuid = ?`;
  const [user] = await db.query(q, uuid);
  return user[0];
}
export async function addUserToEventUuid(userUuid, eventUuid, role) {
  const rows = await getUserEventId(userUuid, eventUuid);
  console.log(rows[0]);
  const userId = rows[0].id;
  const eventId = rows[1].id;
  await addUserToEventId(userId, eventId, role);
}
export async function getUserEventId(userUuid, eventUuid) {
  const values = [userUuid, eventUuid];
  const q = `SELECT id
  FROM User 
  WHERE uuid = ?
  UNION
  SELECT id AS eventId FROM event WHERE uuid =?`;
  const [rows] = await db.query(q, values);
  return rows;
}
//helper methods
function JSONQuery(keys) {
  console.log(keys);
  if (!keys) {
    return;
  }
  let query = `JSON_OBJECT('${keys[0]}', ${keys[0]}`;
  for (let i = 1; i < keys.length; i++) {
    query += `,'${keys[i]}', ${keys[i]}`;
  }
  query += ')';
  console.log(query);
  return query;
}
