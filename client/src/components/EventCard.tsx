import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

type Props = {
  userImage: string;
  title: string;
  description: string;
  date: string;
  address: string;
};

const EventCard = (props: Props) => {
  return (
    <Card
      sx={{
        maxWidth: 500,
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
        image={props.userImage}
        title='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>View Event</Button>
        <Button size='small'>RSVP</Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
