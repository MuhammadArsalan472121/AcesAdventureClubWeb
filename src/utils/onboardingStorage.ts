import { Platform } from "react-native";

const ONBOARDING_COMPLETED_KEY = "aces_club_onboarding_completed_v1";

export const getOnboardingCompleted = (): boolean => {
  if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
    try {
      return window.localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
    } catch (_e) {
      return false;
    }
  }
  return false;
};

export const setOnboardingCompleted = (): void => {
  if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
    } catch (_e) {
      console.warn("Could not save onboarding completed flag to localStorage:", _e);
    }
  }
};
