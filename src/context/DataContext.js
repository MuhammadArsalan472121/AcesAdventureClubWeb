import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import { db } from "../screens/firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

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
    name: data.name || "Unnamed Sponsor",
    contact: data.contact || "",
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
    category: data.category ? String(data.category).toUpperCase() : "MOUNTAINS",
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

const normalizeTrip = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
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
  trips: [
    {
      id: "1",
      title: "Hunza Explorer",
      badge: "Featured",
      location: "Gilgit, Pakistan",
      description: "Experience breathtaking mountain landscapes, ancient forts, and rich alpine culture.",
      duration: "5 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
      price: "PKR 40,000",
      rawPrice: 40000,
      imageKey: "hunza.jpg",
      members: "24",
      status: "UPCOMING",
      category: "Hiking",
      groupSize: "12 Max",
      bestSeason: "Spring - Autumn",
      fitnessLevel: "Easy-Mod",
      aboutText: "The Hunza Valley Adventure is a journey through one of the most serene and majestic places on earth. Surrounded by iconic peaks such as Rakaposhi, Ultar Sar, and Ladyfinger Peak, this expedition offers an unforgettable blend of natural grandeur and vibrant local culture.\n\nFrom exploring ancient 800-year-old forts like Baltit and Altit to walking alongside tranquil turquoise lakes at Attabad, every day is crafted to provide a deep connection with nature and local mountain traditions.",
      includedFeatures: [
        { title: "Boutique Stays", desc: "Handpicked cozy hotel and riverside lodge accommodations." },
        { title: "Guided Excursions", desc: "Expert local mountain guides leading every trek and site tour." },
        { title: "Photography Spots", desc: "Prime vantage points for sunrise and sunset photography." },
        { title: "Cultural Meals", desc: "Traditional organic cuisine and comfortable 4x4 transport." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Arrival & Karimabad Orientation", desc: "Arrive in Gilgit/Hunza, check in hotel. Evening walk through Karimabad bazaar and welcoming dinner.", imageKey: "featured1.jpg" },
        { day: "DAY 02", title: "Baltit & Altit Forts Exploration", desc: "Visit historic 800-year-old forts, experience local Hunza heritage, and watch sunset at Eagle's Nest.", imageKey: "featured2.jpg" },
        { day: "DAY 03", title: "Attabad Lake & Passu Cones", desc: "Boating on turquoise Attabad Lake, crossing Hussaini Suspension Bridge, and admiring Passu Cathedral.", imageKey: "featured3.jpg" },
      ],
    },
    {
      id: "2",
      title: "Fairy Meadows Trek",
      badge: "Popular",
      location: "Diamer, Pakistan",
      description: "Base camp of mighty Nanga Parbat mountain with pine forests and starry skies.",
      duration: "7 Days",
      difficulty: "Hard",
      difficultyColor: "#EF4444",
      price: "PKR 55,000",
      rawPrice: 55000,
      imageKey: "fairy.jpg",
      members: "16",
      status: "ACTIVE",
      category: "Trekking",
      groupSize: "10 Max",
      bestSeason: "Summer",
      fitnessLevel: "High",
      aboutText: "Fairy Meadows is a magical alpine grassland located at the foot of Nanga Parbat, the 9th highest mountain in the world. Known locally as Joot, this legendary spot offers unmatched panoramic views of Nanga Parbat's massive Raikot Face.\n\nTrekkers navigate thrilling mountain jeep trails followed by a rewarding hike through pine and birch forests to reach high-altitude wooden cabin camps.",
      includedFeatures: [
        { title: "Jeep Safari & Trek", desc: "Exciting 4x4 mountain drive and wilderness trekking guide." },
        { title: "Wooden Cabin Camps", desc: "Authentic timber cabins facing Nanga Parbat glacier." },
        { title: "Alpine Leadership", desc: "Certified mountain guides equipped with safety gear." },
        { title: "Campfire Nights", desc: "Stargazing and cozy evening bonfires beneath snow peaks." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Raikot Bridge to Fairy Meadows", desc: "Jeep ride to Tattu village followed by a 3-hour hike up to Fairy Meadows campsite.", imageKey: "hiking.jpg" },
        { day: "DAY 02", title: "Beyal Camp & Glacier View", desc: "Day hike through alpine forest to Beyal Camp and Raikot Glacier view point.", imageKey: "camping.jpg" },
        { day: "DAY 03", title: "Nanga Parbat Base Camp", desc: "Challenging trek to Nanga Parbat Base Camp (4,000m) and return to Fairy Meadows.", imageKey: "trekking.jpg" },
      ],
    },
    {
      id: "3",
      title: "Skardu Adventure",
      badge: "Recommended",
      location: "Skardu, Pakistan",
      description: "Lakes, cold deserts, and unforgettable Karakoram mountain views.",
      duration: "10 Days",
      difficulty: "Moderate",
      difficultyColor: "#F59E0B",
      price: "PKR 65,000",
      rawPrice: 65000,
      imageKey: "skardu.jpg",
      members: "18",
      status: "UPCOMING",
      category: "Camping",
      groupSize: "14 Max",
      bestSeason: "May - Oct",
      fitnessLevel: "Moderate",
      aboutText: "Skardu is the gateway to some of the highest peaks on Earth. This 10-day comprehensive expedition takes you through Katpana Cold Desert, Shangrila Lake, Upper Kachura Lake, and the vast high-altitude plains of Deosai National Park.\n\nExperience dramatic contrasts where sand dunes meet snow-capped peaks, crystal glaciers flow into turquoise lakes, and ancient Tibetan culture welcomes travelers.",
      includedFeatures: [
        { title: "Lakes & Deserts", desc: "Explore Shangrila Resort, Kachura Lake, and Katpana Cold Dunes." },
        { title: "Deosai Plateau Tour", desc: "Day excursion to the world's second highest plateau at 4,114m." },
        { title: "Resort & Glamping", desc: "Mix of luxury lakefront resort stays and wilderness camping." },
        { title: "Fort & Heritage Visit", desc: "Guided tour of Khaplu Palace and Shigar Fort cultural sites." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Skardu Arrival & Shangrila Lake", desc: "Arrive in Skardu, visit Lower Kachura (Shangrila Lake) and relax by the water.", imageKey: "hub3.jpg" },
        { day: "DAY 02", title: "Katpana Dunes & Shigar Valley", desc: "Experience cold desert quad biking and explore historic Shigar Fort Palace.", imageKey: "hub2.jpg" },
        { day: "DAY 03", title: "Deosai Plains & Sheosar Lake", desc: "Full day safari across Deosai National Park, brown bear territory and Sheosar Lake.", imageKey: "hub1.jpg" },
      ],
    },
    {
      id: "4",
      title: "Naran Valley Escape",
      badge: "Trending",
      location: "Mansehra, Pakistan",
      description: "Enjoy lush green valleys, babbling Kunhar river, and alpine lake views.",
      duration: "4 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
      price: "PKR 35,000",
      rawPrice: 35000,
      imageKey: "naran.jpg",
      members: "20",
      status: "UPCOMING",
      category: "Hiking",
      groupSize: "16 Max",
      bestSeason: "Summer",
      fitnessLevel: "Easy",
      aboutText: "Naran Valley in Kaghan is one of Pakistan's most popular mountain escapes. Surrounded by pine forests, roaring Kunhar river waters, and majestic alpine lakes like Saif-ul-Malook, this trip is ideal for families, solo explorers, and casual hikers.\n\nWitness the mythical beauty of Lake Saif-ul-Malook under clear blue skies, trek along Pyala Lake, and cross Babusar Top at 4,173 meters.",
      includedFeatures: [
        { title: "Lake Saif-ul-Malook", desc: "Jeep excursion to the world-famous legendary fairy lake." },
        { title: "River Rafting", desc: "Optional white water rafting experience along Kunhar River." },
        { title: "Babusar Top Pass", desc: "Scenic drive up to Babusar Pass with panoramic valley views." },
        { title: "Family Friendly Hikes", desc: "Gentle nature trails suitable for all fitness levels." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Drive to Naran Valley", desc: "Travel through Abbottabad and Mansehra, arriving at Naran alongside Kunhar River.", imageKey: "nature.jpg" },
        { day: "DAY 02", title: "Saif-ul-Malook Lake Excursion", desc: "Jeep ride to Lake Saif-ul-Malook, boat rides, and optional short hike up surrounding slopes.", imageKey: "hiking.jpg" },
        { day: "DAY 03", title: "Lulusar Lake & Babusar Pass", desc: "Drive up Kaghan valley to pristine Lulusar Lake and scenic Babusar Top.", imageKey: "aboutTrip.jpg" },
      ],
    },
    {
      id: "5",
      title: "Swat Valley Escape",
      badge: "Seasonal",
      location: "Swat, Khyber Pakhtunkhwa",
      description: "Switzerland of the East with river trails, pine forests, and emerald lakes.",
      duration: "4 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
      price: "PKR 38,000",
      rawPrice: 38000,
      imageKey: "nature.jpg",
      members: "20",
      status: "UPCOMING",
      category: "Nature Trails",
      groupSize: "15 Max",
      bestSeason: "All Year",
      fitnessLevel: "Easy",
      aboutText: "Swat Valley, often referred to as the Switzerland of the East, is renowned for its verdant river valleys, thick pine wilderness, roaring Swat River, and snow-capped peaks. From Kalam to Ushu Forest and Mahodand Lake, this escape provides pure bliss for nature lovers.\n\nTake peaceful walks through cedar forests, enjoy trout fishing, and experience warm Pashtun mountain hospitality.",
      includedFeatures: [
        { title: "Ushu Pine Forest Walk", desc: "Peaceful walks among towering centuries-old cedar and pine trees." },
        { title: "Mahodand Lake Safari", desc: "4x4 excursion to Mahodand Lake surrounded by mountain streams." },
        { title: "Trout Special Dinners", desc: "Fresh river trout barbecue dinner in Kalam valley." },
        { title: "Malam Jabba Ski Resort", desc: "Visit to Malam Jabba chairlifts and alpine activity park." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Arrival in Mingora & Kalam", desc: "Drive along Swat motorway and riverside road to reach scenic Kalam valley.", imageKey: "gallery6.jpg" },
        { day: "DAY 02", title: "Ushu Forest & Mahodand Lake", desc: "Jeep trip through Ushu cedar forest to Mahodand and Blue Water streams.", imageKey: "gallery3.jpg" },
        { day: "DAY 03", title: "White Palace & Malam Jabba", desc: "Explore Saidu Sharif historical sites, White Palace, and Malam Jabba chairlift.", imageKey: "about-bg.jpg" },
      ],
    },
    {
      id: "6",
      title: "Kumrat Valley Wilderness",
      badge: "Popular",
      location: "Upper Dir, Khyber Pakhtunkhwa",
      description: "Dense Deodar forests, cascading Panjkora river, and untouched alpine meadows.",
      duration: "5 Days",
      difficulty: "Moderate",
      difficultyColor: "#F59E0B",
      price: "PKR 42,000",
      rawPrice: 42000,
      imageKey: "camping.jpg",
      members: "18",
      status: "UPCOMING",
      category: "Camping",
      groupSize: "14 Max",
      bestSeason: "Summer - Autumn",
      fitnessLevel: "Easy-Mod",
      aboutText: "Kumrat Valley is a hidden natural jewel located in Upper Dir. Famed for its dense tall Deodar pine forests, crystal-clear Panjkora river, and cascading Jahaz Banda waterfall, Kumrat remains one of the most serene off-grid escapes in Pakistan.\n\nTrek up to Jahaz Banda meadows and Katora Lake for an awe-inspiring high-altitude wilderness adventure.",
      includedFeatures: [
        { title: "Deodar Forest Camping", desc: "Overnight luxury tent camping under thick pine and Deodar trees." },
        { title: "Jahaz Banda Meadows Trek", desc: "Guided day hike up to Jahaz Banda high-altitude grass meadows." },
        { title: "Katora Glacial Lake", desc: "Excursion to bowl-shaped alpine lake surrounded by snow peaks." },
        { title: "Off-Grid Experience", desc: "Unplug from city noise with campfire music and fresh air." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Drive to Upper Dir & Kumrat", desc: "Travel to Dir Upper, transfer to 4x4 jeeps to enter Kumrat valley along Panjkora river.", imageKey: "camping.jpg" },
        { day: "DAY 02", title: "Kala Chashma & Waterfall Trail", desc: "Walk through dense Deodar forest to Kala Chashma and Kumrat Waterfall.", imageKey: "nature.jpg" },
        { day: "DAY 03", title: "Jahaz Banda Trek & Katora Lake", desc: "Hike up to Jahaz Banda meadows and continue trek to alpine Katora Lake.", imageKey: "trekking.jpg" },
      ],
    },
    {
      id: "7",
      title: "Deosai Plains Expedition",
      badge: "Trending",
      location: "Skardu & Astore, Pakistan",
      description: "Explore the Land of Giants, high-altitude alpine plateaus, and pristine glacial lakes.",
      duration: "6 Days",
      difficulty: "Moderate",
      difficultyColor: "#F59E0B",
      price: "PKR 48,000",
      rawPrice: 48000,
      imageKey: "trekking.jpg",
      members: "15",
      status: "UPCOMING",
      category: "Trekking",
      groupSize: "12 Max",
      bestSeason: "July - Sept",
      fitnessLevel: "Moderate",
      aboutText: "Deosai National Park is the second highest plateau on Earth, sitting at an average elevation of 4,114 meters. Known as the 'Land of Giants', Deosai turns into a blooming field of hundreds of wild flower species during summer months.\n\nSpot Himalayan Brown Bears, camp beside Sheosar Lake, and gaze at endless starry horizons across the vast plateau.",
      includedFeatures: [
        { title: "High Altitude Safari", desc: "Open-top 4x4 safari across the 4,100m high-altitude plateau." },
        { title: "Sheosar Lake Camping", desc: "Glamping beside the crystal clear waters of Sheosar Lake." },
        { title: "Wildlife Spotting", desc: "Guided observation for Himalayan Brown Bears and golden marmots." },
        { title: "Bara Pani Crossing", desc: "Cross wooden bridges over crystal glacial rivers of Deosai." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Skardu to Deosai Plateau", desc: "Ascend from Skardu through Satpara Lake up to Deosai National Park gate.", imageKey: "hub1.jpg" },
        { day: "DAY 02", title: "Sheosar Lake Wilderness Camp", desc: "Trek across wildflower fields and camp under the stars at Sheosar Lake.", imageKey: "hub2.jpg" },
        { day: "DAY 03", title: "Astore Valley Descent", desc: "Cross Bara Pani wooden bridge and descend through scenic Astore gorge.", imageKey: "hub3.jpg" },
      ],
    },
    {
      id: "8",
      title: "K2 Base Camp Expedition",
      badge: "Elite",
      location: "Baltoro Glacier, Pakistan",
      description: "The ultimate expedition beneath the world's most formidable peak.",
      duration: "14 Days",
      difficulty: "Hard",
      difficultyColor: "#EF4444",
      price: "PKR 140,000",
      rawPrice: 140000,
      imageKey: "featured1.jpg",
      members: "12",
      status: "UPCOMING",
      category: "Trekking",
      groupSize: "8 Max",
      bestSeason: "Summer",
      fitnessLevel: "Extreme",
      aboutText: "The K2 Base Camp Trek via Baltoro Glacier is widely regarded as the ultimate mountain trekking experience on planet Earth. Navigating through Concordia — the 'Throne Room of the Mountain Gods' — trekkers stand surrounded by four 8,000m peaks: K2, Broad Peak, Gasherbrum I, and Gasherbrum II.\n\nThis expedition requires high physical fitness, endurance, and spirit of adventure, supported by our top-tier high-altitude guides and porter teams.",
      includedFeatures: [
        { title: "Concordia & K2 Base", desc: "Trek to Concordia and K2 Base Camp (5,100m elevation)." },
        { title: "High Altitude Team", desc: "Certified mountain guides, kitchen crew, and porter support." },
        { title: "Satellite Communication", desc: "24/7 satellite emergency phone and safety gear." },
        { title: "Full Expedition Gear", desc: "Extreme temperature tents, sleeping pads, and warm dining dome." },
      ],
      itinerary: [
        { day: "DAY 01", title: "Skardu to Askole Jeep Drive", desc: "Scenic and thrilling 4x4 drive along Braldu river to Askole village, starting point of trek.", imageKey: "featured1.jpg" },
        { day: "DAY 02", title: "Jhula & Paiju Glacier Camp", desc: "Trek through dramatic granite canyon to Jhula camp and on towards Paiju trees.", imageKey: "featured2.jpg" },
        { day: "DAY 03", title: "Concordia & K2 Base Camp", desc: "Step onto Baltoro Glacier, trek to Concordia 'Throne Room of Gods', and reach K2 Base.", imageKey: "featured3.jpg" },
      ],
    },
  ],

  sponsors: [
    {
      id: "1",
      name: "Mountain Gear Pakistan",
      contact: "info@mountaingear.pk",
      package: "Platinum",
      trips: "8",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Adventure World",
      contact: "contact@adventureworld.com",
      package: "Gold",
      trips: "5",
      status: "ACTIVE",
    },
    {
      id: "3",
      name: "Peak Sports",
      contact: "hello@peaksports.pk",
      package: "Silver",
      trips: "3",
      status: "ACTIVE",
    },
    {
      id: "4",
      name: "Travel Heights",
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

  users: [
    {
      id: "1",
      name: "Alex Mercer",
      email: "admin@acesclub.com",
      role: "Super Admin",
      status: "ACTIVE",
      joined: "Oct 12, 2024",
      phone: "+92 300 0000000",
      location: "Islamabad, Pakistan",
    },
    {
      id: "2",
      name: "Sophia Miller",
      email: "sophia.m@acesclub.com",
      role: "Elite Voyager",
      status: "ACTIVE",
      joined: "Oct 12, 2024",
      phone: "+92 300 1112233",
      location: "Lahore, Pakistan",
    },
    {
      id: "3",
      name: "James Kovic",
      email: "j.kovic@adventure.org",
      role: "Member",
      status: "ACTIVE",
      joined: "Oct 10, 2024",
      phone: "+92 312 4445566",
      location: "Rawalpindi, Pakistan",
    },
    {
      id: "4",
      name: "Aris Loucas",
      email: "loucas.a@travel.co",
      role: "Sponsor Rep",
      status: "INACTIVE",
      joined: "Oct 05, 2024",
      phone: "+92 333 7778899",
      location: "Karachi, Pakistan",
    },
    {
      id: "5",
      name: "Elena Volkov",
      email: "elena.v@expeditions.net",
      role: "Elite Voyager",
      status: "ACTIVE",
      joined: "Sep 28, 2024",
      phone: "+92 321 9990011",
      location: "Islamabad, Pakistan",
    },
  ],

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
    phone: "+92 312 5556789",
    phoneHours: "Mon–Fri, 9am - 6pm PKT",
    email: "hello@acesadventure.com",
    emailSubtitle: "Inquiry & Support",
    location: "Attock, Punjab, Pakistan",
    locationSubtitle: "The Gateway to the North",
    goldStandards: [
      "Carefully Curated Adventures",
      "Safe and Expert-Guided Experiences",
      "Luxury Off-grid Accommodations",
      "24/7 Concierge for Expeditions",
      "Sustainability & Minimal Impact",
    ],
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
};

const STORAGE_KEY = "aces_adventure_club_v3_store";

const DataContext = createContext({
  ...DEFAULT_DATA,
  // CRUD operations
  addTrip: (_trip) => {},
  updateTrip: (_id, _updatedFields) => {},
  deleteTrip: (_id) => {},
  addSponsor: (_sponsor) => {},
  updateSponsor: (_id, _updatedFields) => {},
  deleteSponsor: (_id) => {},
  updateOfficialPartner: (_fields) => {},
  addGalleryItem: (_item) => {},
  updateGalleryItem: (_id, _updatedFields) => {},
  deleteGalleryItem: (_id) => {},
  addUser: (_user) => {},
  updateUser: (_id, _updatedFields) => {},
  deleteUser: (_id) => {},
  addInquiry: (_inquiry) => {},
  updateInquiryStatus: (_id, _status) => {},
  deleteInquiry: (_id) => {},
  updateHomeContent: (_fields) => {},
  updateAboutContent: (_fields) => {},
  updateContactContent: (_fields) => {},
  updateOnboardingContent: (_slideKey, _fields) => {},
  resetToDefaults: () => {},
});

export const DataProvider = ({ children }) => {
  const [store, setStore] = useState(DEFAULT_DATA);

  console.log("[USERS_DEBUG] DataProvider mounted. Current store.users count:", store.users.length);

  // Load persisted store from localStorage on init (excluding users, trips, sponsors, gallery, and inquiries collections managed by Firestore)
  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
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
            contactContent: { ...prev.contactContent, ...(parsed.contactContent || {}) },
            onboardingContent: { ...prev.onboardingContent, ...(parsed.onboardingContent || {}) },
          }));
        }
      } catch (e) {
        console.warn("[USERS_DEBUG] Could not read DataContext from localStorage", e);
      }
    }
  }, []);

  // Real-time Firestore listener for Users collection
  useEffect(() => {
    console.log("[ADMIN_USERS_READ_DEBUG] 1. Firebase project currently used by Admin Panel:", db?.app?.options?.projectId);
    console.log("[ADMIN_USERS_READ_DEBUG] 2. Firestore instance currently used by DataContext:", db);
    console.log("[ADMIN_USERS_READ_DEBUG] 3. Exact collection path being listened to: users");
    console.log("[ADMIN_USERS_READ_DEBUG] 4. Firestore users listener starting...");

    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        console.log(`[ADMIN_USERS_READ_DEBUG] 5. Number of documents received by onSnapshot: ${snapshot.docs.length}`);
        console.log("[ADMIN_USERS_READ_DEBUG] 6. Every received document ID:", snapshot.docs.map(d => d.id));
        console.log("[ADMIN_USERS_READ_DEBUG] 7. Every received document details:", snapshot.docs.map(d => {
          const data = d.data();
          return { id: d.id, email: data.email, name: data.name || data.fullName, role: data.role, status: data.status };
        }));

        const fetchedUsers = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || data.fullName || "Member",
            email: data.email || "",
            role: normalizeRole(data.role),
            status: normalizeStatus(data.status),
            joined: normalizeJoined(data.joined, data.createdAt),
            phone: data.phone || "",
            location: data.location || "",
            createdAt: data.createdAt || null,
          };
        });

        console.log(`[ADMIN_USERS_READ_DEBUG] 8. Normalized users array length: ${fetchedUsers.length}`);

        setStore((prev) => {
          const merged = mergeUsersLists(fetchedUsers, prev.users && prev.users.length ? prev.users : DEFAULT_DATA.users);
          console.log(`[ADMIN_USERS_READ_DEBUG] DataContext store.users updated with merged length: ${merged.length}`);
          return {
            ...prev,
            users: merged,
          };
        });
      },
      (error) => {
        console.warn("[ADMIN_USERS_READ_DEBUG] Firestore listener warning (retaining local/default users):", error?.code, error?.message);
      }
    );

    return () => {
      console.log("[ADMIN_USERS_READ_DEBUG] Unsubscribing Firestore listener for 'users'");
      unsubscribe();
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

        if (snapshot.empty || snapshot.docs.length === 0) {
          console.log("[TRIPS_FIRESTORE_DEBUG] Firestore trips collection is empty. Triggering automatic seed...");
          seedDefaultTrips(DEFAULT_DATA.trips);
          setStore((prev) => ({
            ...prev,
            trips: prev.trips && prev.trips.length ? prev.trips : DEFAULT_DATA.trips,
          }));
        } else {
          const fetchedTrips = snapshot.docs.map(normalizeTrip);
          setStore((prev) => {
            const mergedTrips = mergeTripsLists(fetchedTrips, prev.trips && prev.trips.length ? prev.trips : DEFAULT_DATA.trips);
            console.log(`[TRIPS_FIRESTORE_DEBUG] DataContext store.trips updated with merged length: ${mergedTrips.length}`);
            return {
              ...prev,
              trips: mergedTrips,
            };
          });
        }
      },
      (error) => {
        console.warn(`[TRIPS_FIRESTORE_DEBUG] listener error (retaining default trips): ${error?.code || ''} ${error?.message || error}`);
        setStore((prev) => ({
          ...prev,
          trips: prev.trips && prev.trips.length ? prev.trips : DEFAULT_DATA.trips,
        }));
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
          console.log("[SPONSORS_FIRESTORE_DEBUG] Firestore sponsors collection is empty. Triggering automatic seed...");
          seedDefaultSponsors(DEFAULT_DATA.sponsors);
          setStore((prev) => ({
            ...prev,
            sponsors: prev.sponsors && prev.sponsors.length ? prev.sponsors : DEFAULT_DATA.sponsors,
          }));
        } else {
          const fetchedSponsors = snapshot.docs.map(normalizeSponsor);
          setStore((prev) => {
            const mergedSponsors = mergeSponsorsLists(fetchedSponsors, prev.sponsors && prev.sponsors.length ? prev.sponsors : DEFAULT_DATA.sponsors);
            console.log(`[SPONSORS_FIRESTORE_DEBUG] DataContext store.sponsors updated with merged length: ${mergedSponsors.length}`);
            return {
              ...prev,
              sponsors: mergedSponsors,
            };
          });
        }
      },
      (error) => {
        console.warn(`[SPONSORS_FIRESTORE_DEBUG] listener error (retaining default sponsors): ${error?.code || ''} ${error?.message || error}`);
        setStore((prev) => ({
          ...prev,
          sponsors: prev.sponsors && prev.sponsors.length ? prev.sponsors : DEFAULT_DATA.sponsors,
        }));
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
          console.log("[GALLERY_FIRESTORE_DEBUG] Firestore gallery collection is empty. Triggering automatic seed...");
          seedDefaultGallery(DEFAULT_DATA.gallery);
          setStore((prev) => ({
            ...prev,
            gallery: prev.gallery && prev.gallery.length ? prev.gallery : DEFAULT_DATA.gallery,
          }));
        } else {
          const fetchedGallery = snapshot.docs.map(normalizeGalleryItem);
          setStore((prev) => {
            const mergedGallery = mergeGalleryLists(fetchedGallery, prev.gallery && prev.gallery.length ? prev.gallery : DEFAULT_DATA.gallery);
            console.log(`[GALLERY_FIRESTORE_DEBUG] DataContext store.gallery updated with merged length: ${mergedGallery.length}`);
            return {
              ...prev,
              gallery: mergedGallery,
            };
          });
        }
      },
      (error) => {
        console.warn(`[GALLERY_FIRESTORE_DEBUG] listener error (retaining default gallery): ${error?.code || ''} ${error?.message || error}`);
        setStore((prev) => ({
          ...prev,
          gallery: prev.gallery && prev.gallery.length ? prev.gallery : DEFAULT_DATA.gallery,
        }));
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

    const tempId = "temp_" + Date.now();
    const payload = {
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
    setStore((prev) => ({
      ...prev,
      trips: [optimisticTrip, ...prev.trips],
    }));

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
    setStore((prev) => ({
      ...prev,
      trips: prev.trips.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
    }));

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
    setStore((prev) => ({
      ...prev,
      trips: prev.trips.filter((t) => t.id !== id),
    }));

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
      name: sponsor.name || "New Sponsor",
      contact: sponsor.contact || "",
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
    const payload = {
      title: item.title || "New Photo",
      category: item.category ? String(item.category).toUpperCase() : "MOUNTAINS",
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

    // 1. Instantly update UI state and local storage
    setStore((prev) => {
      const updatedUsers = [newUser, ...prev.users.filter((u) => u.id !== tempId)];
      const updatedStore = { ...prev, users: updatedUsers };
      saveStore(updatedStore);
      return updatedStore;
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
    // 1. Instantly update UI state and local storage
    setStore((prev) => {
      const updatedUsers = prev.users.map((u) => (u.id === id ? { ...u, ...updatedFields } : u));
      const updatedStore = { ...prev, users: updatedUsers };
      saveStore(updatedStore);
      return updatedStore;
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
    console.log(`[USERS_DEBUG] deleteUser called for ID [${id}]`);
    // 1. Instantly update UI state and local storage
    setStore((prev) => {
      const updatedUsers = prev.users.filter((u) => u.id !== id);
      const updatedStore = { ...prev, users: updatedUsers };
      saveStore(updatedStore);
      return updatedStore;
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

  // INQUIRY CRUD (Connected to Firestore with optimistic UI updates)
  const addInquiry = async (inquiry) => {
    console.log("[INQUIRIES_FIRESTORE_DEBUG] addInquiry called with:", inquiry);
    const tempId = "temp_" + Date.now();
    const payload = {
      name: inquiry.name || "Anonymous Traveler",
      email: inquiry.email || "",
      phone: inquiry.phone || "",
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

  const updateContactContent = (fields) => {
    const updated = {
      ...store,
      contactContent: { ...store.contactContent, ...fields },
    };
    saveStore(updated);
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

  return (
    <DataContext.Provider
      value={{
        ...store,
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
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateHomeContent,
        updateAboutContent,
        updateContactContent,
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
