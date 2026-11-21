import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useResponsive from "../hooks/useResponsive";
import { useData } from "../context/DataContext";

export default function Footer() {
  const navigation = useNavigation();
  const { isDesktop, isTablet } = useResponsive();
  const { contactContent, socialLinks } = useData() || {};

  const location = contactContent?.location || "Attock, Punjab, Pakistan";
  const phone = contactContent?.phone || "+92 312 1578099";
  const email = contactContent?.email || "info.acesadventureclub@gmail.com";

  const instagramUrl =
    socialLinks?.instagram ||
    contactContent?.instagram ||
    "https://www.instagram.com/aces_adventure_club/";

  const youtubeUrl =
    socialLinks?.youtube ||
    contactContent?.youtube ||
    "https://www.youtube.com/@AcesAdventureClub-007";

  const facebookUrl =
    socialLinks?.facebook ||
    contactContent?.facebook ||
    "https://www.facebook.com/acesadventureclub";

  const whatsappVal =
    socialLinks?.whatsapp ||
    contactContent?.whatsapp ||
    "+923121578099";

  const openSocialLink = (rawUrl) => {
    if (!rawUrl) return;
    const url = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      Linking.openURL(url).catch((err) => console.warn("Failed to open URL:", err));
    }
  };

  const openWhatsApp = (rawVal) => {
    if (!rawVal) return;
    let url = rawVal;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const cleanNumber = rawVal.replace(/[^0-9]/g, "");
      url = `https://wa.me/${cleanNumber}`;
    }
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      Linking.openURL(url).catch((err) => console.warn("Failed to open WhatsApp:", err));
    }
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={[styles.footerContent, { flexDirection: isDesktop || isTablet ? "row" : "column" }]}>
        
        {/* BRAND COLUMN */}
        <View style={styles.brandColumn}>
          <View style={styles.logoRow}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} />
            <Text style={styles.brandTitle}>Aces Adventure Club</Text>
          </View>
          <Text style={styles.brandDescription}>
            Discover breathtaking mountains, hidden valleys, and unforgettable adventure expeditions across Northern Pakistan.
          </Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.7}
              onPress={() => openSocialLink(facebookUrl)}
              accessibilityLabel="Facebook"
              accessibilityRole="link"
            >
              <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.7}
              onPress={() => openSocialLink(instagramUrl)}
              accessibilityLabel="Instagram"
              accessibilityRole="link"
            >
              <Ionicons name="logo-instagram" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.7}
              onPress={() => openSocialLink(youtubeUrl)}
              accessibilityLabel="YouTube"
              accessibilityRole="link"
            >
              <Ionicons name="logo-youtube" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.7}
              onPress={() => openWhatsApp(whatsappVal)}
              accessibilityLabel="WhatsApp"
              accessibilityRole="link"
            >
              <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* QUICK LINKS */}
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>Quick Links</Text>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("Home")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("About")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("BrowseTrips")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Browse Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("Gallery")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Photo Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* EXPLORE */}
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>Explore</Text>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("Map")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Route Explorer Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("Sponsors")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Our Partners</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("Contact")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} onPress={() => navigateTo("Login")}>
            <Ionicons name="chevron-forward" size={14} color="#0B5CAD" />
            <Text style={styles.linkText}>Member Login</Text>
          </TouchableOpacity>
        </View>

        {/* CONTACT INFO */}
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>Get In Touch</Text>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={16} color="#0B5CAD" />
            <Text style={styles.contactText}>{location}</Text>
          </View>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => {
              if (phone) Linking.openURL(`tel:${phone.replace(/\s+/g, "")}`);
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={16} color="#0B5CAD" />
            <Text style={styles.contactText}>{phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => {
              if (email) Linking.openURL(`mailto:${email}`);
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="mail-outline" size={16} color="#0B5CAD" />
            <Text style={styles.contactText}>{email}</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* COPYRIGHT */}
      <View style={styles.copyrightBar}>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Aces Adventure Club. All Rights Reserved. Built for Web & Mobile.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#081B2E",
    paddingTop: 60,
    paddingBottom: 24,
    marginTop: 60,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerContent: {
    maxWidth: 1400,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 32,
    justifyContent: "space-between",
    gap: 40,
  },
  brandColumn: {
    flex: 1.5,
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginRight: 12,
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  brandDescription: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 360,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  linkColumn: {
    flex: 1,
    marginBottom: 20,
  },
  columnTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    cursor: "pointer",
  },
  linkText: {
    color: "#CBD5E1",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    color: "#CBD5E1",
    fontSize: 14,
    marginLeft: 8,
  },
  copyrightBar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    paddingTop: 20,
    marginTop: 30,
    alignItems: "center",
  },
  copyrightText: {
    color: "#64748B",
    fontSize: 13,
    textAlign: "center",
  },
});
