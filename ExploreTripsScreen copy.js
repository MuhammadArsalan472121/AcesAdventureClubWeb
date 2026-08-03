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
Dimensions,
TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Header from "./Header";

const { width, height } = Dimensions.get("window");

export default function ExploreTripsScreen() {
  const popularHubs = [

  {
    id: 1,
    image: require("./assets/hub1.jpg"),
    badge: "Most Popular",

    title: "Hunza Valley",

    description:
      "Experience the breathtaking beauty of Pakistan's majestic mountains and valleys.",

    price: "30000 Rs",

    duration: "3 days",
  },

  {
    id: 2,
    image: require("./assets/hub2.jpg"),
    badge: "Most Liked",

    title: "Fairy Meadows Trek",

    description:
      "Journey through scenic trails leading to one of Pakistan's most iconic landscapes.",

    price: "40000 Rs",

    duration: "7 days",
  },

  {
    id: 3,
    image: require("./assets/hub3.jpg"),
    badge: "Most Visited",

    title: "Skardu Adventure",

    description:
      "Explore majestic lakes, valleys and unforgettable mountain views.",

    price: "70000 Rs",

    duration: "14 days",
  },
  

];

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

{/* HERO */}

<ImageBackground

source={require("./assets/explore-hero.jpg")}

style={styles.hero}

>

<View style={styles.overlay}>

<Header />

<View style={styles.heroContent}>

<Text style={styles.heroBlue}>
EXPLORE
</Text>

<Text style={styles.heroWhite}>
ADVENTURES
</Text>

<Text style={styles.heroDescription}>
Discover breathtaking destinations and unforgettable outdoor
experiences across Pakistan's beautiful landscapes.
Explore access to the roof of the world.
</Text>

<View style={styles.buttonRow}>

<TouchableOpacity style={styles.primaryButton}>

<Text style={styles.primaryText}>
View Destinations
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

{/* Search & Filters yahan se next part me */}
{/* ================= SEARCH ================= */}

<View style={styles.searchSection}>

<View style={styles.searchBox}>

<Ionicons
name="search-outline"
size={22}
color="#4F7EE8"
/>

<TextInput
placeholder="Search Mountains, Locations, Places Or Adventures ..."
placeholderTextColor="#7B8798"
style={styles.searchInput}
/>

</View>

<View style={styles.filterContainer}>

<TouchableOpacity style={styles.activeFilter}>

<Ionicons
name="options-outline"
size={16}
color="#FFFFFF"
/>

<Text style={styles.activeFilterText}>
Filters
</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.filterChip}>

<Ionicons
name="triangle-outline"
size={16}
color="#FFFFFF"
/>

<Text style={styles.filterText}>
Mountains
</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.filterChip}>

<Ionicons
name="walk-outline"
size={16}
color="#FFFFFF"
/>

<Text style={styles.filterText}>
Hiking
</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.filterChip}>

<Ionicons
name="bonfire-outline"
size={16}
color="#FFFFFF"
/>

<Text style={styles.filterText}>
Camping
</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.filterChip}>

<Ionicons
name="leaf-outline"
size={16}
color="#FFFFFF"
/>

<Text style={styles.filterText}>
Nature Trails
</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.filterChip}>

<Ionicons
name="location-outline"
size={16}
color="#FFFFFF"
/>

<Text style={styles.filterText}>
Northern Areas
</Text>

</TouchableOpacity>

</View>

</View>

{/* ================= CURATED JOURNEYS ================= */}

