import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import useResponsive from "../hooks/useResponsive";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isDesktop, isTablet } = useResponsive();
  const isWideScreen = isDesktop || isTablet;

  const navigateTo = (screenName) => {
    setMenuVisible(false);
    navigation.navigate(screenName);
  };

  const navItems = [
    { label: "Home", screen: "Home" },
    { label: "About", screen: "About" },
    { label: "Browse Trips", screen: "BrowseTrips", hasDropdown: true },
    { label: "Gallery", screen: "Gallery" },
    { label: "Sponsored", screen: "Sponsors" },
    { label: "Contact", screen: "Contact" },
  ];

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
                    {item.hasDropdown && (
                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color={isActive ? "#FFFFFF" : "#E2E8F0"}
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* AUTH BUTTONS */}
            <View style={styles.desktopAuthRow}>
              <TouchableOpacity style={styles.desktopLoginBtn} onPress={() => navigateTo("Login")}>
                <Text style={styles.desktopLoginText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.desktopSignupBtn} onPress={() => navigateTo("Signup")}>
                <Text style={styles.desktopSignupText}>Sign up</Text>
              </TouchableOpacity>
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
        <View style={styles.mobileMenu}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={styles.menuRow}
              onPress={() => navigateTo(item.screen)}
            >
              <Ionicons
                name={
                  item.screen === "Home" ? "home-outline" :
                  item.screen === "About" ? "information-circle-outline" :
                  item.screen === "BrowseTrips" ? "compass-outline" :
                  item.screen === "Gallery" ? "images-outline" :
                  item.screen === "Sponsors" ? "newspaper-outline" : "call-outline"
                }
                size={20}
                color="#0B5CAD"
              />
              <Text style={styles.menuItem}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.loginButton} onPress={() => navigateTo("Login")}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={() => navigateTo("Signup")}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
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
    padding: 6,
    cursor: "pointer",
  },

  mobileMenu: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
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
});
