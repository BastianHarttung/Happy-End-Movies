import { initializeApp } from 'firebase/app';
//TODO import {getAuth} from 'firebaseConfig/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig =  {
    apiKey: "AIzaSyAG2VpZ6y1jGxHFZk4D7inR4w5nRZTqwaM",
    authDomain: "happy-end-movies.firebaseapp.com",
    projectId: "happy-end-movies",
    storageBucket: "happy-end-movies.appspot.com",
    messagingSenderId: "287921343316",
    appId: "1:287921343316:web:b4628ca83cb409f25956c1",
    measurementId: "G-FVMGM5YMJM"
};

const app = initializeApp(firebaseConfig)

const firestoreDb = getFirestore(app)

//TODO const auth = getAuth(firebaseApp);

export default firestoreDb