<View style={styles.curatedSection}>

  <Text style={styles.curatedSmallTitle}>
    FEATURED EXPEDITIONS
  </Text>

  <Text style={styles.curatedTitle}>
    CURATED JOURNEYS
  </Text>

  {/* ================= ROW 1 ================= */}

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.curatedScroll}
  >

    {[
      {
        image: require("./assets/hunza.jpg"),
        badge: "Sponsored",
        location: "Hunza Valley",
        title: "Hunza Explorer",
        description: "Experience breathtaking mountain landscapes.",
        duration: "8 Days",
        difficulty: "Moderate",
        difficultyColor: "#F59E0B",
      },

      {
        image: require("./assets/fairy.jpg"),
        badge: "",
        location: "Fairy Meadows",
        title: "Fairy Meadows",
        description: "Base camp of mighty Nanga Parbat.",
        duration: "10 Days",
        difficulty: "Hard",
        difficultyColor: "#EF4444",
      },

      {
        image: require("./assets/skardu.jpg"),
        badge: "Sponsored",
        location: "Skardu",
        title: "Skardu Adventure",
        description: "Lakes, mountains and unforgettable views.",
        duration: "7 Days",
        difficulty: "Easy",
        difficultyColor: "#22C55E",
      },

      {
        image: require("./assets/naran.jpg"),
        badge: "",
        location: "Naran",
        title: "Naran Escape",
        description: "Enjoy lush green valleys and rivers.",
        duration: "5 Days",
        difficulty: "Easy",
        difficultyColor: "#22C55E",
      },

    ].map((item,index)=>(

      <View key={index} style={styles.curatedCard}>

        <Image source={item.image} style={styles.curatedImage}/>

        {item.badge!==""&&(
          <View style={styles.curatedBadge}>
            <Text style={styles.curatedBadgeText}>
              {item.badge}
            </Text>
          </View>
        )}

        <View style={styles.curatedContent}>

          <Text style={styles.curatedLocation}>
            {item.location}
          </Text>

          <Text style={styles.curatedCardTitle}>
            {item.title}
          </Text>

          <Text style={styles.curatedDescription}>
            {item.description}
          </Text>

          <View style={styles.curatedBlueLine}/>

          <View style={styles.curatedBottom}>

            <View>

              <Text style={styles.curatedLabel}>
                DURATION
              </Text>

              <Text style={styles.curatedValue}>
                {item.duration}
              </Text>

            </View>

            <View>

              <Text style={styles.curatedLabel}>
                DIFFICULTY
              </Text>

              <Text
                style={[
                  styles.curatedValue,
                  {color:item.difficultyColor}
                ]}
              >
                {item.difficulty}
              </Text>

            </View>

          </View>

          <TouchableOpacity style={styles.curatedButton}>

            <Text style={styles.curatedButtonText}>
              View Details
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    ))}

  </ScrollView>

  {/* ================= ROW 2 ================= */}

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={[
      styles.curatedScroll,
      {marginTop:20},
    ]}
  >

    {[
      {
        image: require("./assets/hunza.jpg"),
        badge: "",
        location: "Hunza Valley",
        title: "Hunza Explorer",
        description: "Experience breathtaking mountain landscapes.",
        duration: "8 Days",
        difficulty: "Moderate",
        difficultyColor: "#F59E0B",
      },

      {
        image: require("./assets/fairy.jpg"),
        badge: "",
        location: "Fairy Meadows",
        title: "Fairy Meadows",
        description: "Base camp of mighty Nanga Parbat.",
        duration: "10 Days",
        difficulty: "Hard",
        difficultyColor: "#EF4444",
      },

      {
        image: require("./assets/skardu.jpg"),
        badge: "",
        location: "Skardu",
        title: "Skardu Adventure",
        description: "Lakes, mountains and unforgettable views.",
        duration: "7 Days",
        difficulty: "Easy",
        difficultyColor: "#22C55E",
      },

      {
        image: require("./assets/naran.jpg"),
        badge: "",
        location: "Naran",
        title: "Naran Escape",
        description: "Enjoy lush green valleys and rivers.",
        duration: "5 Days",
        difficulty: "Easy",
        difficultyColor: "#22C55E",
      },

    ].map((item,index)=>(

      <View key={index} style={styles.curatedCard}>

        <Image source={item.image} style={styles.curatedImage}/>

        <View style={styles.curatedContent}>

          <Text style={styles.curatedLocation}>
            {item.location}
          </Text>

          <Text style={styles.curatedCardTitle}>
            {item.title}
          </Text>

          <Text style={styles.curatedDescription}>
            {item.description}
          </Text>

          <View style={styles.curatedBlueLine}/>

          <View style={styles.curatedBottom}>

            <View>

              <Text style={styles.curatedLabel}>
                DURATION
              </Text>

              <Text style={styles.curatedValue}>
                {item.duration}
              </Text>

            </View>

            <View>

              <Text style={styles.curatedLabel}>
                DIFFICULTY
              </Text>

              <Text
                style={[
                  styles.curatedValue,
                  {color:item.difficultyColor}
                ]}
              >
                {item.difficulty}
              </Text>

            </View>

          </View>

          <TouchableOpacity style={styles.curatedButton}>

            <Text style={styles.curatedButtonText}>
              View Details
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    ))}

  </ScrollView>

