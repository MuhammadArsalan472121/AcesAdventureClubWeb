import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { auth, db } from "../screens/firebaseConfig";

const normalizeRole = (role) => {
  if (!role) return "Member";
  const str = String(role).trim();
  if (str.toLowerCase() === "member") return "Member";
  if (str.toLowerCase() === "admin") return "Admin";
  if (str.toLowerCase() === "super admin") return "Super Admin";
  if (str.toLowerCase() === "elite voyager") return "Elite Voyager";
  if (str.toLowerCase() === "sponsor rep") return "Sponsor Rep";
  return str;
};

const normalizeStatus = (status) => {
  if (!status) return "ACTIVE";
  return String(status).toUpperCase();
};

const normalizeJoined = (joined, createdAt) => {
  if (joined && typeof joined === "string") return joined;
  if (createdAt) {
    if (typeof createdAt.toDate === "function") {
      return createdAt.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
    if (typeof createdAt === "string" || typeof createdAt === "number") {
      const d = new Date(createdAt);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      }
    }
  }
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const mergeUsersLists = (firestoreUsers, baseUsers) => {
  const firestoreEmails = new Set(firestoreUsers.map((u) => (u.email ? u.email.toLowerCase() : "")));
  const firestoreIds = new Set(firestoreUsers.map((u) => u.id));

  const uniqueBase = (baseUsers || []).filter(
    (b) => !firestoreIds.has(b.id) && !firestoreEmails.has(b.email ? b.email.toLowerCase() : "")
  );

  return [...firestoreUsers, ...uniqueBase];
};

const mergeTripsLists = (firestoreTrips, baseTrips) => {
  const firestoreIds = new Set(firestoreTrips.map((t) => t.id));
  const firestoreTitles = new Set(firestoreTrips.map((t) => (t.title ? t.title.toLowerCase().trim() : "")));

  const uniqueBase = (baseTrips || []).filter(
    (b) => !firestoreIds.has(b.id) && !firestoreTitles.has(b.title ? b.title.toLowerCase().trim() : "")
  );

  return [...firestoreTrips, ...uniqueBase];
};

const mergeSponsorsLists = (firestoreSponsors, baseSponsors) => {
  const firestoreIds = new Set(firestoreSponsors.map((s) => s.id));
  const firestoreNames = new Set(firestoreSponsors.map((s) => (s.name ? s.name.toLowerCase().trim() : "")));

  const uniqueBase = (baseSponsors || []).filter(
    (b) => !firestoreIds.has(b.id) && !firestoreNames.has(b.name ? b.name.toLowerCase().trim() : "")
  );

  return [...firestoreSponsors, ...uniqueBase];
};

const normalizeSponsor = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.companyName || data.name || data.sponsorName || "Unnamed Sponsor",
    sponsorName: data.sponsorName || data.name || "",
    companyName: data.companyName || data.name || "",
    phone: data.phone || data.contactNumber || "",
    email: data.email || (data.contact && data.contact.includes("@") ? data.contact : ""),
    contact: data.email || data.contact || data.phone || "",
    package: data.package || "Gold",
    trips: data.trips ? String(data.trips) : "1",
    status: data.status ? String(data.status).toUpperCase() : "ACTIVE",
    createdAt: data.createdAt || null,
  };
};

let isSeedingSponsors = false;

const seedDefaultSponsors = async (defaultSponsors) => {
  if (isSeedingSponsors) return;
  isSeedingSponsors = true;
  console.log("[SPONSORS_FIRESTORE_DEBUG] seeding started");
  try {
    const list = defaultSponsors && defaultSponsors.length ? defaultSponsors : (DEFAULT_DATA.sponsors || []);
    for (const sponsor of list) {
      const { id: _oldId, ...sponsorPayload } = sponsor;
      await addDoc(collection(db, "sponsors"), {
        ...sponsorPayload,
        createdAt: serverTimestamp(),
      });
      console.log(`[SPONSORS_FIRESTORE_DEBUG] seeded sponsor: ${sponsor.name}`);
    }
    console.log("[SPONSORS_FIRESTORE_DEBUG] seeding completed");
  } catch (err) {
    console.warn(`[SPONSORS_FIRESTORE_DEBUG] seed error: ${err?.code || ''} ${err?.message || err}`);
  } finally {
    isSeedingSponsors = false;
  }
};

const mergeGalleryLists = (firestoreGallery, baseGallery) => {
  const firestoreIds = new Set(firestoreGallery.map((g) => g.id));
  const firestoreTitles = new Set(firestoreGallery.map((g) => (g.title ? g.title.toLowerCase().trim() : "")));

  const uniqueBase = (baseGallery || []).filter(
    (b) => !firestoreIds.has(b.id) && !firestoreTitles.has(b.title ? b.title.toLowerCase().trim() : "")
  );

  return [...firestoreGallery, ...uniqueBase];
};

const normalizeGalleryItem = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title || "Untitled Photo",
    tripTitle: data.tripTitle || data.category || "",
    category: data.category ? String(data.category).toUpperCase() : (data.tripTitle ? String(data.tripTitle).toUpperCase() : "GENERAL"),
    imageKey: data.imageKey || "gallery1.jpg",
    height: typeof data.height === "number" ? data.height : Number(data.height) || 260,
    createdAt: data.createdAt || null,
  };
};

let isSeedingGallery = false;

const seedDefaultGallery = async (defaultGallery) => {
  if (isSeedingGallery) return;
  isSeedingGallery = true;
  console.log("[GALLERY_FIRESTORE_DEBUG] seeding started");
  try {
    const list = defaultGallery && defaultGallery.length ? defaultGallery : (DEFAULT_DATA.gallery || []);
    for (const item of list) {
      const { id: _oldId, ...itemPayload } = item;
      await addDoc(collection(db, "gallery"), {
        ...itemPayload,
        createdAt: serverTimestamp(),
      });
      console.log(`[GALLERY_FIRESTORE_DEBUG] seeded gallery item: ${item.title}`);
    }
    console.log("[GALLERY_FIRESTORE_DEBUG] seeding completed");
  } catch (err) {
    console.warn(`[GALLERY_FIRESTORE_DEBUG] seed error: ${err?.code || ''} ${err?.message || err}`);
  } finally {
    isSeedingGallery = false;
  }
};

const mergeInquiriesLists = (firestoreInquiries, baseInquiries) => {
  const firestoreIds = new Set(firestoreInquiries.map((i) => i.id));
  const firestoreEmails = new Set(firestoreInquiries.map((i) => (i.email ? i.email.toLowerCase().trim() : "")));

  const uniqueBase = (baseInquiries || []).filter(
    (b) => !firestoreIds.has(b.id) && !firestoreEmails.has(b.email ? b.email.toLowerCase().trim() : "")
  );

  return [...firestoreInquiries, ...uniqueBase];
};

const normalizeInquiry = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name || "Anonymous Traveler",
    email: data.email || "",
    phone: data.phone || "",
    city: data.city || "",
    destination: data.destination || "Northern Areas, Pakistan",
    travelDate: data.travelDate || "",
    travelers: data.travelers || "1 - 2 Person",
    adventureType: data.adventureType || "Hiking",
    message: data.message || "",
    status: data.status ? String(data.status).toUpperCase() : "NEW",
    dateSubmitted: data.dateSubmitted || new Date().toISOString().split("T")[0],
    createdAt: data.createdAt || null,
  };
};

let isSeedingInquiries = false;

const seedDefaultInquiries = async (defaultInquiries) => {
  if (isSeedingInquiries) return;
  isSeedingInquiries = true;
  console.log("[INQUIRIES_FIRESTORE_DEBUG] seeding started");
  try {
    const list = defaultInquiries && defaultInquiries.length ? defaultInquiries : (DEFAULT_DATA.inquiries || []);
    for (const inquiry of list) {
      const { id: _oldId, ...inquiryPayload } = inquiry;
      await addDoc(collection(db, "inquiries"), {
        ...inquiryPayload,
        createdAt: serverTimestamp(),
      });
      console.log(`[INQUIRIES_FIRESTORE_DEBUG] seeded inquiry: ${inquiry.name}`);
    }
    console.log("[INQUIRIES_FIRESTORE_DEBUG] seeding completed");
  } catch (err) {
    console.warn(`[INQUIRIES_FIRESTORE_DEBUG] seed error: ${err?.code || ''} ${err?.message || err}`);
  } finally {
    isSeedingInquiries = false;
  }
};

const parseDurationDays = (durationStr) => {
  if (!durationStr) return 9999;
  const match = String(durationStr).match(/\d+/);
  return match ? parseInt(match[0], 10) : 9999;
};

const normalizeTrip = (docSnap) => {
  const data = docSnap.data();
  // Generate consistent 3 to 4 digit fallback ID if not present in Firestore
  let tripCode = data.tripCode || data.code;
  if (!tripCode) {
    let hash = 0;
    const str = docSnap.id || "trip";
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % 9000;
    }
    tripCode = String(1000 + Math.abs(hash));
  }

  return {
    id: docSnap.id,
    tripCode: String(tripCode),
    title: data.title || "Untitled Trip",
    badge: data.badge || "Featured",
    location: data.location || "",
    description: data.description || "",
    aboutText: data.aboutText || data.description || "",
    duration: data.duration || "1 Day",
    difficulty: data.difficulty || "Easy",
    difficultyColor: data.difficultyColor || "#22C55E",
    price: data.price || "PKR 0",
    rawPrice: typeof data.rawPrice === "number" ? data.rawPrice : (data.rawPrice ? Number(data.rawPrice) : 0),
    imageKey: data.imageKey || "hunza.jpg",
    members: data.members ? String(data.members) : "0",
    status: data.status || "UPCOMING",
    category: data.category || "Hiking",
    groupSize: data.groupSize || "10 Max",
    bestSeason: data.bestSeason || "All Season",
    fitnessLevel: data.fitnessLevel || "Easy",
    tripStartDate: data.tripStartDate || "",
    tripEndDate: data.tripEndDate || "",
    numberOfBuses: data.numberOfBuses || "1",
    additionalServices: Array.isArray(data.additionalServices) ? data.additionalServices : [],
    includedFeatures: Array.isArray(data.includedFeatures) ? data.includedFeatures : [],
    itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
    createdAt: data.createdAt || null,
  };
};

