import { db } from "./firebase.config";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { signInUserFirebase, signUpUserFirebase } from "./firebase.auth";

export const createUserDocumentFromAuth = async (credentials) => {
  const { clientName, clientNit, clientEmail, clientPassword } = credentials;
  try {
    const userAuth = await signUpUserFirebase(clientEmail, clientPassword);
    const userDocRef = doc(db, "users", userAuth.user.uid);
    const user = await getDoc(userDocRef);
    if (user.exists()) {
      throw new Error("User Already exist");
    } else {
      const clientOrders = [];
      const userData = {
        clientName,
        clientEmail,
        clientNit,
        clientOrders,
        _id: userAuth.user.uid,
        clientRole: "user",
      };
      await setDoc(userDocRef, userData);
      const clientInfo = userData;
      return clientInfo;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUserFromAuth = async (credentials) => {
  const { clientEmail, clientPassword } = credentials;
  try {
    const userAuth = await signInUserFirebase(clientEmail, clientPassword);

    const userDocRef = doc(db, "users", userAuth.user.uid);
    const user = await getDoc(userDocRef);
    if (!user.exists()) {
      throw new Error("Wrong combination of email & password");
    } else {
      const clientInfo = user.data();
      return clientInfo;
    }
  } catch (error) {
    throw new Error(error);
  }
};
