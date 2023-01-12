import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export const ProfileBtn = ({ onPress, value }) => {
  return (
    <TouchableOpacity style={styles.userBtn} onPress={onPress}>
      <Text style={styles.userBtnTxt}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 5,
    marginTop: 10,
  },
  userBtnTxt: {
    fontSize: 16,
    color: "#2e64e5",
  },
});
