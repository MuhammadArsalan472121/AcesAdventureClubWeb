import "react-native-gesture-handler";
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { DataProvider } from "./src/context/DataContext";

export default function App() {
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
