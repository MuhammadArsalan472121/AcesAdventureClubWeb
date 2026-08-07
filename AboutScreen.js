import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "./Header";

import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function AboutScreen() {
  const navigation = useNavigation();

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground
          source={require("./assets/about-bg.jpg")}
          style={styles.hero}
        >

          <View style={styles.overlay}>

            {/* Header */}
            <Header />

            {/* Hero Content */}

            <View style={styles.heroContent}>

              <Text style={styles.smallTitle}>
                ABOUT ACES ADVENTURE CLUB
              </Text>

              <Text style={styles.heroTitle}>
                About Adventure{"\n"}
                <Text style={styles.blueText}>
                  Club
                </Text>
              </Text>

              <Text style={styles.heroDescription}>
                Founded on the principle of absolute excellence,
                ACES Adventure Club curates the world's most
                exclusive nature expeditions.

                {"\n\n"}

                We bridge the gap between raw wilderness
                and luxury experiences for passionate
                explorers.
              </Text>

              <View style={styles.buttonRow}>

                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("BrowseTrips")}>
                  <Text style={styles.primaryButtonText}>
                    OUR LEGACY
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Contact")}>
                  <Text style={styles.secondaryButtonText}>
                    WATCH THE FILM
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>

        </ImageBackground>
        {/* ================= STATS SECTION ================= */}

<View style={styles.statsSection}>

  <View style={styles.statsRow}>

    <View style={styles.statCard}>
      <View style={styles.iconCircle}>
        <Ionicons
          name="compass-outline"
          size={22}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.statNumber}>100+</Text>

      <Text style={styles.statLabel}>
        Adventures
      </Text>
    </View>

    <View style={styles.statCard}>
      <View style={styles.iconCircle}>
        <Ionicons
          name="earth-outline"
          size={22}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.statNumber}>50+</Text>

      <Text style={styles.statLabel}>
        Destinations
      </Text>
    </View>

  </View>

  <View style={styles.statsRow}>

    <View style={styles.statCard}>
      <View style={styles.iconCircle}>
        <Ionicons
          name="people-outline"
          size={22}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.statNumber}>500+</Text>

      <Text style={styles.statLabel}>
        Explorers
      </Text>
    </View>

    <View style={styles.statCard}>
      <View style={styles.iconCircle}>
        <Ionicons
          name="shield-checkmark-outline"
          size={22}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.statNumber}>20+</Text>

      <Text style={styles.statLabel}>
        Expert Guides
      </Text>
    </View>

  </View>

</View>
{/* ================= OUR MISSION ================= */}

<View style={styles.missionSection}>

  <Image
    source={require("./assets/mission.jpg")}
    style={styles.missionImage}
  />

  <Text style={styles.missionTitle}>
    OUR MISSION
  </Text>

  <Text style={styles.missionDescription}>
    We exist to redefine the spirit of adventure.
    Every journey is carefully planned to create
    unforgettable experiences that connect
    people with nature.
  </Text>

  <Text style={styles.missionDescription}>
    From luxury mountain escapes to thrilling
    expeditions, we combine safety, comfort,
    and authenticity to make every trip
    extraordinary.
  </Text>

  <View style={styles.quoteBox}>

    <Ionicons
      name="leaf-outline"
      size={22}
      color="#0B5CAD"
    />

    <Text style={styles.quoteText}>
      "In every walk with nature, one receives
      far more than he seeks."
    </Text>

  </View>

</View>
{/* ================= CORE PRINCIPLES ================= */}

