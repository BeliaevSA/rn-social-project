import {
  Platform,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export const OnboardingScreen = ({ navigation }) => {
  const Dots = ({ selected }) => {
    let backgroundColor = selected
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(0, 0, 0, 0.2)";
    return (
      <View
        style={{
          width: 5,
          backgroundColor,
          height: 5,
          marginHorizontal: 3,
        }}
      />
    );
  };

  const Skip = ({ ...props }) => (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Text
        style={
          Platform.OS === "ios"
            ? styles.buttonIos
            : styles.buttonAndroidSkip
        }>
        Skip
      </Text>
    </TouchableOpacity>
  );
  const Next = ({ ...props }) => (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Text
        style={
          Platform.OS === "ios"
            ? styles.buttonIos
            : styles.buttonAndroid
        }>
        Next
      </Text>
    </TouchableOpacity>
  );
  const Done = ({ ...props }) => (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Text
        style={
          Platform.OS === "ios"
            ? styles.buttonIos
            : styles.buttonAndroid
        }>
        Done
      </Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: (
            <Image
              source={require("../../assets/onboarding-img1.png")}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("../../assets/onboarding-img2.png")}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("../../assets/onboarding-img3.png")}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  buttonIos: {
    fontSize: 18,
  },
  buttonAndroid: {
    fontSize: 18,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  buttonAndroidSkip: {
    fontSize: 18,
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "black",
  },
});
