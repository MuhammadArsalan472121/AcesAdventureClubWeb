import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Footer from "./Footer";
import useResponsive from "./useResponsive";

const { height, width } = Dimensions.get("window");

export default function ViewTripScreen() {
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
          source={require("./assets/tripHero.jpg")}
          style={[styles.hero, { height: isDesktop ? 680 : height * 0.88 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center" }]}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>• HUNZA EXPLORER • FEATURED •</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 54 : 34 }]}>
                HUNZA EXPLORER
              </Text>

              <Text style={[styles.heroDescription, { fontSize: isDesktop ? 17 : 15, maxWidth: 750 }]}>
                Experience the breathtaking beauty of Pakistan's northern mountain valleys, ancient forts, and rich alpine culture.
              </Text>

              {/* 4 Translucent Info Cards Row */}
              <View style={[styles.infoRow, isDesktop && { flexDirection: "row", gap: 16, marginTop: 24 }]}>
                <View style={styles.infoCard}>
                  <Ionicons name="time-outline" size={18} color="#38BDF8" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.infoLabel}>DURATION</Text>
                    <Text style={styles.infoValue}>5 Days / 4 Nights</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <Ionicons name="speedometer-outline" size={18} color="#38BDF8" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.infoLabel}>DIFFICULTY</Text>
                    <Text style={styles.infoValue}>Moderate</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <Ionicons name="location-outline" size={18} color="#38BDF8" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.infoLabel}>LOCATION</Text>
                    <Text style={styles.infoValue}>Gilgit-Baltistan</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <Ionicons name="pricetag-outline" size={18} color="#38BDF8" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.infoLabel}>PRICE</Text>
                    <Text style={styles.infoValue}>PKR 40,000 / person</Text>
                  </View>
                </View>
              </View>

              {/* Action Button */}
              <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.bookNowBtn} onPress={() => navigation.navigate("Contact")}>
                  <Text style={styles.bookNowBtnText}>BOOK NOW ➔</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= ABOUT THIS ADVENTURE (2-Column Desktop Layout) ================= */}
        <View style={[styles.aboutSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.aboutSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
                flexDirection: isDesktop ? "row" : "column",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            {/* Left Column (Text Content) */}
            <View style={{ flex: isDesktop ? 1 : undefined, maxWidth: isDesktop ? 620 : "100%", marginRight: isDesktop ? 40 : 0 }}>
              <Text style={styles.aboutSmallTitle}>FULL EXPERIENCE</Text>
              <Text style={styles.aboutTitle}>About This Adventure</Text>

              <Text style={styles.aboutParagraph}>
                The Hunza Valley Adventure is a journey through one of the most serene and majestic places on earth. Surrounded by iconic peaks such as Rakaposhi, Ultar Sar, and Ladyfinger Peak, this expedition offers an unforgettable blend of natural grandeur and vibrant local culture.
              </Text>

              <Text style={styles.aboutParagraph}>
                From exploring ancient 800-year-old forts like Baltit and Altit to walking alongside tranquil turquoise lakes at Attabad, every day is crafted to provide a deep connection with nature and local mountain traditions.
              </Text>

              <TouchableOpacity style={styles.learnMoreBtn} onPress={() => navigation.navigate("Contact")}>
                <Text style={styles.learnMoreBtnText}>Learn More</Text>
              </TouchableOpacity>
            </View>

            {/* Right Column (Featured Image) */}
            <View style={{ flex: isDesktop ? 1 : undefined, width: "100%", maxWidth: isDesktop ? 580 : "100%", marginTop: isDesktop ? 0 : 35 }}>
              <Image source={require("./assets/aboutTrip.jpg")} style={styles.aboutImage} />
            </View>
          </View>
        </View>

        {/* ================= EXCLUSIVE FEATURES (Dark Navy Container Card) ================= */}
        <View style={[styles.featuresSectionWrapper, { backgroundColor: "#F8FAFC", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <View style={styles.featuresDarkCard}>
              <View style={{ alignItems: "center", marginBottom: 35 }}>
                <Text style={styles.featuresSmallTitle}>WHAT IS INCLUDED</Text>
                <Text style={styles.featuresTitle}>Exclusive Features</Text>
              </View>

              {/* 4 Feature Cards Grid */}
              <View style={[styles.featuresGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
                <View style={[styles.featureCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="compass-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.featureCardHeading}>Scenic Accommodation</Text>
                  <Text style={styles.featureCardText}>
                    Stay in handpicked boutique hotels and cozy riverside glamping sites.
                  </Text>
                </View>

                <View style={[styles.featureCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="person-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.featureCardHeading}>Guided Excursions</Text>
                  <Text style={styles.featureCardText}>
                    Expert local guides leading every trek and cultural site tour.
                  </Text>
                </View>

                <View style={[styles.featureCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="camera-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.featureCardHeading}>Photography Spots</Text>
                  <Text style={styles.featureCardText}>
                    Access to exclusive vantage points for sunrise and sunset photography.
                  </Text>
                </View>

                <View style={[styles.featureCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name="leaf-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.featureCardHeading}>Nature Encounters</Text>
                  <Text style={styles.featureCardText}>
                    Walk through apricot orchards and tranquil mountain streams.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= ADVENTURE ITINERARY (Timeline Step-by-Step Layout) ================= */}
        <View style={[styles.itinerarySectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.itinerarySection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <View style={{ alignItems: "center", marginBottom: 45 }}>
              <Text style={styles.itinerarySmallTitle}>DAY BY DAY PLAN</Text>
              <Text style={styles.itineraryMainTitle}>Adventure Itinerary</Text>
            </View>

            {/* Timeline Steps */}
            <View style={styles.timelineContainer}>
              {/* Day 1 */}
              <View style={[styles.timelineRow, isDesktop && { flexDirection: "row", alignItems: "center", marginBottom: 40 }]}>
                <View style={[styles.timelineTextCol, isDesktop && { flex: 1, paddingRight: 30 }]}>
                  <Text style={styles.dayBadgeText}>DAY 01</Text>
                  <Text style={styles.dayTitle}>Arrival and Orientation</Text>
                  <Text style={styles.dayDescription}>
                    Arrive in Islamabad, transfer to airport for Gilgit flight or scenic drive. Check in to hotel and evening orientation dinner.
                  </Text>
                </View>

                <View style={styles.timelineNode}>
                  <Text style={styles.timelineNodeText}>1</Text>
                </View>

                <View style={[styles.timelineImageCol, isDesktop && { flex: 1, paddingLeft: 30 }]}>
                  <Image source={require("./assets/featured1.jpg")} style={styles.timelineImage} />
                </View>
              </View>

              {/* Day 2 */}
              <View style={[styles.timelineRow, isDesktop && { flexDirection: "row", alignItems: "center", marginBottom: 40 }]}>
                <View style={[styles.timelineImageCol, isDesktop && { flex: 1, paddingRight: 30 }]}>
                  <Image source={require("./assets/featured2.jpg")} style={styles.timelineImage} />
                </View>

                <View style={styles.timelineNode}>
                  <Text style={styles.timelineNodeText}>2</Text>
                </View>

                <View style={[styles.timelineTextCol, isDesktop && { flex: 1, paddingLeft: 30 }]}>
                  <Text style={styles.dayBadgeText}>DAY 02</Text>
                  <Text style={styles.dayTitle}>Mountain Exploration</Text>
                  <Text style={styles.dayDescription}>
                    Drive towards Hunza Valley, stopping at Rakaposhi View Point. Explore ancient Baltit Fort and local bazaars in Karimabad.
                  </Text>
                </View>
              </View>

              {/* Day 3 */}
              <View style={[styles.timelineRow, isDesktop && { flexDirection: "row", alignItems: "center" }]}>
                <View style={[styles.timelineTextCol, isDesktop && { flex: 1, paddingRight: 30 }]}>
                  <Text style={styles.dayBadgeText}>DAY 03</Text>
                  <Text style={styles.dayTitle}>Sightseeing and Return</Text>
                  <Text style={styles.dayDescription}>
                    Visit Attabad Lake, Passu Cones, and Hussaini Suspension Bridge. Enjoy traditional music performance before return journey.
                  </Text>
                </View>

                <View style={styles.timelineNode}>
                  <Text style={styles.timelineNodeText}>3</Text>
                </View>

                <View style={[styles.timelineImageCol, isDesktop && { flex: 1, paddingLeft: 30 }]}>
                  <Image source={require("./assets/featured3.jpg")} style={styles.timelineImage} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= CAPTURED MOMENTS (Photo Collage Grid + Button) ================= */}
        <View style={[styles.gallerySectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.gallerySection,
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
            <View style={[styles.galleryHeaderRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 35 }]}>
              <View>
                <Text style={styles.gallerySmallTitle}>GALLERY</Text>
                <Text style={styles.galleryTitle}>Captured Moments</Text>
              </View>

              {isDesktop && (
                <TouchableOpacity style={styles.viewPhotosBtn} onPress={() => navigation.navigate("Gallery")}>
                  <Text style={styles.viewPhotosBtnText}>VIEW ALL PHOTOS ➔</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Collage Grid */}
            <View style={[styles.collageGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
              {/* Left Tall Image */}
              <View style={[styles.tallImageWrapper, isDesktop && { width: "48%" }]}>
                <Image source={require("./assets/hunza.jpg")} style={styles.tallImage} />
              </View>

              {/* Right 2x2 Image Grid */}
              <View style={[styles.rightImagesCol, isDesktop && { width: "49%" }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                  <Image source={require("./assets/hub2.jpg")} style={styles.gridSquareImage} />
                  <Image source={require("./assets/hub3.jpg")} style={styles.gridSquareImage} />
                </View>
                <Image source={require("./assets/featured3.jpg")} style={styles.gridWideImage} />
              </View>
            </View>
          </View>
        </View>

        {/* ================= STATS BAR (Dark Navy Box with 4 Floating White Cards) ================= */}
        <View style={[styles.statsSectionWrapper, { backgroundColor: "#F8FAFC", paddingVertical: isDesktop ? 40 : 20 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <View style={styles.statsDarkBar}>
              <View style={[styles.statsCardsRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                {/* Card 1 */}
                <View style={[styles.statWhiteCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <Ionicons name="time-outline" size={24} color="#0B5CAD" />
                  <Text style={styles.statCardValue}>5 Days</Text>
                  <Text style={styles.statCardLabel}>TOTAL DURATION</Text>
                </View>

                {/* Card 2 */}
                <View style={[styles.statWhiteCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <Ionicons name="speedometer-outline" size={24} color="#0B5CAD" />
                  <Text style={styles.statCardValue}>Easy-Mod</Text>
                  <Text style={styles.statCardLabel}>FITNESS LEVEL</Text>
                </View>

                {/* Card 3 */}
                <View style={[styles.statWhiteCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <Ionicons name="people-outline" size={24} color="#0B5CAD" />
                  <Text style={styles.statCardValue}>12 Max</Text>
                  <Text style={styles.statCardLabel}>GROUP SIZE</Text>
                </View>

                {/* Card 4 */}
                <View style={[styles.statWhiteCard, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <Ionicons name="calendar-outline" size={24} color="#0B5CAD" />
                  <Text style={styles.statCardValue}>All Year</Text>
                  <Text style={styles.statCardLabel}>BEST SEASON</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= READY TO BEGIN YOUR ADVENTURE (CTA Banner) ================= */}
        <View style={[styles.ctaSectionWrapper, { backgroundColor: "#FFFFFF", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("./assets/adventure-bg.jpg")}
              style={styles.ctaBg}
              imageStyle={{ borderRadius: 28 }}
            >
              <View style={styles.ctaOverlay}>
                <View style={{ alignItems: "center", paddingVertical: isDesktop ? 70 : 45, paddingHorizontal: 24 }}>
                  <Text style={styles.ctaSmallBadgeText}>START YOUR JOURNEY</Text>

                  <Text style={[styles.ctaHeading, { fontSize: isDesktop ? 48 : 30, textAlign: "center" }]}>
                    READY TO BEGIN{"\n"}YOUR ADVENTURE?
                  </Text>

                  <Text style={[styles.ctaDescription, { fontSize: isDesktop ? 16 : 14, textAlign: "center", maxWidth: 680 }]}>
                    Join the elite club of explorers who demand the best from nature and create unforgettable memories with every journey.
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

  heroBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "flex-start",
    marginBottom: 16,
  },

  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
  },

  heroDescription: {
    color: "#F1F5F9",
    marginTop: 14,
    lineHeight: 24,
  },

  infoRow: {
    flexDirection: "column",
    gap: 12,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  infoLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },

  bookNowBtn: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    alignSelf: "flex-start",
    cursor: "pointer",
    elevation: 4,
  },

  bookNowBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* ABOUT THIS ADVENTURE */
  aboutSectionWrapper: {},

  aboutSection: {},

  aboutSmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  aboutTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 16,
  },

  aboutParagraph: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 26,
    marginBottom: 16,
  },

  learnMoreBtn: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: "flex-start",
    marginTop: 10,
    cursor: "pointer",
  },

  learnMoreBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  aboutImage: {
    width: "100%",
    height: 380,
    borderRadius: 24,
  },

  /* EXCLUSIVE FEATURES */
  featuresSectionWrapper: {},

  featuresDarkCard: {
    backgroundColor: "#1E293B",
    borderRadius: 28,
    padding: 40,
  },

  featuresSmallTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#38BDF8",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  featuresTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  featuresGrid: {
    flexDirection: "column",
  },

  featureCardItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },

  featureIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  featureCardHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  featureCardText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },

  /* ADVENTURE ITINERARY */
  itinerarySectionWrapper: {},

  itinerarySection: {},

  itinerarySmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  itineraryMainTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  timelineContainer: {},

  timelineRow: {
    marginBottom: 30,
  },

  timelineTextCol: {},

  dayBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  dayTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  dayDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },

  timelineNode: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    borderWidth: 2,
    borderColor: "#0088FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 16,
  },

  timelineNodeText: {
    color: "#0088FF",
    fontSize: 16,
    fontWeight: "800",
  },

  timelineImageCol: {},

  timelineImage: {
    width: "100%",
    height: 200,
    borderRadius: 18,
  },

  /* CAPTURED MOMENTS GALLERY */
  gallerySectionWrapper: {},

  gallerySection: {},

  galleryHeaderRow: {},

  gallerySmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  galleryTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  viewPhotosBtn: {
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    cursor: "pointer",
  },

  viewPhotosBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: 1,
  },

  collageGrid: {
    marginTop: 20,
  },

  tallImageWrapper: {
    marginBottom: 16,
  },

  tallImage: {
    width: "100%",
    height: 420,
    borderRadius: 20,
  },

  rightImagesCol: {},

  gridSquareImage: {
    width: "48.5%",
    height: 200,
    borderRadius: 18,
  },

  gridWideImage: {
    width: "100%",
    height: 204,
    borderRadius: 18,
  },

  /* STATS BAR DARK NAVY WITH 4 WHITE CARDS */
  statsSectionWrapper: {},

  statsDarkBar: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },

  statsCardsRow: {
    flexDirection: "column",
    gap: 16,
  },

  statWhiteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },

  statCardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 8,
  },

  statCardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1.5,
    marginTop: 4,
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

  ctaSmallBadgeText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 12,
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