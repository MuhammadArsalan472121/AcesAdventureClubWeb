import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  Easing,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const logoImage = require("../../assets/logo.png");
const bgImage = require("../../assets/tripHero.jpg");

const TRAVEL_MESSAGES = [
  "Exploring the Karakoram",
  "Finding your next escape",
  "Preparing the trail",
  "Adventure awaits",
];

export default function TravelLoader({
  visible = true,
  message = "Preparing your adventure...",
  overlay = true,
}) {
  const [messageIndex, setMessageIndex] = useState(0);

  const bgScale = useRef(new Animated.Value(1)).current;
  const compassSpin = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(1)).current;
  const textSlide = useRef(new Animated.Value(0)).current;

  // Check prefers-reduced-motion
  const isReducedMotion =
    Platform.OS === "web" &&
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Slow Cinematic Background Parallax/Scale & Compass Spin
  useEffect(() => {
    if (!visible || isReducedMotion) return;

    const bgAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bgScale, {
          toValue: 1.06,
          duration: 7000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bgScale, {
          toValue: 1,
          duration: 7000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const spinAnimation = Animated.loop(
      Animated.timing(compassSpin, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    bgAnimation.start();
    spinAnimation.start();

    return () => {
      bgAnimation.stop();
      spinAnimation.stop();
    };
  }, [visible, isReducedMotion]);

  // 2. Rotate Travel Messages with smooth fade/slide
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      if (isReducedMotion) {
        setMessageIndex((prev) => (prev + 1) % TRAVEL_MESSAGES.length);
        return;
      }

      Animated.parallel([
        Animated.timing(textFade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textSlide, {
          toValue: -8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setMessageIndex((prev) => (prev + 1) % TRAVEL_MESSAGES.length);
        textSlide.setValue(8);
        Animated.parallel([
          Animated.timing(textFade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textSlide, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [visible, isReducedMotion]);

  if (!visible) return null;

  const spin = compassSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const currentSubtitle = TRAVEL_MESSAGES[messageIndex];

  return (
    <View style={[styles.container, overlay ? styles.overlayContainer : styles.inlineContainer]}>
      {/* Cinematic Mountain Background Image with Parallax Scale */}
      <Animated.View style={[styles.bgWrapper, { transform: [{ scale: isReducedMotion ? 1 : bgScale }] }]}>
        <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover" />
      </Animated.View>

      {/* Dark Overlay for High Legibility */}
      <View style={styles.overlay} />

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Small Elegant Branding */}
        <View style={styles.brandingRow}>
          <Image source={logoImage} style={styles.brandLogo} />
          <Text style={styles.brandTitle}>ACES ADVENTURE CLUB</Text>
        </View>

        {/* Minimal Animated Compass / Route Indicator */}
        <View style={styles.compassWrapper}>
          <Animated.View style={{ transform: [{ rotate: isReducedMotion ? "0deg" : spin }] }}>
            <Ionicons name="compass-outline" size={38} color="#38BDF8" />
          </Animated.View>
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>{message}</Text>

        {/* Rotating Subtitle */}
        <Animated.View
          style={{
            opacity: isReducedMotion ? 1 : textFade,
            transform: [{ translateY: isReducedMotion ? 0 : textSlide }],
          }}
        >
          <Text style={styles.subTitle}>{currentSubtitle}</Text>
        </Animated.View>

        {/* Minimal Route Line Indicator */}
        <View style={styles.lineIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999,
  },
  overlayContainer: Platform.select({
    web: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 999999,
      overflow: "hidden",
    },
    default: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 999999,
      overflow: "hidden",
    },
  }),
  inlineContainer: {
    width: "100%",
    minHeight: 320,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },

  bgWrapper: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 24, 40, 0.78)",
  },

  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    maxWidth: 500,
    zIndex: 10,
  },

  brandingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  brandLogo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 10,
  },
  brandTitle: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.5,
  },

  compassWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  mainTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 8,
  },

  subTitle: {
    color: "#38BDF8",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 32,
  },

  lineIndicator: {
    width: 48,
    height: 2,
    backgroundColor: "#38BDF8",
    borderRadius: 1,
    opacity: 0.8,
  },
});
