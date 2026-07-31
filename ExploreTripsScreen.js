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

});