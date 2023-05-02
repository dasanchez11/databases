import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

export const getAllShipsFirebase = async () => {
  const shipsRef = collection(db, "ships");
  const ships = await getDocs(shipsRef);
  let allShips = [];
  ships.forEach((ship) => allShips.push(ship.data()));
  return allShips;
};

export const createShipFirebase = async (shipInfo) => {
  try {
    const shipRef = doc(db, "ships", shipInfo._id);
    await setDoc(shipRef, shipInfo);
  } catch (error) {}
};

export const editShipFirebase = async (shipId, shipToUpdate) => {
  try {
    const shipRef = doc(db, "ships", shipId);
    await updateDoc(shipRef, shipToUpdate);
  } catch (error) {}
};

export const deleteShipFirebase = async (shipId) => {
  try {
    const shipRef = doc(db, "ships", shipId);
    await deleteDoc(shipRef);
  } catch (error) {}
};
