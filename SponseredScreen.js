import React from "react";

import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";

const { height } = Dimensions.get("window");

export default function PartnerScreen() {

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

        {/* ================= HERO ================= */}

        <ImageBackground
          source={require("./assets/partnerhero.jpg")}
          style={styles.hero}
          resizeMode="cover"
        >

          <View style={styles.overlay}>

            <Header />

            <View style={styles.heroContent}>

              <View style={styles.partnerBadge}>

                <Text style={styles.partnerBadgeText}>
                  OFFICIAL ADVENTURE PARTNER
                </Text>

              </View>

              <Text style={styles.heroTitle}>
                Our Trusted Adventure
              </Text>

              <Text style={styles.heroTitle}>
                Partner
              </Text>

              <Text style={styles.heroDescription}>
                Working together to create safe,
                memorable and premium outdoor
                experiences for our global
                community of elite explorers.
              </Text>

              <View style={styles.heroButtons}>

                <TouchableOpacity
                  style={styles.primaryButton}
                >

                  <Text style={styles.primaryButtonText}>
                    Visit Website
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                >

                  <Text style={styles.secondaryButtonText}>
                    Contact Partner
                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </View>

        </ImageBackground>

       {/* ================= PARTNER PROFILE ================= */}

<View style={styles.partnerSection}>

  {/* Image */}

  <Image
    source={require("./assets/partnerProfile.jpg")}
    style={styles.partnerImage}
    resizeMode="cover"
  />

  {/* Content */}

  <View style={styles.partnerContent}>

    <Text style={styles.partnerLabel}>
      Partner Profile
    </Text>

    <Text style={styles.partnerName}>
      Mountain Gear
    </Text>

    <Text style={styles.partnerName}>
      Pakistan
    </Text>

    {/* Details */}

    <View style={styles.partnerDetails}>

      <View>

        <Text style={styles.detailHeading}>
          INDUSTRY
        </Text>

        <Text style={styles.detailValue}>
          Outdoor Equipment
        </Text>

      </View>

      <View>

        <Text style={styles.detailHeading}>
          LOCATION
        </Text>

        <Text style={styles.detailValue}>
          Islamabad, Pakistan
        </Text>

      </View>

    </View>

    <Text style={styles.partnerDescription}>

      Mountain Gear Pakistan is a premier adventure
      equipment company dedicated to supporting
      outdoor and sustainable travel experiences.

      {"\n\n"}

      By providing state-of-the-art gear and expert
      logistics, they ensure every trek into the
      Karakoram is backed by safety, reliability
      and world-class equipment.

    </Text>

  </View>

</View>
{/* ================= VISION SHARED ================= */}

<View style={styles.visionSection}>

  <Text style={styles.visionTitle}>
    A Vision Shared
  </Text>

  <Text style={styles.visionSubtitle}>
    Our collaboration is built on four core pillars
    that define the standard of high-altitude exploration.
  </Text>

  <View style={styles.visionGrid}>

    {/* Card 1 */}

    <View style={styles.visionCard}>

      <Ionicons
        name="leaf-outline"
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.visionCardTitle}>
        Support Eco Tourism
      </Text>

      <Text style={styles.visionCardDesc}>
        Promoting sustainable practices to preserve
        our fragile mountain ecosystem.
      </Text>

    </View>

    {/* Card 2 */}

    <View style={styles.visionCard}>

      <Ionicons
        name="shield-checkmark-outline"
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.visionCardTitle}>
        Adventure Safety
      </Text>

      <Text style={styles.visionCardDesc}>
        Ensuring peak performance and protection
        in the world's most extreme environments.
      </Text>

    </View>

    {/* Card 3 */}

    <View style={styles.visionCard}>

      <Ionicons
        name="diamond-outline"
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.visionCardTitle}>
        Premium Equipment
      </Text>

      <Text style={styles.visionCardDesc}>
        Providing club members with exclusive
        access to high-end mountaineering gear.
      </Text>

    </View>

    {/* Card 4 */}

    <View style={styles.visionCard}>

      <Ionicons
        name="people-outline"
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.visionCardTitle}>
        Community Development
      </Text>

      <Text style={styles.visionCardDesc}>
        Investing in local guides and
        infrastructure for long-term regional prosperity.
      </Text>

    </View>

  </View>

</View>
{/* ================= SPONSORED EXPEDITIONS ================= */}

