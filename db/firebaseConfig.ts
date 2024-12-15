import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

 import {getFirestore} from "firebase/firestore";
 import {getAuth} from "firebase/auth";
 import {getStorage} from "firebase/storage";

 

//Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER,
  appId: process.env.APP_ID,
  measurementId: process.env.MESSUREMENTID
  };

  export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const myAuth = () => getAuth(app);
  const myStorage = () => getStorage(app);
  const myDb = () => getFirestore(app);
  
  export const auth = myAuth();
  export const storage = myStorage();
  export const db = myDb();