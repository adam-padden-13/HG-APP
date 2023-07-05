import { Song } from "../models/Song";

export const songReducer = (state: Song, action) => {
    switch (action.type) {
      case "title":
        return { ...state, title: action.payload };
      case "recordedDate":
        return { ...state, recordedDate: action.payload };
      case "category":
        return { ...state, category: action.payload };
      case "notes":
        return { ...state, notes: action.payload };
      default:
        return state;
    }
  };