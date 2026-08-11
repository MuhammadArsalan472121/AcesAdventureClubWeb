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
import Header from "./Header";
import Footer from "./Footer";
import useResponsive from "./useResponsive";
import MapViewComponent from "./MapViewComponent";

const { height, width } = Dimensions.get("window");

export default function MapScreen() {
  const camera = useRef(null);
  const { isDesktop, isTablet, height } = useResponsive();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={require("./assets/mapHero.jpg")} style={styles.hero}>
          <View style={styles.overlay}>
            <Header />
            <View style={styles.heroContent}>
              <Text style={styles.badge}>ULTIMATE NAVIGATION HUB</Text>
              <Text style={styles.heroTitle}>Expedition Route Explorer</Text>
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
        {/* ================= NEWSLETTER SECTION ================= */}
        
        <ImageBackground
          source={require("./assets/adventure-bg.jpg")}
          style={styles.newsletterBg}
          imageStyle={styles.newsletterImage}
        >
        
          <View style={styles.newsletterOverlay}>
        
            {/* Next Part yahan se start hoga */}
              <View>
        
          <Text style={styles.stayText}>
            STAY TUNED
          </Text>
        
          <Text style={styles.newsTitle}>
            YOUR NEXT{"\n"}
            ADVENTURE{" "}
            <Text style={styles.blueText}>AWAITS</Text>
          </Text>
        
          <Text style={styles.newsDescription}>
            Join our community of explorers and discover breathtaking
            destinations, unforgettable experiences and adventures that
            create memories for a lifetime.
          </Text>
        
          {/* Email + Button */}
        
          <View style={styles.subscribeContainer}>
        
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#D1D5DB"
              style={styles.emailInput}
            />
        
            <TouchableOpacity style={styles.subscribeButton} onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.subscribeButtonText}>
                Subscribe Free
              </Text>
            </TouchableOpacity>
        
          </View>
        
          <Text style={styles.smallText}>
            No spam ever • Unsubscribe in one click
          </Text>
        
        </View>
        
          </View>
        
        </ImageBackground>
        {/* ================= START BUTTON ================= */}
        
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("BrowseTrips")}>
        
          <Text style={styles.startButtonText}>
            Start Exploring
          </Text>
        
        </TouchableOpacity>
        
        {/* ================= FOOTER ================= */}
        
        <View style={styles.footer}>
        
          <Image
            source={require("./assets/logo.png")}
            style={styles.footerLogo}
          />
        
          <Text style={styles.footerTagline}>
        Explore Pakistan Beyond The Horizon
        </Text>
        
          <Text style={styles.footerTitle}>
            ACES Adventure Club
          </Text>
        
          <Text style={styles.footerDescription}>
            Creating unforgettable adventures across Pakistan.
            Discover mountains, forests and breathtaking destinations
            with our passionate community.
          </Text>
        
          {/* Social Icons */}
        
          <View style={styles.socialRow}>
        
            <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
              <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
              <Ionicons name="logo-instagram" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
              <Ionicons name="logo-youtube" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
              <Ionicons name="logo-linkedin" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        
          </View>
        
          <View style={styles.footerLine}/>
        
          <Text style={styles.copyText}>
            © 2026 ACES Adventure Club
          </Text>
        
          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        
          </View>
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

newsletterBg: {
  height: 520,
  marginHorizontal: 18,
  marginTop: 40,
  marginBottom: 30,
  borderRadius: 28,
  overflow: "hidden",
},

newsletterImage: {
  borderRadius: 28,
},

newsletterOverlay: {
  flex: 1,

  backgroundColor: "rgba(7,17,34,0.58)",

  paddingHorizontal: 25,
  paddingTop: 45,
  paddingBottom: 35,

  justifyContent: "space-between",
},
/* ================= NEWSLETTER CONTENT ================= */

stayText: {
  color: "#E5E7EB",
  fontSize: 12,
  letterSpacing: 2,
  alignSelf: "center",
},

newsTitle: {
  marginTop: 10,
  color: "#FFFFFF",
  fontSize: 34,
  fontWeight: "700",
  textAlign: "center",
  lineHeight: 42,
},

blueText: {
  color: "#1E88E5",
},

newsDescription: {
  marginTop: 16,
  color: "#E5E7EB",
  textAlign: "center",
  fontSize: 15,
  lineHeight: 24,
  paddingHorizontal: 8,
},

subscribeContainer: {
  marginTop: 28,
},

emailInput: {
  height: 55,
  borderRadius: 28,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.5)",
  color: "#FFFFFF",
  paddingHorizontal: 20,
  fontSize: 15,
  backgroundColor: "rgba(255,255,255,0.12)",
},

subscribeButton: {
  marginTop: 14,
  height: 55,
  borderRadius: 28,
  backgroundColor: "#1E88E5",

  justifyContent: "center",
  alignItems: "center",
},

subscribeButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

smallText: {
  marginTop: 12,
  color: "#CBD5E1",
  textAlign: "center",
  fontSize: 12,
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






