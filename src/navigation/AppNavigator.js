import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Homescreen";
import AboutScreen from "../screens/AboutScreen";
import ExploreTripsScreen from "../screens/ExploreTripsScreen";
import GalleryScreen from "../screens/GalleryScreen";
import MapScreen from "../screens/MapScreen";
import PartnerScreen from "../screens/SponseredScreen";
import ContactScreen from "../screens/ContactScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import ViewTripScreen from "../screens/ViewTripScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import UserManagementScreen from "../screens/UserManagementScreen";
import ManageTripsScreen from "../screens/ManageTripsScreen";
import SponsorsManagementScreen from "../screens/SponsorsManagementScreen";
import GalleryManagementScreen from "../screens/GalleryManagementScreen";
import ConsoleSettingsScreen from "../screens/ConsoleSettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="BrowseTrips" component={ExploreTripsScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Sponsors" component={PartnerScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ViewTrip" component={ViewTripScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* Admin Panel Screens */}
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="AdminUsers" component={UserManagementScreen} />
      <Stack.Screen name="AdminTrips" component={ManageTripsScreen} />
      <Stack.Screen name="AdminSponsors" component={SponsorsManagementScreen} />
      <Stack.Screen name="AdminGallery" component={GalleryManagementScreen} />
      <Stack.Screen name="AdminSettings" component={ConsoleSettingsScreen} />
    </Stack.Navigator>
  );
}
