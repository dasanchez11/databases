import { getAllUsersFirebase } from "../Firebase/firebase.users";

export const transportTypes = () => {
  const transport = [
    { key: undefined, value: "" },
    { key: "Land", value: "land" },
    { key: "Sea", value: "sea" },
  ];
  return transport;
};

export const statusTypes = () => {
  const status = [
    { key: undefined, value: "" },
    { key: "Completed", value: "completed" },
    { key: "In Progress", value: "inProgress" },
    { key: "On Customs", value: "onCustoms" },
    { key: "Canceled", value: "canceled" },
  ];
  return status;
};

export const availableClients = async () => {
  try {
    const users = await getAllUsersFirebase();
    const userOptions = [{ key: undefined, value: "" }];
    users.forEach((user) => {
      const { clientEmail, _id } = user;
      let obj = {};
      obj.key = clientEmail;
      obj.value = _id;
      userOptions.push(obj);
    });
    return userOptions;
  } catch (error) {
    throw new Error("Try Again");
  }
};
