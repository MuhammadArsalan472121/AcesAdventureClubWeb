import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

export default function SplashScreen({ navigation }) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim,{
        toValue:1,
        duration:800,
        useNativeDriver:true,
      }),

      Animated.spring(scaleAnim,{
        toValue:1,
        friction:5,
        useNativeDriver:true,
      }),

    ]).start();

    Animated.timing(progressAnim,{
      toValue:100,
      duration:2000,
      useNativeDriver:false,
    }).start(()=>{

      navigation.replace("Onboarding1");

    });

  },[]);

  return(

<View style={styles.container}>

<Animated.Image

source={require("../../assets/logo.png")}

style={[
styles.logo,
{
opacity:fadeAnim,
transform:[{scale:scaleAnim}]
}
]}

/>

<Text style={styles.title}>
ACES Adventure Club
</Text>

<Text style={styles.tagline}>
Adventure Begins Beyond The Horizon
</Text>

<View style={styles.progressBackground}>

<Animated.View

style={[
styles.progressFill,
{
width:progressAnim.interpolate({
inputRange:[0,100],
outputRange:["0%","100%"]
})
}
]}

/>

</View>

</View>

  );

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F7FAFD",
justifyContent:"center",
alignItems:"center",
paddingHorizontal:20,
},

logo:{
width:170,
height:170,
resizeMode:"contain",
marginBottom:30,
},

title:{
fontSize:30,
fontWeight:"700",
color:"#0B3D91",
},

tagline:{
fontSize:16,
color:"#64748B",
marginTop:10,
marginBottom:45,
},

progressBackground:{
width:180,
height:6,
backgroundColor:"#D8E6F3",
borderRadius:20,
overflow:"hidden",
},

progressFill:{
height:6,
backgroundColor:"#0B3D91",
borderRadius:20,
},

});
