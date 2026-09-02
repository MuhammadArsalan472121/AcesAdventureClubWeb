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

const heroImage = require("../../assets/hero.jpg");
const logoImage = require("../../assets/logo.png");

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
    setErrorMessage("");
    console.log("Sign in with", email, password, rememberMe);
    // Navigate to Home or Profile
    navigation?.navigate("Home");
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

            {/* Back to Home / Navigation */}
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
              <Text style={styles.backBtnText}>Home</Text>
            </TouchableOpacity>

            {/* Desktop Hero Content */}
            {isWide && (
              <View style={styles.heroContent}>
                <Image source={logoImage} style={styles.heroLogo} />
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>ACES ADVENTURE CLUB</Text>
                </View>
                <Text style={styles.heroTitle}>
                  The peak of luxury is just ahead.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Join an exclusive circle of modern explorers discovering the world's most remote wonders in unparalleled comfort.
                </Text>
              </View>
            )}

            {/* Mobile Header Content */}
            {!isWide && (
              <View style={styles.mobileHeroContent}>
                <Image source={logoImage} style={styles.mobileHeroLogo} />
                <Text style={styles.mobileHeroTitle}>ACES Adventure Club</Text>
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
              <View style={styles.badge}>
                <Text style={styles.badgeText}>WELCOME BACK 👋</Text>
              </View>

              <Text style={styles.title}>Continue Your Adventure</Text>
              <Text style={styles.subtitle}>
                Sign in to explore destinations, manage your expeditions, and access member-only experiences.
              </Text>

              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              {/* Email Field */}
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
                    onChangeText={(t) => {
                      setEmail(t);
                      if (errorMessage) setErrorMessage("");
                    }}
                  />
                </View>
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#7f93a6"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#627d98"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(t) => {
                      setPassword(t);
                      if (errorMessage) setErrorMessage("");
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#7f93a6"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Ionicons name="checkmark" size={12} color="#0d1b2a" />}
                  </View>
                  <Text style={styles.checkboxLabel}>Remember Me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation?.navigate("ForgotPassword")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSignIn}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={18} color="#0d1b2a" style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate("Signup")}>
                  <Text style={styles.linkBold}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Return to Home link */}
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

  badge: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: "rgba(212, 175, 106, 0.1)",
  },
  badgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "700",
  },
  subtitle: {
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
    marginBottom: 16,
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
  eyeBtn: {
    padding: 6,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 14,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#627d98",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: INPUT_BG,
  },
  checkboxChecked: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  checkboxLabel: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  link: {
    color: GOLD,
    fontSize: 13,
    fontWeight: "600",
  },
  linkBold: {
    color: GOLD,
    fontSize: 13,
    fontWeight: "700",
  },

  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#0d1b2a",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "#94a3b8",
    fontSize: 13,
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