<View style={styles.tripSection}>

  <View style={styles.tripHeader}>

    <View>

      <Text style={styles.tripTitle}>
        Sponsored Expeditions
      </Text>

      <Text style={styles.tripSubTitle}>
        Discover journeys made possible through our strategic partnership.
      </Text>

    </View>

    <TouchableOpacity>

      <Text style={styles.viewAll}>
        View All Trips
      </Text>

    </TouchableOpacity>

  </View>

  <View style={styles.tripContainer}>

    {/* Card 1 */}

    <TouchableOpacity style={styles.tripCard}>

      <ImageBackground
        source={require("./assets/hunza.jpg")}
        style={styles.tripImage}
        imageStyle={styles.tripImageRadius}
      >

        <View style={styles.tripOverlay}>

          <View style={styles.tripBadge}>
            <Text style={styles.tripBadgeText}>
              Most Popular
            </Text>
          </View>

          <Text style={styles.tripName}>
            Hunza Valley
          </Text>

          <Text style={styles.tripDesc}>
            Experience breathtaking beauty of Hunza's mountains and valleys.
          </Text>

          <View style={styles.tripBottom}>

            <Text style={styles.tripPrice}>
              Starting from{"\n"}30000 Rs
            </Text>

            <Text style={styles.tripDays}>
              3 Days
            </Text>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

    {/* Card 2 */}

    <TouchableOpacity style={styles.tripCard}>

      <ImageBackground
        source={require("./assets/fairy.jpg")}
        style={styles.tripImage}
        imageStyle={styles.tripImageRadius}
      >

        <View style={styles.tripOverlay}>

          <View style={styles.tripBadge}>
            <Text style={styles.tripBadgeText}>
              Most Liked
            </Text>
          </View>

          <Text style={styles.tripName}>
            Fairy Meadows Trek
          </Text>

          <Text style={styles.tripDesc}>
            Journey through scenic trails leading to one of Pakistan's most iconic landscapes.
          </Text>

          <View style={styles.tripBottom}>

            <Text style={styles.tripPrice}>
              Starting from{"\n"}40000 Rs
            </Text>

            <Text style={styles.tripDays}>
              7 Days
            </Text>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

    {/* Card 3 */}

    <TouchableOpacity style={styles.tripCard}>

      <ImageBackground
        source={require("./assets/skardu.jpg")}
        style={styles.tripImage}
        imageStyle={styles.tripImageRadius}
      >

        <View style={styles.tripOverlay}>

          <View style={styles.tripBadge}>
            <Text style={styles.tripBadgeText}>
              Most Visited
            </Text>
          </View>

          <Text style={styles.tripName}>
            Skardu Adventure
          </Text>

          <Text style={styles.tripDesc}>
            Explore majestic lakes, valleys and unforgettable mountain views.
          </Text>

          <View style={styles.tripBottom}>

            <Text style={styles.tripPrice}>
              Starting from{"\n"}70000 Rs
            </Text>

            <Text style={styles.tripDays}>
              14 Days
            </Text>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

     </View>

</View>
{/* ================= PARTNERSHIP BENEFITS ================= */}

<View style={styles.benefitSection}>

  <Text style={styles.benefitTitle}>
    Partnership Benefits
  </Text>

  <Text style={styles.benefitSubtitle}>
    Together we create unforgettable experiences
    while supporting sustainable tourism.
  </Text>

  <View style={styles.benefitGrid}>

    <View style={styles.benefitCard}>
      <Ionicons name="earth-outline" size={26} color="#2F6DE0" />
      <Text style={styles.benefitCardTitle}>Eco Tourism</Text>
      <Text style={styles.benefitCardText}>
        Protecting nature through responsible travel.
      </Text>
    </View>

    <View style={styles.benefitCard}>
      <Ionicons name="shield-checkmark-outline" size={26} color="#2F6DE0" />
      <Text style={styles.benefitCardTitle}>Safe Adventures</Text>
      <Text style={styles.benefitCardText}>
        Certified guides and professional safety standards.
      </Text>
    </View>

    <View style={styles.benefitCard}>
      <Ionicons name="people-outline" size={26} color="#2F6DE0" />
      <Text style={styles.benefitCardTitle}>Local Communities</Text>
      <Text style={styles.benefitCardText}>
        Empowering local businesses and mountain guides.
      </Text>
    </View>

    <View style={styles.benefitCard}>
      <Ionicons name="star-outline" size={26} color="#2F6DE0" />
      <Text style={styles.benefitCardTitle}>Premium Quality</Text>
      <Text style={styles.benefitCardText}>
        Luxury adventure experiences with trusted partners.
      </Text>
    </View>

    <View style={styles.benefitCard}>
      <Ionicons name="leaf-outline" size={26} color="#2F6DE0" />
      <Text style={styles.benefitCardTitle}>Sustainability</Text>
      <Text style={styles.benefitCardText}>
        Every expedition supports environmental conservation.
      </Text>
    </View>

    <View style={styles.benefitCard}>
      <Ionicons name="flag-outline" size={26} color="#2F6DE0" />
      <Text style={styles.benefitCardTitle}>Trusted Network</Text>
      <Text style={styles.benefitCardText}>
        Collaborating with the best outdoor brands.
      </Text>
    </View>

  </View>

