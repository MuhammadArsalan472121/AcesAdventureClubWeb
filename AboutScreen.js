import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "./Header";

import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function AboutScreen() {

  const [menuVisible, setMenuVisible] = useState(false);

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground
          source={require("./assets/about-bg.jpg")}
          style={styles.hero}
        >

          <View style={styles.overlay}>

            {/* Header */}

         {/* ================= HEADER ================= */}

<View style={styles.header}>

  <Image
    source={require("./assets/logo.png")}
    style={styles.logo}
  />

  <TouchableOpacity
    onPress={() => setMenuVisible(!menuVisible)}
  >
    <Ionicons
      name="menu"
      size={34}
      color="#FFFFFF"
    />
  </TouchableOpacity>

</View>

{
menuVisible && (

<View style={styles.mobileMenu}>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="home-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="information-circle-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>About</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="compass-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Browse Trips</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="images-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Gallery</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="map-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Map</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="people-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Sponsors</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="call-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Contact</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.loginButton}>
    <Text style={styles.loginButtonText}>
      Login
    </Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.signupButton}>
    <Text style={styles.signupButtonText}>
      Sign Up
    </Text>
  </TouchableOpacity>

</View>

)
}

            {/* Hero Content */}

            <View style={styles.heroContent}>

              <Text style={styles.smallTitle}>
                ABOUT ACES ADVENTURE CLUB
              </Text>

              <Text style={styles.heroTitle}>
                About Adventure{"\n"}
                <Text style={styles.blueText}>
                  Club
                </Text>
              </Text>

              <Text style={styles.heroDescription}>
                Founded on the principle of absolute excellence,
                ACES Adventure Club curates the world's most
                exclusive nature expeditions.

                {"\n\n"}

                We bridge the gap between raw wilderness
                and luxury experiences for passionate
                explorers.
              </Text>

              <View style={styles.buttonRow}>

                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>
                    OUR LEGACY
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>
                    WATCH THE FILM
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>

        </ImageBackground>

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
    height: 720,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 22,
    paddingTop: 55,
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  /* ================= MOBILE MENU ================= */

  mobileMenu: {
    position: "absolute",
    top: 110,
    left: 22,
    right: 22,

    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,

    zIndex: 999,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  menuItem: {
    fontSize: 17,
    color: "#0B5CAD",
    fontWeight: "600",
    marginLeft: 14,
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B5CAD",
  },

  signupButton: {
    marginTop: 12,
    backgroundColor: "#0B5CAD",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  signupButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* ================= HERO CONTENT ================= */

  heroContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  smallTitle: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },

  heroTitle: {
    marginTop: 10,
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 50,
  },

  blueText: {
    color: "#1E88E5",
    fontStyle: "italic",
  },

  heroDescription: {
    marginTop: 22,
    fontSize: 16,
    lineHeight: 28,
    color: "#F1F5F9",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 32,
  },

  primaryButton: {
    backgroundColor: "#0B5CAD",
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

});