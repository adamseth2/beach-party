--@block
CREATE TABLE Location(
  id INT PRIMARY KEY AUTO_INCREMENT,
  mainName VARCHAR(255) NOT NULL,
  secondaryName VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  placeId VARCHAR(255) NOT NULL
);
--@block
ALTER TABLE Location ADD UNIQUE (placeId) 

--@block
INSERT INTO Event (title, startDate, endDate, details, image, dateCreated, uuid, location) VALUES  ('bob', 1702454400000, 1702972800000, 'description', 'https://firebasestorage.googleapis.com/v0/b/beach-party-cleanup.appspot.com/o/c6c1482f-10ac?alt=media&token=4bd90a6d-abda-4a43-b721-54d7f5671c34', 1703779452756, 'c6c1482f-10ac', 1)