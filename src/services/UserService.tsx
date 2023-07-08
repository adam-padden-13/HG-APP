import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { HGUser } from "../models/HGUser";
import { Song } from "../models/Song";

export const addNewUser = async (userInfo: HGUser) => {
  await addDoc(collection(db, `users`), {
    userInfo,
  });
};

export const addSongToFavorites = async (userId: string, song: Song) => {
  await updateDoc(doc(db, "users", userId), {
    savedSongs: arrayUnion(song),
  });
};
