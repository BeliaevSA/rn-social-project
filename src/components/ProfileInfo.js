import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const ProfileInfo = ({ value, text }) => {
  return (
    <View style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>{value}</Text>
      <Text style={styles.userInfoSubTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoItem: {
    justifyContent: "center",
    marginHorizontal: 25,
    alignItems: "center",
  },
  userInfoTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
  },
  userInfoSubTitle: {
    fontSize: 12,
  },
});
