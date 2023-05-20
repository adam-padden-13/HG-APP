import { createTheme, Text } from "@rneui/themed";

export const usetheme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

export const HeaderText = (props) => (
  <Text {...props} style={{ fontFamily: "MarcellusRegular", color: "black", fontSize: 32 }} />
);

export const NormalText = (props) => (
  <Text {...props} style={{ fontFamily: "MarcellusRegular", color: "black", fontSize: 16 }} />
);
