import { Pressable, View, StyleSheet } from "react-native";
import { BoldText, NormalText, SmallText, colors } from "../theme/theme";
import { Song, SongComment } from "../models/Song";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { Icon } from "@rneui/base";
import ConfirmModal from "./ConfirmModal";
import Toast from "react-native-root-toast";

interface CommentListItemProps {
  comment: SongComment;
  id: number;
}

const CommentListItem = ({ comment, id }: CommentListItemProps) => {
  const { state, dispatch } = useContext(AppContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const styles = StyleSheet.create({
    commentContainer: {
      flex: 1,
      borderWidth: .5,
      justifyContent: "center",
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: colors.white,
      padding: 10,
    },
    commentInfo: {
      justifyContent: "space-between",
      marginHorizontal: 4,
      alignItems: "center",
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    iconContainer: {
      position: "absolute",
      top: 4,
      right: 4,
      zIndex: 1,
      borderWidth: 1,
      borderRadius: 4,
    },
  });
  return (
    <View key={id}>
      <Pressable
        onPress={() => setShowDeleteModal(true)}
        style={styles.iconContainer}
      >
        <Icon
          size={16}
          name="close"
          type="material-community"
          color={colors.red}
        />
      </Pressable>
      <Pressable style={[styles.commentContainer]}>
        <View style={styles.commentInfo}>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <BoldText size={12}>{comment.author} | </BoldText>
            <BoldText size={12}>{comment.date} </BoldText>
          </View>
          <NormalText size={14}>{comment.comment} </NormalText>
        </View>
      </Pressable>
      <View style={{ marginBottom: 12 }} />
      {showDeleteModal && (
        <ConfirmModal
          message={"Are you sure you want to delete this comment?"}
          showModal={showDeleteModal}
          hideModal={() => setShowDeleteModal(false)}
        />
      )}
    </View>
  );
};

export default CommentListItem;
