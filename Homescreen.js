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
  Dimensions,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
    const [menuVisible, setMenuVisible] = useState(false);

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

        {
menuVisible && (

<View style={styles.mobileMenu}>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="home-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="information-circle-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>About</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="compass-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Browse Trips</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="images-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Gallery</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="map-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Map</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="people-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Sponsors</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name="call-outline" size={22} color="#0B5CAD" />
    <Text style={styles.menuItem}>Contact</Text>
  </TouchableOpacity>



<TouchableOpacity style={styles.loginButton}>
<Text style={styles.loginButtonText}>
Login
</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.signupButton}>
<Text style={styles.signupButtonText}>
Sign Up
</Text>
</TouchableOpacity>

</View>

)
}

        {/* ================= HERO SECTION ================= */}

        <ImageBackground

          source={require("./assets/hero.jpg")}

          style={styles.hero}

          resizeMode="cover"

        >

          {/* Dark Overlay */}

          <View style={styles.overlay}>

            {/* ================= HEADER ================= */}

            <View style={styles.header}>

              <Image
                source={require("./assets/logo.png")}
                style={styles.logo}
              />

              <TouchableOpacity
    onPress={() => setMenuVisible(!menuVisible)}
>

    <Ionicons
        name={menuVisible ? "close" : "menu"}
        size={34}
        color="#FFFFFF"
    />

</TouchableOpacity>

            </View>

            {/* ================= HERO CONTENT ================= */}

            <View style={styles.content}>

              {/* Badge */}

              <View style={styles.badge}>

                <Text style={styles.badgeText}>

                  🏔 Premium Adventure Club

                </Text>

              </View>

              {/* Heading */}

              <Text style={styles.headingWhite}>

                EXPLORE{"\n"}

                THE WILD

              </Text>

              <Text style={styles.headingBlue}>

                CREATE{"\n"}

                MEMORIES

              </Text>

              {/* Paragraph */}

              <Text style={styles.paragraph}>

                Discover breathtaking mountains,
                hidden valleys and unforgettable
                adventures with Pakistan's premium
                adventure community.

              </Text>

              {/* Buttons */}

              <View style={styles.buttonRow}>

                <TouchableOpacity style={styles.primaryButton}>

                  <Text style={styles.primaryText}>

                    Explore Trips

                  </Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>

                  <Text style={styles.secondaryText}>

                    View Gallery

                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </View>

        </ImageBackground>
        {/* ================= ABOUT SECTION ================= */}

<View style={styles.aboutSection}>

  <Text style={styles.aboutSmallTitle}>
    Who We Are
  </Text>

  <Text style={styles.aboutTitle}>
    More Than a Destination{"\n"}
    We Create <Text style={styles.blueText}>Experiences.</Text>
  </Text>

  <Text style={styles.aboutParagraph}>
    At Aces Adventure Club, we believe adventure is not just
    about reaching a destination. It's about discovering new
    places, embracing challenges and creating unforgettable
    memories.
  </Text>

  <Text style={styles.aboutParagraph}>
    We bring together explorers, nature lovers and adventure
    seekers through carefully curated hiking, camping and
    trekking experiences.
  </Text>

  {/* Feature 1 */}

  <View style={styles.featureRow}>

    <View style={styles.featureIcon}>
      <Text style={styles.iconText}>✓</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.featureTitle}>
        Expertly Curated Adventures
      </Text>

      <Text style={styles.featureDescription}>
        Every trip is thoughtfully designed for premium outdoor experiences.
      </Text>
    </View>

  </View>

  {/* Feature 2 */}

  <View style={styles.featureRow}>

    <View style={styles.featureIcon}>
      <Text style={styles.iconText}>✓</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.featureTitle}>
        Breathtaking Destinations
      </Text>

      <Text style={styles.featureDescription}>
        Explore Pakistan's most beautiful valleys, lakes and mountains.
      </Text>
    </View>

  </View>

  {/* Feature 3 */}

  <View style={styles.featureRow}>

    <View style={styles.featureIcon}>
      <Text style={styles.iconText}>✓</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.featureTitle}>
        Community of Explorers
      </Text>

      <Text style={styles.featureDescription}>
        Connect with passionate travellers from around the country.
      </Text>
    </View>

  </View>

  <TouchableOpacity style={styles.learnButton}>
    <Text style={styles.learnButtonText}>
      Learn More
    </Text>
  </TouchableOpacity>

  {/* Images */}

  <View style={styles.imageSection}>

    <Image
      source={require("./assets/about-big.jpg")}
      style={styles.bigImage}
    />

    <View style={styles.smallImagesRow}>

      <Image
        source={require("./assets/about-small1.jpg")}
        style={styles.smallImage}
      />

      <Image
        source={require("./assets/about-small2.jpg")}
        style={styles.smallImage}
      />

    </View>

  </View>

