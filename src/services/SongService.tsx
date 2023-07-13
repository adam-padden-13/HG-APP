import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, songCollection } from "../../firebaseConfig";
import { Song, SongComment } from "../models/Song";

export const getSongs = async () => {
  const songList: Song[] = [];

  await getDocs(collection(db, `${songCollection}`)).then((response) => {
    response.forEach((song) => {
      let currentSong: Song = song.data() as Song;
      currentSong.documentId = song.id;
      songList.push(currentSong);
    });
  });
  return songList;
};

export const getSong = async (documentId: string) => {
  const docRef = doc(db, `${songCollection}`, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let currentSong: Song = docSnap.data() as Song;

    currentSong.documentId = documentId;
    return currentSong;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const deleteSongData = async (id: string) => {
  await deleteDoc(doc(db, `${songCollection}`, id)).catch(() => {
    alert("Song could not be deleted");
  });
};

export const addComment = async (
  userId: string,
  song: Song,
  comment: SongComment
) => {
  await updateDoc(doc(db, `${songCollection}`, song.documentId), {
    comments: arrayUnion(comment),
  });
};

export const deleteComment = async (song: Song, comment: SongComment) => {
 await updateDoc(doc(db,`${songCollection}`, song.documentId), {
  comments: arrayRemove(comment)
 })
}