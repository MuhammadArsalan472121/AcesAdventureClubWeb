import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Modal,
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
  animateModal,
  animateSection,
} from "../utils/animations";

const { height, width } = Dimensions.get("window");

export default function GalleryScreen() {
  const navigation = useNavigation();
  const { gallery = [], trips = [], contactContent, socialLinks } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  const currentLightboxItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    if (Platform.OS === "web") {
      setTimeout(() => {
        animateModal(".gsap-lightbox-modal");
      }, 40);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (lightboxIndex !== null && filteredGallery.length > 0) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredGallery.length - 1));
    }
  };

  const handleNextImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (lightboxIndex !== null && filteredGallery.length > 0) {
      setLightboxIndex((prev) => (prev < filteredGallery.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation for desktop web (Esc to close, left/right arrows)
  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery]);

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
            ) : (
              <View style={styles.uniformGalleryGrid}>
                {filteredGallery.map((item, index) => (
                  <TouchableOpacity
                    key={item.id || index}
                    className="gsap-gallery-card interactive-card"
                    style={[
                      styles.uniformImageCard,
                      isDesktop
                        ? { width: "31.8%" }
                        : isTablet
                        ? { width: "48%" }
                        : { width: "100%" },
                    ]}
                    onPress={() => handleOpenLightbox(index)}
                    activeOpacity={0.92}
                  >
                    <Image
                      source={resolveAsset(item.imageKey, "gallery1.jpg")}
                      style={styles.uniformGalleryImage}
                      resizeMode="cover"
                    />

                    {/* Gradient Overlay & Hover Actions */}
                    <View style={styles.imageOverlayGradient}>
                      <View style={styles.topActionBadge}>
                        <Ionicons name="expand-outline" size={16} color="#FFFFFF" />
                      </View>

                      <View style={styles.bottomCardInfo}>
                        <View style={styles.imageTagOverlay}>
                          <Text style={styles.imageTagText}>
                            {item.tripTitle || item.category || "Trip Photo"}
                          </Text>
                        </View>
                        {item.title ? (
                          <Text style={styles.cardImageTitle} numberOfLines={1}>
                            {item.title}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </TouchableOpacity>
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

      {/* ================= ANIMATED FULL-SIZE POPUP LIGHTBOX ================= */}
      {lightboxIndex !== null && currentLightboxItem && (
        <Modal
          visible={lightboxIndex !== null}
          transparent
          animationType="fade"
          onRequestClose={handleCloseLightbox}
        >
          <View style={styles.lightboxBackdrop}>
            {/* Background click to dismiss */}
            <TouchableOpacity
              style={styles.lightboxBackdropDismiss}
              activeOpacity={1}
              onPress={handleCloseLightbox}
            />

            {/* Lightbox Content Container */}
            <View
              className="gsap-lightbox-modal"
              style={[
                styles.lightboxContainer,
                {
                  maxWidth: isDesktop ? 960 : "94%",
                  maxHeight: isDesktop ? "90%" : "94%",
                },
              ]}
            >
              {/* Top Header Bar with trip badge, counter & close button */}
              <View style={styles.lightboxHeader}>
                <View style={styles.lightboxBadgeGroup}>
                  <View style={styles.lightboxTripBadge}>
                    <Ionicons name="location-outline" size={14} color="#38BDF8" style={{ marginRight: 6 }} />
                    <Text style={styles.lightboxTripText}>
                      {currentLightboxItem.tripTitle || currentLightboxItem.category || "Expedition Photo"}
                    </Text>
                  </View>
                  <Text style={styles.lightboxCounter}>
                    {lightboxIndex + 1} / {filteredGallery.length}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.lightboxCloseBtn}
                  onPress={handleCloseLightbox}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Center Image Display with Next & Prev buttons */}
              <View style={[styles.lightboxImageWrapper, { height: isDesktop ? 540 : isTablet ? 420 : 320 }]}>
                {filteredGallery.length > 1 && (
                  <TouchableOpacity
                    style={[styles.lightboxNavBtn, styles.lightboxPrevBtn]}
                    onPress={handlePrevImage}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                <Image
                  source={resolveAsset(currentLightboxItem.imageKey, "gallery1.jpg")}
                  style={styles.lightboxFullImage}
                  resizeMode="contain"
                />

                {filteredGallery.length > 1 && (
                  <TouchableOpacity
                    style={[styles.lightboxNavBtn, styles.lightboxNextBtn]}
                    onPress={handleNextImage}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="chevron-forward" size={26} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Bottom Caption Bar */}
              {currentLightboxItem.title ? (
                <View style={styles.lightboxFooter}>
                  <Text style={styles.lightboxTitleText}>
                    {currentLightboxItem.title}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </Modal>
      )}
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

  /* UNIFORM GALLERY GRID */
  galleryGridWrapper: {},

  gallerySection: {},

  uniformGalleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "flex-start",
  },

  uniformImageCard: {
    height: 280,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
    cursor: "pointer",
  },

  uniformGalleryImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.22)",
    justifyContent: "space-between",
    padding: 14,
  },

  topActionBadge: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  bottomCardInfo: {
    gap: 6,
  },

  imageTagOverlay: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(11, 92, 173, 0.88)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },

  imageTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  cardImageTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  /* LIGHTBOX MODAL STYLES */
  lightboxBackdrop: {
    flex: 1,
    backgroundColor: "rgba(10, 15, 30, 0.94)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  lightboxBackdropDismiss: {
    ...StyleSheet.absoluteFillObject,
  },

  lightboxContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  lightboxHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },

  lightboxBadgeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  lightboxTripBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  lightboxTripText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  lightboxCounter: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },

  lightboxCloseBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    cursor: "pointer",
  },

  lightboxImageWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  lightboxFullImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  lightboxNavBtn: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    cursor: "pointer",
  },

  lightboxPrevBtn: {
    left: 14,
  },

  lightboxNextBtn: {
    right: 14,
  },

  lightboxFooter: {
    marginTop: 14,
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },

  lightboxTitleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.4,
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