</View>
{/* ================= CHOOSE YOUR ADVENTURE ================= */}

<View style={styles.adventureSection}>

  <Text style={styles.sectionSmallTitle}>
    EXPLORE EXPERIENCES
  </Text>

  <Text style={styles.sectionTitle}>
    CHOOSE YOUR{" "}
    <Text style={styles.blueItalic}>ADVENTURE</Text>
  </Text>

  <Text style={styles.sectionDescription}>
    Explore handpicked experiences designed for every type of
    adventurer, from mountain expeditions to peaceful nature
    escapes.
  </Text>

{/* Adventure Cards */}

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.cardsContainer}
>

  {/* Card 1 */}

  <TouchableOpacity style={styles.adventureCard}>
    <Image
      source={require("./assets/hiking.jpg")}
      style={styles.cardImage}
    />
      <View style={styles.cardIcon}>
    <Text style={styles.cardIconText}>🥾</Text>
    </View>
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>Hiking</Text>

      <Text style={styles.cardDescription}>
        Explore Scenic Mountain Paths{"\n"}
        And Breathtaking Landscapes.
      </Text>
    </View>
  </TouchableOpacity>

  {/* Card 2 */}

  <TouchableOpacity style={styles.adventureCard}>
    <Image
      source={require("./assets/camping.jpg")}
      style={styles.cardImage}
    />
      <View style={styles.cardIcon}>
    <Text style={styles.cardIconText}>⛺</Text>
    </View>
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>Camping</Text>

      <Text style={styles.cardDescription}>
        Experience Peaceful Nights{"\n"}
        Under The Stars.
      </Text>
    </View>
  </TouchableOpacity>

  {/* Card 3 */}

  <TouchableOpacity style={styles.adventureCard}>
    <Image
      source={require("./assets/trekking.jpg")}
      style={styles.cardImage}
    />
       <View style={styles.cardIcon}>
    <Text style={styles.cardIconText}>🥾</Text>
    </View>
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>Trekking</Text>

      <Text style={styles.cardDescription}>
        Discover Breathtaking{"\n"}
        Mountain Journeys.
      </Text>
    </View>
  </TouchableOpacity>

  {/* Card 4 */}

  <TouchableOpacity style={styles.adventureCard}>
    <Image
      source={require("./assets/nature.jpg")}
      style={styles.cardImage}
    />
    <View style={styles.cardIcon}>
    <Text style={styles.cardIconText}>🌲</Text>
</View>

    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>Nature Trails</Text>

      <Text style={styles.cardDescription}>
        Explore Scenic Paths{"\n"}
        Reconnect With Nature.
      </Text>
    </View>
  </TouchableOpacity>

</ScrollView>

</View>
{/* ================= STATS SECTION ================= */}

<View style={styles.statsSection}>

  <View style={styles.statsRow}>

    <View style={styles.statItem}>
      <Text style={styles.statNumber}>100+</Text>
      <Text style={styles.statLabel}>TRIPS{"\n"}COMPLETED</Text>
    </View>

    <View style={styles.statItem}>
      <Text style={styles.statNumber}>500+</Text>
      <Text style={styles.statLabel}>ELITE{"\n"}EXPLORERS</Text>
    </View>

  </View>

  <View style={styles.statsRow}>

    <View style={styles.statItem}>
      <Text style={styles.statNumber}>50+</Text>
      <Text style={styles.statLabel}>GLOBAL{"\n"}DESTINATIONS</Text>
    </View>

    <View style={styles.statItem}>
      <Text style={styles.statNumber}>20+</Text>
      <Text style={styles.statLabel}>EXPERT{"\n"}GUIDES</Text>
    </View>

  </View>

