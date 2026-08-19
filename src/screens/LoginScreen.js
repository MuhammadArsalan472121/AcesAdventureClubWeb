import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation();
  const { isDesktop, height } = useResponsive();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={require("../../assets/hero.jpg")} style={[styles.hero, { minHeight: height }]} resizeMode="cover">
          <View style={styles.overlay}>
            <Header />
            <View style={styles.heroContent}>
              <Text style={styles.smallTitle}>WELCOME BACK</Text>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.description}>
                Access your account and continue exploring premium adventures.
              </Text>

              <View style={styles.card}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  style={styles.input}
                />

                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Profile")}>
                  <Text style={styles.primaryButtonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.linkText}>Create an account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 40,
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  smallTitle: {
    color: "#DCEAFE",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 8,
  },
  description: {
    color: "#E2E8F0",
    fontSize: 15,
    textAlign: "center",
    maxWidth: 500,
    width: "90%",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  label: {
    color: "#0F172A",
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    color: "#0F172A",
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: "#0B5CAD",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
    cursor: "pointer",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  linkText: {
    color: "#0B5CAD",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "700",
    cursor: "pointer",
  },
});
