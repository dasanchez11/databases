import { editUserFirebase } from "../Firebase/firebase.users";

export const editUser = async (userData, setUsers) => {
  try {
    await editUserFirebase(userData._id, userData);
    setUsers((users) => {
      const userId = users.findIndex((usr) => usr._id === userData._id);
      users[userId] = userData;
      return [...users];
    });
  } catch (error) {}
};
