-- @block
CREATE TABLE Event(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  startDate BIGINT(13) NOT NULL, -- 13 = 1700294400000
  endDate BIGINT(13) NOT NULL,
  location VARCHAR(255) NOT NULL,
  details TEXT NOT NULL,
  organizer INT,
  image INT,
  dateCreated BIGINT(13) NOT NULL,
  uuid VARCHAR(13) NOT NULL
);


--@block
ALTER TABLE Event
DROP CONSTRAINT event_ibfk_1;
-- @block
ALTER TABLE Event ADD FOREIGN KEY(location) REFERENCES Location(id);
--@block
ALTER TABLE Event MODIFY location INT NOT NULL;

-- SELECT id FROM User WHERE uuid = 'KKknzJ0qExUapAwDFk6XLAt6R0q1';
-- ALTER TABLE UserEventAttend MODIFY role varchar(255) NOT NULL;
-- UPDATE UserEventAttend SET role = 'Organizer' WHERE userId =1;
-- ALTER TABLE Event DROP COLUMN organizer;
-- ALTER TABLE Event MODIFY FOREIGN KEY (organizer) REFERENCES  User(id); 
-- MODIFY organizer INT NOT NULL;

-- ALTER TABLE Event MODIFY id INT PRIMARY KEY;
ALTER TABLE Event MODIFY title VARCHAR(50) NOT NULL;
ALTER TABLE Event MODIFY startDate BIGINT(13) NOT NULL;
ALTER TABLE Event MODIFY endDate BIGINT(13) NOT NULL;
ALTER TABLE Event MODIFY location VARCHAR(255) NOT NULL;
ALTER TABLE Event MODIFY details TEXT NOT NULL;
-- ALTER TABLE Event MODIFY organizer INT
-- ALTER TABLE Event MODIFY volunteers INT
ALTER TABLE Event MODIFY image VARCHAR(2083) NOT NULL;
ALTER TABLE Event MODIFY dateCreated BIGINT(13) NOT NULL;
ALTER TABLE Event MODIFY location VARCHAR(255) NOT NULL;
ALTER TABLE Event MODIFY uuid VARCHAR(13) NOT NULL;

-- @block
-- A
-- ALTER TABLE Event MODIFY image VARCHAR(2083) NOT NULL;
-- ALTER TABLE Event RENAME COLUMN images TO image;
-- ALTER TABLE Event MODIFY endDate BIGINT(13) UNSIGNED;
-- ALTER TABLE Event MODIFY dateCreated BIGINT(13) UNSIGNED;
-- ALTER TABLE Event MODIFY startDate BIGINT(13) UNSIGNED;

-- @block
DELETE FROM location;
-- @block 
TRUNCATE TABLE Event;
--@block
SELECT * FROM event;

--@block
SHOW CREATE TABLE Event;
--@block
SELECT uuid FROM event Where title ='Bellevue Cleanup';

--@block
INSERT INTO Event (id, title, startDate, endDate, location, details,dateCreated)
VALUES
  ('' 'DUMB DATA','999','9999','Bellevue?','DUMB DATA','999999');

--@block
INSERT INTO Event (title, startDate, endDate, location, details, image, dateCreated, uuid) VALUES 
('Bellevue Cleanup', 1700121600000, 1698908400000, 'Bellevue Library, 110th Avenue Northeast, Bellevue, WA, USA', 'Pizza',"https:wtf",1700608345075, 'a932e1ae-9858');


--@block
CREATE TABLE User(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  profilePic varchar(2083)  NOT NULL,
  uuid varchar(28) NOT NULL
);

--@block
CREATE TABLE UserEventAttend(
  userId INT NOT NULL,
  eventId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES  User(id), 
  FOREIGN KEY (eventId) REFERENCES Event(id),
  UNIQUE(userId, eventId)
)


INSERT INTO usereventattend (userId, userId, eventId, eventId, role)
VALUES (
    userId:int,
    userId:int,
    eventId:int,
    eventId:int,
    'role:varchar'
  );
  --@block
SELECT * FROM User;

--@block
SELECT id FROM User WHERE uuid = 'KKknzJ0qExUapAwDFk6XLAt6R0q1'

--@block
INSERT INTO Event (title, startDate, endDate, location, details, organizer, image, dateCreated, uuid) VALUES ('bob','33333','3333333','Bellevue Park', 'amazing event', 1,'https:something',3333,'222222');

--@block
SELECT title, startDate, endDate, location, details, organizer, image, dateCreated  FROM Event WHERE uuid = 'a932e1ae-9858';

-- GET EVENT HISTORY GIVEN USER
--@block
SELECT e.uuid, title
      FROM UserEventAttend UEA 
INNER JOIN Event e ON e.id = UEA.eventId
     WHERE UEA.userId = 1;

-- GET VOLENTEERS 
--@block
SELECT name, profilePic, u.uuid, role
      FROM UserEventAttend UEA 
INNER JOIN User u ON u.id = UEA.userId
     WHERE UEA.eventId = 30;


--@block
SELECT id AS userId
FROM User 
WHERE uuid = 'Vj18CVSDwzZSs9WDK6xzKtwK8fH2'
UNION
SELECT id AS eventId FROM event WHERE uuid ='89ce526b-599f';

--@block
`SELECT id AS userId
  FROM User 
  WHERE uuid = '?'
  UNION
  SELECT id AS eventId FROM event WHERE uuid ='?'`

--@block
-- bob
--adadad

--      SELECT c.class_id, name
--       FROM student_classes sc 
-- INNER JOIN classes c ON c.class_id = sc.class_id
--      WHERE sc.student_id = 1

--@reset everything
--@block
DELETE FROM UserEventAttend;
DELETE FROM User;
DELETE FROM Event;

--@block
SELECT E.id, E.title, E.startDate, E.endDate, E.details, E.image, E.dateCreated, JSON_OBJECT('mainName',mainName, secondaryName,'secondaryName') AS location, u.name
  FROM Event E
  INNER JOIN Location Lc
  ON E.location = Lc.id 
  INNER JOIN UserEventAttend UEA
  On UEA.eventId = E.id
  INNER JOIN User U
  ON U.id = UEA.userId   
  -- WHERE E.uuid = 'c95c7d60-42d0'
  -- SELECT name, profilePic, u.uuid, role
  --             FROM UserEventAttend UEA
  --             INNER JOIN User u ON u.id = UEA.userId
  --             WHERE UEA.eventId = ?`

--@block
INSERT INTO UserEventAttend (userId, eventId, role) VALUES (6,56, 'Volunteer')

--@block
SELECT Event.id, Event.uuid, title, startDate, endDate, location, details, image, dateCreated, JSON_OBJECT('mainName', mainName,'secondaryName', secondaryName,'latitude', latitude,'longitude', longitude,'placeId', placeId) AS location
FROM Event
INNER JOIN Location ON Event.location = location.id