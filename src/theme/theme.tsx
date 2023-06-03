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
  <Text
    {...props}
    style={{
      fontFamily: "CourierRegular",
      color: "black",
      fontSize: 32,
      textAlign: "center",
    }}
  />
);

export const SmallText = (props) => (
  <Text
    {...props}
    style={{ fontFamily: "CourierRegular", color: "black", fontSize: 14 }}
  />
);

export const NormalText = (props) => (
  <Text
    {...props}
    style={{ fontFamily: "CourierRegular", color: "black", fontSize: 16 }}
  />
);

export const BoldText = (props) => (
  <Text
    {...props}
    style={{ fontFamily: "CourierBold", color: "black", fontSize: 16 }}
  />
);

export const LinkText = (props) => (
  <Text
    {...props}
    style={{
      fontFamily: "CourierRegular",
      color: "blue",
      fontSize: 16,
      textDecorationLine: "underline",
    }}
  />
);
