import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";

const { height } = Dimensions.get("window");

export default function Onboarding1() {
  const navigation = useNavigation();

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.timing(slide, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("./assets/onboarding1.jpg")}
      style={styles.background}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.overlay}>

        {/* Top Bar */}

        <View style={styles.topBar}>

          <View style={styles.logoContainer}>
            <Image
              source={require("./assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Onboarding3")}
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>

        </View>

        {/* Content */}

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >

          <Text style={styles.heading}>
            DISCOVER{"\n"}
            ADVENTURE{"\n"}
            BEYOND LIMITS
          </Text>

          <Text style={styles.paragraph}>
            Explore breathtaking destinations, hiking trails and unforgettable
            experiences crafted for passionate explorers.
          </Text>

          <View style={styles.indicatorRow}>
            <View style={styles.activeDot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

        </Animated.View>

        {/* Button */}

        <Animated.View
          style={{
            opacity: fade,
            transform: [{ translateY: slide }],
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Onboarding2")}
          >
            <Text style={styles.buttonText}>Next →</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(6,24,48,0.45)",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 55,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoContainer: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  skip: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    marginTop: height * 0.22,
  },

  heading: {
    fontSize: 42,
    fontWeight: "700",
    color: "#0B5CAD",
    lineHeight: 48,
  },

  paragraph: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 28,
    color: "#FFFFFF",
    width: "88%",
  },

  indicatorRow: {
    flexDirection: "row",
    marginTop: 40,
  },

  activeDot: {
    width: 28,
    height: 8,
    borderRadius: 20,
    backgroundColor: "#0B5CAD",
    marginHorizontal: 5,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,.5)",
    marginHorizontal: 5,
  },

  button: {
    backgroundColor: "#0B5CAD",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

});