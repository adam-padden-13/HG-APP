import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayRemove,
} from "firebase/firestore";
import { db, userCollection } from "../../firebaseConfig";
import { HGUser, SavedSong } from "../models/HGUser";
import { Song } from "../models/Song";

export const addNewUser = async (userInfo: HGUser) => {
  await setDoc(doc(db, `${userCollection}`, userInfo.userEmail), {
    userInfo,
  });
};

export const getUserInfo = async (userEmail: string) => {
  const docRef = doc(db, `${userCollection}`, userEmail);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as HGUser;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const addSongToFavorites = async (userId: string, song: Song) => {
  const infoToSave: SavedSong = {
    title: song.title,
    documentId: song.documentId,
    id: song.id,
  };
  await updateDoc(doc(db, `${userCollection}`, userId), {
    savedSongs: arrayUnion(infoToSave),
  });
};

export const removeSongFromFavorites = async (userId: string, song: SavedSong) => {
  await updateDoc(doc(db, `${userCollection}`, userId), {
    savedSongs: arrayRemove(song),
  });
};
