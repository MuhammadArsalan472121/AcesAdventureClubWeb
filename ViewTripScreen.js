import React, { useState } from "react";

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
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Header from "./Header";

const { width, height } = Dimensions.get("window");

export default function ViewTripScreen() {
  const navigation = useNavigation();

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* ================= HERO SECTION ================= */}

<ImageBackground
  source={require("./assets/tripHero.jpg")}
  style={styles.hero}
>

  {/* Overlay */}

  <View style={styles.overlay}>

    {/* Header */}

    <Header />

    {/* Hero Content */}

    <View style={styles.heroContent}>

      <Text style={styles.breadcrumb}>
        HOME / EXPLORE TRIPS / HUNZA EXPLORER
      </Text>

      <Text style={styles.heroTitle}>
        Hunza Explorer
      </Text>

      <Text style={styles.heroDescription}>
        Discover breathtaking landscapes, mountain trails,
        and unforgettable adventures in Northern Pakistan.
      </Text>

      <View style={styles.infoRow}>

        <View style={styles.infoCard}>

          <Ionicons
            name="location-outline"
            size={16}
            color="#FFFFFF"
          />

          <Text style={styles.infoLabel}>
            LOCATION
          </Text>

          <Text style={styles.infoValue}>
            Hunza Valley
          </Text>

        </View>

        <View style={styles.infoCard}>

          <Ionicons
            name="time-outline"
            size={16}
            color="#FFFFFF"
          />

          <Text style={styles.infoLabel}>
            DURATION
          </Text>

          <Text style={styles.infoValue}>
            3 Days
          </Text>

        </View>

      </View>

      <View style={styles.infoRow}>

        <View style={styles.infoCard}>

          <Ionicons
            name="speedometer-outline"
            size={16}
            color="#FFFFFF"
          />

          <Text style={styles.infoLabel}>
            DIFFICULTY
          </Text>

          <Text style={styles.infoValue}>
            Moderate
          </Text>

        </View>

        <View style={styles.infoCard}>

          <Ionicons
            name="people-outline"
            size={16}
            color="#FFFFFF"
          />

          <Text style={styles.infoLabel}>
            TYPE
          </Text>

          <Text style={styles.infoValue}>
            Group Adventure
          </Text>

        </View>

      </View>

      <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate("BrowseTrips")}>

        <Text style={styles.heroButtonText}>
          EXPLORE MORE
        </Text>

      </TouchableOpacity>

    </View>

  </View>

</ImageBackground>
{/* ================= ABOUT ADVENTURE ================= */}

<View style={styles.aboutSection}>

  <Image
    source={require("./assets/aboutTrip.jpg")}
    style={styles.aboutImage}
  />

  <Text style={styles.aboutSmallTitle}>
    ABOUT THIS ADVENTURE
  </Text>

  <Text style={styles.aboutTitle}>
    Discover the Hidden Beauty{"\n"}of Hunza Valley
  </Text>

  <Text style={styles.aboutDescription}>
    Embark on an unforgettable journey through the breathtaking
    landscapes of Hunza Valley. Experience majestic mountains,
    crystal-clear lakes, rich local culture, and thrilling
    adventures guided by experienced professionals.
  </Text>

  {/* Features */}

  <View style={styles.featureRow}>

    <Ionicons
      name="checkmark-circle"
      size={22}
      color="#1E88E5"
    />

    <Text style={styles.featureText}>
      Scenic Mountain Trails
    </Text>

  </View>

  <View style={styles.featureRow}>

    <Ionicons
      name="checkmark-circle"
      size={22}
      color="#1E88E5"
    />

    <Text style={styles.featureText}>
      Local Cultural Experience
    </Text>

  </View>

  <View style={styles.featureRow}>

    <Ionicons
      name="checkmark-circle"
      size={22}
      color="#1E88E5"
    />

    <Text style={styles.featureText}>
      Luxury Camping Facilities
    </Text>

  </View>

  <View style={styles.featureRow}>

    <Ionicons
      name="checkmark-circle"
      size={22}
      color="#1E88E5"
    />

    <Text style={styles.featureText}>
      Professional Adventure Guides
    </Text>

  </View>

  <TouchableOpacity style={styles.learnButton} onPress={() => navigation.navigate("Contact")}>

    <Text style={styles.learnButtonText}>
      Learn More
    </Text>

  </TouchableOpacity>

