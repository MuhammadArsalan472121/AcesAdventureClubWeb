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

<TouchableOpacity>
<Text style={styles.menuItem}>🏠 Home</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menuItem}>ℹ️ About</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menuItem}>🧭 Browse Trips</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menuItem}>🖼 Gallery</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menuItem}>🗺 Map</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menuItem}>🤝 Sponsors</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menuItem}>📞 Contact</Text>
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

menuItem:{

fontSize:17,

fontWeight:"600",

color:"#1E293B",

paddingVertical:14,

borderBottomWidth:0.5,

borderBottomColor:"#E5E7EB",

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

});


