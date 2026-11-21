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
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import AdventureBearMascot from "../components/AdventureBearMascot";

const heroImage = require("../../assets/adventure-bg.jpg");
const logoImage = require("../../assets/logo.png");

const getAuthErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred. Please try again.";
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please sign in instead.";
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/operation-not-allowed":
      return "Email/password registration is not enabled in Firebase Console.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet.";
    case "auth/too-many-requests":
      return "Too many attempts. Access is temporarily blocked. Please try again later.";
    default:
      return error.message || "Registration failed. Please try again.";
  }
};

export default function SignupScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  // Mascot covers eyes when ANY password eye toggle is ON (password exposed)
  const isPasswordVisible = showPassword || showConfirmPassword;

  const isLookingDown =
    focusedField === "fullName" ||
    focusedField === "email" ||
    focusedField === "phone" ||
    focusedField === "location";

  const handleCreateAccount = async () => {
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number");
      return;
    }
    if (!location.trim()) {
      setErrorMessage("Please enter your city / location");
      return;
    }
    if (!password) {
      setErrorMessage("Please create a password");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!agreed) {
      setErrorMessage("Please agree to the Terms and Conditions");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const uid = userCredential.user.uid;

      if (fullName.trim()) {
        try {
          await updateProfile(userCredential.user, {
            displayName: fullName.trim(),
          });
          if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(
              `aces_club_user_profile_${uid}`,
              JSON.stringify({
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                location: location.trim(),
                aboutMe: "High-altitude trekking enthusiast, landscape photographer, and passionate mountain explorer.",
                membershipTier: "Aces Elite Gold",
                role: "Expedition Explorer • Aces Club Member",
                joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
              })
            );
          }
        } catch (profileErr) {
          console.warn("[AUTH_SIGNUP_DEBUG] Could not update displayName:", profileErr);
        }
      }

      // Create Firestore user document in `users/{uid}`
      const formattedJoined = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      const userDocRef = doc(db, "users", uid);
      const payload = {
        uid: uid,
        name: fullName.trim(),
        email: email.trim(),
        role: "Member",
        status: "ACTIVE",
        phone: phone.trim(),
        location: location.trim(),
        joined: formattedJoined,
        createdAt: serverTimestamp(),
      };

      try {
        await setDoc(userDocRef, payload, { merge: true });
      } catch (firestoreErr) {
        console.error("[AUTH_SIGNUP_DEBUG] Firestore write error:", firestoreErr?.message);
      }

      // Send Firebase email verification link
      try {
        await sendEmailVerification(userCredential.user);
      } catch (verificationErr) {
        console.warn("[AUTH_SIGNUP_DEBUG] Error sending email verification:", verificationErr);
      }

      setLoading(false);
      navigation?.navigate("EmailVerification", {
        email: email.trim(),
        justSignedUp: true,
      });
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
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
              <Text style={styles.backBtnText}>Home</Text>
            </TouchableOpacity>

            {/* Hero content for Desktop */}
            {isWide && (
              <View style={styles.heroContent}>
                <Image source={logoImage} style={styles.heroLogo} />
                <View style={styles.heroBadge}>
                  <Ionicons name="compass" size={13} color="#FFD700" style={{ marginRight: 6 }} />
                  <Text style={styles.heroBadgeText}>JOIN EXPEDITION ALPHA</Text>
                </View>
                <Text style={styles.heroTitle}>
                  The peaks are calling only those who dare.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Unlock access to curated Himalayan expeditions, private chalets, expert mountain guides, and a global club of adventurers.
                </Text>
                <View style={styles.heroStatsRow}>
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatVal}>40+</Text>
                    <Text style={styles.heroStatLbl}>Expeditions</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatVal}>12k+</Text>
                    <Text style={styles.heroStatLbl}>Adventurers</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatVal}>100%</Text>
                    <Text style={styles.heroStatLbl}>Verified Safe</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Mobile Header Banner */}
            {!isWide && (
              <View style={styles.mobileHeroContent}>
                <Image source={logoImage} style={styles.mobileHeroLogo} />
                <Text style={styles.mobileHeroTitle}>Create Explorer Account</Text>
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
                isPasswordVisible={isPasswordVisible}
                isLookingDown={isLookingDown}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.badge}>
                <Ionicons name="sparkles" size={12} color="#0B5CAD" style={{ marginRight: 5 }} />
                <Text style={styles.badgeText}>JOIN THE COMMUNITY 🏔️</Text>
              </View>

              <Text style={styles.title}>Create Your Explorer Account</Text>
              <Text style={styles.subtitle}>
                Begin discovering breathtaking destinations and tailored luxury expeditions.
              </Text>

              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle" size={16} color="#EF4444" />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              {/* Form Fields: Row 1 - Name & Email */}
              <View style={isWide ? styles.fieldRow : styles.fieldColumn}>
                <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                  <Text style={styles.fieldLabel}>FULL NAME</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedField === "fullName" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={17}
                      color={focusedField === "fullName" ? "#0B5CAD" : "#64748B"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Johnathan Doe"
                      placeholderTextColor="#94A3B8"
                      value={fullName}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField(null)}
                      onChangeText={(t) => {
                        setFullName(t);
                        if (errorMessage) setErrorMessage("");
                      }}
                    />
                  </View>
                </View>

                <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                  <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
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
                      placeholder="explorer@club.com"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={email}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChangeText={(t) => {
                        setEmail(t);
                        if (errorMessage) setErrorMessage("");
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Form Fields: Row 2 - Phone & City/Location */}
              <View style={isWide ? styles.fieldRow : styles.fieldColumn}>
                <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                  <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedField === "phone" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Ionicons
                      name="call-outline"
                      size={17}
                      color={focusedField === "phone" ? "#0B5CAD" : "#64748B"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="+92 300 1234567"
                      placeholderTextColor="#94A3B8"
                      keyboardType="phone-pad"
                      value={phone}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      onChangeText={(t) => {
                        setPhone(t);
                        if (errorMessage) setErrorMessage("");
                      }}
                    />
                  </View>
                </View>

                <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                  <Text style={styles.fieldLabel}>CITY / LOCATION</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedField === "location" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Ionicons
                      name="location-outline"
                      size={17}
                      color={focusedField === "location" ? "#0B5CAD" : "#64748B"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Islamabad, Pakistan"
                      placeholderTextColor="#94A3B8"
                      value={location}
                      onFocus={() => setFocusedField("location")}
                      onBlur={() => setFocusedField(null)}
                      onChangeText={(t) => {
                        setLocation(t);
                        if (errorMessage) setErrorMessage("");
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Form Fields: Row 3 - Password & Confirm Password */}
              <View style={isWide ? styles.fieldRow : styles.fieldColumn}>
                <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                  <View style={styles.passwordLabelRow}>
                    <Text style={styles.fieldLabel}>PASSWORD</Text>
                    {showPassword ? (
                      <Text style={styles.bearHintText}>🙈 Mascot eyes covered</Text>
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
                      style={styles.input}
                      placeholder="Min 6 characters"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      value={password}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
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
                        size={18}
                        color={showPassword ? "#0B5CAD" : "#64748B"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                  <View style={styles.passwordLabelRow}>
                    <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                    {showConfirmPassword ? (
                      <Text style={styles.bearHintText}>🙈 Mascot eyes covered</Text>
                    ) : null}
                  </View>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedField === "confirmPassword" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={17}
                      color={focusedField === "confirmPassword" ? "#0B5CAD" : "#64748B"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Repeat password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showConfirmPassword}
                      returnKeyType="go"
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      onSubmitEditing={handleCreateAccount}
                      value={confirmPassword}
                      onChangeText={(t) => {
                        setConfirmPassword(t);
                        if (errorMessage) setErrorMessage("");
                      }}
                    />
                    <TouchableOpacity
                      onPress={(e) => {
                        if (e && typeof e.preventDefault === "function") e.preventDefault();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      style={styles.eyeBtn}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color={showConfirmPassword ? "#0B5CAD" : "#64748B"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Terms and conditions */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgreed(!agreed)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                  {agreed && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.termsText}>
                  I agree to the <Text style={styles.link}>Terms & Conditions</Text> and the{" "}
                  <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleCreateAccount}
                activeOpacity={0.85}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.primaryButtonText}>Creating Account...</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>Create Explorer Account</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
                  </>
                )}
              </TouchableOpacity>

              {/* Sign In Link */}
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                  <Text style={styles.linkBold}>Sign In</Text>
                </TouchableOpacity>
              </View>
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
    width: "44%",
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
    marginBottom: 16,
  },
  heroStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  heroStatItem: {
    alignItems: "center",
  },
  heroStatVal: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  heroStatLbl: {
    color: "#BAE6FD",
    fontSize: 10.5,
    fontWeight: "600",
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 22,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
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
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  formPanelNarrow: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  mascotWrapper: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    marginBottom: -4,
  },

  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 20,
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
    paddingVertical: 3.5,
    paddingHorizontal: 12,
    marginBottom: 10,
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
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 17,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 11.5,
    marginLeft: 6,
    flex: 1,
    lineHeight: 16,
  },

  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  fieldColumn: {
    flexDirection: "column",
    width: "100%",
  },
  fieldHalf: {
    width: "48%",
    marginBottom: 10,
  },
  fieldFull: {
    width: "100%",
    marginBottom: 10,
  },
  fieldLabel: {
    color: DARK_BLUE,
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.6,
    marginBottom: 5,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  bearHintText: {
    color: BRAND_BLUE,
    fontSize: 10,
    fontWeight: "700",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    paddingLeft: 10,
    paddingRight: 6,
    height: 44,
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
    marginRight: 6,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    paddingVertical: 0,
    paddingHorizontal: 4,
    color: "#0F172A",
    fontSize: 13,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  eyeBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 14,
    width: "100%",
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  termsText: {
    flex: 1,
    color: "#475569",
    fontSize: 12,
    lineHeight: 16,
  },
  link: {
    color: BRAND_BLUE,
    fontWeight: "600",
  },
  linkBold: {
    color: BRAND_BLUE,
    fontWeight: "700",
    fontSize: 13,
  },

  primaryButton: {
    flexDirection: "row",
    backgroundColor: BRAND_BLUE,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
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
    fontSize: 13.5,
    letterSpacing: 0.3,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "#64748B",
    fontSize: 12.5,
  },

  homeLinkBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 6,
  },
  homeLinkText: {
    color: BRAND_BLUE,
    fontSize: 12.5,
    fontWeight: "600",
  },
});