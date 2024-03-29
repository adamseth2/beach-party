import { useFeedback } from '../context/FeedbackContext';
import { Alert, AlertTitle } from '@mui/material';

function StatusPopUp() {
  const { status, statusMessage, setStatusMessage } = useFeedback();

  return (
    <>
      {statusMessage && (
        <Alert
          variant='filled'
          severity={status}
          style={{
            zIndex: '9000',
            position: 'fixed',
            right: '1rem',
            bottom: '1rem',
            width: '300px',
          }}
          onClose={() => {
            setStatusMessage(null);
          }}>
          <AlertTitle>{statusMessage}</AlertTitle>
        </Alert>
      )}
    </>
  );
}

export default StatusPopUp;
