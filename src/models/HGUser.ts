import { Song } from "./Song";

export interface HGUser {
  userEmail: string;
  userDisplayName: string;
  savedSongs?: Song[]
}
