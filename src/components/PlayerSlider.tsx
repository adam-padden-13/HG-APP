import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slider, Text, Icon } from "@rneui/themed";

interface PlayerSliderProps {
  songDuration: number;
  currentPlayback: number;
  updateCurrentPlayback: (value: number) => void;
}

const PlayerSlider = ({
  songDuration,
  currentPlayback,
  updateCurrentPlayback,
}: PlayerSliderProps) => {
  const [value, setValue] = useState(0);

  const interpolate = (start: number, end: number) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <>
      <View style={[styles.contentView]}>
        <Slider
          value={currentPlayback}
          onValueChange={(changeValue) => updateCurrentPlayback(changeValue)}
          maximumValue={songDuration}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={10}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={color()}
              />
            ),
          }}
        />
        <Text style={{ paddingTop: 20 }}>Value: {value}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default PlayerSlider;
