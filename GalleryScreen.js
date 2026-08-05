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
import Header from "./Header";

const { height } = Dimensions.get("window");

export default function GalleryScreen() {
  const galleryData = [
    { id: 1, image: require("./assets/gallery1.jpg"), category: "Mountains" },
    { id: 2, image: require("./assets/gallery2.jpg"), category: "Lakes" },
    { id: 3, image: require("./assets/gallery3.jpg"), category: "Camping" },
    { id: 4, image: require("./assets/gallery4.jpg"), category: "Mountains" },
    { id: 5, image: require("./assets/gallery5.jpg"), category: "Nature Trails" },
    { id: 6, image: require("./assets/gallery6.jpg"), category: "Trekking" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGallery =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <ImageBackground source={require("./assets/galleryHero.jpg")} style={styles.hero} resizeMode="cover">
          <View style={styles.overlay}>
            <Header />
            <View style={styles.heroContent}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>EXPLORE NATURE'S BEAUTY</Text>
              </View>
              <Text style={styles.heroTitle}>Discover Places</Text>
              <Text style={styles.heroSubTitle}>Worth Exploring</Text>
              <Text style={styles.heroDescription}>
                Experience breathtaking mountains, hidden trails, peaceful lakes and unforgettable landscapes through our curated adventure showcase.
              </Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>EXPLORE TRIPS →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* FILTERS */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
            {["All", ...Array.from(new Set(galleryData.map(i => i.category)))].map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.filterButton, selectedCategory === cat && styles.activeFilter]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={selectedCategory === cat ? styles.activeFilterText : styles.filterText}>{cat.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* GALLERY GRID */}
        <View style={styles.galleryGrid}>
          {filteredGallery.map(item => (
            <View style={styles.galleryItem} key={item.id}>
              <ImageBackground source={item.image} style={styles.galleryImage} imageStyle={{ borderRadius: 12 }} />
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
          ))}
        </View>
        {/* ================= SIGNATURE DESTINATIONS ================= */}

<View style={styles.destinationSection}>

  <Text style={styles.destinationTag}>
    ELITE SELECTION
  </Text>

  <View style={styles.destinationHeader}>

    <Text style={styles.destinationTitle}>
      SIGNATURE DESTINATIONS
    </Text>

    <Text style={styles.destinationDescription}>
      Curated locations that represent the pinnacle of adventure
      and luxury in the wild.
    </Text>

  </View>

  <View style={styles.destinationCards}>

    {/* Card 1 */}

    <TouchableOpacity style={styles.destinationCard}>

      <ImageBackground
        source={require("./assets/hub1.jpg")}
        style={styles.destinationImage}
        imageStyle={styles.destinationImageStyle}
      >

        <View style={styles.destinationOverlay}>

          <View style={styles.destinationBadge}>
            <Text style={styles.destinationBadgeText}>
              Most Popular
            </Text>
          </View>

          <View>

            <Text style={styles.destinationName}>
              Hunza Valley
            </Text>

            <Text style={styles.destinationText}>
              Experience breathtaking mountains and valleys.
            </Text>

            <View style={styles.destinationBottom}>

              <Text style={styles.destinationPrice}>
                Starting from{"\n"}30000 Rs
              </Text>

              <Text style={styles.destinationDays}>
                3 Days
              </Text>

            </View>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

    {/* Card 2 */}

    <TouchableOpacity style={styles.destinationCard}>

      <ImageBackground
        source={require("./assets/hub2.jpg")}
        style={styles.destinationImage}
        imageStyle={styles.destinationImageStyle}
      >

        <View style={styles.destinationOverlay}>

          <View style={styles.destinationBadge}>
            <Text style={styles.destinationBadgeText}>
              Most Liked
            </Text>
          </View>

          <View>

            <Text style={styles.destinationName}>
              Fairy Meadows
            </Text>

            <Text style={styles.destinationText}>
              Journey through scenic trails leading to Nanga Parbat.
            </Text>

            <View style={styles.destinationBottom}>

              <Text style={styles.destinationPrice}>
                Starting from{"\n"}40000 Rs
              </Text>

              <Text style={styles.destinationDays}>
                7 Days
              </Text>

            </View>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

    {/* Card 3 */}

    <TouchableOpacity style={styles.destinationCard}>

      <ImageBackground
        source={require("./assets/hub3.jpg")}
        style={styles.destinationImage}
        imageStyle={styles.destinationImageStyle}
      >

        <View style={styles.destinationOverlay}>

          <View style={styles.destinationBadge}>
            <Text style={styles.destinationBadgeText}>
              Most Visited
            </Text>
          </View>

          <View>

            <Text style={styles.destinationName}>
              Skardu Adventure
            </Text>

            <Text style={styles.destinationText}>
              Explore majestic lakes, valleys and mountains.
            </Text>

            <View style={styles.destinationBottom}>

              <Text style={styles.destinationPrice}>
                Starting from{"\n"}70000 Rs
              </Text>

              <Text style={styles.destinationDays}>
                14 Days
              </Text>

            </View>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

  </View>

</View>
{/* ================= NEWSLETTER SECTION ================= */}

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

    <TouchableOpacity style={styles.subscribeButton}>
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

<TouchableOpacity style={styles.startButton}>

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

    <TouchableOpacity style={styles.socialIcon}>
      <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.socialIcon}>
      <Ionicons name="logo-instagram" size={20} color="#FFFFFF" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.socialIcon}>
      <Ionicons name="logo-youtube" size={20} color="#FFFFFF" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.socialIcon}>
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
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  hero: {
    width: "100%",
    height: height * 0.70,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.38)",
    paddingHorizontal: 20,
  },

  heroContent: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    marginBottom: 18,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
  },

  heroTitle: {
    fontSize: 38,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },

  heroSubTitle: {
    fontSize: 42,
    color: "#2F6DE0",
    fontStyle: "italic",
    fontWeight: "700",
    marginTop: -2,
    textAlign: "center",
  },

  heroDescription: {
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 22,
    width: "88%",
    marginTop: 18,
  },

  heroButton: {
    marginTop: 28,
    backgroundColor: "#2F6DE0",
    width: 175,
    height: 48,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* FILTERS */
  filterSection: {
    paddingTop: 22,
    paddingBottom: 20,
    backgroundColor: "#F8FAFC",
  },

  filterContainer: {
    paddingHorizontal: 20,
  },

  filterButton: {
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  activeFilter: {
    backgroundColor: "#16233C",
    borderColor: "#16233C",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16233C",
  },

  activeFilterText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* GALLERY GRID */
  galleryGrid: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
  },

  galleryItem: {
    width: "48%",
    marginBottom: 14,
  },

  galleryImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
  },

  itemCategory: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#16233C",
  },
  /* ================= DESTINATION SECTION ================= */

