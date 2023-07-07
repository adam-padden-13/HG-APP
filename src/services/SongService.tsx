import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, songCollection } from "../../firebaseConfig";
import { Song } from "../models/Song";

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

export const deleteSongData = async (id: string) => {
  await deleteDoc(doc(db, `${songCollection}`, id)).catch(() => {
    alert("Song could not be deleted");
  });
};
