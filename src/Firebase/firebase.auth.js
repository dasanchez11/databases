import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { fireabseApp } from "./firebase.config";
import {getDoc,doc} from 'firebase/firestore'
import {db} from './firebase.config'

export const auth = getAuth(fireabseApp);


export const signUpUserFirebase = (userEmail, userPassword) => createUserWithEmailAndPassword(auth, userEmail, userPassword)
export const signInUserFirebase = (userEmail, userPassword) => signInWithEmailAndPassword(auth, userEmail, userPassword)
export const signOutUserFirebase = () => signOut(auth)
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)
export const getCurrentUser = async(uid) => {
    const userDocRef = doc(db, 'users', uid)
    const user = await getDoc(userDocRef)
    if(!user.exists()){
        return null
    }
    const clientInfo = user.data()
    return clientInfo
}