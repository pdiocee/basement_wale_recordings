import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAEg7iszXTMnZ_ZM883x3oYkoWRtqMyggw",
    authDomain: "basement-wale-recordings.firebaseapp.com",
    projectId: "basement-wale-recordings",
    storageBucket: "basement-wale-recordings.appspot.com",
    messagingSenderId: "822126144566",
    appId: "1:822126144566:web:7d9dc76d6bdcf41ca0fc97",
    measurementId: "G-EB8XRC5SRH"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, db, storage };