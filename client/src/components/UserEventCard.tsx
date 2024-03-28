import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

type props = {
  name: string;
  profilePic: string;
  role: string;
};
function UserEventCard({ name, profilePic, role }: props) {
  return (
    <>
      <Grid container>
        <Grid item>
          <Card
            sx={{
              height: '180px',
              width: '140px',
              marginBottom: '20rem',
            }}
            elevation={2}>
            <Avatar
              src={profilePic}
              style={{
                width: '60px',
                height: '60px',
                marginTop: '1.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}></Avatar>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                {role}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default UserEventCard;
