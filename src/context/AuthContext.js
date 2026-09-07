import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { auth } from "../screens/firebaseConfig";
import { Platform } from "react-native";

const AuthContext = createContext({
  user: null,
  userProfile: null,
  loading: true,
  updateUserProfile: async () => {},
  updateUserPassword: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    phone: "+92 300 9876543",
    location: "Islamabad, Pakistan",
    aboutMe:
      "High-altitude trekking enthusiast, landscape photographer, and passionate mountain explorer. Traveled through Karakoram and Himalayas with Aces Adventure Club.",
    membershipTier: "Aces Elite Gold",
    role: "Expedition Explorer • Aces Club Member",
    joinedDate: "March 2023",
  });

  const getStorageKey = (uid) => `aces_club_user_profile_${uid}`;

  const loadProfile = (currentUser) => {
    if (!currentUser) {
      setUserProfile({
        fullName: "",
        email: "",
        phone: "+92 300 9876543",
        location: "Islamabad, Pakistan",
        aboutMe:
          "High-altitude trekking enthusiast, landscape photographer, and passionate mountain explorer. Traveled through Karakoram and Himalayas with Aces Adventure Club.",
        membershipTier: "Aces Elite Gold",
        role: "Expedition Explorer • Aces Club Member",
        joinedDate: "March 2023",
      });
      return;
    }

    let saved = null;
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        const item = window.localStorage.getItem(getStorageKey(currentUser.uid));
        if (item) {
          saved = JSON.parse(item);
        }
      } catch (e) {
        console.warn("Error reading profile from localStorage", e);
      }
    }

    const defaultName =
      currentUser.displayName ||
      (currentUser.email ? currentUser.email.split("@")[0] : "Adventurer");

    setUserProfile({
      fullName: saved?.fullName || currentUser.displayName || defaultName,
      email: currentUser.email || saved?.email || "",
      phone: saved?.phone || "+92 300 9876543",
      location: saved?.location || "Islamabad, Pakistan",
      aboutMe:
        saved?.aboutMe ||
        "High-altitude trekking enthusiast, landscape photographer, and passionate mountain explorer. Traveled through Karakoram and Himalayas with Aces Adventure Club.",
      membershipTier: saved?.membershipTier || "Aces Elite Gold",
      role: saved?.role || "Expedition Explorer • Aces Club Member",
      joinedDate:
        saved?.joinedDate ||
        (currentUser.metadata?.creationTime
          ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "March 2023"),
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      loadProfile(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (newProfileData) => {
    if (!auth.currentUser) return;

    if (newProfileData.fullName && newProfileData.fullName !== auth.currentUser.displayName) {
      try {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: newProfileData.fullName,
        });
      } catch (err) {
        console.warn("Failed to update Firebase displayName", err);
      }
    }

    const merged = {
      ...userProfile,
      ...newProfileData,
      email: auth.currentUser.email || newProfileData.email || userProfile.email,
    };

    setUserProfile(merged);

    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(getStorageKey(auth.currentUser.uid), JSON.stringify(merged));
      } catch (e) {
        console.warn("Failed to save profile to localStorage", e);
      }
    }

    return merged;
  };

  const updateUserPassword = async (newPassword) => {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in.");
    }
    await firebaseUpdatePassword(auth.currentUser, newPassword);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        updateUserProfile,
        updateUserPassword,
        logout,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
