export const removeSpaces = (string: string) => {
  return string.toLowerCase().replaceAll(" ", "_");
};

export const convertMilliToMinutes = (milliseconds: number) => {
  let minutes = Math.floor(milliseconds / 60000);
  let seconds = (milliseconds % 60000) / 1000;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
};

export enum SavedCredKeys {
  email = "email",
  password = "password",
}
