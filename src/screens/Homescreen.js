import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
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
  Platform,
  Modal,
  Linking,
} from "react-native";
import gsap from "gsap";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";
import { useData, resolveAsset } from "../context/DataContext";
import { animateHero, animateCards, animateStats, animateSection } from "../utils/animations";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const { homeContent, trips, tripsLoading, contactContent, socialLinks, featuredPosters = [] } = useData();
  const {
    isMobile,
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

  const [activeSlide, setActiveSlide] = useState(0);
  const [posterModalVisible, setPosterModalVisible] = useState(false);
  const [selectedPosterImage, setSelectedPosterImage] = useState(null);

  const activePosters = (featuredPosters || []).filter((p) => p.status !== "INACTIVE");
  const posterSlides = activePosters.length > 0 ? activePosters : [
    {
      id: "galiyat-poster-1",
      posterKey: "galiyat-poster.jpg",
      badge: "🔥 FEATURED SPECIAL TRIP",
      title: "AN UNFORGETTABLE TRIP TO GALIYAT!",
      subtitle: "Ayubia • Pipeline Track • Dunga Gali • Nathia Gali • Wonderland Park",
      description:
        "Get ready for an exciting adventure filled with breathtaking views, thrilling experiences, music, bonfire, and unforgettable memories!",
      price: "Rs. 4,000/-",
      priceTag: "ONLY",
      departureTime: "6:00 AM",
      returnTime: "8:00 PM",
      pickupPoint: "Islamabad / Rawalpindi",
      services: [
        "Entry Tickets (Ayubia Tunnel, Pipeline Track & Park)",
        "Luxury Air-Conditioned Transport",
        "Delicious Dinner Included",
        "Bonfire Night & Music Entertainment",
      ],
      whatsappMsg: "Hello Ace Adventure Club! I want to book seats for the Galiyat Trip (Rs. 4,000/- ONLY). Please share booking details.",
      status: "ACTIVE",
    },
  ];

  useEffect(() => {
    if (posterSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % posterSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posterSlides.length]);

  const currentPosterSlide = posterSlides[activeSlide] || posterSlides[0];

  const handleWhatsAppBooking = (slide) => {
    const rawNumber = contactContent?.whatsapp || socialLinks?.whatsapp || "923000000000";
    const cleanNumber = String(rawNumber).replace(/[^0-9]/g, "");
    const text = encodeURIComponent(slide.whatsappMsg || "Hello Ace Adventure Club, I want to book a trip!");
    const url = `https://wa.me/${cleanNumber || "923000000000"}?text=${text}`;
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

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

  const handleBookNow = (slide) => {
    if (slide.tripId) {
      navigation.navigate("ViewTrip", { tripId: slide.tripId });
    } else {
      navigation.navigate("Contact");
    }
  };

  useEffect(() => {
    animateHero(".gsap-hero-item");
    animateStats(".gsap-stat");
    animateCards(".gsap-card");
  }, [(trips || []).length]);

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
              <View style={styles.badge} className="gsap-hero-item">
                <Text style={styles.badgeText}>{homeContent.heroBadge || "• Premium Adventure Club •"}</Text>
              </View>

              {/* Heading */}
              <Text
                className="gsap-hero-item"
                style={[
                  styles.headingWhite,
                  {
                    fontSize: isMobile ? 32 : isDesktop ? 58 : 42,
                    lineHeight: isMobile ? 40 : isDesktop ? 66 : 50,
                    textAlign: "center",
                  },
                ]}
              >
                {homeContent.heroHeadingWhite || "EXPLORE THE WILD"}
              </Text>
              <Text
                className="gsap-hero-item"
                style={[
                  styles.headingBlue,
                  {
                    fontSize: isMobile ? 32 : isDesktop ? 58 : 42,
                    lineHeight: isMobile ? 40 : isDesktop ? 66 : 50,
                    textAlign: "center",
                  },
                ]}
              >
                {homeContent.heroHeadingBlue || "CREATE MEMORIES"}
              </Text>

              {/* Paragraph */}
              <Text
                className="gsap-hero-item"
                style={[
                  styles.paragraph,
                  {
                    fontSize: isMobile ? 14 : isDesktop ? 18 : 16,
                    lineHeight: isMobile ? 22 : isDesktop ? 28 : 25,
                    textAlign: "center",
                    maxWidth: 750,
                    paddingHorizontal: isMobile ? 8 : 0,
                  },
                ]}
              >
                {homeContent.heroParagraph}
              </Text>

              {/* Buttons */}
              <View
                className="gsap-hero-item"
                style={[
                  styles.buttonRow,
                  isMobile && { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12 },
                ]}
              >
                <TouchableOpacity
                  className="interactive-btn"
                  style={[
                    styles.primaryButton,
                    isDesktop && { paddingHorizontal: 32, paddingVertical: 16 },
                    isMobile && { paddingHorizontal: 22, paddingVertical: 12 },
                  ]}
                  onPress={() => navigation.navigate("BrowseTrips")}
                >
                  <Text style={[styles.primaryText, isDesktop && { fontSize: 16 }]}>
                    Explore Trips ➔
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="interactive-btn"
                  style={[
                    styles.secondaryButton,
                    isDesktop && { paddingHorizontal: 32, paddingVertical: 16 },
                    isMobile && { paddingHorizontal: 22, paddingVertical: 12 },
                  ]}
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

        {/* ================= UPCOMING EXPEDITIONS & POSTER SLIDER SHOWCASE ================= */}
        <View style={styles.adSectionWrapper}>
          <View
            style={[
              styles.adSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 70 : 45,
              },
            ]}
          >
            {/* Top Heading */}
            <View style={styles.adTopHeader}>
              <View style={styles.adSmallBadge}>
                <Ionicons name="megaphone-outline" size={16} color="#FACC15" />
                <Text style={styles.adSmallBadgeText}>SPECIAL ANNOUNCEMENT & UPCOMING TOURS</Text>
              </View>
              <Text style={[styles.adMainHeading, { fontSize: isMobile ? 26 : isDesktop ? 38 : 30 }]}>
                OFFICIAL TRIP <Text style={styles.adMainHeadingGold}>POSTER & BOOKINGS</Text>
              </Text>
              <Text style={styles.adMainSubHeading}>
                Book direct from our official tour flyer — limited seats available with early bird confirmation!
              </Text>
            </View>

            {/* Poster Showcase Card Container */}
            <View style={[styles.adBannerCard, isDesktop ? { flexDirection: "row", alignItems: "center", gap: 36 } : { flexDirection: "column", gap: 24 }]}>
              {/* Left/Top: Official Poster with Zoom trigger */}
              <View style={[styles.posterWrapper, { width: isDesktop ? 400 : "100%", maxWidth: isDesktop ? 420 : 480, alignSelf: "center" }]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedPosterImage(currentPosterSlide.posterKey);
                    setPosterModalVisible(true);
                  }}
                  style={{ width: "100%" }}
                >
                  <Image
                    source={resolveAsset(currentPosterSlide.posterKey, "galiyat-poster.jpg")}
                    style={[styles.posterImage, { height: isDesktop ? 540 : isTablet ? 480 : 400 }]}
                    resizeMode="contain"
                  />
                  <View style={styles.posterZoomBtn}>
                    <Ionicons name="expand-outline" size={15} color="#FFFFFF" />
                    <Text style={styles.posterZoomBtnText}>Tap To Zoom Poster</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Right/Bottom: Details, Pricing & Action Buttons */}
              <View style={styles.adDetailsCard}>
                <View style={styles.adBadgeChip}>
                  <Text style={styles.adBadgeChipText}>{currentPosterSlide.badge}</Text>
                </View>

                <Text style={[styles.adTripTitle, { fontSize: isMobile ? 22 : isDesktop ? 30 : 25 }]}>
                  {currentPosterSlide.title}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
                  <Ionicons name="location-outline" size={18} color="#38BDF8" />
                  <Text style={styles.adTripSubtitle} numberOfLines={2}>
                    {currentPosterSlide.subtitle}
                  </Text>
                </View>

                <Text style={styles.adTripDesc}>
                  {currentPosterSlide.description}
                </Text>

                {/* Charges & Timing Highlight Box */}
                <View style={styles.adPricingBox}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 10 }}>
                    <View>
                      <Text style={styles.adPriceLabel}>TRIP CHARGES</Text>
                      <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 2 }}>
                        <Text style={styles.adPriceText}>{currentPosterSlide.price}</Text>
                        <Text style={styles.adPriceTagText}>{currentPosterSlide.priceTag}</Text>
                      </View>
                    </View>

                    <View style={{ alignItems: isMobile ? "flex-start" : "flex-end" }}>
                      <Text style={styles.adPriceLabel}>PICKUP POINT</Text>
                      <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700", marginTop: 4 }}>
                        {currentPosterSlide.pickupPoint}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.adTimingRow}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Ionicons name="time-outline" size={16} color="#FACC15" />
                      <Text style={styles.adTimingText}>Departure: {currentPosterSlide.departureTime}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Ionicons name="reload-outline" size={16} color="#38BDF8" />
                      <Text style={styles.adTimingText}>Return: {currentPosterSlide.returnTime}</Text>
                    </View>
                  </View>
                </View>

                {/* Services Included */}
                <Text style={[styles.adPriceLabel, { marginBottom: 10 }]}>SERVICES INCLUDED IN PACKAGE:</Text>
                <View style={styles.adServicesGrid}>
                  {(Array.isArray(currentPosterSlide.services) ? currentPosterSlide.services : []).map((srv, idx) => {
                    const text = typeof srv === "string" ? srv : srv.text || srv.label || "";
                    let icon = "checkmark-circle-outline";
                    const lower = text.toLowerCase();
                    if (lower.includes("ticket") || lower.includes("entry")) icon = "ticket-outline";
                    else if (lower.includes("bus") || lower.includes("transport")) icon = "bus-outline";
                    else if (lower.includes("dinner") || lower.includes("meal") || lower.includes("food")) icon = "restaurant-outline";
                    else if (lower.includes("bonfire") || lower.includes("fire")) icon = "flame-outline";
                    else if (lower.includes("music")) icon = "musical-notes-outline";
                    return (
                      <View key={idx} style={styles.adServiceItem}>
                        <Ionicons name={icon} size={15} color="#38BDF8" />
                        <Text style={styles.adServiceText}>{text}</Text>
                      </View>
                    );
                  })}
                </View>

                {/* CTA Booking Buttons */}
                <View style={[styles.adActionBtnsRow, isMobile && { flexDirection: "column", gap: 10 }]}>
                  <TouchableOpacity
                    style={[styles.adBookNowBtn, isMobile && { width: "100%" }]}
                    onPress={() => handleBookNow(currentPosterSlide)}
                  >
                    <Ionicons name="flash-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.adBookNowText}>Book Your Seat Now</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.adWhatsAppBtn, isMobile && { width: "100%" }]}
                    onPress={() => handleWhatsAppBooking(currentPosterSlide)}
                  >
                    <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" />
                    <Text style={styles.adWhatsAppText}>Book via WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Slider Next & Prev Arrow Buttons (if more than 1 slide) */}
              {posterSlides.length > 1 && (
                <>
                  <TouchableOpacity
                    style={styles.sliderNavBtnLeft}
                    onPress={() => setActiveSlide((prev) => (prev - 1 + posterSlides.length) % posterSlides.length)}
                  >
                    <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sliderNavBtnRight}
                    onPress={() => setActiveSlide((prev) => (prev + 1) % posterSlides.length)}
                  >
                    <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Slider Dots Indicator */}
            {posterSlides.length > 1 && (
              <View style={styles.sliderDotsRow}>
                {posterSlides.map((s, idx) => (
                  <TouchableOpacity
                    key={s.id}
                    style={[styles.sliderDot, activeSlide === idx && styles.sliderDotActive]}
                    onPress={() => setActiveSlide(idx)}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

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
              <Text style={styles.aboutSmallTitle}>{homeContent.aboutSmallTitle || "WHO WE ARE"}</Text>

              <Text style={styles.aboutTitle}>
                {homeContent.aboutTitleWhite || "More Than a Destination\n"}
                <Text style={styles.blueText}>{homeContent.aboutTitleBlue || "Experiences."}</Text>
              </Text>

              <Text style={styles.aboutParagraph}>
                {homeContent.aboutP1}
              </Text>

              <Text style={styles.aboutParagraph}>
                {homeContent.aboutP2}
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
            <View style={[styles.cardsContainer, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <TouchableOpacity
                className="gsap-card interactive-card"
                style={[styles.adventureCard, { width: isDesktop ? "23.5%" : isTablet ? "48%" : "100%", marginBottom: 20 }]}
                onPress={() => navigation.navigate("ViewTrip")}
              >
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
              <TouchableOpacity
                className="gsap-card interactive-card"
                style={[styles.adventureCard, { width: isDesktop ? "23.5%" : isTablet ? "48%" : "100%", marginBottom: 20 }]}
                onPress={() => navigation.navigate("ViewTrip")}
              >
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
              <TouchableOpacity
                className="gsap-card interactive-card"
                style={[styles.adventureCard, { width: isDesktop ? "23.5%" : isTablet ? "48%" : "100%", marginBottom: 20 }]}
                onPress={() => navigation.navigate("ViewTrip")}
              >
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
              <TouchableOpacity
                className="gsap-card interactive-card"
                style={[styles.adventureCard, { width: isDesktop ? "23.5%" : isTablet ? "48%" : "100%", marginBottom: 20 }]}
                onPress={() => navigation.navigate("ViewTrip")}
              >
                <Image source={require("../../assets/nature.jpg")} style={styles.cardImage} />
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>🌅</Text>
                </View>
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>One Day Trip</Text>
                  <Text style={styles.cardDescription}>
                    Quick Escapes And Perfect Single-Day Getaways.
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
            <View style={[styles.statsRowContainer, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }]}>
              <View className="gsap-stat" style={[styles.statItem, { width: isDesktop ? "23%" : "48%" }]}>
                <Text style={styles.statNumber}>{homeContent.statTrips || "100+"}</Text>
                <Text style={styles.statLabel}>{homeContent.statTripsLabel || "TRIPS COMPLETED"}</Text>
              </View>

              <View className="gsap-stat" style={[styles.statItem, { width: isDesktop ? "23%" : "48%" }]}>
                <Text style={styles.statNumber}>{homeContent.statExplorers || "500+"}</Text>
                <Text style={styles.statLabel}>{homeContent.statExplorersLabel || "ELITE EXPLORERS"}</Text>
              </View>

              <View className="gsap-stat" style={[styles.statItem, { width: isDesktop ? "23%" : "48%" }]}>
                <Text style={styles.statNumber}>{homeContent.statDestinations || "50+"}</Text>
                <Text style={styles.statLabel}>{homeContent.statDestinationsLabel || "GLOBAL DESTINATIONS"}</Text>
              </View>

              <View className="gsap-stat" style={[styles.statItem, { width: isDesktop ? "23%" : "48%" }]}>
                <Text style={styles.statNumber}>{homeContent.statGuides || "20+"}</Text>
                <Text style={styles.statLabel}>{homeContent.statGuidesLabel || "EXPERT GUIDES"}</Text>
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
            {/* Featured Cards Grid */}
            {tripsLoading && trips.length === 0 ? (
              <View style={{ width: "100%", paddingVertical: 60, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#0B5CAD" />
                <Text style={{ marginTop: 14, fontSize: 15, fontWeight: "700", color: "#0B5CAD" }}>
                  Loading Featured Expeditions...
                </Text>
              </View>
            ) : trips.length === 0 ? (
              <View style={{ width: "100%", paddingVertical: 40, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 15, fontWeight: "600", color: "#64748B" }}>
                  No featured expeditions available.
                </Text>
              </View>
            ) : (
              <View style={[styles.featuredScrollContainer, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 35 }]}>
                {trips.slice(0, 3).map((trip) => (
                  <TouchableOpacity
                    key={trip.id}
                    className="gsap-card interactive-card"
                    style={[styles.featuredCard, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}
                    onPress={() => navigation.navigate("ViewTrip", { tripId: trip.id })}
                  >
                    <ImageBackground source={resolveAsset(trip.imageKey, "featured1.jpg")} style={styles.featuredCardBg} imageStyle={styles.featuredImage}>
                      <View style={styles.featuredOverlay}>
                        {trip.badge ? (
                          <View style={styles.badgePopular}>
                            <Text style={styles.badgePopularText}>{trip.badge}</Text>
                          </View>
                        ) : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                          <Text style={styles.locationText}>{trip.location}</Text>
                          <Text style={{ fontSize: 11, fontWeight: "800", color: "#38BDF8" }}>
                            #{trip.tripCode || String(trip.id).slice(-4)}
                          </Text>
                        </View>
                        <Text style={styles.placeName}>{trip.title}</Text>
                        <Text style={styles.placeDescription} numberOfLines={2}>
                          {trip.description}
                        </Text>
                        <View style={styles.cardFooter}>
                          <View style={styles.footerItem}>
                            <Text style={styles.footerIcon}>🕒</Text>
                            <Text style={styles.footerText}>{trip.duration}</Text>
                          </View>
                          <View style={styles.footerItem}>
                            <Text style={styles.footerIcon}>⛰️</Text>
                            <Text style={styles.footerText}>{trip.difficulty}</Text>
                          </View>
                          <Text style={styles.priceText}>{trip.price}</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </View>
            )}

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
            <View style={[styles.chooseCardsGrid, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }]}>
              {/* Card 1 */}
              <View className="gsap-card interactive-card" style={[styles.chooseCardItem, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="person-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Expert Guides</Text>
                <Text style={styles.cardText}>
                  Our experienced guides ensure every adventure is safe, informative, and unforgettable for every explorer.
                </Text>
              </View>

              {/* Card 2 */}
              <View className="gsap-card interactive-card" style={[styles.chooseCardItem, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Safe Adventures</Text>
                <Text style={styles.cardText}>
                  Every trip is carefully planned with safety as our highest priority from beginning to end.
                </Text>
              </View>

              {/* Card 3 */}
              <View className="gsap-card interactive-card" style={[styles.chooseCardItem, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="ribbon-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Memorable Experiences</Text>
                <Text style={styles.cardText}>
                  Create unforgettable memories through unique journeys, breathtaking landscapes, and premium adventures.
                </Text>
              </View>

              {/* Card 4 */}
              <View className="gsap-card interactive-card" style={[styles.chooseCardItem, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="location-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Unique Destinations</Text>
                <Text style={styles.cardText}>
                  Discover hidden valleys, mountains, and destinations selected especially for nature lovers.
                </Text>
              </View>

              {/* Card 5 */}
              <View className="gsap-card interactive-card" style={[styles.chooseCardItem, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}>
                <View style={styles.iconBox}>
                  <Ionicons name="people-circle-outline" size={24} color="#0B5CAD" />
                </View>
                <Text style={styles.cardHeading}>Community of Explorers</Text>
                <Text style={styles.cardText}>
                  Connect with fellow adventurers and build lifelong friendships while exploring together.
                </Text>
              </View>

              {/* Card 6 */}
              <View className="gsap-card interactive-card" style={[styles.chooseCardItem, { width: isDesktop ? "31.5%" : isTablet ? "48%" : "100%", marginBottom: 24 }]}>
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

      {/* Modal: Full-Screen High-Res Poster Viewer */}
      <Modal visible={posterModalVisible} transparent animationType="fade">
        <View style={styles.posterModalBackdrop}>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setPosterModalVisible(false)}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Image
            source={resolveAsset(selectedPosterImage || "galiyat-poster.jpg", "galiyat-poster.jpg")}
            style={{ width: "92%", height: "88%" }}
            resizeMode="contain"
          />
        </View>
      </Modal>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 22,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
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
    paddingVertical: 14,
  },

  statItem: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  statNumber: {
    fontSize: 36,
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

  subscribeContainerMobile: {
    flexDirection: "column",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },

  emailInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 15,
  },

  emailInputMobile: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    height: 52,
    marginBottom: 12,
  },

  subscribeButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  subscribeButtonMobile: {
    width: "100%",
    height: 52,
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

  /* ================= ADVERTISEMENT / POSTER SLIDER SECTION ================= */
  adSectionWrapper: {
    backgroundColor: "#07111E",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    position: "relative",
    overflow: "hidden",
  },

  adSection: {
    position: "relative",
  },

  adTopHeader: {
    alignItems: "center",
    marginBottom: 32,
  },

  adSmallBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(250, 204, 21, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.4)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
    gap: 6,
  },

  adSmallBadgeText: {
    color: "#FACC15",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  adMainHeading: {
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "center",
  },

  adMainHeadingGold: {
    color: "#FACC15",
  },

  adMainSubHeading: {
    color: "#94A3B8",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 680,
  },

  adBannerCard: {
    backgroundColor: "#0F1E36",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    position: "relative",
  },

  posterWrapper: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#030712",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 8,
  },

  posterImage: {
    width: "100%",
    borderRadius: 16,
  },

  posterZoomBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    gap: 6,
    cursor: "pointer",
  },

  posterZoomBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  adDetailsCard: {
    flex: 1,
    justifyContent: "space-between",
  },

  adBadgeChip: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 12,
  },

  adBadgeChipText: {
    color: "#F87171",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  adTripTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    lineHeight: 34,
  },

  adTripSubtitle: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },

  adTripDesc: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },

  adPricingBox: {
    backgroundColor: "rgba(2, 132, 199, 0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(56, 189, 248, 0.35)",
    borderRadius: 16,
    padding: 16,
    marginVertical: 18,
  },

  adPriceLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  adPriceText: {
    color: "#FACC15",
    fontSize: 32,
    fontWeight: "900",
  },

  adPriceTagText: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 6,
  },

  adTimingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },

  adTimingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  adServicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  adServiceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },

  adServiceText: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "600",
  },

  adActionBtnsRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  adBookNowBtn: {
    backgroundColor: "#0B5CAD",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#0B5CAD",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    cursor: "pointer",
  },

  adBookNowText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  adWhatsAppBtn: {
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#22C55E",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    cursor: "pointer",
  },

  adWhatsAppText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* Slider Navigation Arrows & Dots */
  sliderNavBtnLeft: {
    position: "absolute",
    left: -20,
    top: "50%",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0B5CAD",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    cursor: "pointer",
  },

  sliderNavBtnRight: {
    position: "absolute",
    right: -20,
    top: "50%",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0B5CAD",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    cursor: "pointer",
  },

  sliderDotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },

  sliderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    cursor: "pointer",
  },

  sliderDotActive: {
    width: 28,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#38BDF8",
  },

  /* Modal Zoom View */
  posterModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCloseBtn: {
    position: "absolute",
    top: 30,
    right: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    cursor: "pointer",
  },
});
