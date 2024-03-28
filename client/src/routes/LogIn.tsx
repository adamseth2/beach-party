import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
type Props = {};

function LogIn({}: Props) {
  const { user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate('/homepage');
    }
  }, [user]);

  return (
    <>
      <div>LogIn</div>
      <GoogleButton onClick={handleGoogleSignIn} />
    </>
  );
}

export default LogIn;