let isSeedingTrips = false;

const seedDefaultTrips = async (defaultTrips) => {
  if (isSeedingTrips) return;
  isSeedingTrips = true;
  console.log("[TRIPS_FIRESTORE_DEBUG] seeding started");
  try {
    const list = defaultTrips && defaultTrips.length ? defaultTrips : (DEFAULT_DATA.trips || []);
    for (const trip of list) {
      const { id: _oldId, ...tripPayload } = trip;
      await addDoc(collection(db, "trips"), {
        ...tripPayload,
        createdAt: serverTimestamp(),
      });
      console.log(`[TRIPS_FIRESTORE_DEBUG] seeded trip: ${trip.title}`);
    }
    console.log("[TRIPS_FIRESTORE_DEBUG] seeding completed");
  } catch (err) {
    console.warn(`[TRIPS_FIRESTORE_DEBUG] seed error: ${err?.code || ''} ${err?.message || err}`);
  } finally {
    isSeedingTrips = false;
  }
};

// Asset Map for resolving local static images dynamically
export const ASSET_MAP = {
  "hero.jpg": require("../../assets/hero.jpg"),
  "hunza.jpg": require("../../assets/hunza.jpg"),
  "fairy.jpg": require("../../assets/fairy.jpg"),
  "skardu.jpg": require("../../assets/skardu.jpg"),
  "naran.jpg": require("../../assets/naran.jpg"),
  "hiking.jpg": require("../../assets/hiking.jpg"),
  "camping.jpg": require("../../assets/camping.jpg"),
  "trekking.jpg": require("../../assets/trekking.jpg"),
  "nature.jpg": require("../../assets/nature.jpg"),
  "hub1.jpg": require("../../assets/hub1.jpg"),
  "hub2.jpg": require("../../assets/hub2.jpg"),
  "hub3.jpg": require("../../assets/hub3.jpg"),
  "gallery1.jpg": require("../../assets/gallery1.jpg"),
  "gallery2.jpg": require("../../assets/gallery2.jpg"),
  "gallery3.jpg": require("../../assets/gallery3.jpg"),
  "gallery4.jpg": require("../../assets/gallery4.jpg"),
  "gallery5.jpg": require("../../assets/gallery5.jpg"),
  "gallery6.jpg": require("../../assets/gallery6.jpg"),
  "galleryHero.jpg": require("../../assets/galleryHero.jpg"),
  "about-bg.jpg": require("../../assets/about-bg.jpg"),
  "about-big.jpg": require("../../assets/about-big.jpg"),
  "about-small1.jpg": require("../../assets/about-small1.jpg"),
  "about-small2.jpg": require("../../assets/about-small2.jpg"),
  "aboutTrip.jpg": require("../../assets/aboutTrip.jpg"),
  "partnerhero.jpg": require("../../assets/partnerhero.jpg"),
  "partnerProfile.jpg": require("../../assets/partnerProfile.jpg"),
  "partnerBanner.jpg": require("../../assets/partnerBanner.jpg"),
  "contactHero.jpg": require("../../assets/contactHero.jpg"),
  "contactCard.jpg": require("../../assets/contactCard.jpg"),
  "guide1.jpg": require("../../assets/guide1.jpg"),
  "guide2.jpg": require("../../assets/guide2.jpg"),
  "guide3.jpg": require("../../assets/guide3.jpg"),
  "guide4.jpg": require("../../assets/guide4.jpg"),
  "tripHero.jpg": require("../../assets/tripHero.jpg"),
  "featured1.jpg": require("../../assets/featured1.jpg"),
  "featured2.jpg": require("../../assets/featured2.jpg"),
  "featured3.jpg": require("../../assets/featured3.jpg"),
  "adventure-bg.jpg": require("../../assets/adventure-bg.jpg"),
  "onboarding1.jpg": require("../../assets/onboarding1.jpg"),
  "onboarding2.jpg": require("../../assets/onboarding2.jpg"),
  "onboarding3.jpg": require("../../assets/onboarding3.jpg"),
  "galiyat-poster.jpg": require("../../assets/galiyat-poster.jpg"),
};

// Fast CDN Fallbacks for ultra-reliable image rendering
export const CDN_FALLBACKS = {
  "onboarding1.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
  "onboarding2.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
  "onboarding3.jpg": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  "hero.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
  "about-bg.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
  "about-big.jpg": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
  "about-small1.jpg": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  "about-small2.jpg": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "adventure-bg.jpg": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
  "hiking.jpg": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  "camping.jpg": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
  "trekking.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "nature.jpg": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "hunza.jpg": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
  "fairy.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  "skardu.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "naran.jpg": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  "galleryHero.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
};

