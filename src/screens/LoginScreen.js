import React, { useState, useRef } from "react";
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
import { signInWithEmailAndPassword, reload } from "firebase/auth";
import { auth } from "./firebaseConfig";
import AdventureBearMascot from "../components/AdventureBearMascot";

const heroImage = require("../../assets/adventure-bg.jpg");
const logoImage = require("../../assets/logo.png");

const getAuthErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred. Please try again.";
  switch (error.code) {
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet.";
    case "auth/too-many-requests":
      return "Too many attempts. Access is temporarily blocked. Please try again later.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is not enabled in Firebase Console.";
    default:
      return error.message || "Sign in failed. Please try again.";
  }
};

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const passwordInputRef = useRef(null);

  const handleSignIn = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);

      // Refresh user from Firebase to get accurate emailVerified status
      await reload(userCredential.user);

      if (!userCredential.user.emailVerified) {
        setLoading(false);
        navigation?.navigate("EmailVerification", {
          email: userCredential.user.email,
          requiresVerification: true,
        });
        return;
      }

      setLoading(false);
      navigation?.navigate("Home");
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
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
              <Text style={styles.backBtnText}>Home</Text>
            </TouchableOpacity>

            {/* Desktop Hero Content */}
            {isWide && (
              <View style={styles.heroContent}>
                <Image source={logoImage} style={styles.heroLogo} />
                <View style={styles.heroBadge}>
                  <Ionicons name="compass" size={13} color="#FFD700" style={{ marginRight: 6 }} />
                  <Text style={styles.heroBadgeText}>ACES ADVENTURE CLUB</Text>
                </View>
                <Text style={styles.heroTitle}>
                  The peak of luxury is just ahead.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Join an exclusive circle of modern explorers discovering the world&apos;s most remote wonders in unparalleled comfort.
                </Text>
                <View style={styles.heroFeatureRow}>
                  <View style={styles.heroFeaturePill}>
                    <Ionicons name="shield-checkmark" size={12} color="#38BDF8" style={{ marginRight: 5 }} />
                    <Text style={styles.heroFeatureText}>Verified Guides</Text>
                  </View>
                  <View style={styles.heroFeaturePill}>
                    <Ionicons name="bonfire" size={12} color="#FBBF24" style={{ marginRight: 5 }} />
                    <Text style={styles.heroFeatureText}>Private Chalets</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Mobile Header Banner */}
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
            {/* Mascot Wrapper */}
            <View style={styles.mascotWrapper}>
              <AdventureBearMascot
                isPasswordVisible={showPassword}
                isLookingDown={focusedField === "email"}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.badge}>
                <Ionicons name="compass-outline" size={13} color="#0B5CAD" style={{ marginRight: 5 }} />
                <Text style={styles.badgeText}>MEMBER PORTAL LOGIN</Text>
              </View>

              <Text style={styles.title}>Continue Your Adventure</Text>
              <Text style={styles.subtitle}>
                Sign in to manage your expeditions and member perks.
              </Text>

              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle" size={16} color="#EF4444" />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "email" && styles.inputWrapperFocused,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={17}
                    color={focusedField === "email" ? "#0B5CAD" : "#64748B"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="explorer@acesadventure.com"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                <View style={styles.passwordLabelRow}>
                  <Text style={styles.inputLabel}>PASSWORD</Text>
                  {showPassword ? (
                    <Text style={styles.bearHintText}>🙈 Mascot is covering eyes!</Text>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "password" && styles.inputWrapperFocused,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={17}
                    color={focusedField === "password" ? "#0B5CAD" : "#64748B"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    ref={passwordInputRef}
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    returnKeyType="go"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    onSubmitEditing={handleSignIn}
                    value={password}
                    onChangeText={(t) => {
                      setPassword(t);
                      if (errorMessage) setErrorMessage("");
                    }}
                  />
                  <TouchableOpacity
                    onPress={(e) => {
                      if (e && typeof e.preventDefault === "function") e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={styles.eyeBtn}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={19}
                      color={showPassword ? "#0B5CAD" : "#64748B"}
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
                    {rememberMe && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
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
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleSignIn}
                activeOpacity={0.85}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.primaryButtonText}>Signing In...</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>Sign In</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
                  </>
                )}
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Don&apos;t have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate("Signup")}>
                  <Text style={styles.linkBold}>Create Account</Text>
                </TouchableOpacity>
              </View>

              {/* Admin Portal Button */}
              <TouchableOpacity
                style={styles.adminPortalBtn}
                onPress={() => navigation?.navigate("AdminLogin")}
                activeOpacity={0.8}
              >
                <Ionicons name="shield-checkmark-outline" size={14} color="#0B5CAD" style={{ marginRight: 5 }} />
                <Text style={styles.adminPortalText}>Admin Control Console ➔</Text>
              </TouchableOpacity>
            </View>

            {/* Return to Home link */}
            <TouchableOpacity
              style={styles.homeLinkBtn}
              onPress={() => navigation?.navigate("Home")}
            >
              <Ionicons name="home-outline" size={15} color="#0B5CAD" style={{ marginRight: 5 }} />
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
    alignItems: "center",
    paddingBottom: 24,
  },

  // HERO PANEL
  heroPanel: {
    position: "relative",
    overflow: "hidden",
    justifyContent: "space-between",
  },
  heroPanelWide: {
    width: "48%",
    minHeight: 650,
    padding: 38,
  },
  heroPanelNarrow: {
    width: "100%",
    height: 120,
    padding: 12,
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
            "linear-gradient(180deg, rgba(11, 92, 173, 0.45) 0%, rgba(7, 59, 111, 0.82) 100%)",
        }
      : {
          backgroundColor: "rgba(7, 59, 111, 0.65)",
        }),
  },

  backBtn: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11, 92, 173, 0.6)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    ...(Platform.OS === "web" ? { backdropFilter: "blur(6px)" } : {}),
  },
  backBtnText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "600",
    marginLeft: 5,
  },

  heroContent: {
    marginTop: "auto",
    maxWidth: 440,
    backgroundColor: "rgba(7, 59, 111, 0.6)",
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.22)",
    ...(Platform.OS === "web" ? { backdropFilter: "blur(10px)" } : {}),
  },
  heroLogo: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    marginBottom: 12,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderColor: "#FFD700",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  heroBadgeText: {
    color: "#FFD700",
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 30,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#FFFFFF",
    lineHeight: 38,
    marginBottom: 10,
    fontWeight: "700",
  },
  heroSubtitle: {
    fontSize: 13.5,
    color: "#F0F9FF",
    lineHeight: 20,
    marginBottom: 14,
  },
  heroFeatureRow: {
    flexDirection: "row",
    gap: 8,
  },
  heroFeaturePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  heroFeatureText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
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

  // BRIGHT FORM PANEL
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

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#EBF5FF",
  },
  badgeText: {
    color: BRAND_BLUE,
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 12.5,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    padding: 9,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    marginLeft: 6,
    flex: 1,
    lineHeight: 16,
  },

  inputGroup: {
    marginBottom: 12,
    width: "100%",
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  inputLabel: {
    color: DARK_BLUE,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  bearHintText: {
    color: BRAND_BLUE,
    fontSize: 10.5,
    fontWeight: "700",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    paddingLeft: 12,
    paddingRight: 6,
    height: 46,
    width: "100%",
    overflow: "hidden",
  },
  inputWrapperFocused: {
    borderColor: BRAND_BLUE,
    backgroundColor: "#FFFFFF",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    paddingVertical: 0,
    paddingHorizontal: 4,
    color: "#0F172A",
    fontSize: 13.5,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  eyeBtn: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    marginRight: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  checkboxLabel: {
    color: "#334155",
    fontSize: 12.5,
    fontWeight: "500",
  },
  link: {
    color: BRAND_BLUE,
    fontSize: 12.5,
    fontWeight: "600",
  },
  linkBold: {
    color: BRAND_BLUE,
    fontSize: 13,
    fontWeight: "700",
  },

  primaryButton: {
    flexDirection: "row",
    backgroundColor: BRAND_BLUE,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 12,
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  bottomText: {
    color: "#64748B",
    fontSize: 12.5,
  },

  homeLinkBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingVertical: 6,
  },
  homeLinkText: {
    color: BRAND_BLUE,
    fontSize: 12.5,
    fontWeight: "600",
  },
  adminPortalBtn: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  adminPortalText: {
    color: BRAND_BLUE,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});