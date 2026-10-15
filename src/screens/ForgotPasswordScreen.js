import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
import AdventureBearMascot from "../components/AdventureBearMascot";

const heroImage = require("../../assets/adventure-bg.jpg");
const logoImage = require("../../assets/logo.png");

const getAuthErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred. Please try again.";
  switch (error.code) {
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet.";
    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";
    default:
      return error.message || "Failed to send reset email. Please try again.";
  }
};

export default function ForgotPasswordScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      setLoading(false);
      setErrorMessage(getAuthErrorMessage(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isWide ? styles.scrollContentWide : styles.scrollContentNarrow,
          ]}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* ================= LEFT / HERO PANEL ================= */}
          <View
            style={[
              styles.heroPanel,
              isWide ? styles.heroPanelWide : styles.heroPanelNarrow,
            ]}
          >
            <Image
              source={heroImage}
              style={styles.heroImageBg}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />

            {/* Back Button */}
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                if (navigation?.canGoBack && navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation?.navigate("Home");
                }
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>

            {/* Hero content for Desktop */}
            {isWide && (
              <View style={styles.heroContent}>
                <Image source={logoImage} style={styles.heroLogo} />
                <View style={styles.heroBadge}>
                  <Ionicons name="compass" size={13} color="#ffd700" style={{ marginRight: 6 }} />
                  <Text style={styles.heroBadgeText}>ACES ADVENTURE CLUB</Text>
                </View>
                <Text style={styles.heroTitle}>
                  Never lose your way to adventure.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Account security is our priority. Get back to exploring the world&apos;s most remote and breathtaking expeditions in minutes.
                </Text>
              </View>
            )}

            {/* Compact Header for Mobile */}
            {!isWide && (
              <View style={styles.mobileHeroContent}>
                <Image source={logoImage} style={styles.mobileHeroLogo} />
                <Text style={styles.mobileHeroTitle}>Password Recovery</Text>
              </View>
            )}
          </View>

          {/* ================= RIGHT / FORM PANEL (BRIGHT & BLUE) ================= */}
          <View
            style={[
              styles.formPanel,
              isWide ? styles.formPanelWide : styles.formPanelNarrow,
            ]}
          >
            {/* Mascot Wrapper */}
            <View style={styles.mascotWrapper}>
              <AdventureBearMascot
                isCoveringEyes={false}
                isPeeking={false}
                isLookingDown={isFocused}
              />
            </View>

            <View style={styles.card}>
              {!isSubmitted ? (
                <>
                  <View style={styles.cardBadge}>
                    <Ionicons name="key-outline" size={14} color="#0B5CAD" style={{ marginRight: 6 }} />
                    <Text style={styles.cardBadgeText}>RESET PASSWORD</Text>
                  </View>

                  <Text style={styles.cardTitle}>Forgot Your Password?</Text>
                  <Text style={styles.cardSubtitle}>
                    Enter your registered email address and we will send you secure instructions to reset your password.
                  </Text>

                  {errorMessage ? (
                    <View style={styles.errorBox}>
                      <Ionicons name="alert-circle" size={18} color="#EF4444" />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        isFocused && styles.inputWrapperFocused,
                      ]}
                    >
                      <Ionicons
                        name="mail-outline"
                        size={18}
                        color={isFocused ? "#0B5CAD" : "#64748B"}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="explorer@acesadventure.com"
                        placeholderTextColor="#94A3B8"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        value={email}
                        onChangeText={(txt) => {
                          setEmail(txt);
                          if (errorMessage) setErrorMessage("");
                        }}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.primaryButton, loading && styles.buttonDisabled]}
                    onPress={handleResetPassword}
                    activeOpacity={0.85}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                        <Text style={styles.primaryButtonText}>Sending Instructions...</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.primaryButtonText}>Send Reset Instructions</Text>
                        <Ionicons name="paper-plane-outline" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
                      </>
                    )}
                  </TouchableOpacity>

                  <View style={styles.footerRow}>
                    <Text style={styles.footerText}>Remember your password? </Text>
                    <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                      <Text style={styles.linkText}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                /* Success Confirmation State */
                <View style={styles.successWrapper}>
                  <View style={styles.successIconCircle}>
                    <Ionicons name="checkmark-done" size={38} color="#0B5CAD" />
                  </View>

                  <Text style={styles.cardTitle}>Check Your Inbox</Text>
                  <Text style={styles.cardSubtitle}>
                    We have sent a secure password reset link to:
                  </Text>
                  <View style={styles.emailChip}>
                    <Ionicons name="mail" size={16} color="#0B5CAD" style={{ marginRight: 8 }} />
                    <Text style={styles.emailChipText}>{email}</Text>
                  </View>
                  <Text style={styles.instructionNote}>
                    {"Please check your spam or junk folder if you don't receive the email within a couple of minutes."}
                  </Text>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation?.navigate("Login")}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.primaryButtonText}>Return to Sign In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => setIsSubmitted(false)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="refresh-outline" size={16} color="#0B5CAD" style={{ marginRight: 6 }} />
                    <Text style={styles.secondaryButtonText}>Try another email</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Return to Home link */}
            <TouchableOpacity
              style={styles.homeLinkBtn}
              onPress={() => navigation?.navigate("Home")}
            >
              <Ionicons name="home-outline" size={16} color="#0B5CAD" style={{ marginRight: 6 }} />
              <Text style={styles.homeLinkText}>Return to Home Page</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BRAND_BLUE = "#0B5CAD";
