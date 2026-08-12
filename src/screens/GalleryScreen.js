import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";

const { height, width } = Dimensions.get("window");

export default function GalleryScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const {
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  const categories = ["ALL", "MOUNTAINS", "LAKES", "CAMPING", "TREKKING", "NATURE TRAILS"];

  const galleryData = [
    { id: 1, image: require("../../assets/gallery1.jpg"), category: "MOUNTAINS", height: 260 },
    { id: 2, image: require("../../assets/gallery2.jpg"), category: "MOUNTAINS", height: 190 },
    { id: 3, image: require("../../assets/gallery3.jpg"), category: "LAKES", height: 290 },
    { id: 4, image: require("../../assets/gallery4.jpg"), category: "CAMPING", height: 260 },
    { id: 5, image: require("../../assets/gallery5.jpg"), category: "TREKKING", height: 330 },
    { id: 6, image: require("../../assets/gallery6.jpg"), category: "NATURE TRAILS", height: 230 },
    { id: 7, image: require("../../assets/hiking.jpg"), category: "TREKKING", height: 270 },
    { id: 8, image: require("../../assets/camping.jpg"), category: "CAMPING", height: 250 },
    { id: 9, image: require("../../assets/fairy.jpg"), category: "MOUNTAINS", height: 280 },
    { id: 10, image: require("../../assets/hub2.jpg"), category: "CAMPING", height: 240 },
    { id: 11, image: require("../../assets/hub3.jpg"), category: "LAKES", height: 300 },
    { id: 12, image: require("../../assets/nature.jpg"), category: "NATURE TRAILS", height: 250 },
  ];

  const filteredGallery =
    selectedCategory === "ALL"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  // Distribute items across 3 columns for desktop masonry
  const col1 = filteredGallery.filter((_, idx) => idx % 3 === 0);
  const col2 = filteredGallery.filter((_, idx) => idx % 3 === 1);
  const col3 = filteredGallery.filter((_, idx) => idx % 3 === 2);

  const signatureDestinations = [
    {
      id: 1,
      image: require("../../assets/hub1.jpg"),
      badge: "Most Popular",
      title: "Hunza Valley",
      description: "Experience the breathtaking beauty of Hunza's mountains and valleys.",
      duration: "3 Days",
      price: "PKR 40,000",
    },
    {
      id: 2,
      image: require("../../assets/hub2.jpg"),
      badge: "Most Liked",
      title: "Fairy Meadows Trek",
      description: "Journey through scenic trails leading to Nanga Parbat base camp.",
      duration: "5 Days",
      price: "PKR 55,000",
    },
    {
      id: 3,
      image: require("../../assets/hub3.jpg"),
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
          source={require("../../assets/galleryHero.jpg")}
          style={[styles.hero, { height: isDesktop ? 640 : height * 0.85 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
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

        {/* ================= DYNAMIC CATEGORY FILTERS ================= */}
        <View style={[styles.filterSectionWrapper, { backgroundColor: "#F8FAFC", paddingVertical: 24 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <View style={[styles.filterContainer, { justifyContent: "center" }]}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterChip, selectedCategory === cat && styles.activeFilterChip]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.filterChipText, selectedCategory === cat && styles.activeFilterText]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
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
            {isDesktop ? (
              <View style={[styles.masonryGrid, { flexDirection: "row", justifyContent: "space-between" }]}>
                {/* Column 1 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col1.map((item) => (
                    <View key={item.id} style={styles.imageCardContainer}>
                      <Image source={item.image} style={[styles.galleryImage, { height: item.height }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Column 2 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col2.map((item) => (
                    <View key={item.id} style={styles.imageCardContainer}>
                      <Image source={item.image} style={[styles.galleryImage, { height: item.height }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Column 3 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col3.map((item) => (
                    <View key={item.id} style={styles.imageCardContainer}>
                      <Image source={item.image} style={[styles.galleryImage, { height: item.height }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.mobileGridContainer}>
                {filteredGallery.map((item) => (
                  <View key={item.id} style={styles.mobileImageCard}>
                    <Image source={item.image} style={styles.mobileGalleryImage} />
                    <View style={styles.imageTagOverlay}>
                      <Text style={styles.imageTagText}>{item.category}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ================= SIGNATURE DESTINATIONS ================= */}
        <View style={[styles.destinationSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
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
                  style={[styles.destinationCard, isDesktop && { width: "31.5%", marginBottom: 0 }]}
                  onPress={() => navigation.navigate("ViewTrip")}
                >
                  <ImageBackground source={item.image} style={styles.destinationCardBg} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.destinationOverlay}>
                      <View style={styles.destinationBadge}>
                        <Text style={styles.destinationBadgeText}>{item.badge}</Text>
                      </View>

                      <View style={styles.destinationCardBottom}>
                        <Text style={styles.destinationName}>{item.title}</Text>
                        <Text style={styles.destinationText}>{item.description}</Text>

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

                  {/* Form Row */}
                  <View style={[styles.subscribeContainer, isDesktop && { maxWidth: 540, width: "100%", marginTop: 30 }]}>
                    <TextInput
                      placeholder="Enter your email address"
                      placeholderTextColor="#94A3B8"
                      style={styles.emailInput}
                    />
                    <TouchableOpacity style={styles.subscribeButton} onPress={() => navigation.navigate("Contact")}>
                      <Text style={styles.subscribeButtonText}>Subscribe Free</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.smallText}>No spam ever • Unsubscribe in one click</Text>
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

  /* FILTER CHIPS */
  filterSectionWrapper: {},

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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
    backgroundColor: "#0F172A",
    borderColor: "#0F172A",
  },

  filterChipText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  activeFilterText: {
    color: "#FFFFFF",
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

  subscribeContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 30,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  emailInput: {
    flex: 1,
    paddingHorizontal: 20,
    color: "#FFFFFF",
    fontSize: 15,
  },

  subscribeButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 26,
    cursor: "pointer",
  },

  subscribeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  smallText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 14,
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
});