</View>
{/* ================= EXCLUSIVE FEATURES ================= */}

<View style={styles.featuresSection}>

  <Text style={styles.featuresSmallTitle}>
    WHY CHOOSE THIS TRIP
  </Text>

  <Text style={styles.featuresTitle}>
    Exclusive Features
  </Text>

  <Text style={styles.featuresDescription}>
    Every adventure is carefully planned to provide comfort,
    safety and unforgettable memories.
  </Text>

  <View style={styles.featuresGrid}>

    <View style={styles.featureCard}>

      <View style={styles.featureIcon}>

        <Ionicons
          name="shield-checkmark-outline"
          size={30}
          color="#1E88E5"
        />

      </View>

      <Text style={styles.featureCardTitle}>
        Safe Journey
      </Text>

      <Text style={styles.featureCardText}>
        Professional guides ensure a secure and enjoyable trip.
      </Text>

    </View>

    <View style={styles.featureCard}>

      <View style={styles.featureIcon}>

        <Ionicons
          name="bed-outline"
          size={30}
          color="#1E88E5"
        />

      </View>

      <Text style={styles.featureCardTitle}>
        Luxury Stay
      </Text>

      <Text style={styles.featureCardText}>
        Comfortable hotels and premium camping facilities.
      </Text>

    </View>

    <View style={styles.featureCard}>

      <View style={styles.featureIcon}>

        <Ionicons
          name="restaurant-outline"
          size={30}
          color="#1E88E5"
        />

      </View>

      <Text style={styles.featureCardTitle}>
        Meals Included
      </Text>

      <Text style={styles.featureCardText}>
        Fresh local meals throughout your journey.
      </Text>

    </View>

    <View style={styles.featureCard}>

      <View style={styles.featureIcon}>

        <Ionicons
          name="camera-outline"
          size={30}
          color="#1E88E5"
        />

      </View>

      <Text style={styles.featureCardTitle}>
        Photography
      </Text>

      <Text style={styles.featureCardText}>
        Capture breathtaking moments with stunning landscapes.
      </Text>

    </View>

  </View>

</View>

{/* ================= ADVENTURE ITINERARY ================= */}

<View style={styles.itinerarySection}>

  <Text style={styles.itinerarySmallTitle}>
    DAY BY DAY PLAN
  </Text>

  <Text style={styles.itineraryTitle}>
    Adventure Itinerary
  </Text>

  <Text style={styles.itineraryDescription}>
    Follow our carefully planned itinerary designed to give you
    the perfect balance of adventure, sightseeing and relaxation.
  </Text>

  {/* DAY 1 */}

  <View style={styles.dayCard}>

    <View style={styles.dayBadge}>
      <Text style={styles.dayBadgeText}>DAY 1</Text>
    </View>

    <Text style={styles.dayTitle}>
      Arrival & Explore Hunza
    </Text>

    <Text style={styles.dayText}>
      Arrive in Hunza, hotel check-in, Altit Fort visit,
      Karimabad Bazaar and welcome dinner.
    </Text>

  </View>

  {/* DAY 2 */}

  <View style={styles.dayCard}>

    <View style={styles.dayBadge}>
      <Text style={styles.dayBadgeText}>DAY 2</Text>
    </View>

    <Text style={styles.dayTitle}>
      Attabad & Passu Tour
    </Text>

    <Text style={styles.dayText}>
      Visit Attabad Lake, Hussaini Suspension Bridge,
      Passu Cones and enjoy boating.
    </Text>

  </View>

  {/* DAY 3 */}

  <View style={styles.dayCard}>

    <View style={styles.dayBadge}>
      <Text style={styles.dayBadgeText}>DAY 3</Text>
    </View>

    <Text style={styles.dayTitle}>
      Khunjerab Pass & Return
    </Text>

    <Text style={styles.dayText}>
      Explore Khunjerab National Park, enjoy mountain
      photography and return home safely.
    </Text>

  </View>