const DARK_BLUE = "#073B6F";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F7FF",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentWide: {
    flexDirection: "row",
    minHeight: "100%",
  },
  scrollContentNarrow: {
    flexDirection: "column",
  },

  // HERO PANEL
  heroPanel: {
    position: "relative",
    overflow: "hidden",
    justifyContent: "space-between",
  },
  heroPanelWide: {
    width: "48%",
    minHeight: 700,
    padding: 48,
  },
  heroPanelNarrow: {
    width: "100%",
    height: 220,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImageBg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    ...(Platform.OS === "web"
      ? {
          backgroundImage:
            "linear-gradient(180deg, rgba(11, 92, 173, 0.4) 0%, rgba(7, 59, 111, 0.8) 100%)",
        }
      : {
          backgroundColor: "rgba(7, 59, 111, 0.65)",
        }),
  },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11, 92, 173, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    ...(Platform.OS === "web" ? { backdropFilter: "blur(8px)" } : {}),
  },
  backBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },

  heroContent: {
    marginTop: "auto",
    maxWidth: 480,
    backgroundColor: "rgba(7, 59, 111, 0.55)",
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.22)",
    ...(Platform.OS === "web" ? { backdropFilter: "blur(12px)" } : {}),
  },
  heroLogo: {
    width: 68,
    height: 68,
    resizeMode: "contain",
    marginBottom: 16,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderColor: "#ffd700",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  heroBadgeText: {
    color: "#ffd700",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 34,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#FFFFFF",
    lineHeight: 42,
    marginBottom: 14,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#F0F9FF",
    lineHeight: 22,
  },

  mobileHeroContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "rgba(7, 59, 111, 0.65)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  mobileHeroLogo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    marginBottom: 4,
  },
  mobileHeroTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // FORM PANEL
  formPanel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F7FF",
    width: "100%",
  },
  formPanelWide: {
    paddingVertical: 24,
    paddingHorizontal: 28,
  },
  formPanelNarrow: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  mascotWrapper: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    marginBottom: -4,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    borderColor: "rgba(11, 92, 173, 0.14)",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },

  cardBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: "#EBF5FF",
  },
  cardBadgeText: {
    color: BRAND_BLUE,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 25,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 13.5,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 22,
    lineHeight: 20,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    padding: 11,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12.5,
    marginLeft: 8,
    flex: 1,
  },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: DARK_BLUE,
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
  },
  inputWrapperFocused: {
    borderColor: BRAND_BLUE,
    backgroundColor: "#FFFFFF",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: "#0F172A",
    fontSize: 14,
  },

  primaryButton: {
    flexDirection: "row",
    backgroundColor: BRAND_BLUE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 16,
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14.5,
    letterSpacing: 0.3,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  footerText: {
    color: "#64748B",
    fontSize: 13,
  },
  linkText: {
    color: BRAND_BLUE,
    fontSize: 13.5,
    fontWeight: "700",
  },

  // SUCCESS STATE
  successWrapper: {
    alignItems: "center",
  },
  successIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EBF5FF",
    borderWidth: 2,
    borderColor: BRAND_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emailChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginBottom: 16,
  },
  emailChipText: {
    color: "#0F172A",
    fontWeight: "600",
    fontSize: 13.5,
  },
  instructionNote: {
    color: "#64748B",
    fontSize: 12.5,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 22,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: BRAND_BLUE,
    fontSize: 13,
    fontWeight: "600",
  },

  homeLinkBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 8,
  },
  homeLinkText: {
    color: BRAND_BLUE,
    fontSize: 13,
    fontWeight: "600",
  },
});
