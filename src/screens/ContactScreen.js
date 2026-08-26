import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";

const { height, width } = Dimensions.get("window");

export default function ContactScreen() {
  const navigation = useNavigation();
  const {
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  const [formData, setFormData] = useState({
    firstName: "Aiden",
    lastName: "Vance",
    email: "aiden.v@luxury.com",
    phone: "+92 300 1234567",
    destination: "Northern Areas, Pakistan",
    travelDate: "mm/dd/yyyy",
    travelers: "1 - 2 Person",
    adventureType: "Hiking",
    message: "I am looking for a secluded trekking experience with luxury camping amenities...",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("../../assets/contactHero.jpg")}
          style={[styles.hero, { height: isDesktop ? 520 : 380 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", alignItems: "center" }]}>
              <Text style={styles.heroSmallTitle}>Contact us</Text>
              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 48 : 32 }]}>
                GET IN TOUCH
              </Text>
              <Text style={[styles.heroTitleBlue, { fontSize: isDesktop ? 48 : 32 }]}>
                WITH OUR TEAM
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* ================= MAIN CONTENT SECTION ================= */}
        <View style={[styles.mainSectionWrapper, { backgroundColor: "#F8FAFC" }]}>
          <View
            style={[
              styles.mainSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 60 : 30,
              },
            ]}
          >
            {/* Top Back Link & Heading */}
            <View style={{ marginBottom: 40 }}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.backButtonText}>← Back to Home</Text>
              </TouchableOpacity>

              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>☘ LET'S PLAN TOGETHER</Text>
              </View>

              <Text style={[styles.planTitle, { fontSize: isDesktop ? 44 : 30 }]}>
                PLAN YOUR NEXT <Text style={styles.planTitleBlue}>ADVENTURE</Text>
              </Text>

              <Text style={[styles.planDescription, { fontSize: isDesktop ? 16 : 14, maxWidth: 700 }]}>
                Connect with our team of elite exploration specialists. Whether it's a private charter or a rugged mountain trek, let us help you discover unforgettable adventures tailored to your ambition.
              </Text>
            </View>

            {/* 2-Column Grid (Form Left + Sidebar Right) */}
            <View style={[styles.contentGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }]}>
              {/* Left Column: Form Card */}
              <View style={[styles.formCardContainer, isDesktop && { width: "63%" }]}>
                <View style={styles.formCard}>
                  <View style={styles.formHeaderRow}>
                    <View style={styles.verticalBarAccent} />
                    <Text style={styles.formHeading}>TELL US ABOUT YOUR ADVENTURE</Text>
                  </View>

                  {/* Form Grid */}
                  <View style={styles.formGrid}>
                    {/* Row 1 */}
                    <View style={[(isDesktop || isTablet) ? { flexDirection: "row", gap: 16 } : { flexDirection: "column", gap: 12 }]}>
                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>FIRST NAME</Text>
                        <TextInput
                          value={formData.firstName}
                          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                          placeholderTextColor="#94A3B8"
                          style={styles.darkInput}
                        />
                      </View>

                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>LAST NAME</Text>
                        <TextInput
                          value={formData.lastName}
                          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                          placeholderTextColor="#94A3B8"
                          style={styles.darkInput}
                        />
                      </View>
                    </View>

                    {/* Row 2 */}
                    <View style={[(isDesktop || isTablet) ? { flexDirection: "row", gap: 16, marginTop: 16 } : { flexDirection: "column", gap: 12, marginTop: 12 }]}>
                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>EMAIL ADDRESS</Text>
                        <TextInput
                          value={formData.email}
                          onChangeText={(text) => setFormData({ ...formData, email: text })}
                          keyboardType="email-address"
                          placeholderTextColor="#94A3B8"
                          style={styles.darkInput}
                        />
                      </View>

                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>PHONE NUMBER</Text>
                        <TextInput
                          value={formData.phone}
                          onChangeText={(text) => setFormData({ ...formData, phone: text })}
                          keyboardType="phone-pad"
                          placeholderTextColor="#94A3B8"
                          style={styles.darkInput}
                        />
                      </View>
                    </View>

                    {/* Row 3 */}
                    <View style={[(isDesktop || isTablet) ? { flexDirection: "row", gap: 16, marginTop: 16 } : { flexDirection: "column", gap: 12, marginTop: 12 }]}>
                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>PREFERRED DESTINATION</Text>
                        <View style={styles.dropdownInputWrapper}>
                          <TextInput
                            value={formData.destination}
                            onChangeText={(text) => setFormData({ ...formData, destination: text })}
                            placeholderTextColor="#94A3B8"
                            style={styles.darkInputDropdown}
                          />
                          <Ionicons name="chevron-down" size={18} color="#94A3B8" style={styles.dropdownIcon} />
                        </View>
                      </View>

                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>TRAVEL DATE</Text>
                        <TextInput
                          value={formData.travelDate}
                          onChangeText={(text) => setFormData({ ...formData, travelDate: text })}
                          placeholderTextColor="#94A3B8"
                          style={styles.darkInput}
                        />
                      </View>
                    </View>

                    {/* Row 4 */}
                    <View style={[(isDesktop || isTablet) ? { flexDirection: "row", gap: 16, marginTop: 16 } : { flexDirection: "column", gap: 12, marginTop: 12 }]}>
                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>TRAVELERS</Text>
                        <View style={styles.dropdownInputWrapper}>
                          <TextInput
                            value={formData.travelers}
                            onChangeText={(text) => setFormData({ ...formData, travelers: text })}
                            placeholderTextColor="#94A3B8"
                            style={styles.darkInputDropdown}
                          />
                          <Ionicons name="chevron-down" size={18} color="#94A3B8" style={styles.dropdownIcon} />
                        </View>
                      </View>

                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>ADVENTURE TYPE</Text>
                        <View style={styles.dropdownInputWrapper}>
                          <TextInput
                            value={formData.adventureType}
                            onChangeText={(text) => setFormData({ ...formData, adventureType: text })}
                            placeholderTextColor="#94A3B8"
                            style={styles.darkInputDropdown}
                          />
                          <Ionicons name="chevron-down" size={18} color="#94A3B8" style={styles.dropdownIcon} />
                        </View>
                      </View>
                    </View>

                    {/* Row 5: Message */}
                    <View style={{ marginTop: 16 }}>
                      <Text style={styles.label}>TELL US ABOUT YOUR DREAM ADVENTURE...</Text>
                      <TextInput
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        placeholderTextColor="#94A3B8"
                        style={styles.darkTextArea}
                      />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitBtn} onPress={() => alert("Adventure Request Sent!")}>
                      <Text style={styles.submitBtnText}>SEND ADVENTURE REQUEST</Text>
                    </TouchableOpacity>

                    <Text style={styles.formSubtext}>
                      We usually respond within 12-24 business hours to curate your bespoke itinerary.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Right Column: Sidebar Cards Stack */}
              <View style={[styles.sidebarContainer, isDesktop && { width: "34%" }]}>
                {/* Card 1: Speak To Our Team */}
                <View style={styles.sidebarCard}>
                  <Text style={styles.sidebarCardTitle}>SPEAK TO OUR TEAM</Text>

                  {/* Phone */}
                  <View style={styles.infoRow}>
                    <View style={styles.iconCircle}>
                      <Ionicons name="call-outline" size={18} color="#0B5CAD" />
                    </View>
                    <View style={{ marginLeft: 14 }}>
                      <Text style={styles.infoTagText}>CALL US</Text>
                      <Text style={styles.infoMainText}>+92 312 5556789</Text>
                      <Text style={styles.infoSubText}>Mon–Fri, 9am - 6pm PKT</Text>
                    </View>
                  </View>

                  {/* Email */}
                  <View style={[styles.infoRow, { marginTop: 16 }]}>
                    <View style={styles.iconCircle}>
                      <Ionicons name="mail-outline" size={18} color="#0B5CAD" />
                    </View>
                    <View style={{ marginLeft: 14 }}>
                      <Text style={styles.infoTagText}>EMAIL US</Text>
                      <Text style={styles.infoMainText}>hello@acesadventure.com</Text>
                      <Text style={styles.infoSubText}>Inquiry & Support</Text>
                    </View>
                  </View>

                  {/* Location */}
                  <View style={[styles.infoRow, { marginTop: 16 }]}>
                    <View style={styles.iconCircle}>
                      <Ionicons name="location-outline" size={18} color="#0B5CAD" />
                    </View>
                    <View style={{ marginLeft: 14 }}>
                      <Text style={styles.infoTagText}>LOCATION</Text>
                      <Text style={styles.infoMainText}>Attock, Punjab, Pakistan</Text>
                      <Text style={styles.infoSubText}>The Gateway to the North</Text>
                    </View>
                  </View>
                </View>

                {/* Card 2: The Gold Standard */}
                <View style={[styles.sidebarCard, { marginTop: 20 }]}>
                  <Text style={styles.sidebarCardTitle}>THE GOLD STANDARD</Text>

                  <View style={styles.checkPointRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#0088FF" />
                    <Text style={styles.checkPointText}>Carefully Curated Adventures</Text>
                  </View>

                  <View style={styles.checkPointRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#0088FF" />
                    <Text style={styles.checkPointText}>Safe and Expert-Guided Experiences</Text>
                  </View>

                  <View style={styles.checkPointRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#0088FF" />
                    <Text style={styles.checkPointText}>Luxury Off-grid Accommodations</Text>
                  </View>

                  <View style={styles.checkPointRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#0088FF" />
                    <Text style={styles.checkPointText}>24/7 Concierge for Expeditions</Text>
                  </View>

                  <View style={styles.checkPointRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#0088FF" />
                    <Text style={styles.checkPointText}>Sustainability & Minimal Impact</Text>
                  </View>
                </View>

                {/* Card 3: Featured Compass Image */}
                <View style={{ marginTop: 20 }}>
                  <Image source={require("../../assets/contactCard.jpg")} style={styles.compassImage} />
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
    backgroundColor: "#F8FAFC",
  },

  hero: {
    width: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },

  heroContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },

  heroSmallTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  heroTitle: {
    fontWeight: "900",
    color: "#38BDF8",
    letterSpacing: 1,
    textAlign: "center",
  },

  heroTitleBlue: {
    fontWeight: "900",
    color: "#38BDF8",
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 4,
  },

  /* MAIN CONTENT SECTION */
  mainSectionWrapper: {},

  mainSection: {},

  backButton: {
    marginBottom: 16,
  },

  backButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },

  planBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 14,
  },

  planBadgeText: {
    color: "#0B5CAD",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  planTitle: {
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
  },

  planTitleBlue: {
    color: "#0088FF",
  },

  planDescription: {
    color: "#64748B",
    lineHeight: 26,
    marginTop: 14,
  },

  contentGrid: {
    flexDirection: "column",
  },

  /* FORM CARD */
  formCardContainer: {
    marginBottom: 30,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 36,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },

  formHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  verticalBarAccent: {
    width: 4,
    height: 24,
    backgroundColor: "#0F172A",
    marginRight: 12,
    borderRadius: 2,
  },

  formHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
  },

  formGrid: {},

  inputRow: {
    flexDirection: "column",
  },

  inputCol: {
    marginBottom: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 6,
  },

  darkInput: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownInputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  darkInputDropdown: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 36,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownIcon: {
    position: "absolute",
    right: 14,
  },

  darkTextArea: {
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 14,
    minHeight: 120,
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    cursor: "pointer",
    elevation: 4,
  },

  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },

  formSubtext: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 14,
  },

  /* SIDEBAR CARDS */
  sidebarContainer: {
    flexDirection: "column",
  },

  sidebarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },

  sidebarCardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  infoTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
  },

  infoMainText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },

  infoSubText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  checkPointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  checkPointText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
    marginLeft: 10,
  },

  compassImage: {
    width: "100%",
    height: 170,
    borderRadius: 20,
    resizeMode: "cover",
  },
});
