import { createTheme, Text } from "@rneui/themed";
import { ReactNode } from "react";

export const usetheme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

interface TextProps {
  children: ReactNode;
  color?: string;
  size?: number;
}

export const colors = {
  red: "#cd2326",
  blue: "#074684",
  green: "green",
  black: "black",
  white: "#fafafa",
  grey: "#e3e3e3",
};

export const HeaderText = ({ ...props }: TextProps) => (
  <Text
    style={{
      fontFamily: "CourierRegular",
      color: props.color ? props.color : "black",
      fontSize: 32,
      textAlign: "center",
    }}
  >
    {props.children}
  </Text>
);

export const SmallText = ({ ...props }: TextProps) => (
  <Text
    style={{
      fontFamily: "CourierRegular",
      color: props.color ? props.color : "black",
      fontSize: props.size ? props.size : 14,
    }}
  >
    {props.children}
  </Text>
);

export const NormalText = ({ ...props }: TextProps) => (
  <Text
    style={{
      fontFamily: "CourierRegular",
      color: props.color ? props.color : "black",
      fontSize: props.size ? props.size : 16,
    }}
  >
    {props.children}
  </Text>
);

export const BoldText = ({ ...props }: TextProps) => (
  <Text
    style={{
      fontFamily: "CourierBold",
      color: props.color ? props.color : "black",
      fontSize: props.size ? props.size : 16,
    }}
  >
    {props.children}
  </Text>
);

export const LinkText = ({ ...props }: TextProps) => (
  <Text
    style={{
      fontFamily: "CourierRegular",
      color: props.color ? props.color : "blue",
      fontSize: props.size ? props.size : 16,
      textDecorationLine: "underline",
    }}
  >
    {props.children}
  </Text>
);
