import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
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

export default function PartnerScreen() {
  const navigation = useNavigation();
  const {
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  const sponsoredTrips = [
    {
      id: 1,
      image: require("./assets/hub1.jpg"),
      badge: "Most Popular",
      title: "Hunza Valley",
      description: "Experience breathtaking beauty of Hunza's mountains and valleys.",
      duration: "3 Days",
      price: "PKR 40,000",
    },
    {
      id: 2,
      image: require("./assets/hub2.jpg"),
      badge: "Most Liked",
      title: "Fairy Meadows Trek",
      description: "Journey through scenic trails leading to Nanga Parbat base camp.",
      duration: "5 Days",
      price: "PKR 55,000",
    },
    {
      id: 3,
      image: require("./assets/hub3.jpg"),
      badge: "Most Visited",
      title: "Skardu Adventure",
      description: "Explore Karakoram peaks, Shangrila lake and Cold Desert.",
      duration: "7 Days",
      price: "PKR 65,000",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("./assets/partnerhero.jpg")}
          style={[styles.hero, { height: isDesktop ? 650 : height * 0.85 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center" }]}>
              <View style={styles.partnerBadge}>
                <Text style={styles.partnerBadgeText}>• OFFICIAL PARTNERSHIPS •</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 54 : 34 }]}>
                Our Trusted Adventure{"\n"}Partner
              </Text>

              <Text style={[styles.heroDescription, { fontSize: isDesktop ? 17 : 15, maxWidth: 750 }]}>
                Work together to create safe, memorable, and premium outdoor experiences across Pakistan's most scenic destinations.
              </Text>

              <View style={styles.heroButtons}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Home")}>
                  <Text style={styles.primaryButtonText}>Visit Partner</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Contact")}>
                  <Text style={styles.secondaryButtonText}>Become a Partner</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= OFFICIAL PARTNER HIGHLIGHT (2-Column Desktop Section) ================= */}
        <View style={[styles.partnerSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.partnerSection,
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
            {/* Left Image */}
            <View style={{ flex: isDesktop ? 1 : undefined, width: "100%", maxWidth: isDesktop ? 580 : "100%", marginBottom: isDesktop ? 0 : 35 }}>
              <Image source={require("./assets/partnerProfile.jpg")} style={styles.partnerImage} resizeMode="cover" />
            </View>

            {/* Right Text */}
            <View style={{ flex: isDesktop ? 1.1 : undefined, maxWidth: isDesktop ? 640 : "100%", marginLeft: isDesktop ? 45 : 0 }}>
              <Text style={styles.partnerLabel}>OFFICIAL PARTNER</Text>
              <Text style={styles.partnerName}>Mountain Gear Pakistan</Text>

              <View style={styles.partnerTagsRow}>
                <View style={styles.tagChip}>
                  <Text style={styles.tagChipText}>Outdoor Equipment</Text>
                </View>
                <View style={styles.tagChip}>
                  <Text style={styles.tagChipText}>Expedition Supplier</Text>
                </View>
              </View>

              <Text style={styles.partnerDescription}>
                Mountain Gear Pakistan is a premier outdoor equipment company dedicated to supporting outdoor tourism and adventure seekers. By providing state-of-the-art gear and expert equipment logistics, they ensure every trek into the heart of the Karakoram is backed by safety, reliability, and world-class equipment.
              </Text>
            </View>
          </View>
        </View>

        {/* ================= A VISION SHARED (Dark Navy Outer Card Container) ================= */}
        <View style={[styles.visionSectionWrapper, { backgroundColor: "#F8FAFC", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <View style={styles.visionDarkCard}>
              <View style={{ alignItems: "center", marginBottom: 35 }}>
                <Text style={styles.visionSmallTag}>OUR VALUES</Text>
                <Text style={styles.visionTitle}>A Vision Shared</Text>
                <Text style={styles.visionSubtitle}>
                  Our partnerships are built on four core pillars that define the essence of our joint endeavors.
                </Text>
              </View>

              {/* 4 Dark Feature Cards Grid */}
              <View style={[styles.visionGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
                <View style={[styles.visionCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.visionIconCircle}>
                    <Ionicons name="leaf-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.visionCardTitle}>Support Eco Tourism</Text>
                  <Text style={styles.visionCardDesc}>
                    Promoting sustainable practices to preserve Pakistan's pristine wilderness.
                  </Text>
                </View>

                <View style={[styles.visionCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.visionIconCircle}>
                    <Ionicons name="shield-checkmark-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.visionCardTitle}>Adventure Safety</Text>
                  <Text style={styles.visionCardDesc}>
                    Equipping all expeditions with tested, high-grade safety equipment.
                  </Text>
                </View>

                <View style={[styles.visionCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.visionIconCircle}>
                    <Ionicons name="diamond-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.visionCardTitle}>Premium Equipment</Text>
                  <Text style={styles.visionCardDesc}>
                    Providing explorers with access to world-class mountain gear.
                  </Text>
                </View>

                <View style={[styles.visionCardItem, isDesktop && { width: "23.5%", marginBottom: 0 }]}>
                  <View style={styles.visionIconCircle}>
                    <Ionicons name="people-outline" size={24} color="#0B5CAD" />
                  </View>
                  <Text style={styles.visionCardTitle}>Community Development</Text>
                  <Text style={styles.visionCardDesc}>
                    Supporting local guides and mountain communities through fair trade.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= SPONSORED EXPEDITIONS ================= */}
        <View style={[styles.tripSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.tripSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <Text style={styles.tripSmallTag}>FEATURED EXPEDITIONS</Text>
            <Text style={styles.tripMainTitle}>Sponsored Expeditions</Text>
            <Text style={styles.tripDescription}>
              Explore handpicked expeditions proudly supported by our official brand partners.
            </Text>

            {/* 3 Destination Cards Grid */}
            <View style={[styles.tripCardsGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between", marginTop: 35 }]}>
              {sponsoredTrips.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.tripCard, isDesktop && { width: "31.5%", marginBottom: 0 }]}
                  onPress={() => navigation.navigate("ViewTrip")}
                >
                  <ImageBackground source={item.image} style={styles.tripCardBg} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.tripOverlay}>
                      <View style={styles.tripBadge}>
                        <Text style={styles.tripBadgeText}>{item.badge}</Text>
                      </View>

                      <View style={styles.tripCardBottom}>
                        <Text style={styles.tripName}>{item.title}</Text>
                        <Text style={styles.tripDesc}>{item.description}</Text>

                        <View style={styles.tripBottomRow}>
                          <View>
                            <Text style={styles.priceLabelText}>starting from</Text>
                            <Text style={styles.tripPriceText}>{item.price}</Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.daysText}>{item.duration}</Text>
                            <Text style={styles.viewPackageText}>view package ➔</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ================= PARTNERSHIP BENEFITS (6 White Feature Cards Grid) ================= */}
        <View style={[styles.benefitSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.benefitSection,
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
              <Text style={styles.benefitSmallTag}>WHY PARTNER WITH US</Text>
              <Text style={styles.benefitTitle}>Partnership Benefits</Text>
            </View>

            {/* 6 Feature Cards Grid */}
            <View style={[styles.benefitCardsGrid, isDesktop && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <View style={[styles.benefitCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.benefitIconBox}>
                  <Ionicons name="person-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.benefitCardHeading}>Professional Guides</Text>
                <Text style={styles.benefitCardText}>
                  Access to our network of top-tier mountain guides and local field leaders.
                </Text>
              </View>

              {/* Card 2 */}
              <View style={[styles.benefitCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.benefitIconBox}>
                  <Ionicons name="bonfire-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.benefitCardHeading}>Camping Equipment</Text>
                <Text style={styles.benefitCardText}>
                  All-weather high-altitude tents and sleeping systems for expeditions.
                </Text>
              </View>

              {/* Card 3 */}
              <View style={[styles.benefitCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.benefitIconBox}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.benefitCardHeading}>Travel Insurance</Text>
                <Text style={styles.benefitCardText}>
                  Comprehensive coverage for high-altitude trekking and emergency medical care.
                </Text>
              </View>

              {/* Card 4 */}
              <View style={[styles.benefitCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.benefitIconBox}>
                  <Ionicons name="camera-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.benefitCardHeading}>Photographic Support</Text>
                <Text style={styles.benefitCardText}>
                  Professional media coverage to capture your journey in high definition.
                </Text>
              </View>

              {/* Card 5 */}
              <View style={[styles.benefitCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.benefitIconBox}>
                  <Ionicons name="pricetag-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.benefitCardHeading}>Member Discount Rates</Text>
                <Text style={styles.benefitCardText}>
                  Special member rates for equipment rental, gear gear, and expedition supplies.
                </Text>
              </View>

              {/* Card 6 */}
              <View style={[styles.benefitCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.benefitIconBox}>
                  <Ionicons name="call-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.benefitCardHeading}>24/7 Field Support</Text>
                <Text style={styles.benefitCardText}>
                  Dedicated emergency response team and 24/7 satellite communication.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= BECOME AN OFFICIAL ADVENTURE PARTNER (CTA Banner) ================= */}
        <View style={[styles.ctaSectionWrapper, { backgroundColor: "#FFFFFF", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("./assets/partnerBanner.jpg")}
              style={styles.ctaBg}
              imageStyle={{ borderRadius: 28 }}
            >
              <View style={styles.ctaOverlay}>
                <View style={{ alignItems: "center", paddingVertical: isDesktop ? 70 : 45, paddingHorizontal: 24 }}>
                  <Text style={[styles.ctaTitleWhite, { fontSize: isDesktop ? 44 : 28, textAlign: "center" }]}>
                    BECOME AN OFFICIAL
                  </Text>

                  <Text style={[styles.ctaTitleBlue, { fontSize: isDesktop ? 44 : 28, textAlign: "center" }]}>
                    ADVENTURE PARTNER
                  </Text>

                  <Text style={[styles.ctaDescription, { fontSize: isDesktop ? 16 : 14, textAlign: "center", maxWidth: 680 }]}>
                    Join our network of industry leaders, brands, and local organizations as we shape the future of outdoor adventure in Pakistan.
                  </Text>

                  <View style={styles.ctaButtonsRow}>
                    <TouchableOpacity style={styles.ctaSecondaryBtn} onPress={() => navigation.navigate("Contact")}>
                      <Text style={styles.ctaSecondaryText}>Partner with Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ctaPrimaryBtn} onPress={() => navigation.navigate("Contact")}>
                      <Text style={styles.ctaPrimaryText}>Contact Team</Text>
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

  partnerBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "flex-start",
    marginBottom: 16,
  },

  partnerBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  heroDescription: {
    color: "#F1F5F9",
    marginTop: 14,
    lineHeight: 24,
  },

  heroButtons: {
    flexDirection: "row",
    marginTop: 30,
    gap: 16,
  },

  primaryButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    elevation: 4,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
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
    fontSize: 15,
    fontWeight: "700",
  },

  /* PARTNER PROFILE */
  partnerSectionWrapper: {},

  partnerSection: {},

  partnerImage: {
    width: "100%",
    height: 380,
    borderRadius: 24,
  },

  partnerLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  partnerName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  partnerTagsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  tagChip: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },

  tagChipText: {
    color: "#0B5CAD",
    fontSize: 12,
    fontWeight: "700",
  },

  partnerDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 26,
  },

  /* A VISION SHARED */
  visionSectionWrapper: {},

  visionDarkCard: {
    backgroundColor: "#1E293B",
    borderRadius: 28,
    padding: 40,
  },

  visionSmallTag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#38BDF8",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  visionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  visionSubtitle: {
    fontSize: 15,
    color: "#CBD5E1",
    textAlign: "center",
    maxWidth: 650,
  },

  visionGrid: {
    flexDirection: "column",
  },

  visionCardItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },

  visionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  visionCardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  visionCardDesc: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },

  /* SPONSORED EXPEDITIONS */
  tripSectionWrapper: {},

  tripSection: {},

  tripSmallTag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  tripMainTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  tripDescription: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 6,
  },

  tripCardsGrid: {},

  tripCard: {
    width: "100%",
    height: 360,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
    cursor: "pointer",
  },

  tripCardBg: {
    width: "100%",
    height: "100%",
  },

  tripOverlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  tripBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0088FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  tripBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  tripCardBottom: {},

  tripName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  tripDesc: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  tripBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },

  priceLabelText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
  },

  tripPriceText: {
    color: "#38BDF8",
    fontSize: 15,
    fontWeight: "800",
  },

  daysText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  viewPackageText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },

  /* PARTNERSHIP BENEFITS */
  benefitSectionWrapper: {},

  benefitSection: {},

  benefitSmallTag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  benefitTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  benefitCardsGrid: {},

  benefitCardItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  benefitIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  benefitCardHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  benefitCardText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },

  /* BECOME AN OFFICIAL ADVENTURE PARTNER CTA BANNER */
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

  ctaTitleWhite: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
  },

  ctaTitleBlue: {
    color: "#38BDF8",
    fontWeight: "900",
    fontStyle: "italic",
    marginTop: 4,
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
    backgroundColor: "#0088FF",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
  },

  ctaPrimaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
  },
});
