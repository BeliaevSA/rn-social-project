import { StyleSheet, Text, View, Animated } from "react-native";

export const ProgressiveImage = ({
  defaultImageSource,
  source,
  style,
  ...props
}) => {
  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  handlerDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  handlerImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={defaultImageSource}
        style={[style, { opacity: defaultImageAnimated }]}
        onLoad={handlerDefaultImageLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[
          style,
          { opacity: imageAnimated },
          styles.imageOverlay,
        ]}
        onLoad={handlerImageLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