<View style={styles.principlesSection}>

  <Text style={styles.smallHeading}>
    OUR VALUES
  </Text>

  <Text style={styles.principlesTitle}>
    Core <Text style={styles.blueText}>Principles</Text>
  </Text>

  <Text style={styles.principlesDescription}>
    Every adventure is guided by values that inspire
    trust, safety, and unforgettable experiences.
  </Text>

  <View style={styles.principlesGrid}>

    {/* Card 1 */}

    <View style={styles.principleCard}>

      <View style={styles.principleIcon}>
        <Ionicons
          name="shield-checkmark-outline"
          size={24}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.cardTitle}>
        Safety
      </Text>

      <Text style={styles.cardText}>
        Every journey follows international safety standards.
      </Text>

    </View>

    {/* Card 2 */}

    <View style={styles.principleCard}>

      <View style={styles.principleIcon}>
        <Ionicons
          name="leaf-outline"
          size={24}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.cardTitle}>
        Nature
      </Text>

      <Text style={styles.cardText}>
        Protecting nature while creating memorable adventures.
      </Text>

    </View>

    {/* Card 3 */}

    <View style={styles.principleCard}>

      <View style={styles.principleIcon}>
        <Ionicons
          name="people-outline"
          size={24}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.cardTitle}>
        Community
      </Text>

      <Text style={styles.cardText}>
        Bringing people together through shared experiences.
      </Text>

    </View>

    {/* Card 4 */}

    <View style={styles.principleCard}>

      <View style={styles.principleIcon}>
        <Ionicons
          name="diamond-outline"
          size={24}
          color="#0B5CAD"
        />
      </View>

      <Text style={styles.cardTitle}>
        Excellence
      </Text>

      <Text style={styles.cardText}>
        Premium quality in every trip we organize.
      </Text>

    </View>

  </View>

</View>
{/* ================= MEET OUR GUIDES ================= */}

<View style={styles.guidesSection}>

<Text style={styles.guidesSmallTitle}>
MEET OUR GUIDES
</Text>

<Text style={styles.guidesTitle}>
Meet Our Guides
</Text>

<Text style={styles.guidesDescription}>
Meet our experienced adventure guides who are passionate
about creating unforgettable outdoor experiences.
</Text>

{/* GUIDE 1 */}

<View style={styles.guideCard}>

<Image
source={require("./assets/guide1.jpg")}
style={styles.guideImage}
/>

<View style={styles.guideOverlay}>

<Text style={styles.guideCategory}>
LEAD ADVENTURE GUIDE
</Text>

<Text style={styles.guideName}>
Marcus{"\n"}Thorne
</Text>

</View>

</View>

{/* GUIDE 2 */}

<View style={styles.guideCard}>

<Image
source={require("./assets/guide2.jpg")}
style={styles.guideImage}
/>

<View style={styles.guideOverlay}>

<Text style={styles.guideCategory}>
MOUNTAIN TREK SPECIALIST
</Text>

<Text style={styles.guideName}>
Elena{"\n"}Vance
</Text>

</View>

</View>

{/* GUIDE 3 */}

<View style={styles.guideCard}>

<Image
source={require("./assets/guide3.jpg")}
style={styles.guideImage}
/>

<View style={styles.guideOverlay}>

<Text style={styles.guideCategory}>
CAMPING EXPERT
</Text>

<Text style={styles.guideName}>
Julian{"\n"}Beck
</Text>

</View>

</View>

{/* GUIDE 4 */}

<View style={styles.guideCard}>

<Image
source={require("./assets/guide4.jpg")}
style={styles.guideImage}
/>

<View style={styles.guideOverlay}>

<Text style={styles.guideCategory}>
COMMUNITY COORDINATOR
</Text>

<Text style={styles.guideName}>
Sofia{"\n"}Ricci
</Text>

</View>

</View>

</View>
{/* ================= READY TO BEGIN ================= */}

<ImageBackground
source={require("./assets/adventure-bg.jpg")}
style={styles.ctaSection}
imageStyle={styles.ctaImage}
>

<View style={styles.ctaOverlay}>

<Text style={styles.ctaSmall}>
START YOUR JOURNEY
</Text>

<Text style={styles.ctaHeading}>
Ready To Begin{"\n"}
Your Adventure?
</Text>

<Text style={styles.ctaDescription}>
Join the elite club of explorers who demand the
best from nature and create unforgettable
memories with every journey.
</Text>

<View style={styles.ctaButtons}>