</View>
{/* ================= PAGINATION ================= */}

<View style={styles.paginationContainer}>

  <TouchableOpacity style={styles.pageArrow}>
    <Ionicons name="arrow-back" size={18} color="#111827" />
    <Text style={styles.pageArrowText}>Previous</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.activePage}>
    <Text style={styles.activePageText}>1</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.pageNumber}>
    <Text style={styles.pageNumberText}>2</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.pageNumber}>
    <Text style={styles.pageNumberText}>3</Text>
  </TouchableOpacity>

  <Text style={styles.pageDots}>.......</Text>

  <TouchableOpacity style={styles.pageNumber}>
    <Text style={styles.pageNumberText}>12</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.pageArrow}>
    <Text style={styles.pageArrowText}>Next</Text>
    <Ionicons name="arrow-forward" size={18} color="#111827" />
  </TouchableOpacity>

</View>
{/* ================= POPULAR HUBS ================= */}

<View style={styles.popularSection}>

  <Text style={styles.popularSmallTitle}>
    POPULAR DESTINATIONS
  </Text>

  <Text style={styles.popularTitle}>
    POPULAR HUBS
  </Text>

  <Text style={styles.popularDescription}>
    Discover handpicked adventures crafted for explorers
    seeking unforgettable experiences.
  </Text>

</View>
{/* ================= POPULAR HUBS DATA ================= */}



{/* ================= POPULAR HUBS CARDS ================= */}

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.popularScroll}
>

  {popularHubs.map((item) => (

    <TouchableOpacity
      key={item.id}
      activeOpacity={0.9}
      style={styles.popularCard}
    >

      <ImageBackground
        source={item.image}
        style={styles.popularImage}
        imageStyle={styles.popularImageRadius}
      >

        {/* Dark Overlay */}
        <View style={styles.popularOverlay}>

          {/* Badge */}
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>
              {item.badge}
            </Text>
          </View>

          {/* Bottom Content */}
          <View style={styles.popularContent}>

            <Text style={styles.popularCardTitle}>
              {item.title}
            </Text>

            <Text style={styles.popularCardDescription}>
              {item.description}
            </Text>

            <View style={styles.popularDivider} />

            <View style={styles.popularBottomRow}>

              <View>

                <Text style={styles.popularSmallText}>
                  Starting From
                </Text>

                <Text style={styles.popularPrice}>
                  {item.price}
                </Text>

              </View>

              <View style={{ alignItems: "flex-end" }}>

                <Text style={styles.popularSmallText}>
                  {item.duration}
                </Text>

                <TouchableOpacity>

                  <Text style={styles.popularViewText}>
                    View Package →
                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </View>

        </View>

      </ImageBackground>

    </TouchableOpacity>

  ))}

</ScrollView>

{/* ================= EXPLORE MORE BUTTON ================= */}

<TouchableOpacity style={styles.exploreMoreButton}>

  <Text style={styles.exploreMoreText}>
    Explore More
  </Text>

</TouchableOpacity>
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
backgroundColor:"#F8FBFF",
},

hero:{
width:"100%",
height:520,
},

overlay:{
flex:1,
backgroundColor:"rgba(0,0,0,.42)",
paddingHorizontal:22,
paddingTop:10,
},

heroContent:{
flex:1,
justifyContent:"center",
},

heroBlue:{
fontSize:48,
fontWeight:"800",
color:"#2F73FF",
},

heroWhite:{
fontSize:48,
fontWeight:"800",
color:"#FFFFFF",
marginTop:-5,
},

heroDescription:{
marginTop:20,
fontSize:15,
lineHeight:24,
color:"#E2E8F0",
width:"82%",
},

buttonRow:{
flexDirection:"row",
marginTop:35,
},

