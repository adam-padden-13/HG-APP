import { Song } from "./Song";

export interface HGUser {
  userEmail: string;
  userDisplayName: string;
  savedSongs?: SavedSong[];
}

export interface SavedSong {
  title: string;
  documentId: string;
  id: number;
}
