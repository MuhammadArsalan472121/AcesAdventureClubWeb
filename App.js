import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { DataProvider } from "./src/context/DataContext";

// Preload essential hero and onboarding images for instant rendering
const PRELOAD_ASSETS = [
  require("./assets/onboarding1.jpg"),
  require("./assets/onboarding2.jpg"),
  require("./assets/onboarding3.jpg"),
  require("./assets/hero.jpg"),
  require("./assets/logo.png"),
  require("./assets/about-bg.jpg"),
  require("./assets/galleryHero.jpg"),
  require("./assets/adventure-bg.jpg"),
  require("./assets/hunza.jpg"),
  require("./assets/fairy.jpg"),
  require("./assets/skardu.jpg"),
  require("./assets/naran.jpg"),
  require("./assets/hiking.jpg"),
  require("./assets/camping.jpg"),
  require("./assets/trekking.jpg"),
];

function preloadCriticalImages() {
  PRELOAD_ASSETS.forEach((img) => {
    try {
      const resolved = Image.resolveAssetSource(img);
      if (resolved?.uri) {
        if (Platform.OS === "web" && typeof window !== "undefined" && typeof document !== "undefined") {
          // Preload link tag for high network priority
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = resolved.uri;
          document.head.appendChild(link);

          // Force decode into browser image cache
          const nativeImg = new window.Image();
          nativeImg.decoding = "async";
          nativeImg.src = resolved.uri;
        } else if (Image.prefetch) {
          Image.prefetch(resolved.uri);
        }
      }
    } catch (_e) {
      // Graceful fallback
    }
  });
}

export default function App() {
  useEffect(() => {
    preloadCriticalImages();
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} style={styles.root}>
      <DataProvider>
        <AuthProvider>
          <View style={styles.root}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </View>
        </AuthProvider>
      </DataProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: Platform.OS === "web" ? "100vh" : "100%",
    width: "100%",
  },
});