<TouchableOpacity style={styles.ctaPrimary} onPress={() => navigation.navigate("BrowseTrips")}>

<Text style={styles.ctaPrimaryText}>
Explore Trips
</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.ctaSecondary} onPress={() => navigation.navigate("Contact")}>

<Text style={styles.ctaSecondaryText}>
Contact Us
</Text>

</TouchableOpacity>

</View>

</View>

</ImageBackground>

{/* Footer */}

{/* HomeScreen wala footer yahan paste kar dena */}

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

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  hero: {
    height: 720,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 22,
    paddingTop: 55,
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  /* ================= MOBILE MENU ================= */

  mobileMenu: {
    position: "absolute",
    top: 110,
    left: 22,
    right: 22,

    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,

    zIndex: 999,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  menuItem: {
    fontSize: 17,
    color: "#0B5CAD",
    fontWeight: "600",
    marginLeft: 14,
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B5CAD",
  },

  signupButton: {
    marginTop: 12,
    backgroundColor: "#0B5CAD",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  signupButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* ================= HERO CONTENT ================= */

  heroContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  smallTitle: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },

  heroTitle: {
    marginTop: 10,
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 50,
  },

  blueText: {
    color: "#1E88E5",
    fontStyle: "italic",
  },

  heroDescription: {
    marginTop: 22,
    fontSize: 16,
    lineHeight: 28,
    color: "#F1F5F9",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 32,
  },

  primaryButton: {
    backgroundColor: "#0B5CAD",
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  /* ================= STATS SECTION ================= */

statsSection:{

paddingHorizontal:20,

marginTop:45,

marginBottom:45,

},

statsRow:{

flexDirection:"row",

justifyContent:"space-between",

marginBottom:16,

},

statCard:{

width:"48%",

backgroundColor:"#FFFFFF",

borderRadius:22,

paddingVertical:22,

alignItems:"center",

shadowColor:"#000",

shadowOpacity:.08,

shadowRadius:10,

shadowOffset:{
width:0,
height:4,
},

elevation:6,

},

iconCircle:{

width:46,

height:46,

borderRadius:23,

backgroundColor:"#EEF5FF",

justifyContent:"center",

alignItems:"center",

marginBottom:12,

},

statNumber:{

fontSize:30,

fontWeight:"700",

color:"#14213D",

},

statLabel:{

marginTop:6,

fontSize:13,

fontWeight:"600",

color:"#94A3B8",

textTransform:"uppercase",

letterSpacing:1,

},
/* ================= OUR MISSION ================= */

missionSection: {
  paddingHorizontal: 20,
  paddingBottom: 45,
},

missionImage: {
  width: "100%",
  height: 270,
  borderRadius: 26,
  resizeMode: "cover",

  shadowColor: "#000",
  shadowOpacity: 0.18,
  shadowRadius: 14,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 10,
},

missionTitle: {
  marginTop: 28,
  fontSize: 34,
  fontWeight: "700",
  color: "#14213D",
  letterSpacing: 0.5,
},

missionDescription: {
  marginTop: 18,
  fontSize: 16,
  color: "#64748B",
  lineHeight: 30,
},

quoteBox: {
  marginTop: 28,

  flexDirection: "row",
  alignItems: "flex-start",

  backgroundColor: "#EEF6FF",

  borderLeftWidth: 5,
  borderLeftColor: "#0B5CAD",

  padding: 18,

  borderRadius: 16,
},

quoteText: {
  flex: 1,

  marginLeft: 12,

  color: "#0B5CAD",

  fontSize: 15,

  fontWeight: "700",

  lineHeight: 24,

  fontStyle: "italic",
},
/* ================= CORE PRINCIPLES ================= */

principlesSection: {
  paddingHorizontal: 20,
  paddingVertical: 45,
  backgroundColor: "#F8FAFC",
},

smallHeading: {
  fontSize: 13,
  color: "#0B5CAD",
  fontWeight: "700",
  letterSpacing: 2,
  textTransform: "uppercase",
},

principlesTitle: {
  fontSize: 34,
  fontWeight: "700",
  color: "#14213D",
  marginTop: 8,
},

blueText: {
  color: "#0B5CAD",
},

principlesDescription: {
  marginTop: 14,
  fontSize: 16,
  color: "#64748B",
  lineHeight: 28,
  marginBottom: 28,
},

/* Grid */

principlesGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

/* Card */

principleCard: {
  width: "48%",

  backgroundColor: "#FFFFFF",

  borderRadius: 20,

  paddingHorizontal: 16,
  paddingVertical: 22,

  marginBottom: 18,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },

  elevation: 6,
},

/* Icon */

principleIcon: {
  width: 52,
  height: 52,
  borderRadius: 26,

  backgroundColor: "#EEF5FF",

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 14,
},

/* Text */

cardTitle: {
  fontSize: 17,
  fontWeight: "700",
  color: "#14213D",
},

cardText: {
  marginTop: 8,
  fontSize: 13,
  color: "#64748B",
  lineHeight: 22,
},

/* ================= MEET OUR GUIDES ================= */

guidesSection:{
backgroundColor:"#EDF4FB",
paddingHorizontal:22,
paddingVertical:50,
},

guidesSmallTitle:{
fontSize:13,
fontWeight:"700",
letterSpacing:2,
color:"#6A7586",
textTransform:"uppercase",
},

guidesTitle:{
fontSize:34,
fontWeight:"700",
color:"#16233C",
marginTop:8,
},

guidesDescription:{
marginTop:12,
marginBottom:35,
fontSize:16,
lineHeight:28,
color:"#6A7586",
},

guideCard:{

height:360,

borderRadius:22,

overflow:"hidden",

marginBottom:25,

backgroundColor:"#FFFFFF",

shadowColor:"#000",

shadowOpacity:0.15,

shadowRadius:12,

shadowOffset:{
width:0,
height:6,
},

elevation:8,

},

guideImage:{

width:"100%",

height:"100%",

resizeMode:"cover",

},

guideOverlay:{

position:"absolute",

left:0,

right:0,

bottom:0,

padding:22,

backgroundColor:"rgba(0,0,0,.35)",

},

guideCategory:{

fontSize:11,

fontWeight:"700",

letterSpacing:1.5,

color:"#16A4FF",

textTransform:"uppercase",

marginBottom:10,

},

guideName:{

fontSize:30,

fontWeight:"700",

lineHeight:34,

color:"#FFFFFF",

},

/* ================= CTA ================= */

ctaSection:{

height:430,

marginHorizontal:20,

marginTop:50,

borderRadius:28,

overflow:"hidden",

justifyContent:"center",

},

ctaImage:{

borderRadius:28,

},

ctaOverlay:{

flex:1,

backgroundColor:"rgba(4,15,33,.55)",

justifyContent:"center",

alignItems:"center",

paddingHorizontal:25,

},

ctaSmall:{

fontSize:13,

fontWeight:"700",

letterSpacing:2,

color:"#D7E8FF",

marginBottom:12,

},

ctaHeading:{

fontSize:34,

fontWeight:"700",

color:"#FFFFFF",

textAlign:"center",

lineHeight:48,

},

ctaDescription:{

marginTop:18,

fontSize:16,

lineHeight:28,

color:"#E2E8F0",

textAlign:"center",

},

ctaButtons:{

flexDirection:"row",

marginTop:35,

},

ctaPrimary:{

backgroundColor:"#0B5CAD",

height:52,

paddingHorizontal:28,

borderRadius:30,

justifyContent:"center",

alignItems:"center",

marginRight:14,

},

ctaPrimaryText:{

color:"#FFFFFF",

fontWeight:"700",

fontSize:15,

},

ctaSecondary:{

borderWidth:1.5,

borderColor:"#FFFFFF",

height:52,

paddingHorizontal:28,

borderRadius:30,

justifyContent:"center",

alignItems:"center",

},

ctaSecondaryText:{

color:"#FFFFFF",

fontWeight:"700",

fontSize:15,

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