</View>
{/* ================= GALLERY ================= */}

<View style={styles.gallerySection}>

  <Text style={styles.gallerySmallTitle}>
    PHOTO GALLERY
  </Text>

  <Text style={styles.galleryTitle}>
    Captured Moments
  </Text>

  <Text style={styles.galleryDescription}>
    Relive unforgettable memories from previous expeditions
    through our beautiful travel moments.
  </Text>

  <View style={styles.galleryGrid}>

    <Image
      source={require("./assets/gallery1.jpg")}
      style={styles.galleryImage}
    />

    <Image
      source={require("./assets/gallery2.jpg")}
      style={styles.galleryImage}
    />

    <Image
      source={require("./assets/gallery3.jpg")}
      style={styles.galleryImage}
    />

    <Image
      source={require("./assets/gallery4.jpg")}
      style={styles.galleryImage}
    />

  </View>

</View>
{/* ================= TRIP INFO SECTION ================= */}

<View style={styles.tripInfoSection}>

  <View style={styles.tripInfoCard}>

    <Ionicons
      name="calendar-outline"
      size={24}
      color="#16233C"
    />

    <Text style={styles.tripInfoTitle}>
      BEST TIME
    </Text>

    <Text style={styles.tripInfoValue}>
      April to October
    </Text>

  </View>

  <View style={styles.tripInfoCard}>

    <Ionicons
      name="people-outline"
      size={24}
      color="#16233C"
    />

    <Text style={styles.tripInfoTitle}>
      GROUP SIZE
    </Text>

    <Text style={styles.tripInfoValue}>
      6 - 12 Explorers
    </Text>

  </View>

  <View style={styles.tripInfoCard}>

    <Ionicons
      name="diamond-outline"
      size={24}
      color="#16233C"
    />

    <Text style={styles.tripInfoTitle}>
      EXPERIENCE
    </Text>

    <Text style={styles.tripInfoValue}>
      Premium Luxury
    </Text>

  </View>

  <View style={styles.tripInfoCard}>

    <Ionicons
      name="shield-checkmark-outline"
      size={24}
      color="#16233C"
    />

    <Text style={styles.tripInfoTitle}>
      SAFETY LEVEL
    </Text>

    <Text style={styles.tripInfoValue}>
      Global Standard
    </Text>

  </View>

</View>
<ImageBackground
  source={require("./assets/adventure-bg.jpg")}
  style={styles.newsletterBg}
  imageStyle={styles.newsletterImage}
>

  <View style={styles.newsletterOverlay}>

    {/* Next Part yahan se start hoga */}
      <View>

  <Text style={styles.stayText}>
    STAY TUNED
  </Text>

  <Text style={styles.newsTitle}>
    YOUR NEXT{"\n"}
    ADVENTURE{" "}
    <Text style={styles.blueText}>AWAITS</Text>
  </Text>

  <Text style={styles.newsDescription}>
    Join our community of explorers and discover breathtaking
    destinations, unforgettable experiences and adventures that
    create memories for a lifetime.
  </Text>

  {/* Email + Button */}

  <View style={styles.subscribeContainer}>

    <TextInput
      placeholder="Enter your email address"
      placeholderTextColor="#D1D5DB"
      style={styles.emailInput}
    />

    <TouchableOpacity style={styles.subscribeButton} onPress={() => navigation.navigate("Signup")}>
      <Text style={styles.subscribeButtonText}>
        Subscribe Free
      </Text>
    </TouchableOpacity>

  </View>

  <Text style={styles.smallText}>
    No spam ever • Unsubscribe in one click
  </Text>

</View>

  </View>

</ImageBackground>
{/* ================= START BUTTON ================= */}

<TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("BrowseTrips")}>

  <Text style={styles.startButtonText}>
    Start Exploring
  </Text>

