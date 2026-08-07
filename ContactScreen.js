import React from "react";
import { TextInput } from "react-native";

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
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";

const { width, height } = Dimensions.get("window");

export default function ContactScreen() {
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
          source={require("./assets/contactHero.jpg")}
          style={styles.hero}
          resizeMode="cover"
        >

          <View style={styles.overlay}>

            {/* Header */}

            <Header />

            {/* Hero Content */}

            <View style={styles.heroContent}>

              <Text style={styles.heroSmallTitle}>
                Contact us
              </Text>

              <Text style={styles.heroTitle}>
                GET IN TOUCH
              </Text>

              <Text style={styles.heroTitleBlue}>
                WITH OUR TEAM
              </Text>

            </View>

          </View>

        </ImageBackground>

        {/* ================= INTRO SECTION ================= */}

<View style={styles.introSection}>

  <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>

    <Text style={styles.backButtonText}>
      ← Back to Home
    </Text>

  </TouchableOpacity>

  <View style={styles.planBadge}>

    <Text style={styles.planBadgeText}>
      LET'S PLAN TOGETHER
    </Text>

  </View>

  <Text style={styles.planTitle}>
    PLAN YOUR NEXT
  </Text>

  <Text style={styles.planTitleBlue}>
    ADVENTURE
  </Text>

  <Text style={styles.planDescription}>
    Connect with our team of elite exploration specialists.
    Whether it's a private charter or a rugged mountain trek,
    let us help you discover unforgettable adventures tailored
    to your ambition.
  </Text>

</View>

{/* ================= CONTACT FORM ================= */}

<View style={styles.formSection}>

  <Text style={styles.formHeading}>
    Tell Us About Your Adventure
  </Text>

  {/* First Name */}

  <Text style={styles.label}>First Name</Text>

  <TextInput
    placeholder="John"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Last Name */}

  <Text style={styles.label}>Last Name</Text>

  <TextInput
    placeholder="Doe"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Email */}

  <Text style={styles.label}>Email Address</Text>

  <TextInput
    placeholder="john@email.com"
    keyboardType="email-address"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Phone */}

  <Text style={styles.label}>Phone Number</Text>

  <TextInput
    placeholder="+92 300 1234567"
    keyboardType="phone-pad"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Destination */}

  <Text style={styles.label}>Preferred Destination</Text>

  <TextInput
    placeholder="Northern Pakistan"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Travel Date */}

  <Text style={styles.label}>Travel Date</Text>

  <TextInput
    placeholder="DD/MM/YYYY"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Travellers */}

  <Text style={styles.label}>Travellers</Text>

  <TextInput
    placeholder="2 Persons"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Adventure */}

  <Text style={styles.label}>Adventure Type</Text>

  <TextInput
    placeholder="Hiking"
    placeholderTextColor="#94A3B8"
    style={styles.input}
  />

  {/* Message */}

  <Text style={styles.label}>
    Tell us about your adventure
  </Text>

  <TextInput
    multiline
    numberOfLines={5}
    textAlignVertical="top"
    placeholder="Share your dream adventure..."
    placeholderTextColor="#94A3B8"
    style={styles.messageInput}
  />

  <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("Home")}>

    <Text style={styles.submitButtonText}>
      SEND ADVENTURE REQUEST
    </Text>

  </TouchableOpacity>

</View>
{/* ================= CONTACT INFO ================= */}

<View style={styles.infoCard}>

  <Text style={styles.infoHeading}>
    Speak To Our Team
  </Text>

  {/* Phone */}

  <View style={styles.infoRow}>

    <View style={styles.iconBox}>
      <Ionicons
        name="call-outline"
        size={20}
        color="#2F6DE0"
      />
    </View>

    <View>

      <Text style={styles.infoLabel}>
        CALL US
      </Text>

      <Text style={styles.infoValue}>
        +92 312 5556789
      </Text>

      <Text style={styles.infoSmall}>
        Mon–Fri 9am–6pm PKT
      </Text>

    </View>

  </View>

  {/* Email */}

  <View style={styles.infoRow}>

    <View style={styles.iconBox}>
      <Ionicons
        name="mail-outline"
        size={20}
        color="#2F6DE0"
      />
    </View>

    <View>

      <Text style={styles.infoLabel}>
        EMAIL US
      </Text>

      <Text style={styles.infoValue}>
        hello@acesadventure.com
      </Text>

      <Text style={styles.infoSmall}>
        Inquiry & Support
      </Text>

    </View>

  </View>

  {/* Location */}

  <View style={styles.infoRow}>

    <View style={styles.iconBox}>
      <Ionicons
        name="location-outline"
        size={20}
        color="#2F6DE0"
      />
    </View>

    <View>

      <Text style={styles.infoLabel}>
        LOCATION
      </Text>

      <Text style={styles.infoValue}>
        Attock, Punjab, Pakistan
      </Text>

      <Text style={styles.infoSmall}>
        The Gateway to the North
      </Text>

    </View>

  </View>

</View>

{/* ================= GOLD STANDARD ================= */}

