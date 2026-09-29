import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export default function AdminLoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 800;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getAuthErrorMessage = (error) => {
    switch (error?.code) {
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid administrator credentials.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network connection error. Please try again.";
      case "auth/user-disabled":
        return "This administrator account has been disabled.";
      default:
        return error?.message || "Authentication failed. Please verify your credentials.";
    }
  };

  const handleAdminLogin = async () => {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage("Please enter admin username or email");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter admin security key / password");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      // Authenticate against Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const uid = userCredential.user.uid;

      // Read user document from Firestore users/{uid}
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await signOut(auth);
        setLoading(false);
        setErrorMessage("Access Denied: Admin profile document not found in Firestore.");
        return;
      }

      const userData = userDocSnap.data();
      const role = userData?.role ? String(userData.role).toLowerCase() : "";

      // Verify role is "admin" or "super_admin"
      if (role === "admin" || role === "super_admin") {
        setLoading(false);
        navigation?.navigate("AdminDashboard");
      } else {
        // Access Denied for regular members or unrecognized roles
        await signOut(auth);
        setLoading(false);
        setErrorMessage(
          `Access Denied: Account '${cleanEmail}' is registered as '${userData?.role || "member"}'. Admin privileges required.`
        );
      }
    } catch (error) {
      console.error("[ADMIN_AUTH_ERROR]", error);
      setLoading(false);
      setErrorMessage(getAuthErrorMessage(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.loginCard, isWide && styles.loginCardWide]}>
          {/* Header Badge */}
          <View style={styles.topBadgeRow}>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark" size={14} color="#38BDF8" style={{ marginRight: 6 }} />
              <Text style={styles.badgeText}>ACES ADVENTURE CLUB</Text>
            </View>
            <TouchableOpacity
              style={styles.exitBtn}
              onPress={() => navigation?.navigate("Home")}
            >
              <Ionicons name="arrow-back" size={14} color="#94A3B8" style={{ marginRight: 4 }} />
              <Text style={styles.exitBtnText}>Website</Text>
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.headerBox}>
            <View style={styles.iconCircle}>
              <Ionicons name="hardware-chip-outline" size={28} color="#38BDF8" />
            </View>
            <Text style={styles.mainTitle}>Admin Control Console</Text>
            <Text style={styles.subTitle}>
              Authorized club administrators and operators access portal.
            </Text>
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={18} color="#EF4444" style={{ marginRight: 8 }} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Form */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ADMIN IDENTIFIER / EMAIL</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter admin email address"
                  placeholderTextColor="#475569"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SECURITY KEY / PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#475569"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
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
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.7 }]}
              onPress={handleAdminLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#0F172A" style={{ marginRight: 8 }} />
              ) : (
                <Ionicons name="log-in" size={18} color="#0F172A" style={{ marginRight: 8 }} />
              )}
              <Text style={styles.submitButtonText}>
                {loading ? "AUTHENTICATING..." : "ACCESS ADMIN CONSOLE"}
              </Text>
            </TouchableOpacity>

            {/* Direct Back to Website */}
            <TouchableOpacity
              style={styles.backHomeBtn}
              onPress={() => navigation?.navigate("Home")}
            >
              <Text style={styles.backHomeText}>Return to Aces Adventure Public Website ➔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B132B",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#0B132B",
    minHeight: Platform.OS === "web" ? "100vh" : "100%",
  },
  loginCard: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#16233B",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  loginCardWide: {
    padding: 40,
  },
  topBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  exitBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  exitBtnText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  headerBox: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    borderWidth: 1.5,
    borderColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 18,
  },
  demoCredentialsBox: {
    backgroundColor: "rgba(2, 132, 199, 0.1)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    marginBottom: 20,
  },
  demoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  demoTitle: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
    flex: 1,
  },
  quickFillBtn: {
    backgroundColor: "#0284C7",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  quickFillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  demoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  demoLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },
  demoVal: {
    color: "#F1F5F9",
    fontSize: 12,
    fontWeight: "600",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "rgba(239, 68, 68, 0.4)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#FCA5A5",
    fontSize: 13,
    flex: 1,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D182A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2B3C58",
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    height: "100%",
  },
  eyeBtn: {
    padding: 6,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#38BDF8",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: "#38BDF8",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  submitButtonText: {
    color: "#0B132B",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  backHomeBtn: {
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 4,
  },
  backHomeText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
});