</TouchableOpacity>
    
    {/* ================= FOOTER ================= */}
    
    <View style={styles.footer}>
    
      <Image
        source={require("./assets/logo.png")}
        style={styles.footerLogo}
      />
    
      <Text style={styles.footerTagline}>
    Explore Pakistan Beyond The Horizon
    </Text>
    
      <Text style={styles.footerTitle}>
        ACES Adventure Club
      </Text>
    
      <Text style={styles.footerDescription}>
        Creating unforgettable adventures across Pakistan.
        Discover mountains, forests and breathtaking destinations
        with our passionate community.
      </Text>
    
      {/* Social Icons */}
    
      <View style={styles.socialRow}>
    
        <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
          <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
          <Ionicons name="logo-instagram" size={20} color="#FFFFFF" />
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
          <Ionicons name="logo-youtube" size={20} color="#FFFFFF" />
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.socialIcon} onPress={() => navigation.navigate("Contact")}>
          <Ionicons name="logo-linkedin" size={20} color="#FFFFFF" />
        </TouchableOpacity>
    
      </View>
    
      <View style={styles.footerLine}/>
    
      <Text style={styles.copyText}>
        © 2026 ACES Adventure Club
      </Text>
    
      <Text style={styles.versionText}>
        Version 1.0.0
      </Text>
          
    </View> 

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:"#F8FAFC",
},

hero:{
  width:"100%",
  height:height * 0.88,
},

overlay:{
  flex:1,
  backgroundColor:"rgba(6,24,48,0.45)",
  paddingHorizontal:20,
},

/* ================= HERO CONTENT ================= */

heroContent:{
  flex:1,

  justifyContent:"center",

  paddingBottom:30,
},

breadcrumb:{
  color:"#E2E8F0",
  fontSize:9,
  fontWeight:"600",
  letterSpacing:1,
  marginBottom:5,
},

heroTitle:{
  color:"#FFFFFF",
  fontSize:30,
  fontWeight:"700",
  lineHeight:34,
  marginBottom:8,
},

heroDescription:{
  color:"#E5E7EB",
  fontSize:14,
  lineHeight:22,
  width:"95%",
  marginBottom:12,
},

/* ================= INFO CARDS ================= */

infoRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:10,
},

infoCard:{
  width:"48%",
  backgroundColor:"rgba(255,255,255,.18)",
  borderRadius:14,
  paddingVertical:10,
  paddingHorizontal:12,
  borderWidth:1,
  borderColor:"rgba(255,255,255,.20)",
},

infoLabel:{
  marginTop:4,
  color:"#CBD5E1",
  fontSize:8,
  fontWeight:"600",
},

infoValue:{
  marginTop:3,
  color:"#3B82F6",
  fontSize:12,
  fontWeight:"700",
},

/* ================= BUTTON ================= */

heroButton:{
  marginTop:16,
  width:145,
  height:40,
  borderRadius:22,
  backgroundColor:"#1E88E5",
  justifyContent:"center",
  alignItems:"center",
},

heroButtonText:{
  color:"#FFFFFF",
  fontSize:12,
  fontWeight:"700",
},
/* ================= ABOUT ADVENTURE ================= */

aboutSection:{
  paddingHorizontal:20,
  paddingVertical:50,
  backgroundColor:"#FFFFFF",
},

aboutImage:{
  width:"100%",
  height:240,

  borderRadius:22,

  marginBottom:30,
},

aboutSmallTitle:{
  fontSize:12,
  fontWeight:"700",

  color:"#1E88E5",

  letterSpacing:1.5,

  marginBottom:8,
},

aboutTitle:{
  fontSize:31,
  fontWeight:"700",

  color:"#16233C",

  lineHeight:40,
},

aboutDescription:{
  marginTop:16,

  color:"#6A7586",

  fontSize:15,

  lineHeight:27,
},

/* ================= FEATURES ================= */

featureRow:{
  flexDirection:"row",

  alignItems:"center",

  marginTop:18,
},

featureText:{
  marginLeft:12,

  fontSize:16,

  color:"#16233C",

  fontWeight:"600",
},

/* ================= BUTTON ================= */

learnButton:{
  marginTop:35,

  width:170,
  height:50,

  backgroundColor:"#1E88E5",

  borderRadius:30,

  justifyContent:"center",
  alignItems:"center",

  elevation:5,

  shadowColor:"#000",
  shadowOpacity:0.12,
  shadowRadius:8,
  shadowOffset:{
    width:0,
    height:4,
  },
},

