// components/OutfitCard.js
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, useAnimatedStyle, withSpring, useSharedValue } from "react-native-reanimated";
import { API_URL } from "../services/api";

const { width } = Dimensions.get("window");

export default function OutfitCard({ outfit, image, styleLabel }) {
  const scale = useSharedValue(1);
  const imageUri = image
    ? image.startsWith("http")
      ? image
      : `${API_URL}/uploads/${image}`
    : null;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withSpring(1.05); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View entering={FadeIn.duration(500)} style={[styles.card, animatedStyle]}>
        {image && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent"]}
          style={styles.gradient}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{styleLabel ? styleLabel.toUpperCase() : "OUTFIT"}</Text>
          {Object.entries(outfit).map(([key, value]) => (
            <Text key={key} style={styles.text}>
              {key}: {value}
            </Text>
          ))}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.75,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: 220,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  info: {
    padding: 15,
    backgroundColor: "#fff",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 16, marginBottom: 4, color: "#333" },
});