primaryButton:{
height:52,
paddingHorizontal:24,
borderRadius:30,
backgroundColor:"#2F73FF",
justifyContent:"center",
alignItems:"center",
marginRight:14,
},

primaryText:{
fontSize:15,
fontWeight:"700",
color:"#FFFFFF",
},

secondaryButton:{
height:52,
paddingHorizontal:24,
borderRadius:30,
borderWidth:1.5,
borderColor:"#FFFFFF",
justifyContent:"center",
alignItems:"center",
},

secondaryText:{
fontSize:15,
fontWeight:"700",
color:"#FFFFFF",
},
/* ================= SEARCH ================= */

searchSection:{
paddingHorizontal:20,
paddingVertical:30,
backgroundColor:"#F8FBFF",
},

searchBox:{

height:56,

backgroundColor:"#DDEBFF",

borderRadius:18,

flexDirection:"row",

alignItems:"center",

paddingHorizontal:18,

},

searchInput:{

flex:1,

marginLeft:10,

fontSize:15,

color:"#16233C",

},

filterContainer:{

flexDirection:"row",

flexWrap:"wrap",

marginTop:20,

},

activeFilter:{

flexDirection:"row",

alignItems:"center",

backgroundColor:"#4F7EE8",

paddingHorizontal:16,

height:42,

borderRadius:25,

marginRight:10,

marginBottom:12,

},

activeFilterText:{

marginLeft:6,

fontSize:14,

fontWeight:"700",

color:"#FFFFFF",

},

filterChip:{

flexDirection:"row",

alignItems:"center",

backgroundColor:"#111111",

paddingHorizontal:16,

height:42,

borderRadius:25,

marginRight:10,

marginBottom:12,

},

filterText:{

marginLeft:6,

fontSize:14,

fontWeight:"600",

color:"#FFFFFF",

},
/* ================= CURATED JOURNEYS ================= */

curatedSection:{
  paddingTop:45,
  paddingBottom:35,
  backgroundColor:"#F8FAFC",
},

curatedSmallTitle:{
  fontSize:12,
  color:"#1E88E5",
  fontWeight:"700",
  letterSpacing:2,

  paddingLeft:18,
},

curatedTitle:{
  marginTop:8,
  marginBottom:28,

  fontSize:32,
  fontWeight:"700",
  color:"#16233C",

  paddingLeft:18,
},
curatedScroll:{
  paddingLeft:18,
  paddingRight:5,
},

curatedCard:{
  width:300,
  backgroundColor:"#FFFFFF",
  borderRadius:22,
  overflow:"hidden",
  marginRight:16,

  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
  shadowOffset:{
    width:0,
    height:5,
  },
  elevation:6,
},

curatedImage:{
  width:"100%",
  height:165,
},

curatedBadge:{
  position:"absolute",
  top:14,
  right:14,

  backgroundColor:"#1E88E5",

  paddingHorizontal:12,
  paddingVertical:5,

  borderRadius:20,
},

curatedBadgeText:{
  color:"#FFFFFF",
  fontSize:11,
  fontWeight:"700",
},

curatedContent:{
  padding:16,
},

curatedLocation:{
  color:"#6A7586",
  fontSize:11,
  fontWeight:"600",
  textTransform:"uppercase",
},

curatedCardTitle:{
  marginTop:6,
  fontSize:20,
  fontWeight:"700",
  color:"#16233C",
},

curatedDescription:{
  marginTop:8,
  color:"#6A7586",
  fontSize:13,
  lineHeight:20,
},

curatedBlueLine:{
  height:2,
  backgroundColor:"#1E88E5",
  borderRadius:10,
  marginVertical:16,
},

curatedBottom:{
  flexDirection:"row",
  justifyContent:"space-between",
},

curatedLabel:{
  fontSize:10,
  color:"#94A3B8",
  fontWeight:"700",
},

curatedValue:{
  marginTop:5,
  fontSize:13,
  fontWeight:"700",
},

curatedButton:{
  height:45,
  backgroundColor:"#1E88E5",
  borderRadius:12,
  justifyContent:"center",
  alignItems:"center",
  marginTop:18,
},

