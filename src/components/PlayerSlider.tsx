import React from "react";
import { View, StyleSheet } from "react-native";
import { Slider, Icon } from "@rneui/themed";
import { NormalText } from "../theme/theme";
import { convertMilliToMinutes } from "../utilities/stringUtilities";
import { AppContext } from "../contexts/appContext";

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
                color={"red"}
              />
            ),
          }}
        />
        <View style={styles.timeContainer}>
          <NormalText>{convertMilliToMinutes(currentPlayback)}</NormalText>
          <NormalText>{convertMilliToMinutes(songDuration)}</NormalText>
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
    marginHorizontal: 4,
  },
});

export default PlayerSlider;
