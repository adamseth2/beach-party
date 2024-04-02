import { useState, useEffect, useContext, createContext } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { user, userAuth } from '../types';
import axios from 'axios';
const AuthContext = createContext<any>(undefined);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<userAuth | null>(null);
  console.log(user);
  const createNewUser = async (userData: user) => {
    try {
      console.log('GOT POSTED??');
      await axios.post('http://localhost:8800/users', userData);
      console.log('GOT POSTED');
    } catch (err) {
      console.log(err);
    }
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result: any) => {
      console.log('googleSIgn ');
      let user = result.user;
      let { displayName, photoURL, uid } = user;
      const userData: user = {
        name: displayName as string,
        profilePic: photoURL as string,
        uuid: uid as string,
      };
      console.log(result);
      let isNewUser =
        user.metadata.creationTime === user.metadata.lastSignInTime;
      if (isNewUser) {
        createNewUser(userData);
      }
    });
  };
  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser as userAuth);
      console.log('User', currentUser);
    });
    return () => {
      unsubscribe();
    };
  });
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
