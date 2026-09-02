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
  StatusBar,
} from "react-native";
import useResponsive from "../hooks/useResponsive";

export default function Onboarding2() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(40)).current;

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
      source={require("../../assets/onboarding2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Dark Overlay */}
      <View style={styles.overlay}>
        {/* Top Bar */}
        <View style={[styles.topBar, { paddingHorizontal: isDesktop ? 50 : 24, paddingTop: isDesktop ? 30 : 45 }]}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate("Onboarding3")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Content Row */}
        <Animated.View
          style={[
            styles.bottomContainer,
            {
              paddingHorizontal: isDesktop ? 50 : 24,
              paddingBottom: isDesktop ? 50 : 65,
              flexDirection: isDesktop ? "row" : "column",
              justifyContent: "space-between",
              alignItems: isDesktop ? "flex-end" : "flex-start",
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >
          {/* Text & Indicators (Left) */}
          <View style={[styles.textContent, { maxWidth: isDesktop ? 680 : "100%" }]}>
            <Text style={[styles.headingWhite, isDesktop ? { fontSize: 48, lineHeight: 54 } : { fontSize: 28, lineHeight: 34 }]}>
              FIND YOUR{"\n"}
              <Text style={styles.headingBlue}>NEXT ADVENTURE</Text>
            </Text>

            <Text style={[styles.paragraph, isDesktop ? { fontSize: 17, lineHeight: 28 } : { fontSize: 14, lineHeight: 22 }]}>
              Browse hiking, camping and trekking experiences designed for every explorer.
            </Text>

            {/* Indicator Dots */}
            <View style={styles.indicatorRow}>
              <View style={styles.dot} />
              <View style={styles.activeDot} />
              <View style={styles.dot} />
            </View>
          </View>

          {/* Button (Right on desktop, stacked on mobile) */}
          <View style={[styles.buttonWrapper, !isDesktop && { marginTop: 20, width: "100%", marginBottom: 10 }]}>
            <TouchableOpacity
              style={[styles.nextButton, !isDesktop && { width: "100%", alignItems: "center" }]}
              onPress={() => navigation.navigate("Onboarding3")}
            >
              <Text style={styles.nextButtonText}>{"Next >"}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(6, 18, 32, 0.35)",
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1600,
    width: "100%",
    alignSelf: "center",
  },

  logoContainer: {
    cursor: "pointer",
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  skipButton: {
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.65)",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  },

  skipText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },

  bottomContainer: {
    maxWidth: 1600,
    width: "100%",
    alignSelf: "center",
  },

  textContent: {
    flexDirection: "column",
  },

  headingWhite: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  headingBlue: {
    color: "#3D8BFF",
    fontWeight: "800",
  },

  paragraph: {
    marginTop: 14,
    color: "#E2E8F0",
    fontWeight: "400",
  },

  indicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  activeDot: {
    width: 32,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#3D8BFF",
    marginRight: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    marginRight: 6,
  },

  buttonWrapper: {
    alignSelf: "flex-end",
  },

  nextButton: {
    backgroundColor: "#0088FF",
    borderRadius: 28,
    paddingHorizontal: 38,
    paddingVertical: 14,
    cursor: "pointer",
    shadowColor: "#0088FF",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
