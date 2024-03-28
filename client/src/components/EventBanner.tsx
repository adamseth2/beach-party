import React from 'react';
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';

type props = {
  title: string;
  name: string;
  profilePic: string;
};
function EventBanner({ title, name, profilePic }: props) {
  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: '1.5rem 0 1.5rem 10vw',
          marginBottom: '3rem',
        }}
        // lg={{ padding: '1.5rem 3', paddingLeft: '20vw' }}
      >
        <Typography
          variant='h3'
          style={{
            marginBottom: '2rem',
          }}>
          {title}
        </Typography>
        <Grid container>
          <Avatar src={profilePic} style={{ marginRight: '1rem' }} />
          <Grid container xs={6}>
            <Grid item xs={12}>
              <Typography variant='body1'>Organized By</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default EventBanner;
