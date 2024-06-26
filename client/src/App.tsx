import React, { useState } from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { initializeApp } from 'firebase/app';
import './css/Global.css';

import Navbar from './components/Navbar';
import FindEvent from './routes/FindEvent';
import Home from './routes/Home';
import { AuthContextProvider } from './context/AuthContext';
import LogIn from './routes/LogIn';
import { CreateEvent } from './routes/CreateEvent';
import EventPage from './routes/EventPage';
import { FeedBackContextProvider } from './context/FeedbackContext';
import { LoadScript } from '@react-google-maps/api';
import { APIProvider } from '@vis.gl/react-google-maps';
import StatusPopUp from './components/StatusPopUp';
import { userAuth } from './types';
import HomePage from './routes/HomePage';

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    accent: string;
    // text: Palette['primary'],
    // background: Palette['primary'];
    // white: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: string;
    // text?: PaletteOptions['primary'];
    // background?: PaletteOptions['primary'];
    // white?: PaletteOptions['primary'];
  }

  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Lora',
    },
    h2: {
      fontFamily: 'Lora',
      // fontFamily: 'Merriweather',
      // fontWeight: 500,
    },
    h3: {
      fontFamily: 'Lora',
    },
    h4: {
      fontFamily: 'Lora',
    },
    h5: {
      fontFamily: 'Lora',
      weight: 'bold',
    },
  },
  palette: {
    primary: {
      main: '#65A48B',
      contrastText: '#fff',
    },
    secondary: {
      main: '#A4657E',
    },
    accent: '#FF5964',
  },
});
function NavbarWrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
const router = createHashRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home/',
        element: <Home />,
      },
      {
        path: '/find-event/',
        element: <FindEvent />,
      },
      {
        path: '/event/:eventUuid/',
        element: <EventPage />,
      },
      {
        path: '/log-in/',
        element: <LogIn />,
      },
      {
        path: '/create-event/',
        element: <CreateEvent />,
      },
      {
        path: '/profile/:profileId/',
        element: <div>Profile</div>,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState<userAuth | null>(null);

  return (
    <>
      <AuthContextProvider>
        <FeedBackContextProvider>
          <ThemeProvider theme={theme}>
            {/* <Navbar /> */}
            <StatusPopUp />
            {/* @ts-ignore */}
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
              <RouterProvider router={router} />
            </APIProvider>
          </ThemeProvider>
        </FeedBackContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
