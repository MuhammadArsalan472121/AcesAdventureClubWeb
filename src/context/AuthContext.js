import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  reload as firebaseReload,
} from "firebase/auth";
import { auth, db } from "../screens/firebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
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
  const [isPreVerified, setIsPreVerified] = useState(false);
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

    const savedRoleUpper = String(saved?.role || "").trim().toUpperCase();
    const initialTier =
      savedRoleUpper === "SUPER_ADMIN" || savedRoleUpper === "SUPER ADMIN"
        ? "Aces Super Admin"
        : savedRoleUpper === "ADMIN"
        ? "Aces Admin"
        : savedRoleUpper.includes("LEADER")
        ? "Aces Leader"
        : "Aces Member";

    setUserProfile({
      fullName: saved?.fullName || currentUser.displayName || defaultName,
      email: currentUser.email || saved?.email || "",
      phone: saved?.phone !== undefined ? saved.phone : "",
      location: saved?.location !== undefined ? saved.location : "",
      avatarUrl: saved?.avatarUrl || null,
      wishlist: Array.isArray(saved?.wishlist) ? saved.wishlist : [],
      aboutMe: saved?.aboutMe || "",
      membershipTier: initialTier,
      role: saved?.role || "Member",
      joinedDate: saved?.joinedDate || realJoinedDate,
      theme: saved?.theme || "light",
    });
  };

  useEffect(() => {
    let unsubsDoc = null;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      loadProfile(currentUser);

      if (currentUser) {
        try {
          // If currentUser is verified in Firebase Auth, sync to Firestore if not already marked VERIFIED
          if (currentUser.emailVerified) {
            updateDoc(doc(db, "users", currentUser.uid), {
              status: "VERIFIED",
              emailVerified: true,
              isVerified: true,
            }).catch(() => {});
          }

          const userDocRef = doc(db, "users", currentUser.uid);
          unsubsDoc = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const isDocVerified =
                data.emailVerified === true ||
                data.isVerified === true ||
                data.status === "VERIFIED" ||
                currentUser.emailVerified === true;

              if (isDocVerified) {
                setIsPreVerified(true);
                if (currentUser.emailVerified && data.status !== "VERIFIED") {
                  updateDoc(userDocRef, {
                    status: "VERIFIED",
                    emailVerified: true,
                    isVerified: true,
                  }).catch(() => {});
                }
              } else {
                setIsPreVerified(false);
              }

              // Real-time synchronization of role, status, phone, location into userProfile!
              setUserProfile((prev) => {
                const currentRole = data.role !== undefined && data.role !== null ? data.role : (prev?.role || "Member");
                const roleUpper = String(currentRole || "").trim().toUpperCase();
                const isSuperAdmin = roleUpper === "SUPER_ADMIN" || roleUpper === "SUPER ADMIN";
                const isAdmin = isSuperAdmin || roleUpper === "ADMIN";
                const isLeader = roleUpper.includes("LEADER");

                const tier = isSuperAdmin
                  ? "Aces Super Admin"
                  : isAdmin
                  ? "Aces Admin"
                  : isLeader
                  ? "Aces Leader"
                  : "Aces Member";

                const updated = {
                  ...prev,
                  fullName: data.name || data.fullName || prev?.fullName || currentUser.displayName || "",
                  email: currentUser.email || data.email || prev?.email || "",
                  phone: data.phone !== undefined && data.phone !== "" ? data.phone : (prev?.phone || ""),
                  location: data.location !== undefined && data.location !== "" ? data.location : (data.city || prev?.location || ""),
                  role: currentRole,
                  membershipTier: tier,
                  status: data.status || prev?.status || "ACTIVE",
                };

                if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
                  try {
                    window.localStorage.setItem(getStorageKey(currentUser.uid), JSON.stringify(updated));
                  } catch (_) {}
                }
                return updated;
              });
            }
          }, (err) => {
            console.warn("[AUTH_USER_DOC_SNAPSHOT_ERR]", err);
          });
        } catch (e) {
          console.warn("[AUTH_USER_DOC_LISTENER_ERR]", e);
        }
      } else {
        if (unsubsDoc) {
          unsubsDoc();
          unsubsDoc = null;
        }
        setIsPreVerified(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (unsubsDoc) unsubsDoc();
    };
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
    if (auth.currentUser.emailVerified) {
      setIsPreVerified(true);
      try {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          status: "VERIFIED",
          emailVerified: true,
          isVerified: true,
        });
      } catch (e) {
        console.warn("Could not sync verified status in reloadUser:", e);
      }
    }
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

  const sendPasswordReset = async (targetEmail) => {
    const emailToReset = targetEmail || auth.currentUser?.email;
    if (!emailToReset) {
      throw new Error("No email address provided for password reset.");
    }
    await firebaseSendPasswordResetEmail(auth, emailToReset);
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

  const isEmailVerified = user ? Boolean(user.emailVerified || isPreVerified) : false;

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
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
