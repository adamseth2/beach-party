--@block
SELECT E.id, title, startDate, endDate, location, details, uuid, image, dateCreated
FROM Event E
  INNER JOIN Location L ON E.location = L.id
  INNER JOIN UserEventAttend UEA ON UEA.eventId = E.id
WHERE UEA.userId = 5

--@block
SELECT
INNER JOIN UserEventAttend UEA ON UEA.eventId = E.id
--@block
SELECT * From User