curatedButtonText:{
  color:"#FFFFFF",
  fontSize:14,
  fontWeight:"700",
},
// Blue Line 
/* ================= MOBILE RESPONSIVE PAGINATION ================= */

paginationContainer:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  flexWrap:"wrap",

  paddingHorizontal:15,
  marginTop:28,
  marginBottom:40,
},

pageArrow:{
  flexDirection:"row",
  alignItems:"center",
  paddingHorizontal:6,
  paddingVertical:8,
},

pageArrowText:{
  fontSize:14,
  color:"#16233C",
  fontWeight:"600",
  marginHorizontal:4,
},

activePage:{
  width:36,
  height:36,
  borderRadius:18,
  backgroundColor:"#1E5BFF",

  justifyContent:"center",
  alignItems:"center",

  marginHorizontal:4,
},

activePageText:{
  color:"#FFFFFF",
  fontSize:15,
  fontWeight:"700",
},

pageNumber:{
  width:34,
  height:34,
  justifyContent:"center",
  alignItems:"center",
  marginHorizontal:2,
},

pageNumberText:{
  fontSize:15,
  color:"#16233C",
  fontWeight:"600",
},

pageDots:{
  fontSize:15,
  color:"#16233C",
  marginHorizontal:4,
  fontWeight:"600",
},
/* ================= POPULAR HUBS ================= */

popularSection:{
  paddingHorizontal:20,
  marginTop:45,
},

popularSmallTitle:{
  color:"#1E88E5",
  fontSize:12,
  fontWeight:"700",
  letterSpacing:1.5,
},

popularTitle:{
  marginTop:6,
  color:"#16233C",
  fontSize:34,
  fontWeight:"700",
},

popularDescription:{
  marginTop:8,
  color:"#6A7586",
  fontSize:15,
  lineHeight:22,
},
/* ================= POPULAR HUBS ================= */

popularScroll:{
  paddingHorizontal:20,
  paddingTop:25,
  paddingBottom:15,
},

popularCard:{
  width:250,
  height:360,

  marginRight:18,

  borderRadius:22,
  overflow:"hidden",

  backgroundColor:"#FFFFFF",

  elevation:8,

  shadowColor:"#000",
  shadowOpacity:0.15,
  shadowRadius:12,
  shadowOffset:{
    width:0,
    height:6,
  },
},

popularImage:{
  flex:1,
  justifyContent:"space-between",
},

popularImageRadius:{
  borderRadius:22,
},

popularOverlay:{
  flex:1,
  backgroundColor:"rgba(0,0,0,.35)",
  justifyContent:"space-between",
},

/* Badge */

popularBadge:{
  alignSelf:"flex-start",

  marginTop:12,
  marginLeft:12,

  backgroundColor:"#EAF2FF",

  paddingHorizontal:12,
  paddingVertical:5,

  borderRadius:20,
},

popularBadgeText:{
  color:"#2563EB",
  fontSize:11,
  fontWeight:"700",
},

/* Bottom Content */

popularContent:{
  padding:16,
},

popularCardTitle:{
  color:"#FFFFFF",
  fontSize:24,
  fontWeight:"700",
},

popularCardDescription:{
  color:"#E5E7EB",

  fontSize:13,

  lineHeight:20,

  marginTop:8,
},

popularDivider:{
  height:1,

  backgroundColor:"rgba(255,255,255,.35)",

  marginVertical:14,
},

popularBottomRow:{
  flexDirection:"row",

  justifyContent:"space-between",

  alignItems:"center",
},

popularSmallText:{
  color:"#E5E7EB",

  fontSize:12,
},

popularPrice:{
  color:"#3B82F6",

  fontSize:15,
  fontWeight:"700",

  marginTop:3,
},

popularViewText:{
  color:"#38BDF8",

  fontSize:13,
  fontWeight:"700",

  marginTop:3,
},

/* Explore Button */

exploreMoreButton:{
  marginTop:15,
  marginBottom:45,

  alignSelf:"center",

  backgroundColor:"#2563EB",

  width:180,
  height:48,

  borderRadius:30,

  justifyContent:"center",
  alignItems:"center",

  elevation:4,
},

exploreMoreText:{
  color:"#FFFFFF",

  fontSize:16,
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