</View>
{/* ================= CTA BANNER ================= */}

<ImageBackground
  source={require("./assets/partnerBanner.jpg")}
  style={styles.ctaBanner}
  imageStyle={styles.ctaBannerImage}
>

  <View style={styles.ctaOverlay}>

    <Text style={styles.ctaSmall}>
      BECOME AN OFFICIAL
    </Text>

    <Text style={styles.ctaHeading}>
      ADVENTURE
      <Text style={styles.ctaWhite}> PARTNER</Text>
    </Text>

    <Text style={styles.ctaText}>
      Join our network of trusted adventure brands and
      inspire unforgettable travel experiences for the
      world's most discerning explorers.
    </Text>

    <View style={styles.ctaButtons}>

      <TouchableOpacity style={styles.partnerBtn}>

        <Text style={styles.partnerBtnText}>
          Partner With Us
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.contactBtn}>

        <Text style={styles.contactBtnText}>
          Contact Team
        </Text>

      </TouchableOpacity>

    </View>

  </View>

</ImageBackground>
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

  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  hero:{
    width:"100%",
    height:height*0.75,
  },

  overlay:{
    flex:1,
    backgroundColor:"rgba(8,20,40,.45)",
    paddingHorizontal:20,
  },

  heroContent:{
    flex:1,
    justifyContent:"center",
    paddingBottom:30,
  },

  partnerBadge:{
    alignSelf:"flex-start",

    paddingHorizontal:14,
    paddingVertical:6,

    borderRadius:30,

    backgroundColor:"rgba(255,255,255,.18)",

    borderWidth:1,
    borderColor:"rgba(255,255,255,.25)",

    marginBottom:14,
  },

  partnerBadgeText:{
    color:"#FFFFFF",
    fontSize:9,
    fontWeight:"700",
    letterSpacing:1.5,
  },

  heroTitle:{
    fontSize:38,
    fontWeight:"700",
    color:"#FFFFFF",
    lineHeight:44,
  },

  heroDescription:{
    marginTop:14,

    width:"82%",

    color:"#E5E7EB",

    fontSize:14,

    lineHeight:22,
  },

  heroButtons:{
    flexDirection:"row",
    marginTop:26,
  },

  primaryButton:{
    width:130,
    height:42,

    borderRadius:25,

    backgroundColor:"#2F6DE0",

    justifyContent:"center",
    alignItems:"center",

    marginRight:12,
  },

  primaryButtonText:{
    color:"#FFFFFF",
    fontWeight:"700",
    fontSize:12,
  },

  secondaryButton:{
    width:140,
    height:42,

    borderRadius:25,

    borderWidth:1.5,
    borderColor:"#FFFFFF",

    justifyContent:"center",
    alignItems:"center",
  },

  secondaryButtonText:{
    color:"#FFFFFF",
    fontWeight:"700",
    fontSize:12,
  },
  /* ================= PARTNER PROFILE ================= */

partnerSection:{
  paddingHorizontal:20,
  paddingVertical:35,
},

partnerImage:{
  width:"100%",
  height:220,
  borderRadius:20,
},

partnerContent:{
  marginTop:24,
},

partnerLabel:{
  color:"#2F6DE0",
  fontSize:12,
  fontWeight:"700",
  letterSpacing:1,
  marginBottom:8,
},

partnerName:{
  fontSize:34,
  fontWeight:"700",
  color:"#16233C",
  lineHeight:40,
},

partnerDetails:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:22,
  marginBottom:22,
},

detailHeading:{
  fontSize:11,
  color:"#94A3B8",
  fontWeight:"700",
  marginBottom:6,
},

detailValue:{
  fontSize:13,
  color:"#2F6DE0",
  fontWeight:"700",
},

partnerDescription:{
  fontSize:15,
  lineHeight:27,
  color:"#64748B",
},
/* ================= VISION SHARED ================= */

visionSection:{
  paddingHorizontal:20,
  paddingVertical:40,
  backgroundColor:"#FFFFFF",
},

visionTitle:{
  textAlign:"center",
  fontSize:34,
  fontWeight:"700",
  color:"#16233C",
},

visionSubtitle:{
  textAlign:"center",
  marginTop:10,
  marginBottom:30,
  color:"#64748B",
  fontSize:14,
  lineHeight:24,
},

visionGrid:{
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between",
},

visionCard:{
  width:"48%",
  backgroundColor:"#171311",
  borderRadius:18,
  padding:18,
  marginBottom:16,
  minHeight:200,
},

visionCardTitle:{
  color:"#FFFFFF",
  fontSize:15,
  fontWeight:"700",
  marginTop:16,
  marginBottom:10,
},

