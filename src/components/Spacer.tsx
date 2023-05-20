import { View } from "react-native";

interface SpacerProps {
  height?: number;
  width?: number;
}

const Spacer = ({ height, width }: SpacerProps) => {
  return <View style={{ height: height ? height : 20, width: width }} />;
};

export default Spacer;
