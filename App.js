import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Header from "./Header";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B5CAD" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0B5CAD"
      />

      <Header />

    </SafeAreaView>
  );
}