</View>
{/* ================= FEATURED ADVENTURES ================= */}

<View style={styles.featuredSection}>

<Text style={styles.featuredSmallTitle}>
POPULAR DESTINATIONS
</Text>

<Text style={styles.featuredTitle}>
FEATURED <Text style={styles.blueItalic}>ADVENTURES</Text>
</Text>

<Text style={styles.featuredDescription}>
Discover handpicked adventures crafted for explorers seeking unforgettable experiences.
</Text>

</View>
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.featuredScroll}
>

  {/* CARD 1 */}

  <ImageBackground
    source={require("./assets/featured1.jpg")}
    style={styles.featuredCard}
    imageStyle={styles.featuredImage}
  >

    <View style={styles.featuredOverlay}>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Most Popular</Text>
      </View>

      <Text style={styles.location}>
        Gilgit, Pakistan
      </Text>

      <Text style={styles.placeName}>
        Hunza Valley
      </Text>

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

        <Text style={styles.price}>
          PKR 40,000
        </Text>

      </View>

    </View>

  </ImageBackground>

  {/* CARD 2 */}

  <ImageBackground
    source={require("./assets/featured2.jpg")}
    style={styles.featuredCard}
    imageStyle={styles.featuredImage}
  >

    <View style={styles.featuredOverlay}>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Most Visited</Text>
      </View>

      <Text style={styles.location}>
        Skardu, Pakistan
      </Text>

      <Text style={styles.placeName}>
        Skardu Adventure
      </Text>

      <Text style={styles.placeDescription}>
        Explore majestic lakes, valleys and unforgettable mountain views.
      </Text>

      <View style={styles.cardFooter}>

        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>🕒</Text>
          <Text style={styles.footerText}>14 Days</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>⛰️</Text>
          <Text style={styles.footerText}>Moderate</Text>
        </View>

        <Text style={styles.price}>
          PKR 100,000
        </Text>

      </View>

    </View>

  </ImageBackground>

  {/* CARD 3 */}

  <ImageBackground
    source={require("./assets/featured3.jpg")}
    style={styles.featuredCard}
    imageStyle={styles.featuredImage}
  >

    <View style={styles.featuredOverlay}>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Most Liked</Text>
      </View>

      <Text style={styles.location}>
        Kashmir, Pakistan
      </Text>

      <Text style={styles.placeName}>
        Fairy Meadows Trek
      </Text>

      <Text style={styles.placeDescription}>
        Journey through scenic trails leading to Pakistan's most iconic landscapes.
      </Text>

      <View style={styles.cardFooter}>

        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>🕒</Text>
          <Text style={styles.footerText}>9 Days</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>⛰️</Text>
          <Text style={styles.footerText}>Hard</Text>
        </View>

        <Text style={styles.price}>
          PKR 70,000
        </Text>

      </View>

    </View>

  </ImageBackground>

</ScrollView>
{/* ================= WHY CHOOSE US ================= */}

<View style={styles.chooseSection}>

<Text style={styles.chooseSmall}>
WHY ADVENTURE CLUB
</Text>

<Text style={styles.chooseTitle}>
Choose <Text style={styles.blueItalic}>Us</Text>
</Text>

<Text style={styles.chooseDescription}>
We create safe, memorable and carefully curated adventures for every explorer.
</Text>

</View>
{/* ================= CHOOSE US CARDS ================= */}

