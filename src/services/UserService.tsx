import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { HGUser } from "../models/HGUser";

export const addNewUser = async (userInfo: HGUser) => {
  await addDoc(collection(db, `users`), {
    userInfo,
  });
};