visionCardDesc:{
  color:"#D1D5DB",
  fontSize:12,
  lineHeight:20,
},
/* ================= SPONSORED EXPEDITIONS ================= */

tripSection:{
  paddingHorizontal:20,
  paddingVertical:40,
},

tripHeader:{
  marginBottom:25,
},

tripTitle:{
  fontSize:32,
  fontWeight:"700",
  color:"#2F6DE0",
},

tripSubTitle:{
  marginTop:8,
  fontSize:14,
  color:"#64748B",
  lineHeight:22,
},

viewAll:{
  marginTop:14,
  color:"#C89B3C",
  fontWeight:"700",
},

tripContainer:{
  marginTop:25,
},

tripCard:{
  width:"100%",
  height:280,
  marginBottom:22,
},

tripImage:{
  flex:1,
  justifyContent:"flex-end",
},

tripImageRadius:{
  borderRadius:22,
},

tripOverlay:{
  flex:1,
  justifyContent:"flex-end",

  padding:18,

  backgroundColor:"rgba(0,0,0,.28)",

  borderRadius:22,
},

tripBadge:{
  position:"absolute",
  top:16,
  left:16,

  backgroundColor:"#2F6DE0",

  paddingHorizontal:12,
  paddingVertical:5,

  borderRadius:20,
},

tripBadgeText:{
  color:"#FFFFFF",
  fontSize:10,
  fontWeight:"700",
},

tripName:{
  color:"#FFFFFF",
  fontSize:24,
  fontWeight:"700",
},

tripDesc:{
  color:"#FFFFFF",
  fontSize:13,
  lineHeight:20,
  marginTop:8,
},

tripBottom:{
  marginTop:18,

  flexDirection:"row",

  justifyContent:"space-between",

  alignItems:"center",
},

tripPrice:{
  color:"#4F83FF",
  fontSize:14,
  fontWeight:"700",
},

tripDays:{
  color:"#FFFFFF",
  fontSize:13,
  fontWeight:"700",
},
/* ================= BENEFITS ================= */

benefitSection:{
  paddingHorizontal:20,
  paddingVertical:40,
  backgroundColor:"#F8FAFC",
},

benefitTitle:{
  fontSize:34,
  fontWeight:"700",
  color:"#16233C",
  textAlign:"center",
},

benefitSubtitle:{
  marginTop:10,
  marginBottom:30,
  textAlign:"center",
  color:"#64748B",
  fontSize:14,
  lineHeight:22,
},

benefitGrid:{
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between",
},

benefitCard:{
  width:"48%",
  backgroundColor:"#FFFFFF",
  borderRadius:18,
  padding:18,
  marginBottom:16,

  shadowColor:"#000",
  shadowOpacity:0.06,
  shadowRadius:8,
  shadowOffset:{
    width:0,
    height:4,
  },

  elevation:3,
},

benefitCardTitle:{
  marginTop:14,
  fontSize:15,
  fontWeight:"700",
  color:"#16233C",
},

benefitCardText:{
  marginTop:8,
  color:"#64748B",
  fontSize:12,
  lineHeight:20,
},
/* ================= CTA BANNER ================= */

ctaBanner:{
  width:"100%",
  height:380,

  marginTop:40,

  justifyContent:"center",
},

ctaBannerImage:{
  borderRadius:20,
},

ctaOverlay:{
  flex:1,

  backgroundColor:"rgba(0,0,0,.35)",

  borderRadius:20,

  justifyContent:"center",
  alignItems:"center",

  paddingHorizontal:28,
},

ctaSmall:{
  color:"#FFFFFF",

  fontSize:13,

  fontWeight:"700",

  letterSpacing:2,
},

ctaHeading:{
  marginTop:8,

  fontSize:40,

  fontWeight:"700",

  color:"#2F6DE0",

  textAlign:"center",
},

ctaWhite:{
  color:"#FFFFFF",
},

ctaText:{
  marginTop:15,

  color:"#FFFFFF",

  textAlign:"center",

  lineHeight:22,

  fontSize:13,

  width:"90%",
},

ctaButtons:{
  flexDirection:"row",

  marginTop:28,
},

partnerBtn:{
  width:150,
  height:46,

  borderWidth:1.5,
  borderColor:"#FFFFFF",

  borderRadius:30,

  justifyContent:"center",
  alignItems:"center",

  marginRight:12,
},

partnerBtnText:{
  color:"#FFFFFF",

  fontWeight:"700",

  fontSize:13,
},

contactBtn:{
  width:150,
  height:46,

  backgroundColor:"#2F6DE0",

  borderRadius:30,

  justifyContent:"center",
  alignItems:"center",
},

contactBtnText:{
  color:"#FFFFFF",

  fontWeight:"700",

  fontSize:13,
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