<View style={styles.chooseCards}>

  {/* CARD 1 */}

  <View style={styles.chooseCard}>

    <View style={styles.iconBox}>
      <Ionicons name="people-outline" size={26} color="#1E40AF" />
    </View>

    <Text style={styles.cardHeading}>
      Expert Guides
    </Text>

    <Text style={styles.cardText}>
      Our experienced guides ensure every adventure is safe,
      informative and unforgettable for every explorer.
    </Text>

  </View>

  {/* CARD 2 */}

  <View style={styles.chooseCard}>

    <View style={styles.iconBox}>
      <Ionicons name="shield-checkmark-outline" size={26} color="#1E40AF" />
    </View>

    <Text style={styles.cardHeading}>
      Safe Adventures
    </Text>

    <Text style={styles.cardText}>
      Every trip is carefully planned with safety as our
      highest priority from beginning to end.
    </Text>

  </View>

  {/* CARD 3 */}

  <View style={styles.chooseCard}>

    <View style={styles.iconBox}>
      <Ionicons name="ribbon-outline" size={26} color="#1E40AF" />
    </View>

    <Text style={styles.cardHeading}>
      Memorable Experiences
    </Text>

    <Text style={styles.cardText}>
      Create unforgettable memories through unique journeys,
      breathtaking landscapes and premium adventures.
    </Text>

  </View>

  {/* CARD 4 */}

  <View style={styles.chooseCard}>

    <View style={styles.iconBox}>
      <Ionicons name="location-outline" size={26} color="#1E40AF" />
    </View>

    <Text style={styles.cardHeading}>
      Unique Destinations
    </Text>

    <Text style={styles.cardText}>
      Discover hidden valleys, mountains and destinations
      selected especially for nature lovers.
    </Text>

  </View>

  {/* CARD 5 */}

  <View style={styles.chooseCard}>

    <View style={styles.iconBox}>
      <Ionicons name="people-circle-outline" size={26} color="#1E40AF" />
    </View>

    <Text style={styles.cardHeading}>
      Community of Explorers
    </Text>

    <Text style={styles.cardText}>
      Connect with fellow adventurers and build lifelong
      friendships while exploring together.
    </Text>

  </View>

  {/* CARD 6 */}

  <View style={styles.chooseCard}>

    <View style={styles.iconBox}>
      <Ionicons name="trail-sign-outline" size={26} color="#1E40AF" />
    </View>

    <Text style={styles.cardHeading}>
      Curated Adventures
    </Text>

    <Text style={styles.cardText}>
      Every destination is selected to provide the perfect
      balance of comfort, excitement and adventure.
    </Text>

  </View>

</View>
{/* ================= NEWSLETTER SECTION ================= */}

<ImageBackground
  source={require("./assets/footer-bg.jpg")}
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

  )
      

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },

  hero: {
    width: "100%",
    height: height * 0.92,
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

  /* ================= HERO ================= */

  content: {
    flex: 1,
    justifyContent: "center",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  headingWhite: {
    color: "#FFFFFF",
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 48,
    letterSpacing: 1,
  },

  headingBlue: {
    color: "#3D8BFF",
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 48,
    marginTop: 5,
    letterSpacing: 1,
  },

  paragraph: {
    color: "#F1F5F9",
    fontSize: 16,
    lineHeight: 28,
    marginTop: 22,
    width: "90%",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 35,
  },

  primaryButton: {
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 15,
    elevation: 5,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 15,
  },

  secondaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  mobileMenu:{

backgroundColor:"#FFFFFF",

marginTop:20,

borderRadius:18,

padding:18,

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

loginButton:{

marginTop:20,

backgroundColor:"#F3F4F6",

paddingVertical:15,

borderRadius:12,

alignItems:"center",

},

loginButtonText:{

fontSize:16,

fontWeight:"700",

color:"#0B5CAD",

},

signupButton:{

marginTop:12,

backgroundColor:"#0B5CAD",

paddingVertical:15,

borderRadius:12,

alignItems:"center",

},

signupButtonText:{

fontSize:16,

fontWeight:"700",

color:"#FFFFFF",

},

/* ================= ABOUT SECTION ================= */

aboutSection: {
  backgroundColor: "#F8FBFF",
  paddingHorizontal: 22,
  paddingVertical: 70,
},

aboutLabel: {
  fontSize: 14,
  fontWeight: "700",
  color: "#0B5CAD",
  letterSpacing: 2,
  textTransform: "uppercase",
  marginBottom: 12,
},

aboutHeading: {
  fontSize: 34,
  fontWeight: "800",
  color: "#0F172A",
  lineHeight: 42,
},

aboutDescription: {
  fontSize: 16,
  color: "#64748B",
  lineHeight: 28,
  marginTop: 18,
},

aboutImage: {
  width: "100%",
  height: 250,
  borderRadius: 22,
  marginTop: 35,
},

featureCard: {
  flexDirection: "row",
  alignItems: "center",

  backgroundColor: "#FFFFFF",

  borderRadius: 18,

  padding: 18,

  marginTop: 18,

  shadowColor: "#000",

  shadowOpacity: 0.08,

  shadowRadius: 10,

  shadowOffset: {
    width: 0,
    height: 5,
  },

  elevation: 4,
},

iconCircle: {
  width: 55,
  height: 55,

  borderRadius: 30,

  backgroundColor: "#EAF4FF",

  justifyContent: "center",

  alignItems: "center",
},

featureContent: {
  flex: 1,
  marginLeft: 16,
},

featureTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#0F172A",
},

featureText: {
  fontSize: 14,
  color: "#64748B",
  marginTop: 6,
  lineHeight: 22,
},
/* ================= ABOUT SECTION ================= */

aboutSection: {
  backgroundColor: "#F7FAFD",
  paddingHorizontal: 22,
  paddingVertical: 45,
},

aboutSmallTitle: {
  color: "#1E88E5",
  fontSize: 13,
  fontWeight: "700",
  marginBottom: 8,
},

aboutTitle: {
  fontSize: 34,
  fontWeight: "700",
  color: "#111111",
  lineHeight: 42,
},

blueText: {
  color: "#1E88E5",
  fontStyle: "italic",
},

aboutParagraph: {
  marginTop: 15,
  fontSize: 15,
  color: "#555555",
  lineHeight: 24,
},

featureRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginTop: 18,
},

featureIcon: {
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: "#E7F2FF",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 14,
},

iconText: {
  color: "#1E88E5",
  fontSize: 18,
  fontWeight: "700",
},

featureTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111111",
},