<View style={styles.goldCard}>

  <Text style={styles.goldHeading}>
    The Gold Standard
  </Text>

  <View style={styles.pointRow}>
    <Ionicons name="checkmark-circle" size={18} color="#2F6DE0"/>
    <Text style={styles.pointText}>
      Carefully Curated Adventures
    </Text>
  </View>

  <View style={styles.pointRow}>
    <Ionicons name="checkmark-circle" size={18} color="#2F6DE0"/>
    <Text style={styles.pointText}>
      Safe & Expert Guided Experiences
    </Text>
  </View>

  <View style={styles.pointRow}>
    <Ionicons name="checkmark-circle" size={18} color="#2F6DE0"/>
    <Text style={styles.pointText}>
      Luxury Off-grid Accommodation
    </Text>
  </View>

  <View style={styles.pointRow}>
    <Ionicons name="checkmark-circle" size={18} color="#2F6DE0"/>
    <Text style={styles.pointText}>
      24/7 Concierge for Expeditions
    </Text>
  </View>

  <View style={styles.pointRow}>
    <Ionicons name="checkmark-circle" size={18} color="#2F6DE0"/>
    <Text style={styles.pointText}>
      Sustainability & Minimal Impact
    </Text>
  </View>

</View>

{/* ================= IMAGE ================= */}

<Image
  source={require("./assets/contactCard.jpg")}
  style={styles.bottomImage}
/>
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
    height:height*0.42,
  },

  overlay:{
    flex:1,
    backgroundColor:"rgba(10,20,40,.28)",
    paddingHorizontal:20,
  },

  heroContent:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingBottom:35,
  },

  heroSmallTitle:{
    color:"#FFFFFF",
    fontSize:18,
    fontWeight:"600",
    marginBottom:8,
  },

  heroTitle:{
    fontSize:34,
    fontWeight:"700",
    color:"#2F6DE0",
    textAlign:"center",
  },

  heroTitleBlue:{
    fontSize:34,
    fontWeight:"700",
    color:"#2F6DE0",
    textAlign:"center",
    marginTop:-4,
  },
  /* ================= INTRO SECTION ================= */

introSection:{
  paddingHorizontal:20,
  paddingTop:28,
  paddingBottom:24,
  backgroundColor:"#F8FAFC",
},

backButton:{
  alignSelf:"flex-start",
  marginBottom:22,
},

backButtonText:{
  fontSize:13,
  color:"#16233C",
  fontWeight:"600",
},

planBadge:{
  alignSelf:"flex-start",

  borderWidth:1,
  borderColor:"#2F6DE0",

  borderRadius:30,

  paddingHorizontal:14,
  paddingVertical:6,

  marginBottom:16,
},

planBadgeText:{
  fontSize:10,
  color:"#2F6DE0",
  fontWeight:"700",
  letterSpacing:1,
},

planTitle:{
  fontSize:38,
  fontWeight:"700",
  color:"#16233C",
  lineHeight:44,
},

planTitleBlue:{
  fontSize:38,
  fontWeight:"700",
  color:"#2F6DE0",
  lineHeight:44,
  marginBottom:18,
},

planDescription:{
  fontSize:15,
  color:"#64748B",
  lineHeight:24,
},
/* ================= CONTACT FORM ================= */

formSection:{
  marginHorizontal:20,
  marginBottom:30,

  backgroundColor:"#FFFFFF",

  borderRadius:22,

  padding:20,

  elevation:4,

  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:4,
  },
},

formHeading:{
  fontSize:24,
  fontWeight:"700",
  color:"#16233C",
  marginBottom:22,
},

label:{
  fontSize:13,
  fontWeight:"600",
  color:"#16233C",
  marginBottom:8,
  marginTop:14,
},

input:{
  height:52,

  backgroundColor:"#F8FAFC",

  borderWidth:1,
  borderColor:"#E2E8F0",

  borderRadius:12,

  paddingHorizontal:16,

  fontSize:15,
},

messageInput:{
  height:130,

  backgroundColor:"#F8FAFC",

  borderWidth:1,
  borderColor:"#E2E8F0",

  borderRadius:12,

  paddingHorizontal:16,
  paddingTop:16,

  fontSize:15,
},

submitButton:{
  marginTop:28,

  height:56,

  backgroundColor:"#2F6DE0",

  borderRadius:30,

  justifyContent:"center",
  alignItems:"center",
},

submitButtonText:{
  color:"#FFFFFF",
  fontSize:15,
  fontWeight:"700",
  letterSpacing:1,
},
/* ================= INFO CARD ================= */

infoCard:{
  marginHorizontal:20,
  marginBottom:20,

  backgroundColor:"#FFFFFF",

  borderRadius:22,

  padding:20,

  elevation:4,

  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:4,
  },
},

infoHeading:{
  fontSize:22,
  fontWeight:"700",
  color:"#16233C",
  marginBottom:22,
},

infoRow:{
  flexDirection:"row",
  marginBottom:20,
},

iconBox:{
  width:42,
  height:42,

  borderRadius:21,

  backgroundColor:"#EEF4FF",

  justifyContent:"center",
  alignItems:"center",

  marginRight:14,
},

infoLabel:{
  fontSize:11,
  fontWeight:"700",
  color:"#64748B",
},

infoValue:{
  fontSize:16,
  fontWeight:"700",
  color:"#2F6DE0",
  marginTop:4,
},

infoSmall:{
  fontSize:12,
  color:"#94A3B8",
  marginTop:2,
},

/* ================= GOLD CARD ================= */

goldCard:{
  marginHorizontal:20,
  marginBottom:20,

  backgroundColor:"#FFFFFF",

  borderRadius:22,

  padding:20,

  elevation:4,

  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:4,
  },
},

goldHeading:{
  fontSize:22,
  fontWeight:"700",
  color:"#16233C",
  marginBottom:20,
},

pointRow:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:16,
},

pointText:{
  marginLeft:10,
  flex:1,
  color:"#475569",
  fontSize:14,
},

/* ================= IMAGE ================= */

bottomImage:{
  marginHorizontal:20,
  marginBottom:35,

  width:"90%",
  alignSelf:"center",

  height:220,

  borderRadius:22,
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