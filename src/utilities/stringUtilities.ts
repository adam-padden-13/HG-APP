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

export const isValidDateFormat = (dateString: string) => {
  // Regular expression to match the format MM/DD/YYYY
  const regex = /^(0[1-9]|1[0-2])(\/|-)(0[1-9]|[12]\d|3[01])(\/|-)\d{4}$/;

  // Check if the date string matches the regex pattern
  console.log(regex.test(dateString));
  if (regex.test(dateString)) {
    return true;
  } else {
    return false;
  }
};
