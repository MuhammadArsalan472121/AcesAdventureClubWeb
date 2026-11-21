import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  AppState,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "./firebaseConfig";
import { useAuth } from "../context/AuthContext";
import AdventureBearMascot from "../components/AdventureBearMascot";

const heroImage = require("../../assets/adventure-bg.jpg");
const logoImage = require("../../assets/logo.png");

const RESEND_COOLDOWN_SECONDS = 60;

export default function EmailVerificationScreen({ route, navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const { user, reloadUser, sendVerificationEmail, logout } = useAuth();

  // Route parameters (fallback if user is not yet set in context)
  const routeEmail = route?.params?.email;
  const justSignedUp = route?.params?.justSignedUp;
  const requiresVerification = route?.params?.requiresVerification;

  const displayEmail = user?.email || routeEmail || "your registered email";

  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(justSignedUp ? RESEND_COOLDOWN_SECONDS : 0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    justSignedUp
      ? "Account created successfully! We have sent a verification link to your email."
      : requiresVerification
      ? "Email verification is required before accessing your account."
      : ""
  );
  const [isVerified, setIsVerified] = useState(false);

  const cooldownTimerRef = useRef(null);

  // Countdown timer for resend button
  useEffect(() => {
    if (cooldown > 0) {
      cooldownTimerRef.current = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, [cooldown]);

  // Check verification status
  const handleCheckVerification = useCallback(
    async (isSilent = false) => {
      if (!isSilent) {
        setChecking(true);
        setErrorMessage("");
      }

      try {
        const refreshedUser = await reloadUser();
        const verified = refreshedUser?.emailVerified || auth.currentUser?.emailVerified;

        if (verified) {
          setIsVerified(true);
          setSuccessMessage("Your email has been verified! Redirecting to Home...");
          setErrorMessage("");
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }, 1200);
        } else if (!isSilent) {
          setErrorMessage(
            "Your email is not verified yet. Please open the email sent to you, click the verification link, and try again."
          );
        }
      } catch (err) {
        console.error("Error checking verification:", err);
        if (!isSilent) {
          setErrorMessage("Failed to check status. Please check your internet connection.");
        }
      } finally {
        if (!isSilent) {
          setChecking(false);
        }
      }
    },
    [reloadUser, navigation]
  );

  // Auto-check on app resume or window focus (when user returns from email client)
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active" && !isVerified) {
        handleCheckVerification(true);
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    // On Web, listen to window focus event
    let handleWebFocus;
    if (Platform.OS === "web" && typeof window !== "undefined") {
      handleWebFocus = () => {
        if (!isVerified) {
          handleCheckVerification(true);
        }
      };
      window.addEventListener("focus", handleWebFocus);
    }

    return () => {
      subscription.remove();
      if (Platform.OS === "web" && typeof window !== "undefined" && handleWebFocus) {
        window.removeEventListener("focus", handleWebFocus);
      }
    };
  }, [handleCheckVerification, isVerified]);

  // Resend verification email
  const handleResendEmail = async () => {
    if (cooldown > 0 || resending) return;

    setResending(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await sendVerificationEmail();
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setSuccessMessage("A fresh verification link has been sent to your email. Please check your inbox and spam folder.");
    } catch (err) {
      console.error("Resend verification error:", err);
      if (err?.code === "auth/too-many-requests") {
        setErrorMessage("Too many requests. Please wait a few moments before requesting another link.");
      } else {
        setErrorMessage(err?.message || "Failed to resend verification email. Please try again.");
      }
    } finally {
      setResending(false);
    }
  };

  // Sign out / switch account
  const handleSignOut = async () => {
    try {
      await logout();
      navigation.navigate("Login");
    } catch (err) {
      console.error("Sign out error:", err);
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Image source={heroImage} style={styles.heroImageBg} resizeMode="cover" />
          <View style={styles.heroOverlay} />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              if (navigation?.canGoBack && navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("Home");
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
                <Ionicons name="shield-checkmark" size={13} color="#ffd700" style={{ marginRight: 6 }} />
                <Text style={styles.heroBadgeText}>SECURITY & VERIFICATION</Text>
              </View>
              <Text style={styles.heroTitle}>The journey begins with verified access.</Text>
              <Text style={styles.heroSubtitle}>
                To safeguard our global community of adventurers and secure your expedition bookings, please confirm your email address.
              </Text>
            </View>
          )}

          {/* Mobile Header Content */}
          {!isWide && (
            <View style={styles.mobileHeroContent}>
              <Image source={logoImage} style={styles.mobileHeroLogo} />
              <Text style={styles.mobileHeroTitle}>Verify Your Email</Text>
            </View>
          )}
        </View>

        {/* ================= RIGHT / CONTENT PANEL (BRIGHT & BLUE) ================= */}
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
              isLookingDown={false}
            />
          </View>

          <View style={styles.card}>
            <View style={styles.badge}>
              <Ionicons name={isVerified ? "checkmark-circle" : "mail-outline"} size={13} color="#0B5CAD" style={{ marginRight: 5 }} />
              <Text style={styles.badgeText}>
                {isVerified ? "VERIFIED ACCOUNT" : "ACTION REQUIRED ✉️"}
              </Text>
            </View>

            <Text style={styles.title}>
              {isVerified ? "Email Verified!" : "Verify Your Email"}
            </Text>

            <Text style={styles.subtitle}>
              {isVerified
                ? "Your email address has been confirmed. You now have full access to Aces Adventure Club."
                : "We have sent a verification link to your registered email address. Please click the link to activate your account."}
            </Text>

            {/* Email Address Highlight Chip */}
            <View style={styles.emailChip}>
              <Ionicons name="mail" size={16} color="#0B5CAD" style={{ marginRight: 8 }} />
              <Text style={styles.emailChipText} numberOfLines={1} ellipsizeMode="middle">
                {displayEmail}
              </Text>
            </View>

            {/* Success Message Banner */}
            {successMessage ? (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#059669" />
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}

            {/* Error Message Banner */}
            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={18} color="#DC2626" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Spam folder reminder */}
            {!isVerified && (
              <View style={styles.infoBox}>
                <Ionicons name="information-circle-outline" size={18} color="#0B5CAD" style={{ marginRight: 8, marginTop: 1 }} />
                <Text style={styles.infoText}>
                  {"Can't find the email? Please check your "}<Text style={styles.infoHighlight}>Spam</Text>{" or "}<Text style={styles.infoHighlight}>Junk</Text>{" folder. It might take up to a minute to arrive."}
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            {!isVerified && (
              <View style={styles.actionsContainer}>
                {/* Button 1: "I've Verified My Email" */}
                <TouchableOpacity
                  style={[styles.primaryButton, checking && styles.buttonDisabled]}
                  onPress={() => handleCheckVerification(false)}
                  activeOpacity={0.85}
                  disabled={checking}
                >
                  {checking ? (
                    <>
                      <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                      <Text style={styles.primaryButtonText}>Checking Status...</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="checkmark-done" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                      <Text style={styles.primaryButtonText}>{"I've Verified My Email"}</Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Button 2: Resend Verification Email */}
                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    (cooldown > 0 || resending) && styles.buttonDisabled,
                  ]}
                  onPress={handleResendEmail}
                  activeOpacity={0.85}
                  disabled={cooldown > 0 || resending}
                >
                  {resending ? (
                    <>
                      <ActivityIndicator size="small" color="#0B5CAD" style={{ marginRight: 8 }} />
                      <Text style={styles.secondaryButtonText}>Sending Link...</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="paper-plane-outline" size={16} color={cooldown > 0 ? "#94A3B8" : "#0B5CAD"} style={{ marginRight: 8 }} />
                      <Text
                        style={[
                          styles.secondaryButtonText,
                          cooldown > 0 && { color: "#94A3B8" },
                        ]}
                      >
                        {cooldown > 0
                          ? `Resend Link (${cooldown}s)`
                          : "Resend Verification Email"}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Expired Link Guidance */}
            {!isVerified && (
              <View style={styles.helpRow}>
                <Ionicons name="help-circle-outline" size={14} color="#64748B" style={{ marginRight: 5 }} />
                <Text style={styles.helpText}>
                  Link expired? Request a fresh link above to verify your account.
                </Text>
              </View>
            )}

            {/* Divider */}
            <View style={styles.divider} />

            {/* Bottom Options: Sign in with another account / Logout */}
            <View style={styles.bottomNavRow}>
              <TouchableOpacity
                style={styles.switchAccountBtn}
                onPress={handleSignOut}
                activeOpacity={0.7}
              >
                <Ionicons name="log-out-outline" size={16} color="#64748B" style={{ marginRight: 6 }} />
                <Text style={styles.switchAccountText}>Sign in with a different account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Return to Home link */}
          <TouchableOpacity
            style={styles.homeLinkBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="home-outline" size={16} color="#0B5CAD" style={{ marginRight: 6 }} />
            <Text style={styles.homeLinkText}>Return to Home Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BRAND_BLUE = "#0B5CAD";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F7FF",
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
    fontSize: 32,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#FFFFFF",
    lineHeight: 40,
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
    alignItems: "center",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: "#EBF5FF",
  },
  badgeText: {
    color: BRAND_BLUE,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  title: {
    fontSize: 26,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13.5,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 8,
  },

  emailChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginBottom: 18,
    maxWidth: "100%",
  },
  emailChipText: {
    color: "#0F172A",
    fontWeight: "600",
    fontSize: 14,
    flexShrink: 1,
  },

  successBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    width: "100%",
  },
  successText: {
    color: "#065F46",
    fontSize: 12.5,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    width: "100%",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12.5,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    width: "100%",
    borderLeftWidth: 3,
    borderLeftColor: BRAND_BLUE,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  infoText: {
    color: "#475569",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  infoHighlight: {
    color: "#0F172A",
    fontWeight: "700",
  },

  actionsContainer: {
    width: "100%",
    gap: 12,
  },

  primaryButton: {
    flexDirection: "row",
    backgroundColor: BRAND_BLUE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    width: "100%",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14.5,
    letterSpacing: 0.3,
  },

  secondaryButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: BRAND_BLUE,
    width: "100%",
  },
  secondaryButtonText: {
    color: BRAND_BLUE,
    fontWeight: "700",
    fontSize: 13.5,
    letterSpacing: 0.3,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  helpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingHorizontal: 8,
  },
  helpText: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 18,
  },

  bottomNavRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  switchAccountBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  switchAccountText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
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
