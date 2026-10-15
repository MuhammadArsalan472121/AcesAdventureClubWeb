import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  sendEmailVerification as firebaseSendEmailVerification,
  reload as firebaseReload,
} from "firebase/auth";
import { auth } from "../screens/firebaseConfig";
import { Platform } from "react-native";

const AuthContext = createContext({
  user: null,
  userProfile: null,
  loading: true,
  isEmailVerified: false,
  updateUserProfile: async () => {},
  updateUserPassword: async () => {},
  logout: async () => {},
  reloadUser: async () => {},
  sendVerificationEmail: async () => {},
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
        phone: "",
        location: "",
        avatarUrl: null,
        wishlist: [],
        aboutMe: "",
        membershipTier: "Aces Member",
        role: "Explorer • Aces Club Member",
        joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        theme: "light",
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

    const realJoinedDate = currentUser.metadata?.creationTime
      ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    setUserProfile({
      fullName: saved?.fullName || currentUser.displayName || defaultName,
      email: currentUser.email || saved?.email || "",
      phone: saved?.phone !== undefined ? saved.phone : "",
      location: saved?.location !== undefined ? saved.location : "",
      avatarUrl: saved?.avatarUrl || null,
      wishlist: Array.isArray(saved?.wishlist) ? saved.wishlist : [],
      aboutMe: saved?.aboutMe || "",
      membershipTier: saved?.membershipTier || "Aces Member",
      role: saved?.role || "Explorer • Aces Club Member",
      joinedDate: saved?.joinedDate || realJoinedDate,
      theme: saved?.theme || "light",
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

  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined" && window.document) {
      const activeTheme = userProfile?.theme || "light";
      const root = window.document.documentElement;
      const body = window.document.body;
      if (activeTheme === "dark") {
        root.style.colorScheme = "dark";
        body.style.backgroundColor = "#0d1b2a";
        body.style.color = "#F8FAFC";
        body.classList.add("dark-theme");
      } else {
        root.style.colorScheme = "light";
        body.style.backgroundColor = "#F8FBFF";
        body.style.color = "#0F172A";
        body.classList.remove("dark-theme");
      }
    }
  }, [userProfile?.theme]);

  const reloadUser = async () => {
    if (!auth.currentUser) return null;
    await firebaseReload(auth.currentUser);
    // Create new object with prototype intact so user methods exist and React triggers a state change
    const refreshed = Object.assign(
      Object.create(Object.getPrototypeOf(auth.currentUser)),
      auth.currentUser
    );
    setUser(refreshed);
    return refreshed;
  };

  const sendVerificationEmail = async (targetUser = auth.currentUser) => {
    const userToVerify = targetUser || auth.currentUser;
    if (!userToVerify) {
      throw new Error("No user is currently signed in.");
    }
    await firebaseSendEmailVerification(userToVerify);
  };

  const updateUserProfile = async (newProfileData) => {
    const currentUid = auth.currentUser?.uid || "guest";

    if (auth.currentUser && newProfileData.fullName && newProfileData.fullName !== auth.currentUser.displayName) {
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
      email: auth.currentUser?.email || newProfileData.email || userProfile.email,
    };

    setUserProfile(merged);

    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(getStorageKey(currentUid), JSON.stringify(merged));
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

  const isEmailVerified = user ? Boolean(user.emailVerified) : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isEmailVerified,
        updateUserProfile,
        updateUserPassword,
        logout,
        setUserProfile,
        reloadUser,
        sendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
