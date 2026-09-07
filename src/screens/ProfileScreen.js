import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {
    isDesktop,
    isTablet,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  const isWide = isDesktop || isTablet;
  const { user, userProfile, updateUserProfile, loading } = useAuth();

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || user?.displayName || "");
      setEmail(user?.email || userProfile.email || "");
      setPhone(userProfile.phone || "");
      setLocation(userProfile.location || "");
      setAboutMe(userProfile.aboutMe || "");
    }
  }, [userProfile, user]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      if (Platform.OS === "web") {
        alert("Please enter your full name.");
      } else {
        Alert.alert("Validation Error", "Please enter your full name.");
      }
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        location: location.trim(),
        aboutMe: aboutMe.trim(),
      });
      setSavedSuccess(true);
      if (Platform.OS !== "web") {
        Alert.alert("Success", "Your profile details have been saved successfully!");
      }
      setTimeout(() => {
        setSavedSuccess(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      if (Platform.OS === "web") {
        alert("Failed to update profile: " + (err.message || "Unknown error"));
      } else {
        Alert.alert("Error", err.message || "Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (userProfile) {
      setFullName(userProfile.fullName || user?.displayName || "");
      setEmail(user?.email || userProfile.email || "");
      setPhone(userProfile.phone || "");
      setLocation(userProfile.location || "");
      setAboutMe(userProfile.aboutMe || "");
    }
  };

  const favoriteDestinations = [
    { name: "Hunza Valley", tag: "Gilgit-Baltistan" },
    { name: "Fairy Meadows & Nanga Parbat", tag: "Diamer" },
    { name: "Skardu & Shangrila", tag: "Baltistan" },
    { name: "Deosai National Park", tag: "Plateau" },
    { name: "K2 Basecamp", tag: "Concordia" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO & HEADER ================= */}
        <ImageBackground
          source={require("../../assets/hero.jpg")}
          style={[styles.hero, { height: isDesktop ? 480 : 420 }]}
          resizeMode="cover"
        >
          <View style={[styles.heroOverlay, { paddingHorizontal }]}>
            {/* Embedded Header Navbar */}
            <Header />

            {/* Hero Main Banner Content */}
            <View style={[styles.heroContentWrapper, { maxWidth: contentMaxWidth, width: "100%" }]}>
              <View style={styles.heroBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#38BDF8" style={{ marginRight: 6 }} />
                <Text style={styles.heroBadgeText}>VERIFIED ADVENTURER</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 46 : isTablet ? 36 : 30 }]}>
                My <Text style={styles.heroHighlight}>Profile</Text>
              </Text>
              <Text style={[styles.heroSubtitle, { fontSize: isDesktop ? 16 : 14 }]}>
                Manage your personal details, expedition logs, and Aces Club membership perks.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* ================= MAIN CONTENT SECTION ================= */}
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.contentWrapper,
              {
                maxWidth: contentMaxWidth,
                paddingHorizontal: isDesktop ? 0 : 16,
                marginTop: isDesktop ? -90 : -60,
              },
            ]}
          >
            {!user ? (
              <View style={styles.notLoggedInCard}>
                <Ionicons name="lock-closed" size={48} color="#0B5CAD" style={{ marginBottom: 16 }} />
                <Text style={styles.notLoggedInTitle}>Account Authentication Required</Text>
                <Text style={styles.notLoggedInSubtitle}>
                  Please sign in to your Aces Adventure Club account to view and manage your expedition profile, preferences, and club membership benefits.
                </Text>
                <View style={styles.notLoggedInBtnRow}>
                  <TouchableOpacity
                    style={styles.notLoggedInLoginBtn}
                    onPress={() => navigation.navigate("Login")}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="log-in-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.notLoggedInLoginText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.notLoggedInSignupBtn}
                    onPress={() => navigation.navigate("Signup")}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.notLoggedInSignupText}>Create New Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                {/* AVATAR FLOATING BAR */}
                <View style={styles.avatarCard}>
                  <View style={styles.avatarRow}>
                    <View style={styles.avatarContainer}>
                      <Image
                        source={require("../../assets/partnerProfile.jpg")}
                        style={styles.avatarImage}
                      />
                      <TouchableOpacity
                        style={styles.avatarEditBadge}
                        activeOpacity={0.8}
                        onPress={() => {
                          if (Platform.OS === "web") {
                            alert("Profile photo update opened. You can choose a new avatar image.");
                          } else {
                            Alert.alert("Photo Upload", "Photo upload feature opened.");
                          }
                        }}
                      >
                        <Ionicons name="camera" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.avatarInfo}>
                      <View style={styles.nameHeaderRow}>
                        <Text style={styles.profileName}>{fullName || user?.displayName || "Explorer"}</Text>
                        <View style={styles.vipBadge}>
                          <Ionicons name="sparkles" size={12} color="#F59E0B" />
                          <Text style={styles.vipBadgeText}>{userProfile?.membershipTier || "ELITE GOLD"}</Text>
                        </View>
                      </View>
                      <Text style={styles.profileRole}>{userProfile?.role || "Expedition Explorer • Aces Club Member"}</Text>
                      <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                          <Ionicons name="location-outline" size={14} color="#64748B" />
                          <Text style={styles.metaText}>{location || "Islamabad, Pakistan"}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="calendar-outline" size={14} color="#64748B" />
                          <Text style={styles.metaText}>{userProfile?.joinedDate || "Member"}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Direct quick link to Settings */}
                    <TouchableOpacity
                      style={styles.settingsQuickBtn}
                      onPress={() => navigation.navigate("Settings")}
                    >
                      <Ionicons name="settings-outline" size={18} color="#0B5CAD" />
                      {isDesktop && <Text style={styles.settingsQuickText}>Account Settings</Text>}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* SUCCESS BANNER */}
                {savedSuccess && (
                  <View style={styles.successBanner}>
                    <Ionicons name="checkmark-circle" size={22} color="#059669" style={{ marginRight: 10 }} />
                    <Text style={styles.successBannerText}>
                      Your profile changes have been saved successfully!
                    </Text>
                  </View>
                )}

                {/* TWO-COLUMN LAYOUT (DESKTOP) / STACK (MOBILE) */}
                <View style={[styles.gridRow, { flexDirection: isDesktop ? "row" : "column" }]}>
                  {/* ================= LEFT COLUMN: EDITABLE FORM ================= */}
                  <View style={[styles.leftFormColumn, { flex: isDesktop ? 1.6 : 1 }]}>
                    <View style={styles.formCard}>
                      <View style={styles.cardHeader}>
                        <View style={styles.cardIconBox}>
                          <Ionicons name="person" size={20} color="#0B5CAD" />
                        </View>
                        <View>
                          <Text style={styles.cardTitle}>Personal Information</Text>
                          <Text style={styles.cardSubtitle}>
                            Update your personal and contact details for bookings
                          </Text>
                        </View>
                      </View>

                      <View style={styles.divider} />

                      <View style={styles.formFields}>
                        {/* Full Name */}
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>
                            Full Name <Text style={styles.requiredStar}>*</Text>
                          </Text>
                          <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                            <TextInput
                              style={styles.textInput}
                              value={fullName}
                              onChangeText={setFullName}
                              placeholder="Enter your full name"
                              placeholderTextColor="#94A3B8"
                            />
                          </View>
                        </View>

                        {/* Email & Phone in a row on wide screen */}
                        <View style={[styles.inputRow, { flexDirection: isWide ? "row" : "column", gap: 16 }]}>
                          <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>
                              Email Address (Account)
                            </Text>
                            <View style={[styles.inputWrapper, { backgroundColor: "#F8FAFC" }]}>
                              <Ionicons name="mail-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                              <TextInput
                                style={[styles.textInput, { color: "#64748B" }]}
                                value={email}
                                editable={false}
                                placeholder="Email address"
                                placeholderTextColor="#94A3B8"
                              />
                            </View>
                          </View>

                          <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Phone Number</Text>
                            <View style={styles.inputWrapper}>
                              <Ionicons name="call-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                              <TextInput
                                style={styles.textInput}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="+92 300 0000000"
                                placeholderTextColor="#94A3B8"
                                keyboardType="phone-pad"
                              />
                            </View>
                          </View>
                        </View>

                        {/* Location */}
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Location / City</Text>
                          <View style={styles.inputWrapper}>
                            <Ionicons name="location-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
                            <TextInput
                              style={styles.textInput}
                              value={location}
                              onChangeText={setLocation}
                              placeholder="City, Country"
                              placeholderTextColor="#94A3B8"
                            />
                          </View>
                        </View>

                        {/* About Me */}
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>About Me & Adventure Bio</Text>
                          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                            <TextInput
                              style={[styles.textInput, styles.textAreaInput]}
                              value={aboutMe}
                              onChangeText={setAboutMe}
                              placeholder="Tell fellow adventurers about your travel interests, trekking experience, and passion for the wild..."
                              placeholderTextColor="#94A3B8"
                              multiline
                              numberOfLines={4}
                              textAlignVertical="top"
                            />
                          </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.buttonRow}>
                          <TouchableOpacity
                            style={[styles.saveButton, saving && { opacity: 0.7 }]}
                            activeOpacity={0.85}
                            onPress={handleSave}
                            disabled={saving}
                          >
                            {saving ? (
                              <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                            ) : (
                              <Ionicons name="save-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                            )}
                            <Text style={styles.saveButtonText}>{saving ? "SAVING..." : "SAVE CHANGES"}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.cancelButton}
                            activeOpacity={0.8}
                            onPress={handleReset}
                          >
                            <Text style={styles.cancelButtonText}>Reset Form</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

              {/* ================= RIGHT COLUMN: STATISTIC CARDS ================= */}
              <View style={[styles.rightStatsColumn, { flex: isDesktop ? 1 : 1 }]}>
                {/* 1. Trips Joined Card */}
                <View style={styles.statCard}>
                  <View style={styles.statCardHeader}>
                    <View style={[styles.statIconBox, { backgroundColor: "#E0F2FE" }]}>
                      <Ionicons name="compass" size={22} color="#0284C7" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statCardCategory}>EXPEDITION LOG</Text>
                      <Text style={styles.statCardHeading}>Trips Joined</Text>
                    </View>
                    <View style={styles.statBadgeHighlight}>
                      <Text style={styles.statBadgeHighlightText}>14 Total</Text>
                    </View>
                  </View>

                  <View style={styles.statCountersGrid}>
                    <View style={styles.counterBox}>
                      <Text style={styles.counterValue}>12</Text>
                      <Text style={styles.counterLabel}>Completed</Text>
                    </View>
                    <View style={styles.counterBox}>
                      <Text style={[styles.counterValue, { color: "#0B5CAD" }]}>2</Text>
                      <Text style={styles.counterLabel}>Upcoming</Text>
                    </View>
                    <View style={styles.counterBox}>
                      <Text style={[styles.counterValue, { color: "#059669" }]}>8</Text>
                      <Text style={styles.counterLabel}>Summits</Text>
                    </View>
                  </View>

                  <View style={styles.expeditionProgress}>
                    <View style={styles.progressRow}>
                      <Text style={styles.progressLabel}>2026 Exploration Goal</Text>
                      <Text style={styles.progressValue}>75%</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                      <View style={[styles.progressBarFill, { width: "75%" }]} />
                    </View>
                  </View>
                </View>

                {/* 2. Favorite Destinations Card */}
                <View style={styles.statCard}>
                  <View style={styles.statCardHeader}>
                    <View style={[styles.statIconBox, { backgroundColor: "#FEF3C7" }]}>
                      <Ionicons name="heart" size={22} color="#D97706" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statCardCategory}>WISHLIST & TRAVELS</Text>
                      <Text style={styles.statCardHeading}>Favorite Destinations</Text>
                    </View>
                  </View>

                  <View style={styles.destinationsList}>
                    {favoriteDestinations.map((dest, idx) => (
                      <View key={idx} style={styles.destinationItem}>
                        <View style={styles.destDot} />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.destName}>{dest.name}</Text>
                          <Text style={styles.destRegion}>{dest.tag}</Text>
                        </View>
                        <Ionicons name="bookmark" size={16} color="#F59E0B" />
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={styles.exploreMoreBtn}
                    onPress={() => navigation.navigate("BrowseTrips")}
                  >
                    <Text style={styles.exploreMoreText}>Browse More Expeditions ➔</Text>
                  </TouchableOpacity>
                </View>

                {/* 3. Membership Status Card */}
                <View style={[styles.statCard, styles.membershipCard]}>
                  <View style={styles.statCardHeader}>
                    <View style={[styles.statIconBox, { backgroundColor: "rgba(245, 158, 11, 0.15)" }]}>
                      <Ionicons name="ribbon" size={24} color="#F59E0B" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.statCardCategory, { color: "#FDE68A" }]}>CLUB STATUS</Text>
                      <Text style={[styles.statCardHeading, { color: "#FFFFFF" }]}>Membership Tier</Text>
                    </View>
                  </View>

                  <View style={styles.vipTierBanner}>
                    <Text style={styles.tierName}>Aces Elite Gold</Text>
                    <Text style={styles.tierSub}>VIP Explorer & Priority Access</Text>
                  </View>

                  <View style={styles.membershipDetails}>
                    <View style={styles.membershipDetailRow}>
                      <Text style={styles.memLabel}>Club Rewards Points:</Text>
                      <Text style={styles.memVal}>1,850 Pts</Text>
                    </View>
                    <View style={styles.membershipDetailRow}>
                      <Text style={styles.memLabel}>Member Discount:</Text>
                      <Text style={styles.memVal}>15% Off All Trips</Text>
                    </View>
                    <View style={styles.membershipDetailRow}>
                      <Text style={styles.memLabel}>Status Valid Through:</Text>
                      <Text style={styles.memVal}>Dec 2026</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.manageMembershipBtn}
                    onPress={() => navigation.navigate("Settings")}
                  >
                    <Text style={styles.manageMembershipText}>Manage Membership</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            </>
            )}
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
    backgroundColor: "rgba(8, 27, 46, 0.65)",
    justifyContent: "space-between",
    paddingBottom: 70,
  },
  heroContentWrapper: {
    alignSelf: "center",
    marginTop: 20,
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
    marginBottom: 10,
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
    marginBottom: 8,
  },
  heroHighlight: {
    color: "#38BDF8",
  },
  heroSubtitle: {
    color: "#E2E8F0",
    maxWidth: 600,
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
  avatarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
  },
  notLoggedInCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 30,
    textAlign: "center",
  },
  notLoggedInTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
    textAlign: "center",
  },
  notLoggedInSubtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    maxWidth: 520,
    lineHeight: 22,
    marginBottom: 28,
  },
  notLoggedInBtnRow: {
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  notLoggedInLoginBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#0B5CAD",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  notLoggedInLoginText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  notLoggedInSignupBtn: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  notLoggedInSignupText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#0B5CAD",
  },
  avatarEditBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0B5CAD",
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  avatarInfo: {
    flex: 1,
    minWidth: 220,
  },
  nameHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  vipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  vipBadgeText: {
    color: "#B45309",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  profileRole: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#64748B",
  },
  settingsQuickBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    cursor: "pointer",
  },
  settingsQuickText: {
    color: "#0B5CAD",
    fontSize: 14,
    fontWeight: "700",
  },
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  successBannerText: {
    color: "#065F46",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  gridRow: {
    gap: 24,
  },
  leftFormColumn: {
    width: "100%",
  },
  rightStatsColumn: {
    width: "100%",
    gap: 20,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
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
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 22,
  },
  formFields: {
    gap: 18,
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
  requiredStar: {
    color: "#EF4444",
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
  textAreaWrapper: {
    alignItems: "flex-start",
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 110,
  },
  textAreaInput: {
    height: 90,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 10,
    flexWrap: "wrap",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    cursor: "pointer",
    shadowColor: "#0B5CAD",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
  },
  cancelButtonText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  statIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statCardCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0B5CAD",
    letterSpacing: 1,
  },
  statCardHeading: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  statBadgeHighlight: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statBadgeHighlightText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  statCountersGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  counterBox: {
    alignItems: "center",
    flex: 1,
  },
  counterValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },
  counterLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 2,
  },
  expeditionProgress: {
    marginTop: 6,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  progressValue: {
    fontSize: 12,
    color: "#0B5CAD",
    fontWeight: "700",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0B5CAD",
    borderRadius: 4,
  },
  destinationsList: {
    gap: 12,
    marginBottom: 16,
  },
  destinationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  destDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0B5CAD",
    marginRight: 12,
  },
  destName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  destRegion: {
    fontSize: 12,
    color: "#64748B",
  },
  exploreMoreBtn: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    cursor: "pointer",
  },
  exploreMoreText: {
    color: "#0B5CAD",
    fontSize: 13,
    fontWeight: "700",
  },
  membershipCard: {
    backgroundColor: "#081B2E",
    borderColor: "#1E293B",
  },
  vipTierBanner: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    marginBottom: 16,
  },
  tierName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F59E0B",
  },
  tierSub: {
    fontSize: 13,
    color: "#CBD5E1",
    marginTop: 2,
  },
  membershipDetails: {
    gap: 10,
    marginBottom: 18,
  },
  membershipDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    paddingBottom: 8,
  },
  memLabel: {
    fontSize: 13,
    color: "#94A3B8",
  },
  memVal: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  manageMembershipBtn: {
    backgroundColor: "#F59E0B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    cursor: "pointer",
  },
  manageMembershipText: {
    color: "#081B2E",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
