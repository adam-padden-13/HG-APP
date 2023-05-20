import { View } from "react-native";

interface SpacerProps {
  height?: number;
}

const Spacer = ({ height }: SpacerProps) => {
  return <View style={{ height: height ? height : 20 }} />;
};

export default Spacer;