learnButtonText:{
  color:"#FFFFFF",

  fontSize:15,

  fontWeight:"700",

  letterSpacing:.5,
},
/* ================= EXCLUSIVE FEATURES ================= */

featuresSection:{
  paddingHorizontal:20,
  paddingVertical:50,
  backgroundColor:"#EDF4FB",
},

featuresSmallTitle:{
  color:"#1E88E5",
  fontSize:12,
  fontWeight:"700",
  letterSpacing:1.5,
},

featuresTitle:{
  marginTop:8,
  fontSize:32,
  fontWeight:"700",
  color:"#16233C",
},

featuresDescription:{
  marginTop:10,
  fontSize:15,
  lineHeight:24,
  color:"#6A7586",
  marginBottom:28,
},

/* Grid */

featuresGrid:{
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between",
},

/* Card */

featureCard:{
  width:"48%",
  backgroundColor:"#FFFFFF",

  borderRadius:20,

  padding:18,

  marginBottom:16,

  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:4,
  },

  elevation:5,
},

/* Icon */

featureIcon:{
  width:58,
  height:58,

  borderRadius:29,

  backgroundColor:"#EAF3FF",

  justifyContent:"center",
  alignItems:"center",

  marginBottom:16,
},

/* Title */

featureCardTitle:{
  fontSize:17,
  fontWeight:"700",

  color:"#16233C",

  marginBottom:8,
},

/* Description */

featureCardText:{
  color:"#6A7586",

  fontSize:13,

  lineHeight:21,
},
/* ================= ADVENTURE ITINERARY ================= */

itinerarySection:{
  paddingHorizontal:20,
  paddingVertical:50,
  backgroundColor:"#FFFFFF",
},

itinerarySmallTitle:{
  color:"#1E88E5",
  fontSize:12,
  fontWeight:"700",
  letterSpacing:1.5,
},

itineraryTitle:{
  marginTop:8,
  fontSize:32,
  fontWeight:"700",
  color:"#16233C",
},

itineraryDescription:{
  marginTop:10,
  marginBottom:30,

  color:"#6A7586",

  fontSize:15,
  lineHeight:24,
},

/* Timeline Card */

dayCard:{
  backgroundColor:"#FFFFFF",

  borderRadius:22,

  padding:20,

  marginBottom:20,

  borderLeftWidth:5,
  borderLeftColor:"#1E88E5",

  shadowColor:"#000",
  shadowOpacity:.08,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:4,
  },

  elevation:5,
},

/* Day Badge */

dayBadge:{
  alignSelf:"flex-start",

  backgroundColor:"#1E88E5",

  paddingHorizontal:14,
  paddingVertical:6,

  borderRadius:20,

  marginBottom:14,
},

dayBadgeText:{
  color:"#FFFFFF",

  fontSize:12,

  fontWeight:"700",

  letterSpacing:1,
},

/* Day Title */

dayTitle:{
  fontSize:21,
  fontWeight:"700",

  color:"#16233C",

  marginBottom:10,
},

/* Description */

dayText:{
  color:"#6A7586",

  fontSize:15,

  lineHeight:25,
},
/* ================= GALLERY ================= */

gallerySection:{
  backgroundColor:"#EDF4FB",

  paddingHorizontal:20,
  paddingVertical:50,
},

gallerySmallTitle:{
  color:"#1E88E5",
  fontSize:12,
  fontWeight:"700",
  letterSpacing:1.5,
},

galleryTitle:{
  marginTop:8,
  fontSize:32,
  fontWeight:"700",
  color:"#16233C",
},

galleryDescription:{
  marginTop:10,
  marginBottom:30,

  color:"#6A7586",

  fontSize:15,
  lineHeight:24,
},

galleryGrid:{
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between",
},

galleryImage:{
  width:"48%",
  height:160,

  borderRadius:18,

  marginBottom:16,
},
/* ================= TRIP INFO SECTION ================= */

tripInfoSection:{
  backgroundColor:"#16233C",

  paddingHorizontal:20,
  paddingVertical:35,

  flexDirection:"row",
  flexWrap:"wrap",

  justifyContent:"space-between",
},

