import moment from "moment";
import { SongComment } from "../models/Song";

export const sortDates = (songComments: SongComment[]) => {
  const sortedComments = songComments.sort((a, b) =>
    moment(b.date, "MM-DD-YYYY, hh:mm a").diff(
      moment(a.date, "MM-DD-YYYY, hh:mm a")
    )
  );
  return sortedComments;
};
