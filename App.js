import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./SplashScreen";
import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
        />

        <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
        />

        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}