tripInfoCard:{
  width:"48%",

  backgroundColor:"#FFFFFF",

  borderRadius:18,

  paddingVertical:22,
  paddingHorizontal:12,

  alignItems:"center",

  marginBottom:16,

  elevation:4,

  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:8,
  shadowOffset:{
    width:0,
    height:4,
  },
},

tripInfoTitle:{
  marginTop:12,

  fontSize:13,

  fontWeight:"700",

  letterSpacing:1,

  color:"#16233C",
},

tripInfoValue:{
  marginTop:8,

  fontSize:13,

  color:"#6A7586",

  textAlign:"center",

  lineHeight:20,
},
/* ================= NEWSLETTER ================= */

newsletterBg: {
  height: 520,
  marginHorizontal: 18,
  marginTop: 40,
  marginBottom: 30,
  borderRadius: 28,
  overflow: "hidden",
},

newsletterImage: {
  borderRadius: 28,
},

newsletterOverlay: {
  flex: 1,

  backgroundColor: "rgba(7,17,34,0.58)",

  paddingHorizontal: 25,
  paddingTop: 45,
  paddingBottom: 35,

  justifyContent: "space-between",
},
/* ================= NEWSLETTER CONTENT ================= */

stayText: {
  color: "#E5E7EB",
  fontSize: 12,
  letterSpacing: 2,
  alignSelf: "center",
},

newsTitle: {
  marginTop: 10,
  color: "#FFFFFF",
  fontSize: 34,
  fontWeight: "700",
  textAlign: "center",
  lineHeight: 42,
},

blueText: {
  color: "#1E88E5",
},

newsDescription: {
  marginTop: 16,
  color: "#E5E7EB",
  textAlign: "center",
  fontSize: 15,
  lineHeight: 24,
  paddingHorizontal: 8,
},

subscribeContainer: {
  marginTop: 28,
},

emailInput: {
  height: 55,
  borderRadius: 28,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.5)",
  color: "#FFFFFF",
  paddingHorizontal: 20,
  fontSize: 15,
  backgroundColor: "rgba(255,255,255,0.12)",
},

subscribeButton: {
  marginTop: 14,
  height: 55,
  borderRadius: 28,
  backgroundColor: "#1E88E5",

  justifyContent: "center",
  alignItems: "center",
},

subscribeButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

smallText: {
  marginTop: 12,
  color: "#CBD5E1",
  textAlign: "center",
  fontSize: 12,
},
/* ================= FOOTER ================= */

startButton: {
  height: 58,
  borderRadius: 30,
  backgroundColor: "#1E88E5",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 35,

  shadowColor: "#1E88E5",
  shadowOpacity: 0.35,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  elevation: 8,
},

startButtonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "700",
},

footer: {
  marginTop: 45,
  paddingTop: 35,
  paddingBottom: 30,
  paddingHorizontal: 20,

  backgroundColor: "#16233C",

  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,

  alignItems: "center",
},

footerLogo: {
  width: 75,
  height: 75,
  resizeMode: "contain",
},

footerTitle: {
  marginTop: 14,
  fontSize: 24,
  fontWeight: "700",
  color: "#FFFFFF",
},

footerDescription: {
  marginTop: 12,
  textAlign: "center",
  color: "#D8E4F5",
  fontSize: 15,
  lineHeight: 24,
  paddingHorizontal: 15,
},

socialRow: {
  marginTop: 28,
  flexDirection: "row",
},

socialIcon: {
  width: 50,
  height: 50,
  borderRadius: 25,

  backgroundColor: "rgba(255,255,255,0.10)",

  justifyContent: "center",
  alignItems: "center",

  marginHorizontal: 8,

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.18)",
},

footerLine: {
  width: "100%",
  height: 1,

  backgroundColor: "rgba(255,255,255,0.15)",

  marginTop: 30,
  marginBottom: 20,
},

copyText: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "600",
},

versionText: {
  marginTop: 6,
  color: "#9DB4D6",
  fontSize: 13,
},
footerTagline: {
  marginTop: 6,
  fontSize: 14,
  color: "#60A5FA",
  fontWeight: "600",
},
});