import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ImageBackground,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const {
    isDesktop,
    isTablet,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  const isWide = isDesktop || isTablet;

  // Active tab in sidebar
  const [activeTab, setActiveTab] = useState("General"); // 'General' | 'Profile' | 'Security'

  // Appearance State
  const [selectedTheme, setSelectedTheme] = useState("light"); // 'dark' | 'light'
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Notification Settings State
  const [emailExpeditions, setEmailExpeditions] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  // Feedback states
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSaveChanges = () => {
    setSavedSuccess(true);
    if (Platform.OS !== "web") {
      Alert.alert("Success", "Your account settings have been updated successfully!");
    }
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      if (Platform.OS === "web") {
        alert("Please enter your current password.");
      } else {
        Alert.alert("Validation Error", "Please enter your current password.");
      }
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      if (Platform.OS === "web") {
        alert("New password and confirm password do not match.");
      } else {
        Alert.alert("Error", "New password and confirm password do not match.");
      }
      return;
    }
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setPasswordSuccess(false);
    }, 4000);
  };

  const handleLogout = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to log out from Aces Adventure Club?")) {
        navigation.navigate("Login");
      }
    } else {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => navigation.navigate("Login") },
      ]);
    }
  };

  const handleDeleteAccount = () => {
    if (Platform.OS === "web") {
      if (window.confirm("WARNING: Are you sure you want to permanently delete your account? This action cannot be undone.")) {
        alert("Account deletion request submitted.");
        navigation.navigate("Home");
      }
    } else {
      Alert.alert(
        "Danger Zone",
        "Are you sure you want to permanently delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete Account", style: "destructive", onPress: () => navigation.navigate("Home") },
        ]
      );
    }
  };

  const handleTabClick = (tab) => {
    if (tab === "Profile") {
      navigation.navigate("Profile");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO BANNER & HEADER ================= */}
        <ImageBackground
          source={require("../../assets/hero.jpg")}
          style={[styles.hero, { height: isDesktop ? 360 : 310 }]}
          resizeMode="cover"
        >
          <View style={[styles.heroOverlay, { paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroBannerContent, { maxWidth: contentMaxWidth, width: "100%" }]}>
              <View style={styles.heroBadge}>
                <Ionicons name="settings" size={14} color="#38BDF8" style={{ marginRight: 6 }} />
                <Text style={styles.heroBadgeText}>PREFERENCES & SECURITY</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 40 : isTablet ? 32 : 28 }]}>
                Account <Text style={styles.heroHighlight}>Settings</Text>
              </Text>
              <Text style={[styles.heroSubtitle, { fontSize: isDesktop ? 15 : 13 }]}>
                Manage your club preferences, appearance theme, notification channels, and account credentials.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* ================= MAIN CONTAINER ================= */}
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.contentWrapper,
              {
                maxWidth: contentMaxWidth,
                paddingHorizontal: isDesktop ? 0 : 16,
                marginTop: isDesktop ? -50 : -30,
              },
            ]}
          >
            {/* SUCCESS BANNERS */}
            {savedSuccess && (
              <View style={styles.alertBannerSuccess}>
                <Ionicons name="checkmark-circle" size={22} color="#059669" style={{ marginRight: 10 }} />
                <Text style={styles.alertBannerText}>
                  Your account settings have been saved successfully!
                </Text>
              </View>
            )}

            {passwordSuccess && (
              <View style={styles.alertBannerSuccess}>
                <Ionicons name="shield-checkmark" size={22} color="#059669" style={{ marginRight: 10 }} />
                <Text style={styles.alertBannerText}>
                  Your password has been updated securely.
                </Text>
              </View>
            )}

            {/* TWO COLUMN / SIDEBAR LAYOUT */}
            <View style={[styles.settingsLayout, { flexDirection: isDesktop ? "row" : "column" }]}>
              {/* ================= LEFT SIDEBAR ================= */}
              <View style={[styles.sidebarColumn, { width: isDesktop ? 280 : "100%" }]}>
                <View style={styles.sidebarCard}>
                  {/* User Mini Header */}
                  <View style={styles.userMiniProfile}>
                    <View style={styles.miniAvatarContainer}>
                      <Ionicons name="person" size={24} color="#0B5CAD" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.miniUserName}>Muhammad Arsalan</Text>
                      <Text style={styles.miniUserTier}>Aces Gold Member</Text>
                    </View>
                  </View>

                  <View style={styles.sidebarDivider} />

                  {/* Navigation Tabs */}
                  <View style={styles.sidebarNav}>
                    <TouchableOpacity
                      style={[
                        styles.navTabButton,
                        activeTab === "General" && styles.navTabButtonActive,
                      ]}
                      onPress={() => handleTabClick("General")}
                    >
                      <Ionicons
                        name="options-outline"
                        size={20}
                        color={activeTab === "General" ? "#0B5CAD" : "#64748B"}
                      />
                      <Text
                        style={[
                          styles.navTabText,
                          activeTab === "General" && styles.navTabTextActive,
                        ]}
                      >
                        General
                      </Text>
                      {activeTab === "General" && <View style={styles.activePill} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.navTabButton,
                        activeTab === "Profile" && styles.navTabButtonActive,
                      ]}
                      onPress={() => handleTabClick("Profile")}
                    >
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color={activeTab === "Profile" ? "#0B5CAD" : "#64748B"}
                      />
                      <Text
                        style={[
                          styles.navTabText,
                          activeTab === "Profile" && styles.navTabTextActive,
                        ]}
                      >
                        Profile
                      </Text>
                      <Ionicons name="arrow-forward" size={14} color="#94A3B8" style={{ marginLeft: "auto" }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.navTabButton,
                        activeTab === "Security" && styles.navTabButtonActive,
                      ]}
                      onPress={() => handleTabClick("Security")}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={activeTab === "Security" ? "#0B5CAD" : "#64748B"}
                      />
                      <Text
                        style={[
                          styles.navTabText,
                          activeTab === "Security" && styles.navTabTextActive,
                        ]}
                      >
                        Security
                      </Text>
                      {activeTab === "Security" && <View style={styles.activePill} />}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.sidebarDivider} />

                  {/* Quick Shortcut to Member Support */}
                  <TouchableOpacity
                    style={styles.helpButton}
                    onPress={() => navigation.navigate("Contact")}
                  >
                    <Ionicons name="headset-outline" size={18} color="#0B5CAD" />
                    <Text style={styles.helpButtonText}>Need Help / Support?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* ================= MAIN CONTENT PANELS ================= */}
              <View style={[styles.mainPanelsColumn, { flex: 1 }]}>
                {/* ================= 1. APPEARANCE CARD ================= */}
                <View style={styles.sectionCard}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardHeaderIcon, { backgroundColor: "#EDE9FE" }]}>
                      <Ionicons name="color-palette" size={22} color="#7C3AED" />
                    </View>
                    <View>
                      <Text style={styles.cardHeaderTitle}>Appearance</Text>
                      <Text style={styles.cardHeaderSubtitle}>
                        Customize the visual interface and accessibility settings
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  {/* Theme Mode Selector (Dark Theme / Light Theme) */}
                  <Text style={styles.subsectionLabel}>Interface Theme</Text>
                  <View style={[styles.themeSelectorRow, { flexDirection: isWide ? "row" : "column", gap: 16 }]}>
                    {/* Light Theme Option */}
                    <TouchableOpacity
                      style={[
                        styles.themeOptionCard,
                        selectedTheme === "light" && styles.themeOptionCardSelected,
                        { flex: 1 },
                      ]}
                      activeOpacity={0.85}
                      onPress={() => setSelectedTheme("light")}
                    >
                      <View style={styles.themeIconPreview}>
                        <Ionicons name="sunny" size={24} color="#D97706" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.themeTitleRow}>
                          <Text style={styles.themeOptionTitle}>Light Theme</Text>
                          {selectedTheme === "light" && (
                            <Ionicons name="checkmark-circle" size={18} color="#0B5CAD" />
                          )}
                        </View>
                        <Text style={styles.themeOptionDesc}>Crisp, high-clarity daylight mode</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Dark Theme Option */}
                    <TouchableOpacity
                      style={[
                        styles.themeOptionCard,
                        styles.themeOptionDarkCard,
                        selectedTheme === "dark" && styles.themeOptionCardSelected,
                        { flex: 1 },
                      ]}
                      activeOpacity={0.85}
                      onPress={() => setSelectedTheme("dark")}
                    >
                      <View style={[styles.themeIconPreview, { backgroundColor: "#1E293B" }]}>
                        <Ionicons name="moon" size={24} color="#38BDF8" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.themeTitleRow}>
                          <Text style={[styles.themeOptionTitle, { color: "#0F172A" }]}>Dark Theme</Text>
                          {selectedTheme === "dark" && (
                            <Ionicons name="checkmark-circle" size={18} color="#0B5CAD" />
                          )}
                        </View>
                        <Text style={styles.themeOptionDesc}>Sleek, low-light alpine exploration theme</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* Accessibility Toggles */}
                  <View style={styles.toggleList}>
                    {/* High Contrast */}
                    <View style={styles.toggleRow}>
                      <View style={{ flex: 1, paddingRight: 16 }}>
                        <Text style={styles.toggleLabel}>High Contrast</Text>
                        <Text style={styles.toggleSubtext}>
                          Enhance text legibility and outline contrast across borders
                        </Text>
                      </View>
                      <Switch
                        value={highContrast}
                        onValueChange={setHighContrast}
                        trackColor={{ false: "#E2E8F0", true: "#0B5CAD" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>

                    <View style={styles.innerDivider} />

                    {/* Reduced Motion */}
                    <View style={styles.toggleRow}>
                      <View style={{ flex: 1, paddingRight: 16 }}>
                        <Text style={styles.toggleLabel}>Reduced Motion</Text>
                        <Text style={styles.toggleSubtext}>
                          Minimize parallax motion effects and smooth animations
                        </Text>
                      </View>
                      <Switch
                        value={reducedMotion}
                        onValueChange={setReducedMotion}
                        trackColor={{ false: "#E2E8F0", true: "#0B5CAD" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>
                  </View>
                </View>

                {/* ================= 2. SECURITY CARD ================= */}
                <View style={styles.sectionCard}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardHeaderIcon, { backgroundColor: "#FEF2F2" }]}>
                      <Ionicons name="shield-checkmark" size={22} color="#EF4444" />
                    </View>
                    <View>
                      <Text style={styles.cardHeaderTitle}>Security & Credentials</Text>
                      <Text style={styles.cardHeaderSubtitle}>
                        Update your password and enhance authentication security
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.formGrid}>
                    {/* Current Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Current Password</Text>
                      <View style={styles.inputWrapper}>
                        <Ionicons name="key-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                        <TextInput
                          style={styles.textInput}
                          value={currentPassword}
                          onChangeText={setCurrentPassword}
                          placeholder="Enter your existing password"
                          placeholderTextColor="#94A3B8"
                          secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          style={styles.eyeBtn}
                        >
                          <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={18}
                            color="#94A3B8"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* New Password & Confirm Password */}
                    <View style={[styles.inputRow, { flexDirection: isWide ? "row" : "column", gap: 16 }]}>
                      <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.inputLabel}>New Password</Text>
                        <View style={styles.inputWrapper}>
                          <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                          <TextInput
                            style={styles.textInput}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Min. 8 characters"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                          />
                        </View>
                      </View>

                      <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.inputLabel}>Confirm New Password</Text>
                        <View style={styles.inputWrapper}>
                          <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                          <TextInput
                            style={styles.textInput}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Re-type new password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Update Password Action Button */}
                    <View style={styles.securityActionRow}>
                      <TouchableOpacity
                        style={styles.updatePasswordBtn}
                        activeOpacity={0.85}
                        onPress={handleUpdatePassword}
                      >
                        <Ionicons name="key" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                        <Text style={styles.updatePasswordBtnText}>UPDATE PASSWORD</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.innerDivider} />

                    {/* Two-Factor Authentication */}
                    <View style={styles.toggleRow}>
                      <View style={{ flex: 1, paddingRight: 16 }}>
                        <Text style={styles.toggleLabel}>Two-Factor Authentication (2FA)</Text>
                        <Text style={styles.toggleSubtext}>
                          Require an authentication code via email/SMS when signing in
                        </Text>
                      </View>
                      <Switch
                        value={twoFactorAuth}
                        onValueChange={setTwoFactorAuth}
                        trackColor={{ false: "#E2E8F0", true: "#0B5CAD" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>
                  </View>
                </View>

                {/* ================= 3. NOTIFICATION SETTINGS ================= */}
                <View style={styles.sectionCard}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardHeaderIcon, { backgroundColor: "#FEF3C7" }]}>
                      <Ionicons name="notifications" size={22} color="#D97706" />
                    </View>
                    <View>
                      <Text style={styles.cardHeaderTitle}>Notification Settings</Text>
                      <Text style={styles.cardHeaderSubtitle}>
                        Control which trip updates, expedition notices, and club emails you receive
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.toggleList}>
                    {/* Email Expeditions */}
                    <View style={styles.toggleRow}>
                      <View style={{ flex: 1, paddingRight: 16 }}>
                        <Text style={styles.toggleLabel}>Email Expeditions & Newsletters</Text>
                        <Text style={styles.toggleSubtext}>
                          Receive announcements for upcoming trips, member discounts, and early-bird tickets
                        </Text>
                      </View>
                      <Switch
                        value={emailExpeditions}
                        onValueChange={setEmailExpeditions}
                        trackColor={{ false: "#E2E8F0", true: "#0B5CAD" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>

                    <View style={styles.innerDivider} />

                    {/* Push Alerts */}
                    <View style={styles.toggleRow}>
                      <View style={{ flex: 1, paddingRight: 16 }}>
                        <Text style={styles.toggleLabel}>Push Alerts & Live Weather Notices</Text>
                        <Text style={styles.toggleSubtext}>
                          Real-time alerts regarding booked route departures, weather updates, and guide communications
                        </Text>
                      </View>
                      <Switch
                        value={pushAlerts}
                        onValueChange={setPushAlerts}
                        trackColor={{ false: "#E2E8F0", true: "#0B5CAD" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>

                    <View style={styles.innerDivider} />

                    {/* SMS Alerts */}
                    <View style={styles.toggleRow}>
                      <View style={{ flex: 1, paddingRight: 16 }}>
                        <Text style={styles.toggleLabel}>SMS Critical Updates</Text>
                        <Text style={styles.toggleSubtext}>
                          Urgent emergency and transit notifications sent directly to your phone
                        </Text>
                      </View>
                      <Switch
                        value={smsAlerts}
                        onValueChange={setSmsAlerts}
                        trackColor={{ false: "#E2E8F0", true: "#0B5CAD" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>
                  </View>
                </View>

                {/* ================= BOTTOM ACTION BAR ================= */}
                <View style={styles.bottomActionBar}>
                  <TouchableOpacity
                    style={styles.logoutBtn}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                  >
                    <Ionicons name="log-out-outline" size={18} color="#DC2626" style={{ marginRight: 6 }} />
                    <Text style={styles.logoutBtnText}>Logout</Text>
                  </TouchableOpacity>

                  <View style={styles.primaryActionGroup}>
                    <TouchableOpacity
                      style={styles.discardBtn}
                      activeOpacity={0.8}
                      onPress={() => {
                        setSelectedTheme("light");
                        setHighContrast(false);
                        setReducedMotion(false);
                        setEmailExpeditions(true);
                        setPushAlerts(true);
                        setSmsAlerts(false);
                      }}
                    >
                      <Text style={styles.discardBtnText}>Discard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveChangesBtn}
                      activeOpacity={0.85}
                      onPress={handleSaveChanges}
                    >
                      <Ionicons name="checkmark-done" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                      <Text style={styles.saveChangesBtnText}>SAVE CHANGES</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* ================= 4. DANGER ZONE ================= */}
                <View style={[styles.sectionCard, styles.dangerZoneCard]}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardHeaderIcon, { backgroundColor: "#FEE2E2" }]}>
                      <Ionicons name="warning" size={22} color="#DC2626" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cardHeaderTitle, { color: "#991B1B" }]}>Danger Zone</Text>
                      <Text style={[styles.cardHeaderSubtitle, { color: "#B91C1C" }]}>
                        Irreversible and permanent actions related to your club account
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.cardDivider, { backgroundColor: "#FCA5A5" }]} />

                  <View style={styles.dangerContentRow}>
                    <View style={{ flex: 1, paddingRight: 16 }}>
                      <Text style={styles.dangerHeading}>Delete Account</Text>
                      <Text style={styles.dangerDesc}>
                        Permanently delete your profile, booking records, club points, and historical expedition logs.
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.deleteAccountBtn}
                      activeOpacity={0.85}
                      onPress={handleDeleteAccount}
                    >
                      <Ionicons name="trash-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.deleteAccountBtnText}>Delete Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= FOOTER ================= */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },
  hero: {
    width: "100%",
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(8, 27, 46, 0.7)",
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  heroBannerContent: {
    alignSelf: "center",
    marginTop: 10,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8,
  },
  heroBadgeText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  heroHighlight: {
    color: "#38BDF8",
  },
  heroSubtitle: {
    color: "#E2E8F0",
    maxWidth: 620,
    lineHeight: 22,
  },
  mainContainer: {
    backgroundColor: "#F8FBFF",
    paddingBottom: 40,
  },
  contentWrapper: {
    width: "100%",
    alignSelf: "center",
  },
  alertBannerSuccess: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  alertBannerText: {
    color: "#065F46",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  settingsLayout: {
    gap: 24,
  },
  sidebarColumn: {
    width: "100%",
  },
  sidebarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  userMiniProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  miniAvatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#BFDBFE",
  },
  miniUserName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  miniUserTier: {
    fontSize: 12,
    color: "#0B5CAD",
    fontWeight: "600",
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 16,
  },
  sidebarNav: {
    gap: 6,
  },
  navTabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    cursor: "pointer",
    position: "relative",
  },
  navTabButtonActive: {
    backgroundColor: "#EFF6FF",
  },
  navTabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
  navTabTextActive: {
    color: "#0B5CAD",
    fontWeight: "700",
  },
  activePill: {
    position: "absolute",
    right: 0,
    width: 4,
    height: 20,
    backgroundColor: "#0B5CAD",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    cursor: "pointer",
  },
  helpButtonText: {
    color: "#0B5CAD",
    fontSize: 13,
    fontWeight: "600",
  },
  mainPanelsColumn: {
    gap: 24,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 26,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  cardHeaderIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardHeaderSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 20,
  },
  subsectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  themeSelectorRow: {
    marginBottom: 20,
  },
  themeOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    cursor: "pointer",
  },
  themeOptionDarkCard: {
    backgroundColor: "#F1F5F9",
  },
  themeOptionCardSelected: {
    borderColor: "#0B5CAD",
    backgroundColor: "#EFF6FF",
  },
  themeIconPreview: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  themeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeOptionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  themeOptionDesc: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  toggleList: {
    gap: 14,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  toggleSubtext: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  innerDivider: {
    height: 1,
    backgroundColor: "#F8FAFC",
  },
  formGrid: {
    gap: 16,
  },
  inputGroup: {
    width: "100%",
  },
  inputRow: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "web" ? 12 : 8,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    outlineStyle: "none",
  },
  eyeBtn: {
    padding: 4,
    cursor: "pointer",
  },
  securityActionRow: {
    marginTop: 4,
  },
  updatePasswordBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#0F172A",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    cursor: "pointer",
  },
  updatePasswordBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  bottomActionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
    cursor: "pointer",
  },
  logoutBtnText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "700",
  },
  primaryActionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  discardBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
  },
  discardBtnText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
  saveChangesBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 10,
    cursor: "pointer",
    shadowColor: "#0B5CAD",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  saveChangesBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dangerZoneCard: {
    borderColor: "#FECACA",
    backgroundColor: "#FFF5F5",
  },
  dangerContentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  dangerHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#991B1B",
  },
  dangerDesc: {
    fontSize: 13,
    color: "#B91C1C",
    marginTop: 4,
    lineHeight: 18,
  },
  deleteAccountBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC2626",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    cursor: "pointer",
  },
  deleteAccountBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
