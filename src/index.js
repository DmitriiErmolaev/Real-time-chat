import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createTheme } from '@mui/material/styles';

import App from './App';



const firebaseConfig = {
  apiKey: "AIzaSyCgDNO7bHcaWdPhQFfpbyUEFcCpee_PH00",
  authDomain: "test-auth-1e2df.firebaseapp.com",
  projectId: "test-auth-1e2df",
  storageBucket: "test-auth-1e2df.appspot.com",
  messagingSenderId: "930139518180",
  appId: "1:930139518180:web:365b3e5394be58ae3d28f1",
  measurementId: "G-S28HSBYYXR"
};

export const Context = createContext(null)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{auth, firestore}}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);