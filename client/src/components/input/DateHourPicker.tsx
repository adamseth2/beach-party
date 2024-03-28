import { Grid } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import React from 'react';

type props = {
  dateLabel: string;
  dateId: string;
  dateHelperText?: string;
  hourLabel: string;
  hourId: string;
  hourHelperText?: string;
  formHandler: (id: string, value: any) => void;
};
function DateHourPicker({
  dateLabel,
  dateId,
  dateHelperText,
  hourLabel,
  hourId,
  hourHelperText,
  formHandler,
}: props) {
  const dateObjectToKeyValueHandler = (id: string, obj: any) => {
    let time = 0;
    //converts time
    if (id === hourId) {
      let second = obj.$d.getHours() * 3600 + obj.$d.getMinutes() * 60;
      let millisecond = second * 1000;
      time = millisecond;
    } else {
      time = obj.$d.getTime();
    }
    console.log(id, time);
    formHandler(id, time);
  };
  return (
    <>
      <Grid item xs={12} md={4}>
        <DatePicker
          label={dateLabel}
          onChange={(value: any) => dateObjectToKeyValueHandler(dateId, value)}
          slotProps={{
            textField: {
              id: dateId,
              helperText: dateHelperText,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TimePicker
          label={hourLabel}
          onChange={(value: any) => dateObjectToKeyValueHandler(hourId, value)}
          slotProps={{
            textField: {
              id: hourId,
              helperText: hourHelperText,
            },
          }}></TimePicker>
      </Grid>
    </>
  );
}

export default DateHourPicker;
