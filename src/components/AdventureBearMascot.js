import React, { useEffect, useState, useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 * AdventureBearMascot (Panda / Explorer Bear)
 * Interactive mascot for authentication screens.
 * - Watches / looks at inputs when password is safe / eye button is OFF.
 * - Covers eyes with paws when password is visible (eye button is ON / password shown).
 * - Pupils follow input fields when typing email or profile details.
 */
export default function AdventureBearMascot({
  isPasswordVisible = false,
  isLookingDown = false,
}) {
  // Paws animation values (React 19 friendly with useState)
  const [leftPawTranslateY] = useState(() => new Animated.Value(0));
  const [leftPawTranslateX] = useState(() => new Animated.Value(0));
  const [leftPawRotate] = useState(() => new Animated.Value(0));

  const [rightPawTranslateY] = useState(() => new Animated.Value(0));
  const [rightPawTranslateX] = useState(() => new Animated.Value(0));
  const [rightPawRotate] = useState(() => new Animated.Value(0));

  // Pupil movement
  const [pupilTranslateY] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // Eye pupil animation: look down when typing in text fields
    Animated.spring(pupilTranslateY, {
      toValue: isLookingDown ? 3.5 : 0,
      friction: 6,
      tension: 50,
      useNativeDriver: true,
    }).start();

    // Paws animation:
    // When password is shown/visible (eye button ON) -> paws cover eyes!
    // When password is safe/hidden (eye button OFF) -> paws rest below face!
    if (isPasswordVisible) {
      Animated.parallel([
        Animated.spring(leftPawTranslateY, {
          toValue: -46,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(leftPawTranslateX, {
          toValue: 12,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(leftPawRotate, {
          toValue: 20,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(rightPawTranslateY, {
          toValue: -46,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(rightPawTranslateX, {
          toValue: -12,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(rightPawRotate, {
          toValue: -20,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Lower paws back to resting position
      Animated.parallel([
        Animated.spring(leftPawTranslateY, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(leftPawTranslateX, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(leftPawRotate, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(rightPawTranslateY, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(rightPawTranslateX, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(rightPawRotate, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    isPasswordVisible,
    isLookingDown,
    leftPawTranslateY,
    leftPawTranslateX,
    leftPawRotate,
    rightPawTranslateY,
    rightPawTranslateX,
    rightPawRotate,
    pupilTranslateY,
  ]);

  const leftPawInterpolateRotate = useMemo(
    () =>
      leftPawRotate.interpolate({
        inputRange: [-180, 180],
        outputRange: ["-180deg", "180deg"],
      }),
    [leftPawRotate]
  );

  const rightPawInterpolateRotate = useMemo(
    () =>
      rightPawRotate.interpolate({
        inputRange: [-180, 180],
        outputRange: ["-180deg", "180deg"],
      }),
    [rightPawRotate]
  );

  return (
    <View style={styles.mascotContainer} pointerEvents="none">
      {/* Panda Ears */}
      <View style={[styles.ear, styles.leftEar]}>
        <View style={styles.innerEar} />
      </View>
      <View style={[styles.ear, styles.rightEar]}>
        <View style={styles.innerEar} />
      </View>

      {/* Explorer Cap in Brand Blue */}
      <View style={styles.cap}>
        <View style={styles.capFold}>
          <Ionicons name="compass" size={11} color="#FFD700" style={styles.capBadge} />
        </View>
        <View style={styles.pomPom} />
      </View>

      {/* Panda Face / Head */}
      <View style={styles.head}>
        {/* Cute Panda Eye Patches */}
        <View style={[styles.eyePatch, styles.leftEyePatch]}>
          <View style={styles.eye}>
            <Animated.View
              style={[
                styles.pupil,
                { transform: [{ translateY: pupilTranslateY }] },
              ]}
            >
              <View style={styles.pupilShineLarge} />
              <View style={styles.pupilShineSmall} />
            </Animated.View>
          </View>
        </View>

        <View style={[styles.eyePatch, styles.rightEyePatch]}>
          <View style={styles.eye}>
            <Animated.View
              style={[
                styles.pupil,
                { transform: [{ translateY: pupilTranslateY }] },
              ]}
            >
              <View style={styles.pupilShineLarge} />
              <View style={styles.pupilShineSmall} />
            </Animated.View>
          </View>
        </View>

        {/* Rosy Cheeks */}
        <View style={[styles.cheek, styles.leftCheek]} />
        <View style={[styles.cheek, styles.rightCheek]} />

        {/* Cute Snout & Nose */}
        <View style={styles.snout}>
          <View style={styles.nose} />
          <View style={styles.mouthLine} />
          <View style={styles.mouthSmile} />
        </View>
      </View>

      {/* Animated Left Paw */}
      <Animated.View
        style={[
          styles.paw,
          styles.leftPaw,
          {
            transform: [
              { translateY: leftPawTranslateY },
              { translateX: leftPawTranslateX },
              { rotate: leftPawInterpolateRotate },
            ],
          },
        ]}
      >
        <View style={styles.pawMainPad} />
        <View style={styles.toePadsRow}>
          <View style={styles.toePad} />
          <View style={styles.toePad} />
          <View style={styles.toePad} />
        </View>
      </Animated.View>

      {/* Animated Right Paw */}
      <Animated.View
        style={[
          styles.paw,
          styles.rightPaw,
          {
            transform: [
              { translateY: rightPawTranslateY },
              { translateX: rightPawTranslateX },
              { rotate: rightPawInterpolateRotate },
            ],
          },
        ]}
      >
        <View style={styles.pawMainPad} />
        <View style={styles.toePadsRow}>
          <View style={styles.toePad} />
          <View style={styles.toePad} />
          <View style={styles.toePad} />
        </View>
      </Animated.View>
    </View>
  );
}

const BRAND_BLUE = "#0B5CAD";
const DARK_EAR = "#1E293B";
const PANDA_FACE = "#FFFFFF";

const styles = StyleSheet.create({
  mascotContainer: {
    width: 120,
    height: 96,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: -10,
    zIndex: 20,
  },

  // EARS
  ear: {
    position: "absolute",
    top: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: DARK_EAR,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  leftEar: {
    left: 14,
  },
  rightEar: {
    right: 14,
  },
  innerEar: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#334155",
  },

  // CAP
  cap: {
    position: "absolute",
    top: 2,
    width: 58,
    height: 26,
    backgroundColor: "#073B6F",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 5,
  },
  pomPom: {
    position: "absolute",
    top: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFD700",
  },
  capFold: {
    width: 64,
    height: 12,
    backgroundColor: BRAND_BLUE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -2,
  },
  capBadge: {
    alignSelf: "center",
  },

  // HEAD
  head: {
    width: 96,
    height: 74,
    borderRadius: 38,
    backgroundColor: PANDA_FACE,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
    shadowColor: "#0B5CAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  // EYE PATCHES (Panda style)
  eyePatch: {
    position: "absolute",
    top: 18,
    width: 25,
    height: 28,
    borderRadius: 13,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  leftEyePatch: {
    left: 15,
    transform: [{ rotate: "-8deg" }],
  },
  rightEyePatch: {
    right: 15,
    transform: [{ rotate: "8deg" }],
  },

  // EYES
  eye: {
    width: 17,
    height: 19,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  pupil: {
    width: 11,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0F172A",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  pupilShineLarge: {
    position: "absolute",
    top: 1.5,
    right: 1.5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
  pupilShineSmall: {
    position: "absolute",
    bottom: 2,
    left: 2,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },

  // CHEEKS
  cheek: {
    position: "absolute",
    top: 38,
    width: 14,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#FCA5A5",
    opacity: 0.7,
  },
  leftCheek: {
    left: 8,
  },
  rightCheek: {
    right: 8,
  },

  // SNOUT
  snout: {
    position: "absolute",
    top: 35,
    alignItems: "center",
    zIndex: 4,
  },
  nose: {
    width: 14,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#0F172A",
  },
  mouthLine: {
    width: 1.5,
    height: 4,
    backgroundColor: "#0F172A",
  },
  mouthSmile: {
    width: 12,
    height: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: "#0F172A",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: -2,
  },

  // PAWS
  paw: {
    position: "absolute",
    bottom: -6,
    width: 34,
    height: 38,
    borderRadius: 17,
    backgroundColor: DARK_EAR,
    borderWidth: 1.5,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  leftPaw: {
    left: 10,
  },
  rightPaw: {
    right: 10,
  },
  pawMainPad: {
    width: 15,
    height: 12,
    borderRadius: 7,
    backgroundColor: "#F87171",
    marginTop: 4,
  },
  toePadsRow: {
    flexDirection: "row",
    gap: 2.5,
    marginTop: 2.5,
  },
  toePad: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FCA5A5",
  },
});
