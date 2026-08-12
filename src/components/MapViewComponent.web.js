import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MapViewComponent({ style }) {
  return (
    <View style={[style, styles.webMapContainer]}>
      <Ionicons name="map" size={54} color="#3B82F6" />
      <Text style={styles.webMapTitle}>Expedition Route Explorer</Text>
      <Text style={styles.webMapSub}>
        📍 Latitude: 33.6844° N | Longitude: 73.0479° E • Islamabad & Skardu Exploration Hubs
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webMapContainer: {
    backgroundColor: "#0F1C2E",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    minHeight: 350,
  },
  webMapTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 14,
  },
  webMapSub: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    maxWidth: 500,
  },
});
