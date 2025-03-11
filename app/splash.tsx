import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing, Image, Text } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "./context/auth";

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const { isAuthenticated, userType, isLoading } = useAuth();

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Navigate to appropriate screen after 2.5 seconds
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/auth/login");
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>
          <Text style={styles.taglineHighlight}>StickerSmash</Text> - Your
          Health Companion
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6c5ce7",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
  taglineHighlight: {
    fontWeight: "bold",
    color: "#ffffff",
  },
});
