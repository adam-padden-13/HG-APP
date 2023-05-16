import axios from "axios";
import { Chord } from "../models/UberChordModels";

export const lookupChord = (chordName: string): Promise<Chord> => {
  return axios
    .get(`https://api.uberchord.com/v1/chords/${chordName}`)
    .then((res) => res.data[0]);
};
