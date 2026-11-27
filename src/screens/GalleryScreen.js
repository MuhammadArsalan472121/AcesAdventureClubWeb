import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { resolveAsset, useData } from "../context/DataContext";
import useResponsive from "../hooks/useResponsive";
import {
  animateCards,
  animateHero,
  animateSection
} from "../utils/animations";

const { height, width } = Dimensions.get("window");

export default function GalleryScreen() {
  const navigation = useNavigation();
  const { gallery = [], trips = [], contactContent, socialLinks } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpenWhatsAppChat = () => {
    const rawNumber = contactContent?.whatsapp || socialLinks?.whatsapp || "+923121578099";
    const cleanNumber = String(rawNumber).replace(/[^0-9]/g, "");
    const text = encodeURIComponent("Hello Ace Adventure Club! I want to get updates on upcoming trips & adventures.");
    const url = `https://wa.me/${cleanNumber || "923121578099"}?text=${text}`;
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(url, "_blank");
    } else {
      Linking.openURL(url).catch((err) => console.warn("WhatsApp open error:", err));
    }
  };

  const {
    isMobile,
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  // GSAP entrance animations on mount
  useEffect(() => {
    animateHero(".gsap-gallery-hero");
    const t = setTimeout(() => {
      animateCards(".gsap-gallery-card");
      animateSection(".gsap-gallery-section");
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Dynamic trip title filters: Show all trips from DataContext and preserve any custom gallery trip categories
  const tripTitles = Array.from(
    new Set((trips || []).map((t) => (t.title ? t.title.trim() : "")).filter(Boolean))
  );
  const otherCategories = Array.from(
    new Set(
      (gallery || [])
        .map((item) => (item.tripTitle || item.category || "").trim())
        .filter((c) => c && !tripTitles.some((t) => t.toLowerCase() === c.toLowerCase()))
    )
  );
  const categories = ["All", ...tripTitles, ...otherCategories];

  // Filtering: "All" returns all gallery items, clicking a trip returns photos for that trip
  const isAllSelected = !selectedCategory || selectedCategory.trim().toLowerCase() === "all";
  const filteredGallery = isAllSelected
    ? (gallery || [])
    : (gallery || []).filter((item) => {
      if (!item) return false;
      const target = selectedCategory.trim().toLowerCase();
      const itemTrip = (item.tripTitle || "").trim().toLowerCase();
      const itemCat = (item.category || "").trim().toLowerCase();
      const itemTitle = (item.title || "").trim().toLowerCase();
      return itemTrip === target || itemCat === target || itemTitle.includes(target);
    });

  // Distribute items across 3 columns for desktop masonry
  const col1 = filteredGallery.filter((_, idx) => idx % 3 === 0);
  const col2 = filteredGallery.filter((_, idx) => idx % 3 === 1);
  const col3 = filteredGallery.filter((_, idx) => idx % 3 === 2);

  const signatureDestinations = trips.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("../../assets/galleryHero.jpg")}
          style={[styles.hero, { height: isDesktop ? 640 : height * 0.85 }]}
          resizeMode="cover"
        >
          <View className="gsap-gallery-hero" style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", alignItems: "center" }]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✨ EXPLORE NATURE'S BEAUTY</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 54 : 36, textAlign: "center" }]}>
                Discover Places
              </Text>
              <Text style={[styles.heroSubTitle, { fontSize: isDesktop ? 54 : 36, textAlign: "center" }]}>
                Worth Exploring
              </Text>

              <Text style={[styles.heroDescription, { fontSize: isDesktop ? 17 : 15, textAlign: "center", maxWidth: 750 }]}>
                Experience breathtaking mountains, hidden trails, peaceful lakes, and unforgettable landscapes through our curated adventure showcase.
              </Text>

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate("BrowseTrips")}>
                  <Text style={styles.heroButtonText}>EXPLORE TRIPS ➔</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= DYNAMIC CATEGORY FILTERS & UPLOAD ACTION ================= */}
        <View style={[styles.filterSectionWrapper, { backgroundColor: "#F8FAFC", paddingVertical: 24 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <View style={styles.filterBarRow}>
              {/* Category Filters with All button and Clear Active State */}
              <View style={[styles.filterContainer, { flex: 1 }]}>
                {categories.map((cat) => {
                  const isCatActive = selectedCategory.trim().toLowerCase() === cat.trim().toLowerCase();
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.filterChip, isCatActive && styles.activeFilterChip]}
                      onPress={() => setSelectedCategory(cat)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.filterChipText, isCatActive && styles.activeFilterText]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* ================= DYNAMIC MASONRY GALLERY GRID ================= */}
        <View style={[styles.galleryGridWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.gallerySection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 60 : 30,
              },
            ]}
          >
            {filteredGallery.length === 0 ? (
              <View style={styles.emptyGalleryBox}>
                <Ionicons name="images-outline" size={44} color="#94A3B8" style={{ marginBottom: 12 }} />
                <Text style={styles.emptyGalleryTitle}>No photos found for "{selectedCategory}"</Text>
                <Text style={styles.emptyGallerySub}>
                  There are no photos currently associated with this trip or category.
                </Text>
                <TouchableOpacity
                  style={styles.emptyResetBtn}
                  onPress={() => setSelectedCategory("All")}
                >
                  <Text style={styles.emptyResetBtnText}>View All Photos ({gallery.length})</Text>
                </TouchableOpacity>
              </View>
            ) : isDesktop ? (
              <View style={[styles.masonryGrid, { flexDirection: "row", justifyContent: "space-between" }]}>
                {/* Column 1 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col1.map((item) => (
                    <View key={item.id} className="gsap-gallery-card interactive-card" style={styles.imageCardContainer}>
                      <Image source={resolveAsset(item.imageKey, "gallery1.jpg")} style={[styles.galleryImage, { height: item.height || 260 }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.tripTitle || item.category || "Trip Photo"}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Column 2 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col2.map((item) => (
                    <View key={item.id} className="gsap-gallery-card interactive-card" style={styles.imageCardContainer}>
                      <Image source={resolveAsset(item.imageKey, "gallery2.jpg")} style={[styles.galleryImage, { height: item.height || 220 }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.tripTitle || item.category || "Trip Photo"}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Column 3 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col3.map((item) => (
                    <View key={item.id} className="gsap-gallery-card interactive-card" style={styles.imageCardContainer}>
                      <Image source={resolveAsset(item.imageKey, "gallery3.jpg")} style={[styles.galleryImage, { height: item.height || 280 }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.tripTitle || item.category || "Trip Photo"}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.mobileGridContainer}>
                {filteredGallery.map((item) => (
                  <View key={item.id} className="gsap-gallery-card interactive-card" style={[styles.mobileImageCard, isTablet && { width: "48%" }]}>
                    <Image source={resolveAsset(item.imageKey, "gallery1.jpg")} style={styles.mobileGalleryImage} />
                    <View style={styles.imageTagOverlay}>
                      <Text style={styles.imageTagText}>{item.tripTitle || item.category || "Trip Photo"}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ================= SIGNATURE DESTINATIONS ================= */}
        <View className="gsap-gallery-section" style={[styles.destinationSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.destinationSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <Text style={styles.destinationTag}>ELITE SELECTION</Text>

            <View style={[styles.destinationHeaderRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 35 }]}>
              <Text style={styles.destinationTitle}>SIGNATURE DESTINATIONS</Text>
              <Text style={styles.destinationDescription}>
                Curated locations that represent the pinnacle of adventure and luxury in the wild.
              </Text>
            </View>

            {/* 3 Destination Cards Grid */}
            <View style={[styles.destinationCardsGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
              {signatureDestinations.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="gsap-gallery-card interactive-card"
                  style={[styles.destinationCard, isDesktop ? { width: "31.5%", marginBottom: 0 } : isTablet ? { width: "48%" } : { width: "100%" }]}
                  onPress={() => navigation.navigate("ViewTrip", { tripId: item.id })}
                >
                  <ImageBackground source={resolveAsset(item.imageKey, "hub1.jpg")} style={styles.destinationCardBg} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.destinationOverlay}>
                      {item.badge ? (
                        <View style={styles.destinationBadge}>
                          <Text style={styles.destinationBadgeText}>{item.badge}</Text>
                        </View>
                      ) : null}

                      <View style={styles.destinationCardBottom}>
                        <Text style={styles.destinationName}>{item.title}</Text>
                        <Text style={styles.destinationText} numberOfLines={2}>{item.description}</Text>

                        <View style={styles.destinationBottomRow}>
                          <View>
                            <Text style={styles.priceLabelText}>starting from</Text>
                            <Text style={styles.destinationPriceText}>{item.price}</Text>
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

        {/* ================= NEWSLETTER CARD SECTION (Stay Tuned with adventure-bg.jpg) ================= */}
        <View style={[styles.newsletterSectionWrapper, { backgroundColor: "#FFFFFF", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("../../assets/adventure-bg.jpg")}
              style={styles.newsletterBg}
              resizeMode="cover"
              imageStyle={{ borderRadius: 28, resizeMode: "cover" }}
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

                  {/* WhatsApp Direct Action Button */}
                  <TouchableOpacity
                    style={[styles.newsWhatsAppBtn, { marginTop: isDesktop ? 30 : 20 }]}
                    onPress={handleOpenWhatsAppChat}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="logo-whatsapp" size={22} color="#FFFFFF" />
                    <Text style={styles.newsWhatsAppBtnText}>Chat with Us on WhatsApp</Text>
                  </TouchableOpacity>

                  <Text style={styles.smallText}>Instant booking & trip updates directly on WhatsApp</Text>
                </View>
              </View>
            </ImageBackground>

            {/* Start Exploring Center Button */}
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <TouchableOpacity style={styles.startExploringBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                <Text style={styles.startExploringBtnText}>Start Exploring</Text>
              </TouchableOpacity>
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

  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 20,
  },

  badgeText: {
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

  heroSubTitle: {
    color: "#38BDF8",
    fontWeight: "800",
    fontStyle: "italic",
    marginTop: 4,
  },

  heroDescription: {
    color: "#F1F5F9",
    marginTop: 18,
    lineHeight: 26,
  },

  heroButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    elevation: 4,
  },

  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* FILTER CHIPS & UPLOAD BAR */
  filterSectionWrapper: {},

  filterBarRow: {
    alignItems: "center",
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },

  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    cursor: "pointer",
  },

  activeFilterChip: {
    backgroundColor: "#0B5CAD",
    borderColor: "#0B5CAD",
    shadowColor: "#0B5CAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  filterChipText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  uploadPhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
    shadowColor: "#0B5CAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    cursor: "pointer",
  },

  uploadPhotoBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  toastCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },

  toastText: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "700",
  },

  emptyGalleryBox: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginVertical: 20,
  },

  emptyGalleryTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  emptyGallerySub: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 18,
  },

  emptyResetBtn: {
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  emptyResetBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* MASONRY GALLERY GRID */
  galleryGridWrapper: {},

  gallerySection: {},

  masonryGrid: {
    gap: 16,
  },

  masonryColumn: {
    flexDirection: "column",
    gap: 16,
  },

  imageCardContainer: {
    position: "relative",
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
  },

  galleryImage: {
    width: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },

  imageTagOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },

  imageTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  mobileGridContainer: {
    gap: 16,
  },

  mobileImageCard: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },

  mobileGalleryImage: {
    width: "100%",
    height: 240,
    borderRadius: 20,
  },

  /* SIGNATURE DESTINATIONS */
  destinationSectionWrapper: {},

  destinationSection: {},

  destinationTag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  destinationHeaderRow: {},

  destinationTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  destinationDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 24,
    maxWidth: 400,
  },

  destinationCardsGrid: {
    marginTop: 20,
  },

  destinationCard: {
    width: "100%",
    height: 360,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
    cursor: "pointer",
  },

  destinationCardBg: {
    width: "100%",
    height: "100%",
  },

  destinationOverlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  destinationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0088FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  destinationBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  destinationCardBottom: {},

  destinationName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  destinationText: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  destinationBottomRow: {
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

  destinationPriceText: {
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

  /* NEWSLETTER CARD */
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
    lineHeight: 52,
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

  smallText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 14,
  },

  newsWhatsAppBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22C55E",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 10,
    elevation: 5,
    cursor: "pointer",
  },

  newsWhatsAppBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  startExploringBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    elevation: 4,
  },

  startExploringBtnText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },

  /* MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 3,
  },

  closeBtn: {
    padding: 4,
  },

  modalForm: {
    gap: 16,
    paddingVertical: 8,
  },

  formGroup: {
    gap: 6,
  },

  formLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 0.5,
  },

  formInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
    color: "#0F172A",
  },

  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  activeCategoryPill: {
    backgroundColor: "#0B5CAD",
    borderColor: "#0B5CAD",
  },

  categoryPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },

  activeCategoryPillText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  deviceUploadCard: {
    borderWidth: 2,
    borderColor: "#BFDBFE",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    cursor: "pointer",
  },

  uploadIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  deviceUploadTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0B5CAD",
    marginBottom: 4,
  },

  deviceUploadSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 12,
  },

  browsePill: {
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },

  browsePillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  uploadedPreviewCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
  },

  previewThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },

  loadedSuccessBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },

  loadedSuccessBadgeText: {
    color: "#16A34A",
    fontSize: 11,
    fontWeight: "700",
  },

  previewFileName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  previewFileSize: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  changeImageBtn: {
    marginTop: 6,
    alignSelf: "flex-start",
  },

  changeImageBtnText: {
    fontSize: 11,
    color: "#0B5CAD",
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },

  cancelBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },

  publishBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0B5CAD",
  },

  publishBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
