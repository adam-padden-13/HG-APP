import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slider, Text, Icon } from "@rneui/themed";
import { NormalText } from "../theme/theme";
import { convertMilliToMinutes } from "../utilities/stringUtilities";

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
          trackStyle={{ height: 4, backgroundColor: "transparent" }}
          thumbStyle={{ height: 4, width: 4, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="circle"
                type="font-awesome"
                size={4}
                reverse
                containerStyle={{ bottom: 12, right: 16 }}
                color={'red'}
              />
            ),
          }}
        />
        <View style={styles.timeContainer}>
          <NormalText style={{ borderWidth: 1 }}>
            {convertMilliToMinutes(currentPlayback)}
          </NormalText>
          <NormalText style={{ borderWidth: 1 }}>
            {convertMilliToMinutes(songDuration)}
          </NormalText>
        </View>
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
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
    marginHorizontal: 4
  },
});

export default PlayerSlider;