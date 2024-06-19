import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import { AccessTimeOutlined, LocationOnOutlined } from '@mui/icons-material';
import { convertUnixFormatTime } from '../helperMethods';
import { fetchEvent } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  event: fetchEvent;
};

const EventCard = ({ event }: Props) => {
  const { title, startDate, endDate, details, image, location, uuid } = event;
  console.log(event);
  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: '1rem 0',
        '& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1gcg9uy-MuiPaper-root-MuiCard-root':
          {
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
          },
      }}>
      <CardMedia
        sx={{
          height: 200,
        }}
        image={image}
        title='Hello'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>

        <List>
          <ListItem sx={{ padding: 0 }}>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                style: { whiteSpace: 'normal' },
              }}
              primary={`${convertUnixFormatTime(
                startDate
              )} to ${convertUnixFormatTime(endDate)}`}
            />
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={location.mainName}
              secondary={location.secondaryName}
            />
          </ListItem>
          <Typography variant='body1' style={{ fontWeight: 'bold' }}>
            Details
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {details.substring(0, 200)}...
          </Typography>
        </List>
      </CardContent>
      <CardActions>
        <Link to={`/event/${uuid}`}>
          <Button size='small'>More information</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventCard;
