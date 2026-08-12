import React from "react";
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
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default function AboutScreen() {
  const navigation = useNavigation();
  const {
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("../../assets/about-bg.jpg")}
          style={[styles.hero, { height: isDesktop ? 680 : height * 0.85 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            {/* Header */}
            <Header />

            {/* Hero Content */}
            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", alignItems: "center" }]}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>• PASSION & ADVENTURE •</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 54 : 36, lineHeight: isDesktop ? 62 : 42, textAlign: "center" }]}>
                About Adventure{"\n"}
                <Text style={styles.blueText}>Club</Text>
              </Text>

              <Text style={[styles.heroDescription, { fontSize: isDesktop ? 17 : 15, lineHeight: isDesktop ? 28 : 24, textAlign: "center", maxWidth: 780 }]}>
                Founded on the principle of absolute excellence, ACES Adventure Club curates the world's most exclusive nature expeditions. We bridge the gap between raw wilderness and luxury experiences for passionate explorers.
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("BrowseTrips")}>
                  <Text style={styles.primaryButtonText}>OUR LEGACY</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Contact")}>
                  <Text style={styles.secondaryButtonText}>WATCH THE FILM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= STATS FLOATING CARDS BAR ================= */}
        <View style={[styles.statsSectionWrapper, { marginTop: isDesktop ? -45 : 20, zIndex: 10 }]}>
          <View
            style={[
              styles.statsSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
              },
            ]}
          >
            <View style={[styles.statsGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <View style={[styles.statCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="compass-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.statNumber}>100+</Text>
                <Text style={styles.statLabel}>EXPEDITIONS</Text>
              </View>

              {/* Card 2 */}
              <View style={[styles.statCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="earth-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>DESTINATIONS</Text>
              </View>

              {/* Card 3 */}
              <View style={[styles.statCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="people-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>EXPLORERS</Text>
              </View>

              {/* Card 4 */}
              <View style={[styles.statCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.statNumber}>20+</Text>
                <Text style={styles.statLabel}>EXPERT GUIDES</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= OUR MISSION (2-Column Layout) ================= */}
        <View style={[styles.missionSectionWrapper, { backgroundColor: "#FFFFFF", paddingTop: isDesktop ? 100 : 50 }]}>
          <View
            style={[
              styles.missionSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingBottom: isDesktop ? 80 : 50,
                flexDirection: isDesktop ? "row" : "column",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            {/* Left Column (Big Featured Image) */}
            <View style={{ flex: isDesktop ? 1 : undefined, width: "100%", maxWidth: isDesktop ? 580 : "100%", marginBottom: isDesktop ? 0 : 35 }}>
              <Image source={require("../../assets/about-big.jpg")} style={styles.missionImage} />
            </View>

            {/* Right Column (Mission Text Content) */}
            <View style={{ flex: isDesktop ? 1.1 : undefined, maxWidth: isDesktop ? 650 : "100%", marginLeft: isDesktop ? 50 : 0 }}>
              <Text style={styles.missionTitle}>OUR MISSION</Text>

              <Text style={styles.missionDescription}>
                We exist to redefine the parameters of discovery. At Aces Adventure Club, our mission is to provide more than just a path through the wilderness; we aim to foster an inner journey, one that challenges the spirit and expands the mind.
              </Text>

              <Text style={styles.missionDescription}>
                We believe true luxury is found in the silence of a canyon, the clarity of a mountain stream, and the warmth shared between fellow travelers under a canopy of stars. Our service remains rigorous, ensuring every destination meets our high standards for safety, authenticity, and wonder.
              </Text>

              <View style={styles.quoteBox}>
                <Ionicons name="leaf-outline" size={22} color="#0B5CAD" />
                <Text style={styles.quoteText}>
                  "IN EVERY WALK WITH NATURE, ONE RECEIVES FAR MORE THAN HE SEEKS."
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= CORE PRINCIPLES ================= */}
        <View style={[styles.principlesSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.principlesSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <Text style={styles.principlesTitle}>CORE PRINCIPLES</Text>
            </View>

            {/* 4 Cards Grid */}
            <View style={[styles.principlesGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <View style={[styles.principleCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.principleIcon}>
                  <Ionicons name="compass-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardTitle}>ADVENTURE FIRST</Text>
                <Text style={styles.cardText}>
                  We pursue the unknown with relentless passion and a non-stop craving for discovery.
                </Text>
              </View>

              {/* Card 2 */}
              <View style={[styles.principleCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.principleIcon}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardTitle}>SAFETY ALWAYS</Text>
                <Text style={styles.cardText}>
                  Our guide protocols and equipment maintain your security as our highest priority.
                </Text>
              </View>

              {/* Card 3 */}
              <View style={[styles.principleCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.principleIcon}>
                  <Ionicons name="people-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardTitle}>COMMUNITY SPIRIT</Text>
                <Text style={styles.cardText}>
                  We foster lifelong bonds among our members, creating an inclusive global brotherhood of explorers.
                </Text>
              </View>

              {/* Card 4 */}
              <View style={[styles.principleCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <View style={styles.principleIcon}>
                  <Ionicons name="leaf-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardTitle}>RESPECT FOR NATURE</Text>
                <Text style={styles.cardText}>
                  We are guardians of the wilderness, committed to strict leave-no-trace principles and conservation.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= MEET OUR GUIDES ================= */}
        <View style={[styles.guidesSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.guidesSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            {/* Header Row */}
            <View style={[styles.guidesHeaderRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 35 }]}>
              <View style={{ maxWidth: isDesktop ? 650 : "100%" }}>
                <Text style={styles.guidesTitle}>MEET OUR GUIDES</Text>
                <Text style={styles.guidesDescription}>
                  Each guide is a master of the mountains, highly skilled in rescue, navigation, and passion for sharing the wild.
                </Text>
              </View>

              {isDesktop && (
                <TouchableOpacity style={styles.viewTeamBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                  <Text style={styles.viewTeamBtnText}>VIEW ALL TEAM</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* 4 Guide Cards Grid */}
            <View style={[styles.guidesGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
              {/* GUIDE 1 */}
              <View style={[styles.guideCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <Image source={require("../../assets/guide1.jpg")} style={styles.guideImage} />
                <View style={styles.guideOverlay}>
                  <Text style={styles.guideCategory}>CHIEF EXPEDITION LEAD</Text>
                  <Text style={styles.guideName}>MARCUS THORNE</Text>
                </View>
              </View>

              {/* GUIDE 2 */}
              <View style={[styles.guideCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <Image source={require("../../assets/guide2.jpg")} style={styles.guideImage} />
                <View style={styles.guideOverlay}>
                  <Text style={styles.guideCategory}>ALPINE GUIDE</Text>
                  <Text style={styles.guideName}>ELENA VANCE</Text>
                </View>
              </View>

              {/* GUIDE 3 */}
              <View style={[styles.guideCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <Image source={require("../../assets/guide3.jpg")} style={styles.guideImage} />
                <View style={styles.guideOverlay}>
                  <Text style={styles.guideCategory}>SURVIVAL EXPERT</Text>
                  <Text style={styles.guideName}>JULIAN BECK</Text>
                </View>
              </View>

              {/* GUIDE 4 */}
              <View style={[styles.guideCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                <Image source={require("../../assets/guide4.jpg")} style={styles.guideImage} />
                <View style={styles.guideOverlay}>
                  <Text style={styles.guideCategory}>SAFETY OFFICER</Text>
                  <Text style={styles.guideName}>SOFIA RICCI</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= READY TO BEGIN YOUR ADVENTURE (CTA Banner) ================= */}
        <View style={[styles.ctaSectionWrapper, { backgroundColor: "#F7FAFD", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("../../assets/adventure-bg.jpg")}
              style={styles.ctaBg}
              imageStyle={{ borderRadius: 28 }}
            >
              <View style={styles.ctaOverlay}>
                <View style={{ alignItems: "center", paddingVertical: isDesktop ? 70 : 45, paddingHorizontal: 24 }}>
                  <Text style={[styles.ctaHeading, { fontSize: isDesktop ? 48 : 30, textAlign: "center" }]}>
                    READY TO BEGIN{"\n"}YOUR ADVENTURE?
                  </Text>

                  <Text style={[styles.ctaDescription, { fontSize: isDesktop ? 16 : 14, textAlign: "center", maxWidth: 680 }]}>
                    Join the elite class of explorers who demand the best from nature and create unforgettable memories with every journey.
                  </Text>

                  <View style={styles.ctaButtonsRow}>
                    <TouchableOpacity style={styles.ctaPrimaryBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                      <Text style={styles.ctaPrimaryText}>BOOK A TRIP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ctaSecondaryBtn} onPress={() => navigation.navigate("Contact")}>
                      <Text style={styles.ctaSecondaryText}>CONTACT US</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Footer */}
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
    backgroundColor: "rgba(6, 24, 48, 0.5)",
  },

  heroContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },

  heroBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 20,
  },

  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  blueText: {
    color: "#38BDF8",
    fontStyle: "italic",
  },

  heroDescription: {
    color: "#E2E8F0",
    marginTop: 18,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 35,
    gap: 16,
  },

  primaryButton: {
    backgroundColor: "#0B2545",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },

  /* STATS FLOATING CARDS */
  statsSectionWrapper: {},

  statsSection: {},

  statsGrid: {
    flexDirection: "column",
  },

  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1.5,
    marginTop: 4,
  },

  /* MISSION SECTION */
  missionSectionWrapper: {},

  missionSection: {},

  missionImage: {
    width: "100%",
    height: 440,
    borderRadius: 24,
  },

  missionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
    marginBottom: 16,
  },

  missionDescription: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 26,
    marginBottom: 16,
  },

  quoteBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#0B5CAD",
  },

  quoteText: {
    marginLeft: 14,
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 0.5,
    flex: 1,
  },

  /* CORE PRINCIPLES */
  principlesSectionWrapper: {},

  principlesSection: {},

  principlesTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
  },

  principlesGrid: {
    marginTop: 10,
  },

  principleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  principleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },

  cardText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    textAlign: "center",
  },

  /* MEET OUR GUIDES */
  guidesSectionWrapper: {},

  guidesSection: {},

  guidesHeaderRow: {},

  guidesTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 1,
  },

  guidesDescription: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 26,
    marginTop: 8,
  },

  viewTeamBtn: {
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    cursor: "pointer",
  },

  viewTeamBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: 1,
  },

  guidesGrid: {
    marginTop: 30,
  },

  guideCard: {
    width: "100%",
    height: 360,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
  },

  guideImage: {
    width: "100%",
    height: "100%",
  },

  guideOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  guideCategory: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  guideName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /* READY TO BEGIN CTA BANNER */
  ctaSectionWrapper: {},

  ctaBg: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 28,
  },

  ctaOverlay: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 28,
  },

  ctaHeading: {
    color: "#FFFFFF",
    fontWeight: "900",
    lineHeight: 56,
    letterSpacing: 1,
  },

  ctaDescription: {
    color: "#CBD5E1",
    marginTop: 14,
    lineHeight: 24,
  },

  ctaButtonsRow: {
    flexDirection: "row",
    marginTop: 30,
    gap: 16,
  },

  ctaPrimaryBtn: {
    backgroundColor: "#0B2545",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  ctaPrimaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  ctaSecondaryBtn: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
  },

  ctaSecondaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
