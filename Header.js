import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Header() {

  const [menuVisible, setMenuVisible] = useState(false);

  return (

    <>

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
            name={menuVisible ? "close" : "menu"}
            size={34}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

      {/* ================= MOBILE MENU ================= */}

      {menuVisible && (

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

      )}

    </>

  );

}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 55,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  mobileMenu: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,

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
    marginLeft: 14,
    fontSize: 17,
    color: "#0B5CAD",
    fontWeight: "600",
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  loginButtonText: {
    color: "#0B5CAD",
    fontWeight: "700",
    fontSize: 16,
  },

  signupButton: {
    marginTop: 12,
    backgroundColor: "#0B5CAD",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  signupButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

});