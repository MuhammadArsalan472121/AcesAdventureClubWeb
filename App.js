import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { DataProvider } from "./src/context/DataContext";

import Ionicons from "@expo/vector-icons/Ionicons";

import * as Linking from "expo-linking";

import TravelLoader from "./src/components/TravelLoader";

const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Onboarding1: "onboarding1",
      Onboarding2: "onboarding2",
      Onboarding3: "onboarding3",
      Home: "",
      About: "about",
      BrowseTrips: "trips",
      Gallery: "gallery",
      Map: "map",
      Sponsors: "sponsors",
      Contact: "contact",
      Login: "login",
      Signup: "signup",
      ForgotPassword: "forgot-password",
      EmailVerification: "verify-email",
      ViewTrip: "trip",
      Profile: "profile",
      Settings: "settings",
      AdminLogin: "admin-login",
      AdminDashboard: "admin",
      AdminUsers: "admin-users",
      AdminTrips: "admin-trips",
      AdminSponsors: "admin-sponsors",
      AdminGallery: "admin-gallery",
      AdminSettings: "admin-settings",
    },
  },
};

export default function App() {
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [navLoading, setNavLoading] = React.useState(false);
  const loadingTimerRef = React.useRef(null);

  useEffect(() => {
    // 1. Refresh & Initial launch loader timer (2.8s display)
    const initTimer = setTimeout(() => {
      setInitialLoading(false);
    }, 2800);

    // 2. Warm up icon font immediately so icons render instantly without blank delays
    try {
      Ionicons.loadFont?.();
    } catch (_e) {}

    // 3. Preload brand logo
    try {
      if (Platform.OS === "web" && typeof window !== "undefined") {
        const logoAsset = Image.resolveAssetSource(require("./assets/logo.png"));
        if (logoAsset?.uri) {
          const img = new window.Image();
          img.src = logoAsset.uri;
        }
      }
    } catch (_e) {}

    return () => clearTimeout(initTimer);
  }, []);

  const handleStateChange = () => {
    setNavLoading(true);
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = setTimeout(() => {
      setNavLoading(false);
    }, 850);
  };

  const isLoaderVisible = initialLoading || navLoading;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} style={styles.root}>
      <DataProvider>
        <AuthProvider>
          <View style={styles.root}>
            <NavigationContainer linking={linking} onStateChange={handleStateChange}>
              <AppNavigator />
              <TravelLoader visible={isLoaderVisible} overlay={true} />
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