export const resolveAsset = (imageRef, fallback = "hero.jpg") => {
  if (!imageRef) {
    return ASSET_MAP[fallback] || (CDN_FALLBACKS[fallback] ? { uri: CDN_FALLBACKS[fallback] } : { uri: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800" });
  }
  if (typeof imageRef === "number" || (typeof imageRef === "object" && imageRef.uri)) {
    return imageRef;
  }
  if (typeof imageRef === "string") {
    if (imageRef.startsWith("http://") || imageRef.startsWith("https://") || imageRef.startsWith("data:")) {
      return { uri: imageRef };
    }
    if (ASSET_MAP[imageRef]) {
      return ASSET_MAP[imageRef];
    }
    if (CDN_FALLBACKS[imageRef]) {
      return { uri: CDN_FALLBACKS[imageRef] };
    }
  }
  return ASSET_MAP[fallback] || (CDN_FALLBACKS[fallback] ? { uri: CDN_FALLBACKS[fallback] } : { uri: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800" });
};

// Initial default demo data synced across the entire Aces Adventure Club web application
const DEFAULT_DATA = {
  trips: [],

  featuredPosters: [
    {
      id: "galiyat-poster-1",
      posterKey: "galiyat-poster.jpg",
      badge: "🔥 FEATURED SPECIAL TRIP",
      title: "AN UNFORGETTABLE TRIP TO GALIYAT!",
      subtitle: "Ayubia • Pipeline Track • Dunga Gali • Nathia Gali • Wonderland Park",
      description:
        "Get ready for an exciting adventure filled with breathtaking views, thrilling experiences, music, bonfire, and unforgettable memories!",
      price: "Rs. 4,000/-",
      priceTag: "ONLY",
      departureTime: "6:00 AM",
      returnTime: "8:00 PM",
      pickupPoint: "Islamabad / Rawalpindi",
      services: [
        "Entry Tickets (Ayubia Tunnel, Pipeline Track & Park)",
        "Luxury Air-Conditioned Transport",
        "Delicious Dinner Included",
        "Bonfire Night & Music Entertainment",
      ],
      whatsappMsg: "Hello Ace Adventure Club! I want to book seats for the Galiyat Trip (Rs. 4,000/- ONLY). Please share booking details.",
      status: "ACTIVE",
    },
  ],

  sponsors: [
    {
      id: "1",
      sponsorName: "Tariq Malik",
      companyName: "Mountain Gear Pakistan",
      name: "Mountain Gear Pakistan",
      phone: "+92 300 1234567",
      email: "info@mountaingear.pk",
      contact: "info@mountaingear.pk",
      package: "Platinum",
      trips: "8",
      status: "ACTIVE",
    },
    {
      id: "2",
      sponsorName: "Hamza Abbasi",
      companyName: "Adventure World",
      name: "Adventure World",
      phone: "+92 321 9876543",
      email: "contact@adventureworld.com",
      contact: "contact@adventureworld.com",
      package: "Gold",
      trips: "5",
      status: "ACTIVE",
    },
    {
      id: "3",
      sponsorName: "Zainab Raza",
      companyName: "Peak Sports",
      name: "Peak Sports",
      phone: "+92 333 4567890",
      email: "hello@peaksports.pk",
      contact: "hello@peaksports.pk",
      package: "Silver",
      trips: "3",
      status: "ACTIVE",
    },
    {
      id: "4",
      sponsorName: "Faisal Qureshi",
      companyName: "Travel Heights",
      name: "Travel Heights",
      phone: "+92 345 5678901",
      email: "info@travelheights.com",
      contact: "info@travelheights.com",
      package: "Gold",
      trips: "4",
      status: "INACTIVE",
    },
  ],

  officialPartner: {
    name: "Mountain Gear Pakistan",
    tag1: "Outdoor Equipment",
    tag2: "Expedition Supplier",
    description:
      "Mountain Gear Pakistan is a premier outdoor equipment company dedicated to supporting outdoor tourism and adventure seekers. By providing state-of-the-art gear and expert equipment logistics, they ensure every trek into the heart of the Karakoram is backed by safety, reliability, and world-class equipment.",
    imageKey: "partnerProfile.jpg",
  },

  partnerBenefits: [
    {
      id: "1",
      title: "Professional Guides",
      description: "Access to our network of top-tier mountain guides and local field leaders.",
      icon: "person-outline",
    },
    {
      id: "2",
      title: "Camping Equipment",
      description: "All-weather high-altitude tents and sleeping systems for expeditions.",
      icon: "bonfire-outline",
    },
    {
      id: "3",
      title: "Travel Insurance",
      description: "Comprehensive coverage for high-altitude trekking and emergency medical care.",
      icon: "shield-checkmark-outline",
    },
    {
      id: "4",
      title: "Photographic Support",
      description: "Professional media coverage to capture your journey in high definition.",
      icon: "camera-outline",
    },
    {
      id: "5",
      title: "Member Discount Rates",
      description: "Special member rates for equipment rental, gear gear, and expedition supplies.",
      icon: "pricetag-outline",
    },
    {
      id: "6",
      title: "24/7 Field Support",
      description: "Dedicated emergency response team and 24/7 satellite communication.",
      icon: "call-outline",
    },
  ],

  gallery: [
    { id: "1", title: "Hunza Valley Peaks", imageKey: "gallery1.jpg", category: "MOUNTAINS", height: 260 },
    { id: "2", title: "Alpine Mountain Ridge", imageKey: "gallery2.jpg", category: "MOUNTAINS", height: 190 },
    { id: "3", title: "Turquoise Lake View", imageKey: "gallery3.jpg", category: "LAKES", height: 290 },
    { id: "4", title: "Under The Stars Camp", imageKey: "gallery4.jpg", category: "CAMPING", height: 260 },
    { id: "5", title: "Glacier Trek Path", imageKey: "gallery5.jpg", category: "TREKKING", height: 330 },
    { id: "6", title: "Pine Forest Trail", imageKey: "gallery6.jpg", category: "NATURE TRAILS", height: 230 },
    { id: "7", title: "High Altitude Hike", imageKey: "hiking.jpg", category: "TREKKING", height: 270 },
    { id: "8", title: "Wilderness Camping", imageKey: "camping.jpg", category: "CAMPING", height: 250 },
    { id: "9", title: "Fairy Meadows Night", imageKey: "fairy.jpg", category: "MOUNTAINS", height: 280 },
    { id: "10", title: "Scenic Hub Camp", imageKey: "hub2.jpg", category: "CAMPING", height: 240 },
    { id: "11", title: "Crystal Lake Basin", imageKey: "hub3.jpg", category: "LAKES", height: 300 },
    { id: "12", title: "Pristine Nature Track", imageKey: "nature.jpg", category: "NATURE TRAILS", height: 250 },
  ],

  /** @type {any[]} */
  users: [],

  inquiries: [
    {
      id: "1",
      name: "Aiden Vance",
      email: "aiden.v@luxury.com",
      phone: "+92 300 1234567",
      destination: "Northern Areas, Pakistan",
      travelDate: "10/15/2026",
      travelers: "1 - 2 Person",
      adventureType: "Hiking",
      message: "I am looking for a secluded trekking experience with luxury camping amenities...",
      status: "NEW",
      dateSubmitted: "2026-09-06",
    },
    {
      id: "2",
      name: "Sara Khan",
      email: "sara.k@travelers.pk",
      phone: "+92 345 8889900",
      destination: "Skardu & Deosai",
      travelDate: "11/01/2026",
      travelers: "3 - 5 Person",
      adventureType: "Camping",
      message: "Interested in the 10-day Skardu adventure trip for our corporate group.",
      status: "CONTACTED",
      dateSubmitted: "2026-09-04",
    },
  ],

  homeContent: {
    heroBadge: "• Premium Adventure Club •",
    heroHeadingWhite: "EXPLORE THE WILD",
    heroHeadingBlue: "CREATE MEMORIES",
    heroParagraph:
      "Embark on a journey to the most remote corners of Pakistan. Experience the beauty of nature through curated expeditions.",
    aboutSmallTitle: "WHO WE ARE",
    aboutTitleWhite: "More Than a Destination\n",
    aboutTitleBlue: "Experiences.",
    aboutP1:
      "At Aces Adventure Club, we believe travel is not just about reaching a destination. It's about discovering your passion, overcoming challenges, and creating unforgettable memories.",
    aboutP2:
      "We bring together outdoor enthusiasts, solo travelers, and adventure seekers through carefully curated hiking, camping, and trekking experiences.",
    statTrips: "100+",
    statTripsLabel: "TRIPS COMPLETED",
    statExplorers: "500+",
    statExplorersLabel: "ELITE EXPLORERS",
    statDestinations: "50+",
    statDestinationsLabel: "GLOBAL DESTINATIONS",
    statGuides: "20+",
    statGuidesLabel: "EXPERT GUIDES",
  },

  aboutContent: {
    heroBadge: "• PASSION & ADVENTURE •",
    heroTitle: "About Adventure\nClub",
    heroDescription:
      "Founded on the principle of absolute excellence, ACES Adventure Club curates the world's most exclusive nature expeditions. We bridge the gap between raw wilderness and luxury experiences for passionate explorers.",
    missionTitle: "OUR MISSION",
    missionP1:
      "We exist to redefine the parameters of discovery. At Aces Adventure Club, our mission is to provide more than just a path through the wilderness; we aim to foster an inner journey, one that challenges the spirit and expands the mind.",
    missionP2:
      "We believe true luxury is found in the silence of a canyon, the clarity of a mountain stream, and the warmth shared between fellow travelers under a canopy of stars. Our service remains rigorous, ensuring every destination meets our high standards for safety, authenticity, and wonder.",
    quote: '"IN EVERY WALK WITH NATURE, ONE RECEIVES FAR MORE THAN HE SEEKS."',
    principles: [
      {
        id: "1",
        title: "ADVENTURE FIRST",
        desc: "We pursue the unknown with relentless passion and a non-stop craving for discovery.",
        icon: "compass-outline",
      },
      {
        id: "2",
        title: "SAFETY ALWAYS",
        desc: "Our guide protocols and equipment maintain your security as our highest priority.",
        icon: "shield-checkmark-outline",
      },
      {
        id: "3",
        title: "COMMUNITY SPIRIT",
        desc: "We foster lifelong bonds among our members, creating an inclusive global brotherhood of explorers.",
        icon: "people-outline",
      },
      {
        id: "4",
        title: "RESPECT FOR NATURE",
        desc: "We are guardians of the wilderness, committed to strict leave-no-trace principles and conservation.",
        icon: "leaf-outline",
      },
    ],
    guidesTitle: "MEET OUR GUIDES",
    guidesDescription:
      "Each guide is a master of the mountains, highly skilled in rescue, navigation, and passion for sharing the wild.",
    guides: [
      {
        id: "1",
        name: "MARCUS THORNE",
        category: "CHIEF EXPEDITION LEAD",
        imageKey: "guide1.jpg",
      },
      {
        id: "2",
        name: "ELENA VANCE",
        category: "ALPINE GUIDE",
        imageKey: "guide2.jpg",
      },
      {
        id: "3",
        name: "JULIAN BECK",
        category: "SURVIVAL EXPERT",
        imageKey: "guide3.jpg",
      },
      {
        id: "4",
        name: "SOFIA RICCI",
        category: "SAFETY OFFICER",
        imageKey: "guide4.jpg",
      },
    ],
  },

  contactContent: {
    phone: "+92 312 1578099",
    phoneHours: "Mon–Fri, 9am - 6pm PKT",
    email: "info.acesadventureclub@gmail.com",
    emailSubtitle: "Inquiry & Support",
    location: "Attock, Punjab, Pakistan",
    locationSubtitle: "The Gateway to the North",
    facebook: "https://www.facebook.com/acesadventureclub",
    instagram: "https://www.instagram.com/aces_adventure_club/",
    youtube: "https://www.youtube.com/@AcesAdventureClub-007",
    whatsapp: "+923121578099",
    goldStandards: [
      "Carefully Curated Adventures",
      "Safe and Expert-Guided Experiences",
      "Luxury Off-grid Accommodations",
      "24/7 Concierge for Expeditions",
      "Sustainability & Minimal Impact",
    ],
  },

  socialLinks: {
    facebook: "https://www.facebook.com/acesadventureclub",
    instagram: "https://www.instagram.com/aces_adventure_club/",
    youtube: "https://www.youtube.com/@AcesAdventureClub-007",
    whatsapp: "+923121578099",
  },

  onboardingContent: {
    slide1: {
      headingWhite: "DISCOVER ADVENTURE\n",
      headingBlue: "BEYOND LIMITS",
      paragraph:
        "Explore breathtaking destinations, hiking trails and unforgettable experiences crafted for passionate explorers.",
      imageKey: "onboarding1.jpg",
    },
    slide2: {
      headingWhite: "JOIN EXCLUSIVE\n",
      headingBlue: "EXPEDITIONS",
      paragraph:
        "Travel with expert guides, high-altitude specialists, and a community of passionate adventurers across Pakistan.",
      imageKey: "onboarding2.jpg",
    },
    slide3: {
      headingWhite: "UNFORGETTABLE\n",
      headingBlue: "MOMENTS",
      paragraph:
        "Connect with nature, conquer majestic summits, and create stories that stay with you forever.",
      imageKey: "onboarding3.jpg",
    },
  },
  tripCategories: [
    "Hiking",
    "Camping",
    "Trekking",
    "Nature Trails",
    "Mountaineering",
    "Road Trip",
  ],
  tripBadges: [
    "Featured",
    "Popular",
    "Recommended",
    "Elite",
    "Trending",
  ],
};

const STORAGE_KEY = "aces_adventure_club_v3_store";
const TRIPS_CACHE_KEY = "aces_club_trips_cache";
const POSTERS_CACHE_KEY = "aces_club_featured_posters_cache";

const getInitialStore = () => {
  let initial = { ...DEFAULT_DATA };
  if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
    try {
      const cachedTrips = window.localStorage.getItem(TRIPS_CACHE_KEY);
      if (cachedTrips) {
        const parsedCached = JSON.parse(cachedTrips);
        if (Array.isArray(parsedCached) && parsedCached.length > 0) {
          initial.trips = parsedCached;
        }
      }
      const cachedPosters = window.localStorage.getItem(POSTERS_CACHE_KEY);
      if (cachedPosters) {
        const parsedPosters = JSON.parse(cachedPosters);
        if (Array.isArray(parsedPosters) && parsedPosters.length > 0) {
          initial.featuredPosters = parsedPosters;
        }
      }
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const { users: _persistedUsers, trips: _persistedTrips, sponsors: _persistedSponsors, gallery: _persistedGallery, inquiries: _persistedInquiries, ...restParsed } = parsed;
        initial = {
          ...initial,
          ...restParsed,
          homeContent: { ...initial.homeContent, ...(parsed.homeContent || {}) },
          aboutContent: { ...initial.aboutContent, ...(parsed.aboutContent || {}) },
          contactContent: {
            ...DEFAULT_DATA.contactContent,
            ...(parsed.contactContent || {}),
            facebook: parsed.contactContent?.facebook || parsed.socialLinks?.facebook || DEFAULT_DATA.socialLinks.facebook,
            instagram: parsed.contactContent?.instagram || parsed.socialLinks?.instagram || DEFAULT_DATA.socialLinks.instagram,
            youtube: parsed.contactContent?.youtube || parsed.socialLinks?.youtube || DEFAULT_DATA.socialLinks.youtube,
            whatsapp: parsed.contactContent?.whatsapp || parsed.socialLinks?.whatsapp || DEFAULT_DATA.socialLinks.whatsapp,
          },
          socialLinks: {
            ...DEFAULT_DATA.socialLinks,
            ...(parsed.socialLinks || {}),
            facebook: parsed.socialLinks?.facebook || parsed.contactContent?.facebook || DEFAULT_DATA.socialLinks.facebook,
            instagram: parsed.socialLinks?.instagram || parsed.contactContent?.instagram || DEFAULT_DATA.socialLinks.instagram,
            youtube: parsed.socialLinks?.youtube || parsed.contactContent?.youtube || DEFAULT_DATA.socialLinks.youtube,
            whatsapp: parsed.socialLinks?.whatsapp || parsed.contactContent?.whatsapp || DEFAULT_DATA.socialLinks.whatsapp,
          },
          onboardingContent: { ...initial.onboardingContent, ...(parsed.onboardingContent || {}) },
          tripCategories: (Array.isArray(parsed.tripCategories) && parsed.tripCategories.length > 0)
            ? parsed.tripCategories
            : initial.tripCategories,
          tripBadges: (Array.isArray(parsed.tripBadges) && parsed.tripBadges.length > 0)
            ? parsed.tripBadges
            : initial.tripBadges,
        };
      }
    } catch (e) {
      console.warn("Could not load initial store from localStorage:", e);
    }
  }
  return initial;
};

const DataContext = createContext({
  ...DEFAULT_DATA,
  tripsLoading: false,
  // Preset options CRUD
  addTripCategory: (_cat) => { },
  deleteTripCategory: (_cat) => { },
  addTripBadge: (_badge) => { },
  deleteTripBadge: (_badge) => { },
  // CRUD operations
  addFeaturedPoster: (_poster) => { },
  updateFeaturedPoster: (_id, _updatedFields) => { },
  deleteFeaturedPoster: (_id) => { },
  addTrip: (_trip) => { },
  updateTrip: (_id, _updatedFields) => { },
  deleteTrip: (_id) => { },
  addSponsor: (_sponsor) => { },
  updateSponsor: (_id, _updatedFields) => { },
  deleteSponsor: (_id) => { },
  updateOfficialPartner: (_fields) => { },
  addGalleryItem: (_item) => { },
  updateGalleryItem: (_id, _updatedFields) => { },
  deleteGalleryItem: (_id) => { },
  addUser: (_user) => { },
  updateUser: (_id, _updatedFields) => { },
  deleteUser: (_id) => { },
  deleteAllUsersExceptSuperAdmin: () => { },
  addInquiry: (_inquiry) => { },
  updateInquiryStatus: (_id, _status) => { },
  deleteInquiry: (_id) => { },
  updateHomeContent: (_fields) => { },
  updateAboutContent: (_fields) => { },
  addGuide: (_guide) => { },
  updateGuide: (_id, _fields) => { },
  deleteGuide: (_id) => { },
  updateContactContent: (_fields) => { },
  updateSocialLinks: (_fields) => { },
  updateOnboardingContent: (_slideKey, _fields) => { },
  resetToDefaults: () => { },
});

export const DataProvider = ({ children }) => {
  const [store, setStore] = useState(getInitialStore);
  const [tripsLoading, setTripsLoading] = useState(() => {
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        const cached = window.localStorage.getItem(TRIPS_CACHE_KEY);
        if (cached && JSON.parse(cached)?.length > 0) return false;
      } catch (_) { }
    }
    return true;
  });

  console.log("[USERS_DEBUG] DataProvider mounted. Current store.users count:", store.users.length);

  // Load persisted store from localStorage on init
  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        // Fast-load cached trips so page doesn't show blank while Firestore connects
        const cachedTrips = window.localStorage.getItem(TRIPS_CACHE_KEY);
        if (cachedTrips) {
          const parsedCached = JSON.parse(cachedTrips);
          if (Array.isArray(parsedCached) && parsedCached.length > 0) {
            setStore((prev) => ({ ...prev, trips: parsedCached }));
            setTripsLoading(false);
          }
        }

        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const { users: _persistedUsers, trips: _persistedTrips, sponsors: _persistedSponsors, gallery: _persistedGallery, inquiries: _persistedInquiries, ...restParsed } = parsed;
          setStore((prev) => ({
            ...prev,
            ...restParsed,
            // Ensure any new structure defaults are preserved
            homeContent: { ...prev.homeContent, ...(parsed.homeContent || {}) },
            aboutContent: { ...prev.aboutContent, ...(parsed.aboutContent || {}) },
            contactContent: {
              ...DEFAULT_DATA.contactContent,
              ...(parsed.contactContent || {}),
              facebook: parsed.contactContent?.facebook || parsed.socialLinks?.facebook || DEFAULT_DATA.socialLinks.facebook,
              instagram: parsed.contactContent?.instagram || parsed.socialLinks?.instagram || DEFAULT_DATA.socialLinks.instagram,
              youtube: parsed.contactContent?.youtube || parsed.socialLinks?.youtube || DEFAULT_DATA.socialLinks.youtube,
              whatsapp: parsed.contactContent?.whatsapp || parsed.socialLinks?.whatsapp || DEFAULT_DATA.socialLinks.whatsapp,
            },
            socialLinks: {
              ...DEFAULT_DATA.socialLinks,
              ...(parsed.socialLinks || {}),
              facebook: parsed.socialLinks?.facebook || parsed.contactContent?.facebook || DEFAULT_DATA.socialLinks.facebook,
              instagram: parsed.socialLinks?.instagram || parsed.contactContent?.instagram || DEFAULT_DATA.socialLinks.instagram,
              youtube: parsed.socialLinks?.youtube || parsed.contactContent?.youtube || DEFAULT_DATA.socialLinks.youtube,
              whatsapp: parsed.socialLinks?.whatsapp || parsed.contactContent?.whatsapp || DEFAULT_DATA.socialLinks.whatsapp,
            },
            onboardingContent: { ...prev.onboardingContent, ...(parsed.onboardingContent || {}) },
            tripCategories: (Array.isArray(parsed.tripCategories) && parsed.tripCategories.length > 0)
              ? parsed.tripCategories
              : prev.tripCategories,
            tripBadges: (Array.isArray(parsed.tripBadges) && parsed.tripBadges.length > 0)
              ? parsed.tripBadges
              : prev.tripBadges,
          }));
        }
      } catch (e) {
        console.warn("[USERS_DEBUG] Could not read DataContext from localStorage", e);
      }
    }
  }, []);

  // Real-time Firestore listener for Users collection (auto re-subscribes on login/logout)
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const subscribeUsers = () => {
      console.log("[ADMIN_USERS_READ_DEBUG] Subscribing/Re-subscribing Firestore listener for 'users'...");
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }

      const usersRef = collection(db, "users");
      unsubscribeSnapshot = onSnapshot(
        usersRef,
        (snapshot) => {
          console.log(`[ADMIN_USERS_READ_DEBUG] Documents received by onSnapshot: ${snapshot.docs.length}`);
          const fetchedUsers = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            const isSuperAdminUser =
              docSnap.id === "dAA4wFxhnjZHLP5yQA4lwuiSKDv1" ||
              (data.email && data.email.toLowerCase() === "superadmin@acesclub.com") ||
              (data.role && (data.role.toString().toUpperCase() === "SUPER ADMIN" || data.role.toString().toUpperCase() === "SUPER_ADMIN"));

            const isVerified =
              isSuperAdminUser ||
              data.emailVerified === true ||
              data.isVerified === true ||
              String(data.status).toUpperCase() === "VERIFIED";

            const rawStatus = String(data.status || "").toUpperCase();
            const resolvedStatus = isSuperAdminUser
              ? "ACTIVE"
              : rawStatus === "INACTIVE"
                ? "INACTIVE"
                : isVerified
                  ? "VERIFIED"
                  : normalizeStatus(data.status);

            return {
              id: docSnap.id,
              name: data.name || data.fullName || (isSuperAdminUser ? "Super Admin" : "Member"),
              email: data.email || (isSuperAdminUser ? "superadmin@acesclub.com" : ""),
              role: isSuperAdminUser ? "Super Admin" : normalizeRole(data.role),
              status: resolvedStatus,
              joined: normalizeJoined(data.joined, data.createdAt),
              phone: isSuperAdminUser ? (data.phone || "+92 340 5866007") : (data.phone || ""),
              location: data.location || "",
              createdAt: data.createdAt || null,
              emailVerified: isVerified,
              isVerified: isVerified,
            };
          });

          setStore((prev) => {
            return {
              ...prev,
              users: fetchedUsers,
            };
          });
        },
        (error) => {
          console.warn("[ADMIN_USERS_READ_DEBUG] Firestore listener error/warning:", error?.code, error?.message);
        }
      );
    };

    subscribeUsers();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("[ADMIN_USERS_READ_DEBUG] Auth state changed. Re-subscribing users listener for:", user?.email || "Signed out");
      subscribeUsers();
    });

    return () => {
      console.log("[ADMIN_USERS_READ_DEBUG] Unsubscribing Firestore users listener and auth observer");
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  // Real-time Firestore listener for Trips collection
  useEffect(() => {
    console.log("[TRIPS_FIRESTORE_DEBUG] listener started");

    const tripsRef = collection(db, "trips");
    const unsubscribe = onSnapshot(
      tripsRef,
      (snapshot) => {
        console.log(`[TRIPS_FIRESTORE_DEBUG] snapshot size: ${snapshot.docs.length}`);
        setTripsLoading(false);

        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("[TRIPS_FIRESTORE_DEBUG] Firestore trips collection is empty.");
          if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
            window.localStorage.removeItem(TRIPS_CACHE_KEY);
          }
          setStore((prev) => ({
            ...prev,
            trips: [],
          }));
        } else {
          const fetchedTrips = snapshot.docs.map(normalizeTrip);
          // Sort trips in ascending order by duration (days: 1, 2, 3...)
          fetchedTrips.sort((a, b) => parseDurationDays(a.duration) - parseDurationDays(b.duration));

          if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
            try {
              window.localStorage.setItem(TRIPS_CACHE_KEY, JSON.stringify(fetchedTrips));
            } catch (_) { }
          }

          setStore((prev) => {
            console.log(`[TRIPS_FIRESTORE_DEBUG] DataContext store.trips updated with fetched length: ${fetchedTrips.length}`);
            return {
              ...prev,
              trips: fetchedTrips,
            };
          });
        }
      },
      (error) => {
        console.warn(`[TRIPS_FIRESTORE_DEBUG] listener error: ${error?.code || ''} ${error?.message || error}`);
        setTripsLoading(false);
      }
    );

    return () => {
      console.log("[TRIPS_FIRESTORE_DEBUG] listener stopped");
      unsubscribe();
    };
  }, []);

  // Real-time Firestore listener for Sponsors collection
  useEffect(() => {
    console.log("[SPONSORS_FIRESTORE_DEBUG] listener started");

    const sponsorsRef = collection(db, "sponsors");
    const unsubscribe = onSnapshot(
      sponsorsRef,
      (snapshot) => {
        console.log(`[SPONSORS_FIRESTORE_DEBUG] snapshot size: ${snapshot.docs.length}`);

        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("[SPONSORS_FIRESTORE_DEBUG] Firestore sponsors collection is empty.");
          setStore((prev) => ({
            ...prev,
            sponsors: [],
          }));
        } else {
          const fetchedSponsors = snapshot.docs.map(normalizeSponsor);
          setStore((prev) => {
            console.log(`[SPONSORS_FIRESTORE_DEBUG] DataContext store.sponsors updated with fetched length: ${fetchedSponsors.length}`);
            return {
              ...prev,
              sponsors: fetchedSponsors,
            };
          });
        }
      },
      (error) => {
        console.warn(`[SPONSORS_FIRESTORE_DEBUG] listener error: ${error?.code || ''} ${error?.message || error}`);
      }
    );

    return () => {
      console.log("[SPONSORS_FIRESTORE_DEBUG] listener stopped");
      unsubscribe();
    };
  }, []);

  // Real-time Firestore listener for Gallery collection
  useEffect(() => {
    console.log("[GALLERY_FIRESTORE_DEBUG] listener started");

    const galleryRef = collection(db, "gallery");
    const unsubscribe = onSnapshot(
      galleryRef,
      (snapshot) => {
        console.log(`[GALLERY_FIRESTORE_DEBUG] snapshot size: ${snapshot.docs.length}`);

        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("[GALLERY_FIRESTORE_DEBUG] Firestore gallery collection is empty.");
          setStore((prev) => ({
            ...prev,
            gallery: [],
          }));
        } else {
          const fetchedGallery = snapshot.docs.map(normalizeGalleryItem);
          setStore((prev) => {
            console.log(`[GALLERY_FIRESTORE_DEBUG] DataContext store.gallery updated with fetched length: ${fetchedGallery.length}`);
            return {
              ...prev,
              gallery: fetchedGallery,
            };
          });
        }
      },
      (error) => {
        console.warn(`[GALLERY_FIRESTORE_DEBUG] listener error: ${error?.code || ''} ${error?.message || error}`);
      }
    );

    return () => {
      console.log("[GALLERY_FIRESTORE_DEBUG] listener stopped");
      unsubscribe();
    };
  }, []);

  // Real-time Firestore listener for Inquiries collection
  useEffect(() => {
    console.log("[INQUIRIES_FIRESTORE_DEBUG] listener started");

    const inquiriesRef = collection(db, "inquiries");
    const unsubscribe = onSnapshot(
      inquiriesRef,
      (snapshot) => {
        console.log(`[INQUIRIES_FIRESTORE_DEBUG] snapshot size: ${snapshot.docs.length}`);

        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("[INQUIRIES_FIRESTORE_DEBUG] Firestore inquiries collection is empty. Triggering automatic seed...");
          seedDefaultInquiries(DEFAULT_DATA.inquiries);
          setStore((prev) => ({
            ...prev,
            inquiries: prev.inquiries && prev.inquiries.length ? prev.inquiries : DEFAULT_DATA.inquiries,
          }));
        } else {
          const fetchedInquiries = snapshot.docs.map(normalizeInquiry);
          setStore((prev) => {
            const mergedInquiries = mergeInquiriesLists(fetchedInquiries, prev.inquiries && prev.inquiries.length ? prev.inquiries : DEFAULT_DATA.inquiries);
            console.log(`[INQUIRIES_FIRESTORE_DEBUG] DataContext store.inquiries updated with merged length: ${mergedInquiries.length}`);
            return {
              ...prev,
              inquiries: mergedInquiries,
            };
          });
        }
      },
      (error) => {
        console.warn(`[INQUIRIES_FIRESTORE_DEBUG] listener error (retaining default inquiries): ${error?.code || ''} ${error?.message || error}`);
        setStore((prev) => ({
          ...prev,
          inquiries: prev.inquiries && prev.inquiries.length ? prev.inquiries : DEFAULT_DATA.inquiries,
        }));
      }
    );

    return () => {
      console.log("[INQUIRIES_FIRESTORE_DEBUG] listener stopped");
      unsubscribe();
    };
  }, []);

  // Real-time Firestore listener for Social & Contact Settings (with graceful fallback)
  useEffect(() => {
    let unsubSocial = null;
    let unsubContact = null;
    try {
      const socialDocRef = doc(db, "settings", "social");
      unsubSocial = onSnapshot(
        socialDocRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setStore((prev) => ({
              ...prev,
              socialLinks: {
                ...(prev.socialLinks || DEFAULT_DATA.socialLinks),
                ...data,
              },
              contactContent: {
                ...(prev.contactContent || DEFAULT_DATA.contactContent),
                ...data,
              },
            }));
          }
        },
        (error) => {
          console.log("[SETTINGS_DEBUG] Firestore social listener note:", error?.message);
        }
      );

      const contactDocRef = doc(db, "settings", "contact");
      unsubContact = onSnapshot(
        contactDocRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setStore((prev) => ({
              ...prev,
              contactContent: {
                ...(prev.contactContent || DEFAULT_DATA.contactContent),
                ...data,
              },
            }));
          }
        },
        (error) => {
          console.log("[SETTINGS_DEBUG] Firestore contact listener note:", error?.message);
        }
      );
    } catch (e) {
      console.log("[SETTINGS_DEBUG] Could not attach firestore settings listener:", e);
    }
    return () => {
      if (unsubSocial) unsubSocial();
      if (unsubContact) unsubContact();
    };
  }, []);

  // Real-time Firestore listener for Featured Posters collection
  useEffect(() => {
    console.log("[POSTERS_FIRESTORE_DEBUG] listener started");

    const postersRef = collection(db, "featured_posters");
    const unsubscribe = onSnapshot(
      postersRef,
      async (snapshot) => {
        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("[POSTERS_FIRESTORE_DEBUG] collection is empty, checking initial default...");
          // If first time, seed default Galiyat poster
          try {
            const defaultItem = DEFAULT_DATA.featuredPosters[0];
            await addDoc(collection(db, "featured_posters"), {
              ...defaultItem,
              createdAt: serverTimestamp(),
            });
          } catch (e) {
            console.warn("[POSTERS_FIRESTORE_DEBUG] seed error:", e);
          }
        } else {
          const fetched = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              posterKey: data.posterKey || "galiyat-poster.jpg",
              badge: data.badge || "🔥 FEATURED SPECIAL TRIP",
              title: data.title || "AN UNFORGETTABLE TRIP TO GALIYAT!",
              subtitle: data.subtitle || "",
              description: data.description || "",
              price: data.price || "Rs. 4,000/-",
              priceTag: data.priceTag || "ONLY",
              departureTime: data.departureTime || "6:00 AM",
              returnTime: data.returnTime || "8:00 PM",
              pickupPoint: data.pickupPoint || "Islamabad / Rawalpindi",
              services: Array.isArray(data.services)
                ? data.services
                : (typeof data.services === "string" ? data.services.split(",").map((s) => s.trim()).filter(Boolean) : []),
              whatsappMsg: data.whatsappMsg || "",
              status: data.status ? String(data.status).toUpperCase() : "ACTIVE",
              createdAt: data.createdAt || null,
            };
          });

          if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
            try {
              window.localStorage.setItem(POSTERS_CACHE_KEY, JSON.stringify(fetched));
            } catch (_) { }
          }

          setStore((prev) => ({
            ...prev,
            featuredPosters: fetched,
          }));
        }
      },
      (error) => {
        console.warn("[POSTERS_FIRESTORE_DEBUG] listener error:", error?.message || error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // FEATURED POSTERS CRUD
  const addFeaturedPoster = async (poster) => {
    const tempId = "temp_" + Date.now();
    const payload = {
      posterKey: poster.posterKey || "galiyat-poster.jpg",
      badge: poster.badge || "🔥 FEATURED SPECIAL TRIP",
      title: poster.title || "New Promo Tour",
      subtitle: poster.subtitle || "",
      description: poster.description || "",
      price: poster.price || "PKR 0",
      priceTag: poster.priceTag || "ONLY",
      departureTime: poster.departureTime || "6:00 AM",
      returnTime: poster.returnTime || "8:00 PM",
      pickupPoint: poster.pickupPoint || "Islamabad / Rawalpindi",
      services: Array.isArray(poster.services)
        ? poster.services
        : (typeof poster.services === "string" ? poster.services.split(",").map((s) => s.trim()).filter(Boolean) : []),
      whatsappMsg: poster.whatsappMsg || "",
      status: poster.status ? String(poster.status).toUpperCase() : "ACTIVE",
      createdAt: serverTimestamp(),
    };

    setStore((prev) => {
      const updated = [{ id: tempId, ...payload }, ...(prev.featuredPosters || [])];
      if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
        try { window.localStorage.setItem(POSTERS_CACHE_KEY, JSON.stringify(updated)); } catch (_) { }
      }
      return { ...prev, featuredPosters: updated };
    });

    try {
      const docRef = await addDoc(collection(db, "featured_posters"), payload);
      return { id: docRef.id, ...payload };
    } catch (e) {
      console.warn("[POSTERS_DEBUG] addDoc error:", e);
      throw e;
    }
  };

  const updateFeaturedPoster = async (id, updatedFields) => {
    setStore((prev) => {
      const updated = (prev.featuredPosters || []).map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
        try { window.localStorage.setItem(POSTERS_CACHE_KEY, JSON.stringify(updated)); } catch (_) { }
      }
      return { ...prev, featuredPosters: updated };
    });

    try {
      const docRef = doc(db, "featured_posters", id);
      const { id: _ignore, ...payload } = updatedFields;
      await updateDoc(docRef, payload);
    } catch (e) {
      console.warn("[POSTERS_DEBUG] updateDoc error:", e);
    }
  };

  const deleteFeaturedPoster = async (id) => {
    setStore((prev) => {
      const updated = (prev.featuredPosters || []).filter((p) => p.id !== id);
      if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
        try { window.localStorage.setItem(POSTERS_CACHE_KEY, JSON.stringify(updated)); } catch (_) { }
      }
      return { ...prev, featuredPosters: updated };
    });

    try {
      const docRef = doc(db, "featured_posters", id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn("[POSTERS_DEBUG] deleteDoc error:", e);
    }
  };

  // Save changes to localStorage (excluding users, trips, sponsors, gallery, and inquiries collections managed by Firestore)
  const saveStore = (updated) => {
    setStore(updated);
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        const { users: _u, trips: _t, sponsors: _s, gallery: _g, inquiries: _i, ...toStore } = updated;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (e) {
        console.warn("Could not write DataContext to localStorage", e);
      }
    }
  };

  // TRIP CRUD (Connected to Firestore with optimistic UI updates)
  const addTrip = async (trip) => {
    console.log("[TRIPS_FIRESTORE_DEBUG] addTrip called with:", trip);
    const rawP = trip.rawPrice ? Number(trip.rawPrice) : (trip.price ? Number(String(trip.price).replace(/[^0-9]/g, '')) || 0 : 0);
    const formattedPrice = trip.price || (rawP > 0 ? `PKR ${rawP.toLocaleString()}` : "PKR 0");

    // Generate a unique 3 to 4 digit tripCode (e.g., 100 - 9999)
    const existingCodes = new Set((store.trips || []).map((t) => String(t.tripCode || '')));
    let newTripCode = "";
    for (let attempts = 0; attempts < 50; attempts++) {
      // Pick random 3 or 4 digit code between 100 and 9999
      const candidate = String(Math.floor(100 + Math.random() * 9900));
      if (!existingCodes.has(candidate)) {
        newTripCode = candidate;
        break;
      }
    }
    if (!newTripCode) {
      newTripCode = String(Date.now()).slice(-4);
    }

    const tempId = "temp_" + Date.now();
    const payload = {
      tripCode: newTripCode,
      title: trip.title || "New Expedition",
      badge: trip.badge || "Featured",
      location: trip.location || "Northern Areas, Pakistan",
      description: trip.description || "",
      aboutText: trip.aboutText || trip.description || "",
      duration: trip.duration || "5 Days",
      difficulty: trip.difficulty || "Easy",
      difficultyColor: trip.difficultyColor || "#22C55E",
      price: formattedPrice,
      rawPrice: rawP,
      imageKey: trip.imageKey || "hunza.jpg",
      members: trip.members ? String(trip.members) : "20",
      status: trip.status || "UPCOMING",
      category: trip.category || "Hiking",
      groupSize: trip.groupSize || "15 Max",
      bestSeason: trip.bestSeason || "Spring - Autumn",
      fitnessLevel: trip.fitnessLevel || "Easy",
      tripStartDate: trip.tripStartDate || "",
      tripEndDate: trip.tripEndDate || "",
      numberOfBuses: trip.numberOfBuses || "1",
      additionalServices: Array.isArray(trip.additionalServices) ? trip.additionalServices : [],
      includedFeatures: Array.isArray(trip.includedFeatures) ? trip.includedFeatures : [
        { title: "Guide & Support", desc: "Professional field leaders and expedition team." },
        { title: "Stays & Meals", desc: "Comfortable accommodations and organic meals." },
      ],
      itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : [
        { day: "DAY 01", title: "Arrival & Orientation", desc: "Meet the team and check in.", imageKey: "featured1.jpg" },
      ],
      createdAt: serverTimestamp(),
    };

    // 1. Optimistic local update
    const optimisticTrip = { id: tempId, ...payload, createdAt: new Date() };
    setStore((prev) => {
      const updated = [optimisticTrip, ...prev.trips];
      if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
        try { window.localStorage.setItem(TRIPS_CACHE_KEY, JSON.stringify(updated)); } catch (_) { }
      }
      return {
        ...prev,
        trips: updated,
      };
    });

    // 2. Persist to Firestore
    try {
      console.log("[TRIPS_FIRESTORE_DEBUG] Attempting addDoc with payload:", payload);
      const docRef = await addDoc(collection(db, "trips"), payload);
      console.log("[TRIPS_FIRESTORE_DEBUG] addTrip success! Firestore Document ID:", docRef.id);
      return { id: docRef.id, ...payload };
    } catch (error) {
      console.warn("[TRIPS_FIRESTORE_DEBUG] addTrip error:", error?.code, error?.message);
      throw error;
    }
  };

  const updateTrip = async (id, updatedFields) => {
    console.log(`[TRIPS_FIRESTORE_DEBUG] updateTrip called for ID [${id}]:`, updatedFields);

    // 1. Optimistic local update
    setStore((prev) => {
      const updated = prev.trips.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
      if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
        try { window.localStorage.setItem(TRIPS_CACHE_KEY, JSON.stringify(updated)); } catch (_) { }
      }
      return {
        ...prev,
        trips: updated,
      };
    });

    // 2. Update in Firestore
    try {
      const tripDocRef = doc(db, "trips", id);
      const { id: _ignoreId, ...payload } = updatedFields;
      await updateDoc(tripDocRef, payload);
      console.log(`[TRIPS_FIRESTORE_DEBUG] updateTrip success for ID [${id}]`);
    } catch (error) {
      console.warn(`[TRIPS_FIRESTORE_DEBUG] updateTrip error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  const deleteTrip = async (id) => {
    console.log(`[TRIPS_FIRESTORE_DEBUG] deleteTrip called for ID [${id}]`);

    // 1. Optimistic local update
    setStore((prev) => {
      const updated = prev.trips.filter((t) => t.id !== id);
      if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
        try { window.localStorage.setItem(TRIPS_CACHE_KEY, JSON.stringify(updated)); } catch (_) { }
      }
      return {
        ...prev,
        trips: updated,
      };
    });

    // 2. Delete from Firestore
    try {
      const tripDocRef = doc(db, "trips", id);
      await deleteDoc(tripDocRef);
      console.log(`[TRIPS_FIRESTORE_DEBUG] deleteTrip success for ID [${id}]`);
    } catch (error) {
      console.warn(`[TRIPS_FIRESTORE_DEBUG] deleteTrip error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  // SPONSOR CRUD (Connected to Firestore with optimistic UI updates)
  const addSponsor = async (sponsor) => {
    console.log("[SPONSORS_FIRESTORE_DEBUG] addSponsor called with:", sponsor);
    const tempId = "temp_" + Date.now();
    const payload = {
      sponsorName: sponsor.sponsorName || sponsor.name || "",
      companyName: sponsor.companyName || sponsor.name || "New Sponsor",
      name: sponsor.companyName || sponsor.name || sponsor.sponsorName || "New Sponsor",
      phone: sponsor.phone || sponsor.contactNumber || "",
      email: sponsor.email || sponsor.contact || "",
      contact: sponsor.email || sponsor.contact || sponsor.phone || "",
      package: sponsor.package || "Gold",
      trips: sponsor.trips ? String(sponsor.trips) : "1",
      status: sponsor.status ? String(sponsor.status).toUpperCase() : "ACTIVE",
      createdAt: serverTimestamp(),
    };

    // 1. Optimistic local update
    const optimisticSponsor = { id: tempId, ...payload, createdAt: new Date() };
    setStore((prev) => ({
      ...prev,
      sponsors: [optimisticSponsor, ...prev.sponsors],
    }));

    // 2. Persist to Firestore
    try {
      console.log("[SPONSORS_FIRESTORE_DEBUG] Attempting addDoc with payload:", payload);
      const docRef = await addDoc(collection(db, "sponsors"), payload);
      console.log("[SPONSORS_FIRESTORE_DEBUG] addSponsor success! Firestore Document ID:", docRef.id);
      return { id: docRef.id, ...payload };
    } catch (error) {
      console.warn("[SPONSORS_FIRESTORE_DEBUG] addSponsor error:", error?.code, error?.message);
      throw error;
    }
  };

  const updateSponsor = async (id, updatedFields) => {
    console.log(`[SPONSORS_FIRESTORE_DEBUG] updateSponsor called for ID [${id}]:`, updatedFields);

    // 1. Optimistic local update
    setStore((prev) => ({
      ...prev,
      sponsors: prev.sponsors.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)),
    }));

    // 2. Update in Firestore
    try {
      const sponsorDocRef = doc(db, "sponsors", id);
      const { id: _ignoreId, ...payload } = updatedFields;
      await updateDoc(sponsorDocRef, payload);
      console.log(`[SPONSORS_FIRESTORE_DEBUG] updateSponsor success for ID [${id}]`);
    } catch (error) {
      console.warn(`[SPONSORS_FIRESTORE_DEBUG] updateSponsor error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  const deleteSponsor = async (id) => {
    console.log(`[SPONSORS_FIRESTORE_DEBUG] deleteSponsor called for ID [${id}]`);

    // 1. Optimistic local update
    setStore((prev) => ({
      ...prev,
      sponsors: prev.sponsors.filter((s) => s.id !== id),
    }));

    // 2. Delete from Firestore
    try {
      const sponsorDocRef = doc(db, "sponsors", id);
      await deleteDoc(sponsorDocRef);
      console.log(`[SPONSORS_FIRESTORE_DEBUG] deleteSponsor success for ID [${id}]`);
    } catch (error) {
      console.warn(`[SPONSORS_FIRESTORE_DEBUG] deleteSponsor error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  const updateOfficialPartner = (fields) => {
    const updated = {
      ...store,
      officialPartner: { ...store.officialPartner, ...fields },
    };
    saveStore(updated);
  };

  // GALLERY CRUD (Connected to Firestore with optimistic UI updates)
  const addGalleryItem = async (item) => {
    console.log("[GALLERY_FIRESTORE_DEBUG] addGalleryItem called with:", item);
    const tempId = "temp_" + Date.now();
    const tripTitle = item.tripTitle || item.category || "";
    const category = item.category ? String(item.category).toUpperCase() : (tripTitle ? String(tripTitle).toUpperCase() : "GENERAL");
    const payload = {
      title: item.title || "New Photo",
      tripTitle: tripTitle,
      category: category,
      imageKey: item.imageKey || "gallery1.jpg",
      height: typeof item.height === "number" ? item.height : Number(item.height) || 260,
      createdAt: serverTimestamp(),
    };

    // 1. Optimistic local update
    const optimisticItem = { id: tempId, ...payload, createdAt: new Date() };
    setStore((prev) => ({
      ...prev,
      gallery: [optimisticItem, ...prev.gallery],
    }));

    // 2. Persist to Firestore
    try {
      console.log("[GALLERY_FIRESTORE_DEBUG] Attempting addDoc with payload:", payload);
      const docRef = await addDoc(collection(db, "gallery"), payload);
      console.log("[GALLERY_FIRESTORE_DEBUG] addGalleryItem success! Firestore Document ID:", docRef.id);
      return { id: docRef.id, ...payload };
    } catch (error) {
      console.warn("[GALLERY_FIRESTORE_DEBUG] addGalleryItem error:", error?.code, error?.message);
      throw error;
    }
  };

  const updateGalleryItem = async (id, updatedFields) => {
    console.log(`[GALLERY_FIRESTORE_DEBUG] updateGalleryItem called for ID [${id}]:`, updatedFields);

    // 1. Optimistic local update
    setStore((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...updatedFields } : g)),
    }));

    // 2. Update in Firestore
    try {
      const galleryDocRef = doc(db, "gallery", id);
      const { id: _ignoreId, ...payload } = updatedFields;
      await updateDoc(galleryDocRef, payload);
      console.log(`[GALLERY_FIRESTORE_DEBUG] updateGalleryItem success for ID [${id}]`);
    } catch (error) {
      console.warn(`[GALLERY_FIRESTORE_DEBUG] updateGalleryItem error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  const deleteGalleryItem = async (id) => {
    console.log(`[GALLERY_FIRESTORE_DEBUG] deleteGalleryItem called for ID [${id}]`);

    // 1. Optimistic local update
    setStore((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));

    // 2. Delete from Firestore
    try {
      const galleryDocRef = doc(db, "gallery", id);
      await deleteDoc(galleryDocRef);
      console.log(`[GALLERY_FIRESTORE_DEBUG] deleteGalleryItem success for ID [${id}]`);
    } catch (error) {
      console.warn(`[GALLERY_FIRESTORE_DEBUG] deleteGalleryItem error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  // USER CRUD (Connected to Firestore with local fallback)
  const addUser = async (user) => {
    console.log("[USERS_DEBUG] addUser called with:", user);
    const formattedJoined = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const tempId = Date.now().toString();
    const newUser = {
      id: tempId,
      name: user.name || "",
      email: user.email || "",
      role: normalizeRole(user.role),
      status: normalizeStatus(user.status),
      phone: user.phone || "+92 300 0000000",
      location: user.location || "Islamabad, Pakistan",
      joined: formattedJoined,
    };

    // 1. Instantly update UI state
    setStore((prev) => {
      const updatedUsers = [newUser, ...prev.users.filter((u) => u.id !== tempId)];
      return { ...prev, users: updatedUsers };
    });

    // 2. Persist to Firestore in background
    try {
      const userPayload = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        phone: newUser.phone,
        location: newUser.location,
        joined: formattedJoined,
        createdAt: serverTimestamp(),
      };
      console.log("[USERS_DEBUG] Attempting addDoc with payload:", userPayload);
      const docRef = await addDoc(collection(db, "users"), userPayload);
      console.log("[USERS_DEBUG] addDoc success: Document ID created:", docRef.id);
    } catch (error) {
      console.warn("[USERS_DEBUG] Firestore addDoc warning (saved locally):", error?.code, error?.message);
    }

    return newUser;
  };

  const updateUser = async (id, updatedFields) => {
    console.log(`[USERS_DEBUG] updateUser called for ID [${id}]:`, updatedFields);
    // 1. Instantly update UI state
    setStore((prev) => {
      const updatedUsers = prev.users.map((u) => (u.id === id ? { ...u, ...updatedFields } : u));
      return { ...prev, users: updatedUsers };
    });

    // 2. Persist to Firestore in background
    try {
      const userDocRef = doc(db, "users", id);
      const { id: _ignoreId, ...payload } = updatedFields;
      await updateDoc(userDocRef, payload);
      console.log(`[USERS_DEBUG] updateDoc success for ID [${id}]`);
    } catch (error) {
      console.warn(`[USERS_DEBUG] Firestore updateDoc warning for ID [${id}] (saved locally):`, error?.code, error?.message);
    }
  };

  const deleteUser = async (id) => {
    // Safety check: protect Super Admin
    if (id === "dAA4wFxhnjZHLP5yQA4lwuiSKDv1") {
      console.warn("[USERS_SECURITY] Cannot delete Super Admin account!");
      return;
    }
    console.log(`[USERS_DEBUG] deleteUser called for ID [${id}]`);
    // 1. Instantly update UI state
    setStore((prev) => {
      const updatedUsers = prev.users.filter((u) => u.id !== id);
      return { ...prev, users: updatedUsers };
    });

    // 2. Delete from Firestore in background
    try {
      const userDocRef = doc(db, "users", id);
      await deleteDoc(userDocRef);
      console.log(`[USERS_DEBUG] deleteDoc success for ID [${id}]`);
    } catch (error) {
      console.warn(`[USERS_DEBUG] Firestore deleteDoc warning for ID [${id}] (removed locally):`, error?.code, error?.message);
    }
  };

  const deleteAllUsersExceptSuperAdmin = async () => {
    const SUPER_ADMIN_UID = "dAA4wFxhnjZHLP5yQA4lwuiSKDv1";
    const SUPER_ADMIN_EMAIL = "superadmin@acesclub.com";

    // 1. Instantly filter UI state
    setStore((prev) => {
      const preserved = prev.users.filter(
        (u) => u.id === SUPER_ADMIN_UID || (u.email && u.email.toLowerCase() === SUPER_ADMIN_EMAIL)
      );
      return { ...prev, users: preserved };
    });

    // 2. Delete from Firestore in background
    try {
      const usersToDelete = store.users.filter(
        (u) => u.id !== SUPER_ADMIN_UID && (!u.email || u.email.toLowerCase() !== SUPER_ADMIN_EMAIL)
      );
      for (const u of usersToDelete) {
        try {
          await deleteDoc(doc(db, "users", u.id));
        } catch (e) {
          console.warn("[USERS_DELETE_ALL] Could not delete doc:", u.id, e);
        }
      }
      console.log("[USERS_DELETE_ALL] All users except Super Admin deleted from Firestore.");
    } catch (error) {
      console.error("[USERS_DELETE_ALL] Error deleting users:", error);
    }
  };

  // INQUIRY CRUD (Connected to Firestore with optimistic UI updates)
  const addInquiry = async (inquiry) => {
    console.log("[INQUIRIES_FIRESTORE_DEBUG] addInquiry called with:", inquiry);
    const tempId = "temp_" + Date.now();
    const payload = {
      name: inquiry.name || "Anonymous Traveler",
      email: inquiry.email || "",
      phone: inquiry.phone || "",
      city: inquiry.city || "",
      destination: inquiry.destination || "Northern Areas, Pakistan",
      travelDate: inquiry.travelDate || "",
      travelers: inquiry.travelers || "1 - 2 Person",
      adventureType: inquiry.adventureType || "Hiking",
      message: inquiry.message || "",
      status: inquiry.status ? String(inquiry.status).toUpperCase() : "NEW",
      dateSubmitted: inquiry.dateSubmitted || new Date().toISOString().split("T")[0],
      createdAt: serverTimestamp(),
    };

    // 1. Optimistic local update
    const optimisticInquiry = { id: tempId, ...payload, createdAt: new Date() };
    setStore((prev) => ({
      ...prev,
      inquiries: [optimisticInquiry, ...prev.inquiries],
    }));

    // 2. Persist to Firestore
    try {
      console.log("[INQUIRIES_FIRESTORE_DEBUG] Attempting addDoc with payload:", payload);
      const docRef = await addDoc(collection(db, "inquiries"), payload);
      console.log("[INQUIRIES_FIRESTORE_DEBUG] addInquiry success! Firestore Document ID:", docRef.id);
      return { id: docRef.id, ...payload };
    } catch (error) {
      console.warn("[INQUIRIES_FIRESTORE_DEBUG] addInquiry error:", error?.code, error?.message);
      throw error;
    }
  };

  const updateInquiryStatus = async (id, status) => {
    console.log(`[INQUIRIES_FIRESTORE_DEBUG] updateInquiryStatus called for ID [${id}] with status: ${status}`);
    const normalizedStatus = String(status).toUpperCase();

    // 1. Optimistic local update
    setStore((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) => (inq.id === id ? { ...inq, status: normalizedStatus } : inq)),
    }));

    // 2. Update in Firestore
    try {
      const inquiryDocRef = doc(db, "inquiries", id);
      await updateDoc(inquiryDocRef, { status: normalizedStatus });
      console.log(`[INQUIRIES_FIRESTORE_DEBUG] updateInquiryStatus success for ID [${id}]`);
    } catch (error) {
      console.warn(`[INQUIRIES_FIRESTORE_DEBUG] updateInquiryStatus error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  const deleteInquiry = async (id) => {
    console.log(`[INQUIRIES_FIRESTORE_DEBUG] deleteInquiry called for ID [${id}]`);

    // 1. Optimistic local update
    setStore((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id),
    }));

    // 2. Delete from Firestore
    try {
      const inquiryDocRef = doc(db, "inquiries", id);
      await deleteDoc(inquiryDocRef);
      console.log(`[INQUIRIES_FIRESTORE_DEBUG] deleteInquiry success for ID [${id}]`);
    } catch (error) {
      console.warn(`[INQUIRIES_FIRESTORE_DEBUG] deleteInquiry error for ID [${id}]:`, error?.code, error?.message);
    }
  };

  // CMS UPDATES
  const updateHomeContent = (fields) => {
    const updated = {
      ...store,
      homeContent: { ...store.homeContent, ...fields },
    };
    saveStore(updated);
  };

  const updateAboutContent = (fields) => {
    const updated = {
      ...store,
      aboutContent: { ...store.aboutContent, ...fields },
    };
    saveStore(updated);
  };

  const addGuide = (guide) => {
    const currentGuides = store.aboutContent?.guides || DEFAULT_DATA.aboutContent.guides || [];
    const newGuide = {
      id: guide.id || "guide_" + Date.now(),
      name: (guide.name || "NEW GUIDE").toUpperCase(),
      category: (guide.category || "MOUNTAIN GUIDE").toUpperCase(),
      imageKey: guide.imageKey || "guide1.jpg",
      ...guide,
    };
    const updatedGuides = [...currentGuides, newGuide];
    updateAboutContent({ guides: updatedGuides });
    return newGuide;
  };

  const updateGuide = (guideId, updatedFields) => {
    const currentGuides = store.aboutContent?.guides || DEFAULT_DATA.aboutContent.guides || [];
    const updatedGuides = currentGuides.map((g) => {
      if (g.id === guideId) {
        return {
          ...g,
          ...updatedFields,
          name: updatedFields.name !== undefined ? updatedFields.name.toUpperCase() : g.name,
          category: updatedFields.category !== undefined ? updatedFields.category.toUpperCase() : g.category,
        };
      }
      return g;
    });
    updateAboutContent({ guides: updatedGuides });
  };

  const deleteGuide = (guideId) => {
    const currentGuides = store.aboutContent?.guides || DEFAULT_DATA.aboutContent.guides || [];
    const updatedGuides = currentGuides.filter((g) => g.id !== guideId);
    updateAboutContent({ guides: updatedGuides });
  };

  const updateContactContent = async (fields) => {
    let toPersist = null;
    let socialToSync = null;

    setStore((prev) => {
      const currentContact = prev.contactContent || DEFAULT_DATA.contactContent;
      const currentSocial = prev.socialLinks || DEFAULT_DATA.socialLinks;

      const updatedSocial = {
        ...currentSocial,
        ...(fields.facebook !== undefined && { facebook: fields.facebook }),
        ...(fields.instagram !== undefined && { instagram: fields.instagram }),
        ...(fields.youtube !== undefined && { youtube: fields.youtube }),
        ...(fields.whatsapp !== undefined && { whatsapp: fields.whatsapp }),
      };

      const updatedContact = {
        ...currentContact,
        ...fields,
        facebook: updatedSocial.facebook,
        instagram: updatedSocial.instagram,
        youtube: updatedSocial.youtube,
        whatsapp: updatedSocial.whatsapp,
      };

      const updated = {
        ...prev,
        contactContent: updatedContact,
        socialLinks: updatedSocial,
      };

      toPersist = updated;
      socialToSync = updatedSocial;
      return updated;
    });

    if (toPersist && Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        const { users: _u, trips: _t, sponsors: _s, gallery: _g, inquiries: _i, ...toStore } = toPersist;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (e) {
        console.warn("Could not write DataContext to localStorage", e);
      }
    }

    if (socialToSync && (fields.facebook || fields.instagram || fields.youtube || fields.whatsapp)) {
      try {
        const socialDocRef = doc(db, "settings", "social");
        await setDoc(socialDocRef, socialToSync, { merge: true });
      } catch (err) {
        console.log("[SETTINGS_DEBUG] Firestore social save note:", err?.message);
      }
    }

    try {
      const contactDocRef = doc(db, "settings", "contact");
      const cleanContact = {
        ...(fields.phone !== undefined && { phone: fields.phone }),
        ...(fields.phoneHours !== undefined && { phoneHours: fields.phoneHours }),
        ...(fields.email !== undefined && { email: fields.email }),
        ...(fields.location !== undefined && { location: fields.location }),
        ...(fields.whatsapp !== undefined && { whatsapp: fields.whatsapp }),
      };
      await setDoc(contactDocRef, cleanContact, { merge: true });
    } catch (err) {
      console.log("[SETTINGS_DEBUG] Firestore contact save note:", err?.message);
    }
  };

  const updateSocialLinks = async (fields) => {
    let toPersist = null;
    let socialToSync = null;

    setStore((prev) => {
      const currentSocial = prev.socialLinks || DEFAULT_DATA.socialLinks;
      const currentContact = prev.contactContent || DEFAULT_DATA.contactContent;

      const updatedSocial = {
        ...currentSocial,
        ...fields,
      };

      const updatedContact = {
        ...currentContact,
        ...(fields.facebook !== undefined && { facebook: fields.facebook }),
        ...(fields.instagram !== undefined && { instagram: fields.instagram }),
        ...(fields.youtube !== undefined && { youtube: fields.youtube }),
        ...(fields.whatsapp !== undefined && { whatsapp: fields.whatsapp }),
      };

      const updated = {
        ...prev,
        socialLinks: updatedSocial,
        contactContent: updatedContact,
      };

      toPersist = updated;
      socialToSync = updatedSocial;
      return updated;
    });

    if (toPersist && Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        const { users: _u, trips: _t, sponsors: _s, gallery: _g, inquiries: _i, ...toStore } = toPersist;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (e) {
        console.warn("Could not write DataContext to localStorage", e);
      }
    }

    if (socialToSync) {
      try {
        const socialDocRef = doc(db, "settings", "social");
        await setDoc(socialDocRef, socialToSync, { merge: true });
      } catch (err) {
        console.log("[SETTINGS_DEBUG] Firestore social save note:", err?.message);
      }
    }
  };

  const updateOnboardingContent = (slideKey, fields) => {
    const updated = {
      ...store,
      onboardingContent: {
        ...store.onboardingContent,
        [slideKey]: { ...store.onboardingContent[slideKey], ...fields },
      },
    };
    saveStore(updated);
  };

  const resetToDefaults = () => {
    saveStore(DEFAULT_DATA);
  };

  const addTripCategory = (category) => {
    const trimmed = (category || "").trim();
    if (!trimmed) return;
    setStore((prev) => {
      const current = prev.tripCategories || DEFAULT_DATA.tripCategories;
      if (current.some((c) => c.toLowerCase() === trimmed.toLowerCase())) return prev;
      const updated = { ...prev, tripCategories: [...current, trimmed] };
      saveStore(updated);
      return updated;
    });
  };

  const deleteTripCategory = (category) => {
    const trimmed = (category || "").trim();
    if (!trimmed) return;
    setStore((prev) => {
      const current = prev.tripCategories || DEFAULT_DATA.tripCategories;
      const updatedList = current.filter((c) => c.toLowerCase() !== trimmed.toLowerCase());
      const updated = { ...prev, tripCategories: updatedList.length > 0 ? updatedList : [trimmed] };
      saveStore(updated);
      return updated;
    });
  };

  const addTripBadge = (badge) => {
    const trimmed = (badge || "").trim();
    if (!trimmed) return;
    setStore((prev) => {
      const current = prev.tripBadges || DEFAULT_DATA.tripBadges;
      if (current.some((b) => b.toLowerCase() === trimmed.toLowerCase())) return prev;
      const updated = { ...prev, tripBadges: [...current, trimmed] };
      saveStore(updated);
      return updated;
    });
  };

  const deleteTripBadge = (badge) => {
    const trimmed = (badge || "").trim();
    if (!trimmed) return;
    setStore((prev) => {
      const current = prev.tripBadges || DEFAULT_DATA.tripBadges;
      const updatedList = current.filter((b) => b.toLowerCase() !== trimmed.toLowerCase());
      const updated = { ...prev, tripBadges: updatedList };
      saveStore(updated);
      return updated;
    });
  };

  return (
    <DataContext.Provider
      value={{
        ...store,
        tripsLoading,
        addFeaturedPoster,
        updateFeaturedPoster,
        deleteFeaturedPoster,
        addTripCategory,
        deleteTripCategory,
        addTripBadge,
        deleteTripBadge,
        addTrip,
        updateTrip,
        deleteTrip,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        updateOfficialPartner,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addUser,
        updateUser,
        deleteUser,
        deleteAllUsersExceptSuperAdmin,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateHomeContent,
        updateAboutContent,
        addGuide,
        updateGuide,
        deleteGuide,
        updateContactContent,
        updateSocialLinks,
        updateOnboardingContent,
        seedTripsToFirestore: () => seedDefaultTrips(DEFAULT_DATA.trips),
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataContext;
