import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase.config";

export const editUserFirebase = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);
  } catch (error) {}
};

export const getAllUsersFirebase = async () => {
  const userRef = collection(db, "users");
  const users = await getDocs(userRef);
  let allUsers = [];
  users.forEach((user) => allUsers.push(user.data()));
  return allUsers;
};
