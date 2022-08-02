import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyALi6tubKp2TfEnmM8xRRpkcT6LDI33J2Q",
    authDomain: "logistics-947af.firebaseapp.com",
    projectId: "logistics-947af",
    storageBucket: "logistics-947af.appspot.com",
    messagingSenderId: "344783371531",
    appId: "1:344783371531:web:4e5656427f4a59d30d760e",
    measurementId: "G-RECZVEKG3S"
};

export const fireabseApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireabseApp);


