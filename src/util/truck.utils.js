import {
  createTruckFirebase,
  deleteTruckFirebase,
  editTruckFirebase,
} from "../Firebase/firebase.trucks";

export const editTruck = async (truckInfo, setTrucks) => {
  try {
    await editTruckFirebase(truckInfo._id, truckInfo);
    setTrucks((trucks) => {
      const truckId = trucks.findIndex((trck) => trck._id === truckInfo._id);
      trucks[truckId] = truckInfo;
      return [...trucks];
    });
  } catch (error) {}
};

export const createTruck = async (truckInfo, setTrucks) => {
  try {
    await createTruckFirebase(truckInfo);
    setTrucks((trucks) => [...trucks, truckInfo]);
  } catch (error) {}
};

export const deleteTruck = async (truckId, setTrucks) => {
  try {
    await deleteTruckFirebase(truckId);
    setTrucks((trucks) => trucks.filter((truck) => truck._id !== truckId));
  } catch (error) {}
};
