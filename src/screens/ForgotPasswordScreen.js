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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const heroImage = require("../../assets/about-bg.jpg");
const logoImage = require("../../assets/logo.png");

export default function ForgotPasswordScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = () => {
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

    // Simulate sending recovery email
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
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

            {/* Back Button (Mobile & Desktop) */}
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
                  <Text style={styles.heroBadgeText}>ACES ADVENTURE CLUB</Text>
                </View>
                <Text style={styles.heroTitle}>
                  Never lose your way to adventure.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Account security is our priority. Get back to exploring the world's most remote and breathtaking expeditions in minutes.
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

          {/* ================= RIGHT / FORM PANEL ================= */}
          <View
            style={[
              styles.formPanel,
              isWide ? styles.formPanelWide : styles.formPanelNarrow,
            ]}
          >
            <View style={styles.card}>
              {!isSubmitted ? (
                <>
                  <View style={styles.cardBadge}>
                    <Ionicons name="key-outline" size={14} color="#d4af6a" style={{ marginRight: 6 }} />
                    <Text style={styles.cardBadgeText}>RESET PASSWORD</Text>
                  </View>

                  <Text style={styles.cardTitle}>Forgot Your Password?</Text>
                  <Text style={styles.cardSubtitle}>
                    Enter the email address associated with your account and we will send you a verification link to reset your password.
                  </Text>

                  {errorMessage ? (
                    <View style={styles.errorBox}>
                      <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="mail-outline"
                        size={18}
                        color="#7f93a6"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="explorer@acesadventure.com"
                        placeholderTextColor="#627d98"
                        autoCapitalize="none"
                        keyboardType="email-address"
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
                    <Text style={styles.primaryButtonText}>
                      {loading ? "Sending..." : "Send Reset Instructions"}
                    </Text>
                    {!loading && (
                      <Ionicons name="paper-plane-outline" size={18} color="#0d1b2a" style={{ marginLeft: 8 }} />
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
                    <Ionicons name="checkmark-done" size={36} color="#d4af6a" />
                  </View>

                  <Text style={styles.cardTitle}>Check Your Inbox</Text>
                  <Text style={styles.cardSubtitle}>
                    We have sent a password reset link to:
                  </Text>
                  <View style={styles.emailChip}>
                    <Ionicons name="mail" size={16} color="#d4af6a" style={{ marginRight: 8 }} />
                    <Text style={styles.emailChipText}>{email}</Text>
                  </View>
                  <Text style={styles.instructionNote}>
                    Please check your spam or junk folder if you don't receive the email within a few minutes.
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
                    <Ionicons name="refresh-outline" size={16} color="#c7d5e0" style={{ marginRight: 6 }} />
                    <Text style={styles.secondaryButtonText}>Try another email</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Quick Navigation / Home helper */}
            <TouchableOpacity
              style={styles.homeLinkBtn}
              onPress={() => navigation?.navigate("Home")}
            >
              <Ionicons name="home-outline" size={16} color="#7f93a6" style={{ marginRight: 6 }} />
              <Text style={styles.homeLinkText}>Return to Home Page</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const CARD_BG = "#1b334d";
const INPUT_BG = "#122336";
const GOLD = "#d4af6a";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d1b2a",
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
    height: 200,
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
    backgroundColor: "rgba(10, 24, 40, 0.65)",
  },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(13, 27, 42, 0.75)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
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
  },
  heroLogo: {
    width: 68,
    height: 68,
    resizeMode: "contain",
    marginBottom: 20,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(212, 175, 106, 0.15)",
    borderColor: GOLD,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 36,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#FFFFFF",
    lineHeight: 44,
    marginBottom: 16,
    fontWeight: "700",
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 22,
  },

  mobileHeroContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  mobileHeroLogo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginBottom: 8,
  },
  mobileHeroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // FORM PANEL
  formPanel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d1b2a",
  },
  formPanelWide: {
    paddingVertical: 48,
    paddingHorizontal: 40,
  },
  formPanelNarrow: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: CARD_BG,
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },

  cardBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: "rgba(212, 175, 106, 0.1)",
  },
  cardBadgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#FCA5A5",
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 14,
  },

  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#0d1b2a",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 13,
  },
  linkText: {
    color: GOLD,
    fontSize: 13,
    fontWeight: "700",
  },

  // SUCCESS STATE
  successWrapper: {
    alignItems: "center",
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(212, 175, 106, 0.15)",
    borderWidth: 1.5,
    borderColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emailChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: INPUT_BG,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 106, 0.3)",
    marginBottom: 16,
  },
  emailChipText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
  instructionNote: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#c7d5e0",
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
    color: "#7f93a6",
    fontSize: 13,
  },
});
