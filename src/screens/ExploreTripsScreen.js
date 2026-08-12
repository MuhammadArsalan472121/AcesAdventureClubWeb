import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";

const { height, width } = Dimensions.get("window");

export default function ExploreTripsScreen() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState("All");
  const {
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  const curatedTrips = [
    {
      id: 1,
      image: require("../../assets/hunza.jpg"),
      badge: "Featured",
      location: "Gilgit, Pakistan",
      title: "Hunza Explorer",
      description: "Experience breathtaking mountain landscapes and culture.",
      duration: "5 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
    },
    {
      id: 2,
      image: require("../../assets/fairy.jpg"),
      badge: "Popular",
      location: "Diamer, Pakistan",
      title: "Fairy Meadows Trek",
      description: "Base camp of mighty Nanga Parbat mountain.",
      duration: "7 Days",
      difficulty: "Hard",
      difficultyColor: "#EF4444",
    },
    {
      id: 3,
      image: require("../../assets/skardu.jpg"),
      badge: "Recommended",
      location: "Skardu, Pakistan",
      title: "Skardu Adventure",
      description: "Lakes, cold deserts and unforgettable mountain views.",
      duration: "10 Days",
      difficulty: "Moderate",
      difficultyColor: "#F59E0B",
    },
    {
      id: 4,
      image: require("../../assets/naran.jpg"),
      badge: "Trending",
      location: "Mansehra, Pakistan",
      title: "Naran Valley Escape",
      description: "Enjoy lush green valleys and alpine lake views.",
      duration: "4 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
    },
    {
      id: 5,
      image: require("../../assets/hunza.jpg"),
      badge: "Featured",
      location: "Gilgit, Pakistan",
      title: "Hunza Explorer",
      description: "Experience breathtaking mountain landscapes and culture.",
      duration: "5 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
    },
    {
      id: 6,
      image: require("../../assets/fairy.jpg"),
      badge: "Popular",
      location: "Diamer, Pakistan",
      title: "Fairy Meadows Trek",
      description: "Base camp of mighty Nanga Parbat mountain.",
      duration: "7 Days",
      difficulty: "Hard",
      difficultyColor: "#EF4444",
    },
    {
      id: 7,
      image: require("../../assets/skardu.jpg"),
      badge: "Recommended",
      location: "Skardu, Pakistan",
      title: "Skardu Adventure",
      description: "Lakes, cold deserts and unforgettable mountain views.",
      duration: "10 Days",
      difficulty: "Moderate",
      difficultyColor: "#F59E0B",
    },
    {
      id: 8,
      image: require("../../assets/naran.jpg"),
      badge: "Trending",
      location: "Mansehra, Pakistan",
      title: "Naran Valley Escape",
      description: "Enjoy lush green valleys and alpine lake views.",
      duration: "4 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
    },
  ];

  const popularHubs = [
    {
      id: 1,
      image: require("../../assets/hub1.jpg"),
      badge: "Most Popular",
      location: "Gilgit, Pakistan",
      title: "Hunza Valley",
      description: "Experience the breathtaking beauty of Hunza's mountains and valleys.",
      duration: "3 Days",
      difficulty: "Easy",
      price: "PKR 40,000",
    },
    {
      id: 2,
      image: require("../../assets/hub2.jpg"),
      badge: "Most Liked",
      location: "Diamer, Pakistan",
      title: "Fairy Meadows Trek",
      description: "Journey through scenic trails leading to Nanga Parbat base camp.",
      duration: "5 Days",
      difficulty: "Hard",
      price: "PKR 55,000",
    },
    {
      id: 3,
      image: require("../../assets/hub3.jpg"),
      badge: "Best View",
      location: "Skardu, Pakistan",
      title: "Skardu Adventure",
      description: "Explore Karakoram peaks, Shangrila lake and Cold Desert.",
      duration: "7 Days",
      difficulty: "Moderate",
      price: "PKR 65,000",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("../../assets/explore-hero.jpg")}
          style={[styles.hero, { height: isDesktop ? 650 : height * 0.85 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center" }]}>
              <Text style={[styles.heroBlue, { fontSize: isDesktop ? 54 : 36 }]}>EXPLORE</Text>
              <Text style={[styles.heroWhite, { fontSize: isDesktop ? 54 : 36 }]}>ADVENTURES</Text>

              <Text style={[styles.heroDescription, { fontSize: isDesktop ? 17 : 15, maxWidth: 720 }]}>
                Uncover the magic of hidden trails, towering peaks, and pristine lakes across Pakistan with our expert-guided expeditions.
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("BrowseTrips")}>
                  <Text style={styles.primaryText}>View Destinations</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Gallery")}>
                  <Text style={styles.secondaryText}>View Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= SEARCH & FILTERS BAR ================= */}
        <View style={[styles.searchSectionWrapper, { backgroundColor: "#F8FAFC" }]}>
          <View
            style={[
              styles.searchSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 35 : 20,
              },
            ]}
          >
            <View style={[styles.searchFilterRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
              {/* Search Input Box */}
              <View style={[styles.searchBox, isDesktop && { flex: 1, marginRight: 20 }]}>
                <Ionicons name="search-outline" size={20} color="#64748B" />
                <TextInput
                  placeholder="Search Mountains, Locations, Treks Or Adventures ..."
                  placeholderTextColor="#94A3B8"
                  style={styles.searchInput}
                />
              </View>

              {/* Filter Chips Horizontal Row */}
              <View style={styles.filterChipsRow}>
                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === "All" && styles.activeFilterChip]}
                  onPress={() => setActiveFilter("All")}
                >
                  <Text style={[styles.filterChipText, activeFilter === "All" && styles.activeFilterText]}>All Trips</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === "Mountains" && styles.activeFilterChip]}
                  onPress={() => setActiveFilter("Mountains")}
                >
                  <Text style={[styles.filterChipText, activeFilter === "Mountains" && styles.activeFilterText]}>⛰️ Mountains</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === "Hiking" && styles.activeFilterChip]}
                  onPress={() => setActiveFilter("Hiking")}
                >
                  <Text style={[styles.filterChipText, activeFilter === "Hiking" && styles.activeFilterText]}>🥾 Hiking</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === "Camping" && styles.activeFilterChip]}
                  onPress={() => setActiveFilter("Camping")}
                >
                  <Text style={[styles.filterChipText, activeFilter === "Camping" && styles.activeFilterText]}>⛺ Camping</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === "Nature" && styles.activeFilterChip]}
                  onPress={() => setActiveFilter("Nature")}
                >
                  <Text style={[styles.filterChipText, activeFilter === "Nature" && styles.activeFilterText]}>🌲 Nature Trails</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === "Heritage" && styles.activeFilterChip]}
                  onPress={() => setActiveFilter("Heritage")}
                >
                  <Text style={[styles.filterChipText, activeFilter === "Heritage" && styles.activeFilterText]}>🎒 Heritage Areas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ================= CURATED JOURNEYS (8 Cards Grid) ================= */}
        <View style={[styles.curatedSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.curatedSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 60 : 40,
              },
            ]}
          >
            <Text style={styles.curatedSmallTitle}>HANDPICKED EXPEDITIONS</Text>
            <Text style={styles.curatedTitle}>CURATED JOURNEYS</Text>

            {/* 8 Cards Grid */}
            <View style={[styles.curatedGrid, isDesktop && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 35 }]}>
              {curatedTrips.map((item) => (
                <View
                  key={item.id}
                  style={[styles.curatedCard, isDesktop && { width: "23.5%", marginBottom: 24 }]}
                >
                  <View style={styles.cardImageWrapper}>
                    <Image source={item.image} style={styles.curatedImage} />
                    {item.badge && (
                      <View style={styles.curatedBadge}>
                        <Text style={styles.curatedBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.curatedContent}>
                    <Text style={styles.curatedLocation}>{item.location}</Text>
                    <Text style={styles.curatedCardTitle}>{item.title}</Text>
                    <Text style={styles.curatedDescription}>{item.description}</Text>

                    <View style={styles.curatedDivider} />

                    <View style={styles.curatedBottomRow}>
                      <View>
                        <Text style={styles.curatedMetaLabel}>DURATION</Text>
                        <Text style={styles.curatedMetaValue}>{item.duration}</Text>
                      </View>

                      <View>
                        <Text style={styles.curatedMetaLabel}>DIFFICULTY</Text>
                        <Text style={[styles.curatedMetaValue, { color: item.difficultyColor }]}>
                          {item.difficulty}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.viewDetailsBtn}
                      onPress={() => navigation.navigate("ViewTrip")}
                    >
                      <Text style={styles.viewDetailsBtnText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* ================= PAGINATION CONTROL ================= */}
            <View style={styles.paginationContainer}>
              <TouchableOpacity style={styles.pageArrowBtn}>
                <Ionicons name="arrow-back" size={16} color="#0F172A" />
                <Text style={styles.pageArrowText}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.activePageBtn}>
                <Text style={styles.activePageText}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pageNumberBtn}>
                <Text style={styles.pageNumberText}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pageNumberBtn}>
                <Text style={styles.pageNumberText}>3</Text>
              </TouchableOpacity>

              <Text style={styles.pageDotsText}>......</Text>

              <TouchableOpacity style={styles.pageNumberBtn}>
                <Text style={styles.pageNumberText}>12</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pageArrowBtn}>
                <Text style={styles.pageArrowText}>Next</Text>
                <Ionicons name="arrow-forward" size={16} color="#0F172A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= POPULAR HUBS (3 Destination Cards Grid) ================= */}
        <View style={[styles.popularSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.popularSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <Text style={styles.popularSmallTitle}>POPULAR DESTINATIONS</Text>
            <Text style={styles.popularTitle}>POPULAR HUBS</Text>
            <Text style={styles.popularDescription}>
              Discover handpicked destination hubs crafted for explorers seeking unforgettable experiences.
            </Text>

            {/* 3 Destination Cards Grid */}
            <View style={[styles.popularGrid, isDesktop && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 35 }]}>
              {popularHubs.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.popularCard, isDesktop && { width: "31.5%", marginBottom: 24 }]}
                  onPress={() => navigation.navigate("ViewTrip")}
                >
                  <ImageBackground
                    source={item.image}
                    style={styles.popularCardBg}
                    imageStyle={{ borderRadius: 20 }}
                  >
                    <View style={styles.popularOverlay}>
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>{item.badge}</Text>
                      </View>

                      <View style={styles.popularCardBottom}>
                        <Text style={styles.popularCardTitle}>{item.title}</Text>
                        <Text style={styles.popularCardDesc}>{item.description}</Text>

                        <View style={styles.popularFooterRow}>
                          <View style={styles.footerInfoItem}>
                            <Text style={styles.footerIcon}>🕒</Text>
                            <Text style={styles.footerInfoText}>{item.duration}</Text>
                          </View>
                          <View style={styles.footerInfoItem}>
                            <Text style={styles.footerIcon}>⛰️</Text>
                            <Text style={styles.footerInfoText}>{item.difficulty}</Text>
                          </View>
                          <Text style={styles.popularPriceText}>{item.price}</Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>

            {/* Explore More Center Button */}
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <TouchableOpacity style={styles.exploreMoreBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                <Text style={styles.exploreMoreBtnText}>Explore More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= NEWSLETTER CARD SECTION (Stay Tuned) ================= */}
        <View style={[styles.newsletterSectionWrapper, { backgroundColor: "#FFFFFF", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("../../assets/adventure-bg.jpg")}
              style={styles.newsletterBg}
              imageStyle={{ borderRadius: 28 }}
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

  heroBlue: {
    color: "#38BDF8",
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 1,
  },

  heroWhite: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 2,
  },

  heroDescription: {
    color: "#F1F5F9",
    marginTop: 18,
    lineHeight: 26,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 35,
    gap: 16,
  },

  primaryButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    cursor: "pointer",
    elevation: 4,
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
  },

  secondaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  /* SEARCH & FILTERS */
  searchSectionWrapper: {},

  searchSection: {},

  searchFilterRow: {
    flexDirection: "column",
    gap: 16,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#0F172A",
  },

  filterChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#0F172A",
    cursor: "pointer",
  },

  activeFilterChip: {
    backgroundColor: "#0088FF",
  },

  filterChipText: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* CURATED JOURNEYS GRID */
  curatedSectionWrapper: {},

  curatedSection: {},

  curatedSmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
  },

  curatedTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  curatedGrid: {
    marginTop: 20,
  },

  curatedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  cardImageWrapper: {
    width: "100%",
    height: 200,
    position: "relative",
  },

  curatedImage: {
    width: "100%",
    height: "100%",
  },

  curatedBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#0088FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },

  curatedBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  curatedContent: {
    padding: 20,
  },

  curatedLocation: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1,
    marginBottom: 4,
  },

  curatedCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  curatedDescription: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },

  curatedDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },

  curatedBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  curatedMetaLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
  },

  curatedMetaValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },

  viewDetailsBtn: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    cursor: "pointer",
  },

  viewDetailsBtnText: {
    color: "#0B5CAD",
    fontSize: 14,
    fontWeight: "700",
  },

  /* PAGINATION */
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    gap: 8,
  },

  pageArrowBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    cursor: "pointer",
    gap: 6,
  },

  pageArrowText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  activePageBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0088FF",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  activePageText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  pageNumberBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  pageNumberText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },

  pageDotsText: {
    fontSize: 14,
    color: "#94A3B8",
    letterSpacing: 2,
    marginHorizontal: 4,
  },

  /* POPULAR HUBS */
  popularSectionWrapper: {},

  popularSection: {},

  popularSmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
  },

  popularTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  popularDescription: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 8,
    lineHeight: 26,
    maxWidth: 750,
  },

  popularGrid: {
    marginTop: 20,
  },

  popularCard: {
    width: "100%",
    height: 360,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
    cursor: "pointer",
  },

  popularCardBg: {
    width: "100%",
    height: "100%",
  },

  popularOverlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  popularBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0088FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  popularBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  popularCardBottom: {},

  popularCardTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  popularCardDesc: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  popularFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },

  footerInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerIcon: {
    marginRight: 6,
    fontSize: 14,
  },

  footerInfoText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  popularPriceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  exploreMoreBtn: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
  },

  exploreMoreBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
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
