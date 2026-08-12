import React from "react";
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

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
    heroTitleSize,
    sectionTitleSize,
    bodyFontSize,
    bodyLineHeight,
  } = useResponsive();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("../../assets/hero.jpg")}
          style={[styles.hero, { height: isDesktop ? 800 : height * 0.92 }]}
          resizeMode="cover"
        >
          {/* Dark Overlay */}
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            {/* Header */}
            <Header />

            {/* Hero Content */}
            <View style={[styles.content, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", alignItems: "center" }]}>
              {/* Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>• Premium Adventure Club •</Text>
              </View>

              {/* Heading */}
              <Text style={[styles.headingWhite, { fontSize: isDesktop ? 58 : 36, lineHeight: isDesktop ? 66 : 42, textAlign: "center" }]}>
                EXPLORE THE WILD
              </Text>
              <Text style={[styles.headingBlue, { fontSize: isDesktop ? 58 : 36, lineHeight: isDesktop ? 66 : 42, textAlign: "center" }]}>
                <Text style={styles.italicBlue}>CREATE </Text>MEMORIES
              </Text>

              {/* Paragraph */}
              <Text style={[styles.paragraph, { fontSize: isDesktop ? 18 : 15, lineHeight: isDesktop ? 28 : 24, textAlign: "center", maxWidth: 750 }]}>
                Embark on a journey to the most remote corners of Pakistan. Experience the beauty of nature through curated expeditions.
              </Text>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.primaryButton, isDesktop && { paddingHorizontal: 32, paddingVertical: 16 }]}
                  onPress={() => navigation.navigate("BrowseTrips")}
                >
                  <Text style={[styles.primaryText, isDesktop && { fontSize: 16 }]}>
                    Explore Trips ➔
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.secondaryButton, isDesktop && { paddingHorizontal: 32, paddingVertical: 16 }]}
                  onPress={() => navigation.navigate("Gallery")}
                >
                  <Text style={[styles.secondaryText, isDesktop && { fontSize: 16 }]}>
                    View Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= ABOUT SECTION (Who We Are) ================= */}
        <View style={[styles.aboutSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
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
            {/* Left Column (Text & Bullet Points) */}
            <View style={{ flex: isDesktop ? 1 : undefined, maxWidth: isDesktop ? 620 : "100%", marginRight: isDesktop ? 40 : 0 }}>
              <Text style={styles.aboutSmallTitle}>WHO WE ARE</Text>

              <Text style={styles.aboutTitle}>
                More Than a Destination{"\n"}
                We Create <Text style={styles.blueText}>Experiences.</Text>
              </Text>

              <Text style={styles.aboutParagraph}>
                At Aces Adventure Club, we believe travel is not just about reaching a destination. It's about discovering your passion, overcoming challenges, and creating unforgettable memories.
              </Text>

              <Text style={styles.aboutParagraph}>
                We bring together outdoor enthusiasts, solo travelers, and adventure seekers through carefully curated hiking, camping, and trekking experiences.
              </Text>

              {/* Feature 1 */}
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name="compass-outline" size={20} color="#0B5CAD" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>Expertly Curated Adventures</Text>
                  <Text style={styles.featureDescription}>
                    Hand-crafted itineraries designed by expert mountain guides.
                  </Text>
                </View>
              </View>

              {/* Feature 2 */}
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name="location-outline" size={20} color="#0B5CAD" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>Breathtaking Destinations</Text>
                  <Text style={styles.featureDescription}>
                    Explore hidden valleys, glacial lakes and majestic peaks.
                  </Text>
                </View>
              </View>

              {/* Feature 3 */}
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name="people-outline" size={20} color="#0B5CAD" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>Community of Explorers</Text>
                  <Text style={styles.featureDescription}>
                    Connect with passionate travelers who share your love for adventure.
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.learnButton} onPress={() => navigation.navigate("About")}>
                <Text style={styles.learnButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>

            {/* Right Column (Collage Images) */}
            <View style={{ flex: isDesktop ? 1 : undefined, width: "100%", maxWidth: isDesktop ? 580 : "100%", marginTop: isDesktop ? 0 : 40 }}>
              <Image source={require("../../assets/about-big.jpg")} style={styles.bigImage} />

              <View style={styles.smallImagesRow}>
                <Image source={require("../../assets/about-small1.jpg")} style={styles.smallImage} />
                <Image source={require("../../assets/about-small2.jpg")} style={styles.smallImage} />
              </View>
            </View>
          </View>
        </View>

        {/* ================= CHOOSE YOUR ADVENTURE ================= */}
        <View style={[styles.adventureSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.adventureSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <Text style={styles.sectionSmallTitle}>EXPLORE EXPERIENCES</Text>

            <Text style={styles.sectionTitle}>
              CHOOSE YOUR <Text style={styles.blueItalic}>ADVENTURE</Text>
            </Text>

            <Text style={styles.sectionDescription}>
              Explore handpicked experiences designed for every type of adventurer, from mountain expeditions to peaceful nature escapes.
            </Text>

            {/* Adventure Cards Grid */}
            <View style={[styles.cardsContainer, isDesktop && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <TouchableOpacity style={[styles.adventureCard, isDesktop && { width: "23.5%", marginRight: 0, marginBottom: 20 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <Image source={require("../../assets/hiking.jpg")} style={styles.cardImage} />
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>🥾</Text>
                </View>
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>Hiking</Text>
                  <Text style={styles.cardDescription}>
                    Explore Scenic Mountain Paths And Breathtaking Landscapes.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Card 2 */}
              <TouchableOpacity style={[styles.adventureCard, isDesktop && { width: "23.5%", marginRight: 0, marginBottom: 20 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <Image source={require("../../assets/camping.jpg")} style={styles.cardImage} />
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>⛺</Text>
                </View>
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>Camping</Text>
                  <Text style={styles.cardDescription}>
                    Experience Peaceful Nights Under The Stars.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Card 3 */}
              <TouchableOpacity style={[styles.adventureCard, isDesktop && { width: "23.5%", marginRight: 0, marginBottom: 20 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <Image source={require("../../assets/trekking.jpg")} style={styles.cardImage} />
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>🎒</Text>
                </View>
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>Trekking</Text>
                  <Text style={styles.cardDescription}>
                    Discover Breathtaking Mountain Journeys.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Card 4 */}
              <TouchableOpacity style={[styles.adventureCard, isDesktop && { width: "23.5%", marginRight: 0, marginBottom: 20 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <Image source={require("../../assets/nature.jpg")} style={styles.cardImage} />
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>🌲</Text>
                </View>
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>Nature Trails</Text>
                  <Text style={styles.cardDescription}>
                    Explore Scenic Paths Reconnect With Nature.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= STATS SECTION ================= */}
        <View style={styles.statsSectionWrapper}>
          <View
            style={[
              styles.statsSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 45 : 30,
              },
            ]}
          >
            <View style={[styles.statsRowContainer, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
              <View style={[styles.statItem, isDesktop && { width: "23%" }]}>
                <Text style={styles.statNumber}>100+</Text>
                <Text style={styles.statLabel}>TRIPS COMPLETED</Text>
              </View>

              <View style={[styles.statItem, isDesktop && { width: "23%" }]}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>ELITE EXPLORERS</Text>
              </View>

              <View style={[styles.statItem, isDesktop && { width: "23%" }]}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>GLOBAL DESTINATIONS</Text>
              </View>

              <View style={[styles.statItem, isDesktop && { width: "23%" }]}>
                <Text style={styles.statNumber}>20+</Text>
                <Text style={styles.statLabel}>EXPERT GUIDES</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= FEATURED ADVENTURES ================= */}
        <View style={[styles.featuredSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.featuredSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingTop: isDesktop ? 80 : 50,
                paddingBottom: isDesktop ? 60 : 40,
              },
            ]}
          >
            <Text style={styles.featuredSmallTitle}>POPULAR DESTINATIONS</Text>
            <Text style={styles.featuredTitle}>
              FEATURED <Text style={styles.blueItalic}>ADVENTURES</Text>
            </Text>
            <Text style={styles.featuredDescription}>
              Discover handpicked adventures crafted for explorers seeking unforgettable experiences.
            </Text>

            {/* Featured Cards Container */}
            <View style={[styles.featuredScrollContainer, isDesktop && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 35 }]}>
              {/* CARD 1 */}
              <TouchableOpacity style={[styles.featuredCard, isDesktop && { width: "31.5%", marginRight: 0, marginBottom: 24 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <ImageBackground source={require("../../assets/featured1.jpg")} style={styles.featuredCardBg} imageStyle={styles.featuredImage}>
                  <View style={styles.featuredOverlay}>
                    <View style={styles.badgePopular}>
                      <Text style={styles.badgePopularText}>Most Popular</Text>
                    </View>
                    <Text style={styles.locationText}>Gilgit, Pakistan</Text>
                    <Text style={styles.placeName}>Hunza Valley</Text>
                    <Text style={styles.placeDescription}>
                      Experience the breathtaking beauty of Hunza's mountains and valleys.
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.footerItem}>
                        <Text style={styles.footerIcon}>🕒</Text>
                        <Text style={styles.footerText}>3 Days</Text>
                      </View>
                      <View style={styles.footerItem}>
                        <Text style={styles.footerIcon}>⛰️</Text>
                        <Text style={styles.footerText}>Easy</Text>
                      </View>
                      <Text style={styles.priceText}>PKR 40,000</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              {/* CARD 2 */}
              <TouchableOpacity style={[styles.featuredCard, isDesktop && { width: "31.5%", marginRight: 0, marginBottom: 24 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <ImageBackground source={require("../../assets/featured2.jpg")} style={styles.featuredCardBg} imageStyle={styles.featuredImage}>
                  <View style={styles.featuredOverlay}>
                    <View style={styles.badgePopular}>
                      <Text style={styles.badgePopularText}>Most Liked</Text>
                    </View>
                    <Text style={styles.locationText}>Skardu, Pakistan</Text>
                    <Text style={styles.placeName}>Skardu Adventure</Text>
                    <Text style={styles.placeDescription}>
                      Explore Karakoram peaks, Shangrila lake and Cold Desert.
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.footerItem}>
                        <Text style={styles.footerIcon}>🕒</Text>
                        <Text style={styles.footerText}>7 Days</Text>
                      </View>
                      <View style={styles.footerItem}>
                        <Text style={styles.footerIcon}>⛰️</Text>
                        <Text style={styles.footerText}>Moderate</Text>
                      </View>
                      <Text style={styles.priceText}>PKR 65,000</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              {/* CARD 3 */}
              <TouchableOpacity style={[styles.featuredCard, isDesktop && { width: "31.5%", marginRight: 0, marginBottom: 24 }]} onPress={() => navigation.navigate("ViewTrip")}>
                <ImageBackground source={require("../../assets/featured3.jpg")} style={styles.featuredCardBg} imageStyle={styles.featuredImage}>
                  <View style={styles.featuredOverlay}>
                    <View style={styles.badgePopular}>
                      <Text style={styles.badgePopularText}>Best View</Text>
                    </View>
                    <Text style={styles.locationText}>Diamer, Pakistan</Text>
                    <Text style={styles.placeName}>Fairy Meadows Trek</Text>
                    <Text style={styles.placeDescription}>
                      Journey through scenic trails leading to Nanga Parbat base camp.
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.footerItem}>
                        <Text style={styles.footerIcon}>🕒</Text>
                        <Text style={styles.footerText}>5 Days</Text>
                      </View>
                      <View style={styles.footerItem}>
                        <Text style={styles.footerIcon}>⛰️</Text>
                        <Text style={styles.footerText}>Hard</Text>
                      </View>
                      <Text style={styles.priceText}>PKR 55,000</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            {/* Explore More Center Button */}
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <TouchableOpacity style={styles.exploreMoreBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                <Text style={styles.exploreMoreBtnText}>Explore More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= WHY ADVENTURE CLUB / CHOOSE US ================= */}
        <View style={[styles.chooseSectionWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.chooseSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            {/* Title Header Row */}
            <View style={[styles.chooseHeaderRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }]}>
              <View style={{ maxWidth: isDesktop ? 600 : "100%" }}>
                <Text style={styles.chooseSmall}>WHY ADVENTURE CLUB</Text>
                <Text style={styles.chooseTitle}>
                  WHY CHOOSE <Text style={styles.blueItalic}>US</Text>
                </Text>
                <Text style={styles.chooseDescription}>
                  We create safe, memorable, and carefully curated adventures for every explorer.
                </Text>
              </View>

              {isDesktop && (
                <Text style={styles.chooseTaglineRight}>
                  We don't just book trips — we create transformative experiences that will stay with you forever.
                </Text>
              )}
            </View>

            {/* 6 Feature Cards Grid */}
            <View style={[styles.chooseCardsGrid, isDesktop && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <View style={[styles.chooseCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="person-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Expert Guides</Text>
                <Text style={styles.cardText}>
                  Our experienced guides ensure every adventure is safe, informative, and unforgettable for every explorer.
                </Text>
              </View>

              {/* Card 2 */}
              <View style={[styles.chooseCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Safe Adventures</Text>
                <Text style={styles.cardText}>
                  Every trip is carefully planned with safety as our highest priority from beginning to end.
                </Text>
              </View>

              {/* Card 3 */}
              <View style={[styles.chooseCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="ribbon-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Memorable Experiences</Text>
                <Text style={styles.cardText}>
                  Create unforgettable memories through unique journeys, breathtaking landscapes, and premium adventures.
                </Text>
              </View>

              {/* Card 4 */}
              <View style={[styles.chooseCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="location-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Unique Destinations</Text>
                <Text style={styles.cardText}>
                  Discover hidden valleys, mountains, and destinations selected especially for nature lovers.
                </Text>
              </View>

              {/* Card 5 */}
              <View style={[styles.chooseCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="people-circle-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Community of Explorers</Text>
                <Text style={styles.cardText}>
                  Connect with fellow adventurers and build lifelong friendships while exploring together.
                </Text>
              </View>

              {/* Card 6 */}
              <View style={[styles.chooseCardItem, isDesktop && { width: "31.5%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="trail-sign-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Curated Adventure Experiences</Text>
                <Text style={styles.cardText}>
                  Hand-crafted itineraries designed to provide the perfect balance of comfort, excitement, and adventure.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= NEWSLETTER CARD SECTION (Stay Tuned) ================= */}
        <View style={[styles.newsletterSectionWrapper, { backgroundColor: "#F7FAFD", paddingVertical: isDesktop ? 60 : 30 }]}>
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
    backgroundColor: "#F8FAFF",
  },

  hero: {
    width: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingTop: 10,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },

  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headingWhite: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
  },

  headingBlue: {
    color: "#FFFFFF",
    fontWeight: "900",
    marginTop: 4,
  },

  italicBlue: {
    color: "#3D8BFF",
    fontStyle: "italic",
  },

  paragraph: {
    color: "#F1F5F9",
    marginTop: 20,
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
    elevation: 5,
    cursor: "pointer",
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
    fontSize: 15,
    fontWeight: "700",
  },

  /* ABOUT SECTION */
  aboutSmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 2,
    marginBottom: 8,
  },

  aboutTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 46,
  },

  blueText: {
    color: "#0B5CAD",
    fontStyle: "italic",
  },

  aboutParagraph: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 26,
    marginTop: 16,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
  },

  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  featureDescription: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 20,
  },

  learnButton: {
    width: 150,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0088FF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    cursor: "pointer",
  },

  learnButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  bigImage: {
    width: "100%",
    height: 320,
    borderRadius: 20,
  },

  smallImagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  smallImage: {
    width: "48%",
    height: 190,
    borderRadius: 16,
  },

  /* CHOOSE YOUR ADVENTURE */
  sectionSmallTitle: {
    color: "#0B5CAD",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  sectionTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  blueItalic: {
    color: "#0B5CAD",
    fontStyle: "italic",
  },

  sectionDescription: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
    lineHeight: 26,
    maxWidth: 800,
  },

  cardsContainer: {
    marginTop: 35,
  },

  adventureCard: {
    width: "100%",
    height: 360,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    cursor: "pointer",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
  },

  cardDescription: {
    color: "#E2E8F0",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  cardIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    zIndex: 10,
  },

  cardIconText: {
    fontSize: 22,
  },

  /* STATS SECTION */
  statsSectionWrapper: {
    backgroundColor: "#1E293B",
  },

  statsRowContainer: {
    paddingVertical: 10,
  },

  statItem: {
    alignItems: "center",
    paddingVertical: 12,
  },

  statNumber: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  statLabel: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 18,
    letterSpacing: 1,
    fontWeight: "600",
  },

  /* FEATURED ADVENTURES */
  featuredSmallTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
  },

  featuredTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  featuredDescription: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 10,
    lineHeight: 26,
    maxWidth: 800,
  },

  featuredScrollContainer: {
    marginTop: 30,
  },

  featuredCard: {
    width: "100%",
    height: 320,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
    cursor: "pointer",
  },

  featuredCardBg: {
    width: "100%",
    height: "100%",
  },

  featuredImage: {
    borderRadius: 20,
  },

  featuredOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  badgePopular: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#0088FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgePopularText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  locationText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },

  placeName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  placeDescription: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  cardFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerIcon: {
    marginRight: 6,
    fontSize: 14,
  },

  footerText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  priceText: {
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

  /* WHY CHOOSE US */
  chooseSmall: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
  },

  chooseTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  chooseDescription: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 10,
    lineHeight: 26,
  },

  chooseTaglineRight: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 26,
    maxWidth: 450,
  },

  chooseCardsGrid: {
    marginTop: 20,
  },

  chooseCardItem: {
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

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
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