destinationSection:{
  paddingHorizontal:20,
  paddingTop:45,
  paddingBottom:40,
  backgroundColor:"#F8FAFC",
},

destinationTag:{
  color:"#2F6DE0",
  fontSize:11,
  fontWeight:"700",
  letterSpacing:1.5,
  marginBottom:8,
},

destinationHeader:{
  marginBottom:25,
},

destinationTitle:{
  fontSize:30,
  fontWeight:"700",
  color:"#16233C",
},

destinationDescription:{
  marginTop:10,
  fontSize:14,
  lineHeight:22,
  color:"#64748B",
},

/* ================= DESTINATION CARDS ================= */

destinationCards:{
  marginTop:10,
},

destinationCard:{
  marginBottom:22,
  borderRadius:22,
  overflow:"hidden",

  elevation:5,

  shadowColor:"#000",
  shadowOpacity:0.12,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:4,
  },
},

destinationImage:{
  width:"100%",
  height:300,
  justifyContent:"space-between",
},

destinationImageStyle:{
  borderRadius:22,
},

destinationOverlay:{
  flex:1,
  justifyContent:"space-between",
  padding:16,
  backgroundColor:"rgba(0,0,0,.25)",
},

/* ================= BADGE ================= */

destinationBadge:{
  alignSelf:"flex-start",
  backgroundColor:"#FFFFFF",
  borderRadius:30,
  paddingHorizontal:12,
  paddingVertical:5,
},

destinationBadgeText:{
  color:"#2F6DE0",
  fontSize:10,
  fontWeight:"700",
},

/* ================= TEXT ================= */

destinationName:{
  color:"#FFFFFF",
  fontSize:24,
  fontWeight:"700",
},

destinationText:{
  color:"#FFFFFF",
  fontSize:13,
  lineHeight:20,
  marginTop:6,
},

destinationBottom:{
  marginTop:18,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"flex-end",
},

destinationPrice:{
  color:"#FFFFFF",
  fontSize:12,
  fontWeight:"600",
},

destinationDays:{
  color:"#FFFFFF",
  fontSize:12,
  fontWeight:"700",
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