featureDescription: {
  fontSize: 13,
  color: "#777777",
  marginTop: 3,
  lineHeight: 18,
},

learnButton: {
  width: 145,
  height: 48,
  borderRadius: 30,
  backgroundColor: "#1E88E5",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 28,
},

learnButtonText: {
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: 15,
},

/* Images */

imageSection: {
  marginTop: 40,
},

bigImage: {
  width: "100%",
  height: 220,
  borderRadius: 18,
},

smallImagesRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 15,
},

smallImage: {
  width: "48%",
  height: 130,
  borderRadius: 16,
},
/* ================= CHOOSE YOUR ADVENTURE ================= */

adventureSection: {
  backgroundColor: "#F7FAFD",
  paddingTop: 45,
  paddingBottom: 40,
},

sectionSmallTitle: {
  color: "#1E88E5",
  fontSize: 12,
  fontWeight: "700",
  marginLeft: 20,
  letterSpacing: 1,
},

sectionTitle: {
  fontSize: 34,
  fontWeight: "700",
  color: "#1E293B",
  marginTop: 5,
  marginLeft: 20,
},

blueItalic: {
  color: "#1E88E5",
  fontStyle: "italic",
},

sectionDescription: {
  marginTop: 10,
  marginLeft: 20,
  marginRight: 20,
  fontSize: 14,
  color: "#64748B",
  lineHeight: 22,
},

cardsContainer: {
  paddingLeft: 20,
  paddingTop: 30,
  paddingRight: 20,
  paddingBottom: 10,
},

adventureCard: {
  width: 250,
  height: 330,
  borderRadius: 24,
  overflow: "hidden",
  marginRight: 18,

  backgroundColor: "#FFF",

  shadowColor: "#000",
  shadowOpacity: 0.18,
  shadowRadius: 12,

  shadowOffset: {
    width: 0,
    height: 6,
  },

  elevation: 10,
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

  paddingHorizontal: 15,
  paddingBottom: 18,
  paddingTop: 60,

  backgroundColor: "rgba(0,0,0,0.28)",
},

cardTitle: {
  color: "#FFFFFF",
  fontSize: 26,
  fontWeight: "700",
},

cardDescription: {
  color: "#FFFFFF",
  fontSize: 13,
  lineHeight: 18,
  marginTop: 6,
},

/* White Circle Icon */

cardIcon: {
  position: "absolute",
  top: 14,
  left: 14,

  width: 42,
  height: 42,

  borderRadius: 21,

  backgroundColor: "#FFFFFF",

  justifyContent: "center",
  alignItems: "center",

  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 5,

  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 6,
},

