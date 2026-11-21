import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { WEB3FORMS_ACCESS_KEY } from "../config/web3forms";
import { useData } from "../context/DataContext";
import useResponsive from "../hooks/useResponsive";
import { animateCards, animateHero, animateSection } from "../utils/animations";

const { height, width } = Dimensions.get("window");

export default function ContactScreen() {
  const navigation = useNavigation();
  const { contactContent, addInquiry, trips = [], tripCategories = [] } = useData();
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
    animateHero(".gsap-contact-hero");
    const t = setTimeout(() => {
      animateCards(".gsap-contact-card");
      animateSection(".gsap-contact-section");
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    destination: "",
    travelDate: "",
    travelers: "",
    adventureType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);
  const [travelersDropdownOpen, setTravelersDropdownOpen] = useState(false);
  const [adventureTypeDropdownOpen, setAdventureTypeDropdownOpen] = useState(false);

  const [customDestination, setCustomDestination] = useState("");
  const [customTravelers, setCustomTravelers] = useState("");
  const [customAdventureType, setCustomAdventureType] = useState("");

  // Only show trips directly from Admin Panel (DataContext / Firestore)
  const destinationPresets = Array.isArray(trips)
    ? trips
      .map((t) => {
        const title = t.title ? t.title.trim() : "";
        const loc = t.location ? t.location.trim() : "";
        if (title && loc && !title.toLowerCase().includes(loc.toLowerCase())) {
          return `${title} (${loc})`;
        }
        return title || loc || t.destination;
      })
      .filter(Boolean)
    : [];

  const travelerPresets = [
    "1 Person (Solo Explorer)",
    "2 Persons (Couple / Duo)",
    "3 - 5 Persons (Small Group)",
    "6 - 10 Persons (Group Tour)",
    "10+ Persons (Large Group / Corporate)",
  ];

  const defaultAdventureTypes = [
    "Trekking & Hiking",
    "Mountain Expedition",
    "Camping & Bonfire",
    "Jeep Safari & Off-Roading",
    "Cultural & Sightseeing Tour",
    "Photography & Nature Tour",
    "Family & Luxury Retreat",
    "Winter Sports & Skiing",
  ];
  const categoryPresets = Array.isArray(tripCategories)
    ? tripCategories.map((c) =>
      c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()
    )
    : [];
  const adventureTypePresets = Array.from(
    new Set([...defaultAdventureTypes, ...categoryPresets])
  );

  const handleSubmit = async () => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      alert("Please enter at least your first name and email address.");
      return;
    }

    setIsSubmitting(true);
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      // 1. Send to Web3Forms for instant email notification
      if (WEB3FORMS_ACCESS_KEY) {
        try {
          const payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `🌟 New Expedition Booking Inquiry from ${fullName}`,
            from_name: "Ace Adventure Club Website",
            "Customer Name": fullName,
            "Email Address": formData.email,
            "Phone Number": formData.phone || "Not provided",
            "Departure / Traveler City": formData.city || "Not provided",
            "Preferred Destination": formData.destination || "Not specified",
            "Travel Date": formData.travelDate || "Flexible",
            "Group Size / Travelers": formData.travelers || "Not specified",
            "Adventure Type": formData.adventureType || "General Inquiry",
            "Special Message / Dream Trip": formData.message || "No custom message",
          };

          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });
          const result = await response.json();
          console.log("[WEB3FORMS_DEBUG] Web3Forms submission result:", result);
        } catch (web3Err) {
          console.warn("[WEB3FORMS_DEBUG] Web3Forms request note:", web3Err);
        }
      }

      // 2. Also save to website database & Admin Inquiries Inbox
      addInquiry({
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        destination: formData.destination || "General Inquiry",
        travelDate: formData.travelDate,
        travelers: formData.travelers,
        adventureType: formData.adventureType,
        message: formData.message,
      });

      alert("✅ Thank you! Your adventure inquiry has been submitted successfully. Our expedition specialists will get back to you shortly.");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        destination: "",
        travelDate: "",
        travelers: "",
        adventureType: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      alert("Your inquiry was recorded. Our team will contact you soon!");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <View className="gsap-contact-hero" style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
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
                        <Text style={styles.label}>FIRST NAME *</Text>
                        <TextInput
                          value={formData.firstName}
                          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                          placeholder="e.g. Muhammad"
                          placeholderTextColor="#64748B"
                          style={styles.darkInput}
                        />
                      </View>

                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>LAST NAME</Text>
                        <TextInput
                          value={formData.lastName}
                          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                          placeholder="e.g. Ali"
                          placeholderTextColor="#64748B"
                          style={styles.darkInput}
                        />
                      </View>
                    </View>

                    {/* Row 2 */}
                    <View style={[(isDesktop || isTablet) ? { flexDirection: "row", gap: 16, marginTop: 16 } : { flexDirection: "column", gap: 12, marginTop: 12 }]}>
                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>EMAIL ADDRESS *</Text>
                        <TextInput
                          value={formData.email}
                          onChangeText={(text) => setFormData({ ...formData, email: text })}
                          keyboardType="email-address"
                          placeholder="e.g. traveler@example.com"
                          placeholderTextColor="#64748B"
                          style={styles.darkInput}
                        />
                      </View>

                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>PHONE NUMBER</Text>
                        <TextInput
                          value={formData.phone}
                          onChangeText={(text) => setFormData({ ...formData, phone: text })}
                          keyboardType="phone-pad"
                          placeholder="e.g. +92 300 1234567"
                          placeholderTextColor="#64748B"
                          style={styles.darkInput}
                        />
                      </View>
                    </View>

                    {/* Row 3: City & Destination */}
                    <View
                      style={[
                        (isDesktop || isTablet)
                          ? { flexDirection: "row", gap: 16, marginTop: 16 }
                          : { flexDirection: "column", gap: 12, marginTop: 12 },
                        { zIndex: destinationDropdownOpen ? 300 : 20, position: "relative" },
                      ]}
                    >
                      {/* CITY INPUT */}
                      <View style={[(isDesktop || isTablet) && { flex: 1 }]}>
                        <Text style={styles.label}>YOUR CITY / DEPARTURE CITY</Text>
                        <TextInput
                          value={formData.city}
                          onChangeText={(text) => setFormData({ ...formData, city: text })}
                          placeholder="e.g. Lahore, Islamabad, Karachi"
                          placeholderTextColor="#64748B"
                          style={styles.darkInput}
                        />
                      </View>

                      {/* PREFERRED DESTINATION WITH DROPDOWN + MANUAL ENTRY */}
                      <View
                        style={[
                          (isDesktop || isTablet) && { flex: 1 },
                          { zIndex: destinationDropdownOpen ? 400 : 20, position: "relative" },
                        ]}
                      >
                        <Text style={styles.label}>SELECT DESTINATION (FROM TRIPS)</Text>
                        <View
                          style={[
                            styles.dropdownInputWrapper,
                            destinationDropdownOpen && styles.dropdownInputWrapperActive,
                          ]}
                        >
                          <TextInput
                            value={formData.destination}
                            onChangeText={(text) => setFormData({ ...formData, destination: text })}
                            onFocus={() => {
                              setDestinationDropdownOpen(true);
                              setTravelersDropdownOpen(false);
                              setAdventureTypeDropdownOpen(false);
                            }}
                            placeholder="Select trip from list or type..."
                            placeholderTextColor="#94A3B8"
                            style={styles.darkInputDropdown}
                          />
                          <TouchableOpacity
                            style={styles.dropdownChevronBtn}
                            onPress={() => {
                              setDestinationDropdownOpen(!destinationDropdownOpen);
                              setTravelersDropdownOpen(false);
                              setAdventureTypeDropdownOpen(false);
                            }}
                            activeOpacity={0.7}
                          >
                            <Ionicons
                              name={destinationDropdownOpen ? "chevron-up" : "chevron-down"}
                              size={18}
                              color={destinationDropdownOpen ? "#38BDF8" : "#94A3B8"}
                            />
                          </TouchableOpacity>

                          {/* Destination Dropdown Menu */}
                          {destinationDropdownOpen && (
                            <View style={styles.dropdownMenu}>
                              <View style={styles.dropdownHeader}>
                                <Text style={styles.dropdownSectionTitle}>🏔️ AVAILABLE TRIPS ({destinationPresets.length})</Text>
                                <TouchableOpacity
                                  onPress={() => setDestinationDropdownOpen(false)}
                                  style={styles.dropdownCloseBtn}
                                >
                                  <Ionicons name="close" size={16} color="#94A3B8" />
                                </TouchableOpacity>
                              </View>
                              <ScrollView
                                style={styles.dropdownList}
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={true}
                              >
                                {destinationPresets.length === 0 ? (
                                  <View style={{ padding: 16 }}>
                                    <Text style={{ color: "#94A3B8", fontSize: 13, textAlign: "center" }}>
                                      No active trips in Admin Panel yet. You can type any custom destination below!
                                    </Text>
                                  </View>
                                ) : (
                                  destinationPresets.map((dest) => {
                                    const isSelected =
                                      formData.destination?.toLowerCase() === dest.toLowerCase();
                                    return (
                                      <TouchableOpacity
                                        key={dest}
                                        style={[
                                          styles.dropdownItem,
                                          isSelected && styles.dropdownItemSelected,
                                        ]}
                                        onPress={() => {
                                          setFormData({ ...formData, destination: dest });
                                          setDestinationDropdownOpen(false);
                                        }}
                                        activeOpacity={0.7}
                                      >
                                        <Text
                                          style={[
                                            styles.dropdownItemText,
                                            isSelected && styles.dropdownItemTextSelected,
                                          ]}
                                        >
                                          {dest}
                                        </Text>
                                        {isSelected && (
                                          <Ionicons name="checkmark-circle" size={16} color="#38BDF8" />
                                        )}
                                      </TouchableOpacity>
                                    );
                                  })
                                )}
                              </ScrollView>

                              {/* Manual Entry Section */}
                              <View style={styles.dropdownManualSection}>
                                <Text style={styles.dropdownManualLabel}>✍️ Or Enter Custom Trip/Place:</Text>
                                <View style={styles.dropdownManualRow}>
                                  <TextInput
                                    value={customDestination}
                                    onChangeText={setCustomDestination}
                                    placeholder="Type custom destination..."
                                    placeholderTextColor="#64748B"
                                    style={styles.dropdownManualInput}
                                    onSubmitEditing={() => {
                                      if (customDestination.trim()) {
                                        setFormData({ ...formData, destination: customDestination.trim() });
                                        setCustomDestination("");
                                        setDestinationDropdownOpen(false);
                                      }
                                    }}
                                  />
                                  <TouchableOpacity
                                    style={styles.dropdownManualApplyBtn}
                                    onPress={() => {
                                      if (customDestination.trim()) {
                                        setFormData({ ...formData, destination: customDestination.trim() });
                                        setCustomDestination("");
                                        setDestinationDropdownOpen(false);
                                      }
                                    }}
                                  >
                                    <Text style={styles.dropdownManualApplyText}>Apply</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Row 4: Travel Date & Travelers */}
                    <View
                      style={[
                        (isDesktop || isTablet)
                          ? { flexDirection: "row", gap: 16, marginTop: 16 }
                          : { flexDirection: "column", gap: 12, marginTop: 12 },
                        {
                          zIndex: travelersDropdownOpen ? 200 : 15,
                          position: "relative",
                        },
                      ]}
                    >
                      {/* TRAVEL DATE */}
                      <View
                        style={[
                          (isDesktop || isTablet) && { flex: 1 },
                          { zIndex: 1 },
                        ]}
                      >
                        <Text style={styles.label}>TRAVEL DATE</Text>
                        <TextInput
                          value={formData.travelDate}
                          onChangeText={(text) => setFormData({ ...formData, travelDate: text })}
                          placeholder="e.g. October 15, 2026 or Spring 2027"
                          placeholderTextColor="#64748B"
                          style={styles.darkInput}
                        />
                      </View>

                      {/* TRAVELERS WITH QUICK BUTTONS + PRESETS */}
                      <View
                        style={[
                          (isDesktop || isTablet) && { flex: 1 },
                          { zIndex: travelersDropdownOpen ? 300 : 10, position: "relative" },
                        ]}
                      >
                        <Text style={styles.label}>TRAVELERS / GROUP SIZE</Text>
                        <View
                          style={[
                            styles.dropdownInputWrapper,
                            travelersDropdownOpen && styles.dropdownInputWrapperActive,
                          ]}
                        >
                          <TextInput
                            value={formData.travelers}
                            onChangeText={(text) => setFormData({ ...formData, travelers: text })}
                            onFocus={() => {
                              setTravelersDropdownOpen(true);
                              setDestinationDropdownOpen(false);
                              setAdventureTypeDropdownOpen(false);
                            }}
                            placeholder="e.g. 2 Persons or Group of 4"
                            placeholderTextColor="#94A3B8"
                            style={styles.darkInputDropdown}
                          />
                          <TouchableOpacity
                            style={styles.dropdownChevronBtn}
                            onPress={() => {
                              setTravelersDropdownOpen(!travelersDropdownOpen);
                              setDestinationDropdownOpen(false);
                              setAdventureTypeDropdownOpen(false);
                            }}
                            activeOpacity={0.7}
                          >
                            <Ionicons
                              name={travelersDropdownOpen ? "chevron-up" : "chevron-down"}
                              size={18}
                              color={travelersDropdownOpen ? "#38BDF8" : "#94A3B8"}
                            />
                          </TouchableOpacity>

                          {/* Travelers Dropdown Menu */}
                          {travelersDropdownOpen && (
                            <View style={styles.dropdownMenu}>
                              <View style={styles.dropdownHeader}>
                                <Text style={styles.dropdownSectionTitle}>👥 SELECT GROUP SIZE</Text>
                                <TouchableOpacity
                                  onPress={() => setTravelersDropdownOpen(false)}
                                  style={styles.dropdownCloseBtn}
                                >
                                  <Ionicons name="close" size={16} color="#94A3B8" />
                                </TouchableOpacity>
                              </View>

                              {/* Quick tap chips */}
                              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, paddingHorizontal: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#334155" }}>
                                {["1", "2", "3 - 5", "6 - 10", "10+"].map((q) => (
                                  <TouchableOpacity
                                    key={q}
                                    style={{
                                      backgroundColor: formData.travelers.startsWith(q) ? "#0284C7" : "#1E293B",
                                      paddingHorizontal: 10,
                                      paddingVertical: 5,
                                      borderRadius: 6,
                                      borderWidth: 1,
                                      borderColor: formData.travelers.startsWith(q) ? "#38BDF8" : "#334155",
                                    }}
                                    onPress={() => {
                                      const matched = travelerPresets.find((p) => p.startsWith(q)) || `${q} Travelers`;
                                      setFormData({ ...formData, travelers: matched });
                                      setTravelersDropdownOpen(false);
                                    }}
                                  >
                                    <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700" }}>{q} {q === "1" ? "Person" : "Persons"}</Text>
                                  </TouchableOpacity>
                                ))}
                              </View>

                              <ScrollView
                                style={styles.dropdownList}
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={true}
                              >
                                {travelerPresets.map((opt) => {
                                  const isSelected =
                                    formData.travelers?.toLowerCase() === opt.toLowerCase();
                                  return (
                                    <TouchableOpacity
                                      key={opt}
                                      style={[
                                        styles.dropdownItem,
                                        isSelected && styles.dropdownItemSelected,
                                      ]}
                                      onPress={() => {
                                        setFormData({ ...formData, travelers: opt });
                                        setTravelersDropdownOpen(false);
                                      }}
                                      activeOpacity={0.7}
                                    >
                                      <Text
                                        style={[
                                          styles.dropdownItemText,
                                          isSelected && styles.dropdownItemTextSelected,
                                        ]}
                                      >
                                        {opt}
                                      </Text>
                                      {isSelected && (
                                        <Ionicons name="checkmark-circle" size={16} color="#38BDF8" />
                                      )}
                                    </TouchableOpacity>
                                  );
                                })}
                              </ScrollView>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Row 5: Adventure Type */}
                    <View
                      style={[
                        { marginTop: 16 },
                        { zIndex: adventureTypeDropdownOpen ? 150 : 10, position: "relative" },
                      ]}
                    >
                      <Text style={styles.label}>ADVENTURE TYPE</Text>
                      <View
                        style={[
                          styles.dropdownInputWrapper,
                          adventureTypeDropdownOpen && styles.dropdownInputWrapperActive,
                        ]}
                      >
                        <TextInput
                          value={formData.adventureType}
                          onChangeText={(text) => setFormData({ ...formData, adventureType: text })}
                          onFocus={() => {
                            setAdventureTypeDropdownOpen(true);
                            setDestinationDropdownOpen(false);
                            setTravelersDropdownOpen(false);
                          }}
                          placeholder="Select or enter adventure type..."
                          placeholderTextColor="#94A3B8"
                          style={styles.darkInputDropdown}
                        />
                        <TouchableOpacity
                          style={styles.dropdownChevronBtn}
                          onPress={() => {
                            setAdventureTypeDropdownOpen(!adventureTypeDropdownOpen);
                            setDestinationDropdownOpen(false);
                            setTravelersDropdownOpen(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name={adventureTypeDropdownOpen ? "chevron-up" : "chevron-down"}
                            size={18}
                            color={adventureTypeDropdownOpen ? "#38BDF8" : "#94A3B8"}
                          />
                        </TouchableOpacity>

                        {/* Adventure Type Dropdown Menu */}
                        {adventureTypeDropdownOpen && (
                          <View style={styles.dropdownMenu}>
                            <View style={styles.dropdownHeader}>
                              <Text style={styles.dropdownSectionTitle}>🏔️ ADVENTURE TYPE PRESETS</Text>
                              <TouchableOpacity
                                onPress={() => setAdventureTypeDropdownOpen(false)}
                                style={styles.dropdownCloseBtn}
                              >
                                <Ionicons name="close" size={16} color="#94A3B8" />
                              </TouchableOpacity>
                            </View>
                            <ScrollView
                              style={styles.dropdownList}
                              nestedScrollEnabled={true}
                              showsVerticalScrollIndicator={true}
                            >
                              {adventureTypePresets.map((type) => {
                                const isSelected =
                                  formData.adventureType?.toLowerCase() === type.toLowerCase();
                                return (
                                  <TouchableOpacity
                                    key={type}
                                    style={[
                                      styles.dropdownItem,
                                      isSelected && styles.dropdownItemSelected,
                                    ]}
                                    onPress={() => {
                                      setFormData({ ...formData, adventureType: type });
                                      setAdventureTypeDropdownOpen(false);
                                    }}
                                    activeOpacity={0.7}
                                  >
                                    <Text
                                      style={[
                                        styles.dropdownItemText,
                                        isSelected && styles.dropdownItemTextSelected,
                                      ]}
                                    >
                                      {type}
                                    </Text>
                                    {isSelected && (
                                      <Ionicons name="checkmark-circle" size={16} color="#38BDF8" />
                                    )}
                                  </TouchableOpacity>
                                );
                              })}
                            </ScrollView>

                            {/* Manual Entry Section */}
                            <View style={styles.dropdownManualSection}>
                              <Text style={styles.dropdownManualLabel}>✍️ Or Enter Manually / Custom:</Text>
                              <View style={styles.dropdownManualRow}>
                                <TextInput
                                  value={customAdventureType}
                                  onChangeText={setCustomAdventureType}
                                  placeholder="Type custom adventure type..."
                                  placeholderTextColor="#64748B"
                                  style={styles.dropdownManualInput}
                                  onSubmitEditing={() => {
                                    if (customAdventureType.trim()) {
                                      setFormData({ ...formData, adventureType: customAdventureType.trim() });
                                      setCustomAdventureType("");
                                      setAdventureTypeDropdownOpen(false);
                                    }
                                  }}
                                />
                                <TouchableOpacity
                                  style={styles.dropdownManualApplyBtn}
                                  onPress={() => {
                                    if (customAdventureType.trim()) {
                                      setFormData({ ...formData, adventureType: customAdventureType.trim() });
                                      setCustomAdventureType("");
                                      setAdventureTypeDropdownOpen(false);
                                    }
                                  }}
                                >
                                  <Text style={styles.dropdownManualApplyText}>Apply</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
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
                        placeholder="Describe your dream itinerary, special requirements, dietary preferences, or questions..."
                        placeholderTextColor="#64748B"
                        style={styles.darkTextArea}
                      />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                      style={[styles.submitBtn, isSubmitting && { opacity: 0.7 }]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.submitBtnText}>
                        {isSubmitting ? "SENDING INQUIRY..." : "SEND ADVENTURE REQUEST"}
                      </Text>
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
                      <Text style={styles.infoMainText}>{contactContent.phone || "+92 312 5556789"}</Text>
                      <Text style={styles.infoSubText}>{contactContent.phoneHours || "Mon–Fri, 9am - 6pm PKT"}</Text>
                    </View>
                  </View>

                  {/* Email */}
                  <View style={[styles.infoRow, { marginTop: 16 }]}>
                    <View style={styles.iconCircle}>
                      <Ionicons name="mail-outline" size={18} color="#0B5CAD" />
                    </View>
                    <View style={{ marginLeft: 14 }}>
                      <Text style={styles.infoTagText}>EMAIL US</Text>
                      <Text style={styles.infoMainText}>{contactContent.email || "hello@acesadventure.com"}</Text>
                      <Text style={styles.infoSubText}>{contactContent.emailSubtitle || "Inquiry & Support"}</Text>
                    </View>
                  </View>

                  {/* Location */}
                  <View style={[styles.infoRow, { marginTop: 16 }]}>
                    <View style={styles.iconCircle}>
                      <Ionicons name="location-outline" size={18} color="#0B5CAD" />
                    </View>
                    <View style={{ marginLeft: 14 }}>
                      <Text style={styles.infoTagText}>LOCATION</Text>
                      <Text style={styles.infoMainText}>{contactContent.location || "Attock, Punjab, Pakistan"}</Text>
                      <Text style={styles.infoSubText}>{contactContent.locationSubtitle || "The Gateway to the North"}</Text>
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
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  dropdownInputWrapperActive: {
    borderColor: "#38BDF8",
  },

  darkInputDropdown: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 40,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownChevronBtn: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    cursor: "pointer",
    zIndex: 10,
  },

  /* DROPDOWN MENU STYLES */
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 6,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(56, 189, 248, 0.4)",
    padding: 10,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 25,
  },

  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingBottom: 8,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },

  dropdownSectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#38BDF8",
    letterSpacing: 0.8,
  },

  dropdownCloseBtn: {
    padding: 4,
    cursor: "pointer",
  },

  dropdownList: {
    maxHeight: 180,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 2,
  },

  dropdownItemSelected: {
    backgroundColor: "rgba(11, 92, 173, 0.35)",
    borderLeftWidth: 3,
    borderLeftColor: "#38BDF8",
  },

  dropdownItemText: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },

  dropdownItemTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  dropdownManualSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },

  dropdownManualLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    marginBottom: 6,
    paddingHorizontal: 4,
  },

  dropdownManualRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  dropdownManualInput: {
    flex: 1,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#FFFFFF",
    fontSize: 13,
  },

  dropdownManualApplyBtn: {
    backgroundColor: "#0B5CAD",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  dropdownManualApplyText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
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
