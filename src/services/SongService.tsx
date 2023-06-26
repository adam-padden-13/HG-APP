import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Song } from "../models/Song";

export const getSongs = async () => {
  const songList: Song[] = [];

  await getDocs(collection(db, "songs")).then((response) => {
    response.forEach((song) => {
      let currentSong: Song = song.data() as Song;
      currentSong.documentId = song.id;
      songList.push(currentSong);
    });
  });
  return songList;
};