cardIconText: {
  fontSize: 22,
},
/* ================= STATS SECTION ================= */

statsSection: {
  backgroundColor: "#41537C",
  paddingVertical: 30,
  paddingHorizontal: 20,
},

statsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 25,
},

statItem: {
  width: "48%",
  alignItems: "center",
},

statNumber: {
  fontSize: 34,
  fontWeight: "700",
  color: "#FFFFFF",
},

statLabel: {
  marginTop: 8,
  textAlign: "center",
  fontSize: 13,
  color: "#D6E3F8",
  lineHeight: 20,
  letterSpacing: 1,
},
/* ================= FEATURED ADVENTURES ================= */

featuredSection:{
paddingTop:45,
paddingHorizontal:20,
backgroundColor:"#F7FAFD",
},

featuredSmallTitle:{
fontSize:12,
fontWeight:"700",
color:"#1E88E5",
letterSpacing:1,
},

featuredTitle:{
fontSize:33,
fontWeight:"700",
marginTop:6,
color:"#1E293B",
},

featuredDescription:{
fontSize:15,
color:"#64748B",
marginTop:10,
lineHeight:22,
width:"92%",
},
/* ================= FEATURED ADVENTURES ================= */

featuredScroll: {
  paddingTop: 25,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 8,
},

featuredCard: {
  width: 300,
  height: 245,
  marginRight: 18,
  borderRadius: 22,
  overflow: "hidden",

  shadowColor: "#000",
  shadowOpacity: 0.18,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 10,
},

featuredImage: {
  borderRadius: 22,
},

featuredOverlay: {
  flex: 1,
  justifyContent: "flex-end",
  padding: 16,
  backgroundColor: "rgba(0,0,0,0.28)",
},

badge: {
  position: "absolute",
  top: 12,
  left: 12,

  backgroundColor: "#2F6BFF",
  paddingHorizontal: 12,
  paddingVertical: 5,

  borderRadius: 50,
},

badgeText: {
  color: "#FFF",
  fontSize: 11,
  fontWeight: "700",
},

location: {
  color: "#58A8FF",
  fontSize: 11,
  fontWeight: "600",
  marginBottom: 3,
},

placeName: {
  color: "#FFF",
  fontSize: 30,
  fontWeight: "700",
},

placeDescription: {
  color: "#E2E8F0",
  fontSize: 13,
  lineHeight: 19,
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
  fontSize: 15,
  marginRight: 5,
},

footerText: {
  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "600",
},

price: {
  color: "#1E88E5",
  fontSize: 13,
  fontWeight: "700",
},
/* ================= WHY CHOOSE US ================= */

chooseSection:{
paddingHorizontal:20,
paddingTop:45,
backgroundColor:"#F7FAFD",
},

chooseSmall:{
fontSize:12,
fontWeight:"700",
letterSpacing:1,
color:"#1E88E5",
},

chooseTitle:{
marginTop:6,
fontSize:34,
fontWeight:"700",
color:"#1E293B",
},

chooseDescription:{
marginTop:10,
fontSize:15,
lineHeight:24,
color:"#64748B",
width:"92%",
},
/* ================= WHY CHOOSE US ================= */

chooseCards: {
  paddingHorizontal: 20,
  paddingTop: 25,
  paddingBottom: 50,
  backgroundColor: "#F7FAFD",
},

chooseCard: {
  backgroundColor: "#FFFFFF",

  borderRadius: 22,

  padding: 22,

  marginBottom: 20,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  elevation: 6,

  borderWidth: 1,
  borderColor: "#EEF2F7",
},

iconBox: {
  width: 56,
  height: 56,

  borderRadius: 14,

  borderWidth: 1.5,
  borderColor: "#3B82F6",

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 18,

  backgroundColor: "#FFFFFF",
},

cardHeading: {
  fontSize: 23,
  fontWeight: "700",
  color: "#1E293B",

  marginBottom: 10,
},

cardText: {
  fontSize: 15,
  color: "#64748B",
  lineHeight: 24,
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

  backgroundColor: "rgba(4,18,40,0.75)",

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


