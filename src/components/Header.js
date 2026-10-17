import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useResponsive from "../hooks/useResponsive";
import { useAuth } from "../context/AuthContext";
import { animateMobileMenu } from "../utils/animations";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isDesktop, isTablet } = useResponsive();
  const isWideScreen = isDesktop || isTablet;
  const { user, userProfile, logout } = useAuth();

  const navigateTo = (screenName) => {
    setMenuVisible(false);
    navigation.navigate(screenName);
  };

  const handleProfilePress = () => {
    setMenuVisible(false);
    if (user && !user.emailVerified) {
      navigation.navigate("EmailVerification");
    } else {
      navigation.navigate("Profile");
    }
  };

  const handleSettingsPress = () => {
    setMenuVisible(false);
    if (user && !user.emailVerified) {
      navigation.navigate("EmailVerification");
    } else {
      navigation.navigate("Settings");
    }
  };

  const handleLogout = async () => {
    setMenuVisible(false);
    await logout();
    navigation.navigate("Home");
  };

  React.useEffect(() => {
    if (menuVisible) {
      animateMobileMenu(".gsap-mobile-menu", true);
    }
  }, [menuVisible]);

  const navItems = [
    { label: "Home", screen: "Home" },
    { label: "About", screen: "About" },
    { label: "Browse Trips", screen: "BrowseTrips" },
    { label: "Gallery", screen: "Gallery" },
    { label: "Sponsored", screen: "Sponsors" },
    { label: "Contact", screen: "Contact" },
  ];

  const displayName = userProfile?.fullName
    ? userProfile.fullName.split(" ")[0]
    : user?.displayName
    ? user.displayName.split(" ")[0]
    : "Profile";

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerContainer}>
        {/* LOGO */}
        <TouchableOpacity style={styles.logoRow} onPress={() => navigateTo("Home")}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
        </TouchableOpacity>

        {/* DESKTOP NAVBAR LINKS */}
        {isWideScreen ? (
          <View style={styles.desktopNav}>
            <View style={styles.navLinksRow}>
              {navItems.map((item) => {
                const isActive = route.name === item.screen;
                return (
                  <TouchableOpacity
                    key={item.screen}
                    onPress={() => navigateTo(item.screen)}
                    style={styles.desktopNavLink}
                  >
                    <Text style={[styles.desktopNavText, isActive && styles.desktopNavTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* AUTH & PROFILE BUTTONS */}
            <View style={styles.desktopAuthRow}>
              {user ? (
                <>
                  {user && !user.emailVerified && (
                    <TouchableOpacity
                      style={styles.desktopVerifyBadge}
                      onPress={() => navigateTo("EmailVerification")}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="mail-unread-outline" size={14} color="#ffd700" style={{ marginRight: 5 }} />
                      <Text style={styles.desktopVerifyText}>Verify Email</Text>
                    </TouchableOpacity>
                  )}

                  {/* Profile Avatar Quick Button */}
                  <TouchableOpacity
                    style={[
                      styles.desktopAvatarBtn,
                      (route.name === "Profile" || route.name === "Settings") &&
                        styles.desktopAvatarBtnActive,
                    ]}
                    onPress={handleProfilePress}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={
                        userProfile?.avatarUrl
                          ? { uri: userProfile.avatarUrl }
                          : require("../../assets/partnerProfile.jpg")
                      }
                      style={styles.desktopAvatarImg}
                    />
                    <Text style={styles.desktopAvatarText}>{displayName}</Text>
                    <Ionicons
                      name="person-circle-outline"
                      size={16}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.desktopLogoutBtn}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="log-out-outline" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.desktopLoginBtn}
                    onPress={() => navigateTo("Login")}
                  >
                    <Text style={styles.desktopLoginText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.desktopSignupBtn}
                    onPress={() => navigateTo("Signup")}
                  >
                    <Text style={styles.desktopSignupText}>Sign up</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ) : (
          /* MOBILE HAMBURGER ICON */
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.hamburgerBtn}>
            <Ionicons
              name={menuVisible ? "close" : "menu"}
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* MOBILE DROPDOWN MENU */}
      {!isWideScreen && menuVisible && (
        <>
          <TouchableOpacity
            style={styles.menuBackdrop}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
          <View style={styles.mobileMenu} nativeID="gsap-mobile-menu" className="gsap-mobile-menu">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {navItems.map((item) => (
                <TouchableOpacity
                  key={item.screen}
                  style={styles.menuRow}
                  onPress={() => navigateTo(item.screen)}
                >
                  <Ionicons
                    name={
                      item.screen === "Home"
                        ? "home-outline"
                        : item.screen === "About"
                        ? "information-circle-outline"
                        : item.screen === "BrowseTrips"
                        ? "compass-outline"
                        : item.screen === "Gallery"
                        ? "images-outline"
                        : item.screen === "Sponsors"
                        ? "newspaper-outline"
                        : "call-outline"
                    }
                    size={20}
                    color="#0B5CAD"
                  />
                  <Text style={styles.menuItem}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              {user ? (
                <>
                  {user && !user.emailVerified && (
                    <TouchableOpacity
                      style={styles.mobileVerifyBanner}
                      onPress={() => navigateTo("EmailVerification")}
                    >
                      <Ionicons name="alert-circle" size={18} color="#d97706" style={{ marginRight: 8 }} />
                      <Text style={styles.mobileVerifyBannerText}>Action Required: Verify Email</Text>
                    </TouchableOpacity>
                  )}

                  {/* Profile & Settings in Mobile Menu */}
                  <TouchableOpacity
                    style={styles.menuRow}
                    onPress={handleProfilePress}
                  >
                    {userProfile?.avatarUrl ? (
                      <Image
                        source={{ uri: userProfile.avatarUrl }}
                        style={styles.mobileAvatarImg}
                      />
                    ) : (
                      <Ionicons name="person-outline" size={20} color="#0B5CAD" />
                    )}
                    <Text style={styles.menuItem}>My Profile ({displayName})</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuRow}
                    onPress={handleSettingsPress}
                  >
                    <Ionicons name="settings-outline" size={20} color="#0B5CAD" />
                    <Text style={styles.menuItem}>Account Settings</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.logoutButtonMobile}
                    onPress={handleLogout}
                  >
                    <Ionicons name="log-out-outline" size={18} color="#DC2626" style={{ marginRight: 6 }} />
                    <Text style={styles.logoutButtonTextMobile}>Log Out</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.loginButton} onPress={() => navigateTo("Login")}>
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.signupButton} onPress={() => navigateTo("Signup")}>
                    <Text style={styles.signupButtonText}>Sign up</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 24,
    zIndex: 999,
  },

  headerContainer: {
    maxWidth: 1600,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  },

  logo: {
    width: 65,
    height: 65,
    resizeMode: "contain",
  },

  desktopNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },

  navLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },

  desktopNavLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
    cursor: "pointer",
  },

  desktopNavText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "500",
  },

  desktopNavTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  desktopAuthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  desktopAvatarBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 4,
    paddingRight: 14,
    paddingVertical: 4,
    borderRadius: 24,
    backgroundColor: "rgba(11, 92, 173, 0.4)",
    borderWidth: 1.5,
    borderColor: "rgba(56, 189, 248, 0.5)",
    cursor: "pointer",
  },

  desktopAvatarBtnActive: {
    backgroundColor: "#0B5CAD",
    borderColor: "#38BDF8",
  },

  desktopAvatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  desktopAvatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  desktopLoginBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "#0F172A",
    cursor: "pointer",
  },

  desktopLoginText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  desktopSignupBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    cursor: "pointer",
  },

  desktopSignupText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  hamburgerBtn: {
    padding: 8,
    cursor: "pointer",
    borderRadius: 8,
  },

  menuBackdrop: {
    position: "absolute",
    top: -50,
    left: -50,
    right: -50,
    bottom: -1000,
    zIndex: 998,
    backgroundColor: "rgba(8, 27, 46, 0.6)",
  },

  mobileMenu: {
    position: "absolute",
    top: 75,
    left: 16,
    right: 16,
    maxHeight: "82vh",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuItem: {
    marginLeft: 12,
    fontSize: 16,
    color: "#0B5CAD",
    fontWeight: "600",
  },

  loginButton: {
    marginTop: 16,
    backgroundColor: "#F1F5F9",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  loginButtonText: {
    color: "#0B5CAD",
    fontWeight: "700",
    fontSize: 15,
  },

  signupButton: {
    marginTop: 10,
    backgroundColor: "#0B5CAD",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  signupButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  desktopLogoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  logoutButtonMobile: {
    marginTop: 14,
    flexDirection: "row",
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutButtonTextMobile: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 15,
  },

  mobileAvatarImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#0B5CAD",
  },
  desktopVerifyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    borderWidth: 1,
    borderColor: "#ffd700",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    cursor: "pointer",
  },
  desktopVerifyText: {
    color: "#ffd700",
    fontSize: 12,
    fontWeight: "700",
  },
  mobileVerifyBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F59E0B",
    marginBottom: 10,
  },
  mobileVerifyBannerText: {
    color: "#B45309",
    fontSize: 13,
    fontWeight: "700",
  },
});
