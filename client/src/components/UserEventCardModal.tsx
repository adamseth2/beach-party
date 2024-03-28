import { Grid } from '@mui/material';
import UserEventCard from './UserEventCard';
import { eventUser } from '../types';

type Props = { organizer: eventUser; volunteers: eventUser[] };
function UserEventCardModal({ organizer, volunteers }: Props) {
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <UserEventCard
            name={organizer.name}
            profilePic={organizer.profilePic}
            role={organizer.role}
          />
        </Grid>
        {volunteers.map((user, i) => {
          if (user.uuid !== organizer.uuid) {
            return (
              <Grid item xs={3} key={i}>
                <UserEventCard
                  name={user.name}
                  profilePic={user.profilePic}
                  role={user.role}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
}

export default UserEventCardModal;
