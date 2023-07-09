import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { HGUser } from "../models/HGUser";
import { Song } from "../models/Song";

export const addNewUser = async (userInfo: HGUser) => {
  await setDoc(doc(db, `users`, userInfo.userEmail), {
    userInfo,
  });
};

export const getUserInfo = async (userEmail: string) => {
  const docRef = doc(db, "users", userEmail);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as HGUser;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const addSongToFavorites = async (userId: string, song: Song) => {
  await updateDoc(doc(db, "users", userId), {
    savedSongs: arrayUnion(song),
  });
};

export const removeSongFromFavorites = async (userId: string, song: Song) => {
  await updateDoc(doc(db, "users", userId), {
    savedSongs: arrayRemove(song),
  });
};
