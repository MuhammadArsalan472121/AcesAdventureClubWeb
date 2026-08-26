import React, { useRef } from "react";

import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";
import MapViewComponent from "../components/MapViewComponent";

const { height, width } = Dimensions.get("window");

export default function MapScreen() {
  const camera = useRef(null);
  const { isMobile, isDesktop, isTablet, height, contentMaxWidth, paddingHorizontal } = useResponsive();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={require("../../assets/mapHero.jpg")} style={styles.hero}>
          <View style={styles.overlay}>
            <Header />
            <View style={styles.heroContent}>
              <Text style={styles.badge}>ULTIMATE NAVIGATION HUB</Text>
              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 48 : isTablet ? 36 : 26 }]}>Expedition Route Explorer</Text>
              <Text style={styles.heroBlue}>Explorer</Text>
              <Text style={styles.heroDescription}>
                A meticulously crafted interface for navigating
                the most exclusive routes in Northern Pakistan.
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.mapSection}>
          <View style={styles.mapCard}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <Text style={styles.searchText}>Search premium destination...</Text>
              <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                <Text style={styles.filterText}>ADVANCED{"\n"}FILTERS</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mapContainer}>
              <MapViewComponent style={styles.map} />
            </View>
          </View>
        </View>
        {/* ================= NEWSLETTER CARD SECTION ================= */}
        <View style={[styles.newsletterSectionWrapper, { paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("../../assets/adventure-bg.jpg")}
              style={styles.newsletterBg}
              imageStyle={{ borderRadius: 28 }}
            >
              <View style={styles.newsletterOverlay}>
                <View style={{ alignItems: "center", paddingVertical: isDesktop ? 60 : 40, paddingHorizontal: 24 }}>
                  <View style={styles.stayTunedBadge}>
                    <Text style={styles.stayTunedBadgeText}>STAY TUNED</Text>
                  </View>

                  <Text style={[styles.newsTitle, { fontSize: isDesktop ? 44 : 28, textAlign: "center" }]}>
                    YOUR NEXT ADVENTURE <Text style={styles.blueItalicLight}>AWAITS</Text>
                  </Text>

                  <Text style={[styles.newsDescription, { fontSize: isDesktop ? 16 : 14, textAlign: "center", maxWidth: 680 }]}>
                    Join our community of explorers and discover breathtaking destinations, unforgettable experiences and adventures that create memories for a lifetime.
                  </Text>

                  {/* Form Row */}
                  <View
                    style={[
                      styles.subscribeContainer,
                      { width: "100%", maxWidth: 540, marginTop: isDesktop ? 30 : 20 },
                      isMobile && styles.subscribeContainerMobile,
                    ]}
                  >
                    <TextInput
                      placeholder="Enter your email address"
                      placeholderTextColor="#94A3B8"
                      style={[styles.emailInput, isMobile && styles.emailInputMobile]}
                    />
                    <TouchableOpacity
                      style={[styles.subscribeButton, isMobile && styles.subscribeButtonMobile]}
                      onPress={() => navigation.navigate("Contact")}
                    >
                      <Text style={styles.subscribeButtonText}>Subscribe Free</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.smallText}>No spam ever • Unsubscribe in one click</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        {/* ================= START BUTTON ================= */}
        
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("BrowseTrips")}>
        
          <Text style={styles.startButtonText}>
            Start Exploring
          </Text>
        
        </TouchableOpacity>
        
        {/* ================= FOOTER ================= */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  hero: {
    width: "100%",
    height: height * 0.62,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.40)",
    paddingHorizontal: 20,
  },

  heroContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },

  badge: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.25)",
    backgroundColor: "rgba(255,255,255,.12)",
    marginBottom: 18,
  },

  heroTitle: {
    fontSize: 48,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },

  heroBlue: {
    color: "#3B82F6",
  },

  heroDescription: {
    marginTop: 16,
    maxWidth: 700,
    textAlign: "center",
    color: "#F3F4F6",
    fontSize: 16,
    lineHeight: 26,
  },

  mapSection: {
    paddingHorizontal: 24,
    marginTop: -70,
    zIndex: 10,
    marginBottom: 40,
    maxWidth: 1400,
    width: "100%",
    alignSelf: "center",
  },

  mapCard: {
    backgroundColor: "#16233C",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 10,
  },

  searchBar: {
    margin: 18,
    backgroundColor: "#1E2D4B",
    height: 52,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  searchIcon: {
    color: "#5FA8FF",
    fontSize: 18,
  },

  searchText: {
    flex: 1,
    color: "#7B8CA8",
    marginLeft: 10,
    fontSize: 13,
  },

  filterBtn: {
    backgroundColor: "#4A5568",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  filterText: {
    color: "#FFF",
    fontSize: 9,
    textAlign: "center",
    fontWeight: "700",
  },

  mapContainer: {
    width: "100%",
    height: 420,
  },

  map: {
    flex: 1,
  },

  webFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },

  webFallbackTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  webFallbackText: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  /* ================= NEWSLETTER ================= */

  newsletterSectionWrapper: {},

  newsletterBg: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 28,
  },

  newsletterOverlay: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 28,
  },

  stayTunedBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 16,
  },

  stayTunedBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  newsTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    lineHeight: 48,
  },

  blueItalicLight: {
    color: "#38BDF8",
    fontStyle: "italic",
  },

  newsDescription: {
    color: "#CBD5E1",
    marginTop: 14,
    lineHeight: 24,
  },

  subscribeContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 30,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  subscribeContainerMobile: {
    flexDirection: "column",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },

  emailInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 15,
  },

  emailInputMobile: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    height: 52,
    marginBottom: 12,
  },

  subscribeButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  subscribeButtonMobile: {
    width: "100%",
    height: 52,
  },

  subscribeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  smallText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 14,
  },
/* ================= FOOTER ================= */

/* ================= FOOTER ================= */

startButton: {
  height: 58,
  borderRadius: 30,
  backgroundColor: "#1E88E5",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 35,

  shadowColor: "#1E88E5",
  shadowOpacity: 0.35,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  elevation: 8,
},

startButtonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "700",
},

footer: {
  marginTop: 45,
  paddingTop: 35,
  paddingBottom: 30,
  paddingHorizontal: 20,

  backgroundColor: "#16233C",

  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,

  alignItems: "center",
},

footerLogo: {
  width: 75,
  height: 75,
  resizeMode: "contain",
},

footerTitle: {
  marginTop: 14,
  fontSize: 24,
  fontWeight: "700",
  color: "#FFFFFF",
},

footerDescription: {
  marginTop: 12,
  textAlign: "center",
  color: "#D8E4F5",
  fontSize: 15,
  lineHeight: 24,
  paddingHorizontal: 15,
},

socialRow: {
  marginTop: 28,
  flexDirection: "row",
},

socialIcon: {
  width: 50,
  height: 50,
  borderRadius: 25,

  backgroundColor: "rgba(255,255,255,0.10)",

  justifyContent: "center",
  alignItems: "center",

  marginHorizontal: 8,

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.18)",
},

footerLine: {
  width: "100%",
  height: 1,

  backgroundColor: "rgba(255,255,255,0.15)",

  marginTop: 30,
  marginBottom: 20,
},

copyText: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "600",
},

versionText: {
  marginTop: 6,
  color: "#9DB4D6",
  fontSize: 13,
},
footerTagline: {
  marginTop: 6,
  fontSize: 14,
  color: "#60A5FA",
  fontWeight: "600",
},
});
