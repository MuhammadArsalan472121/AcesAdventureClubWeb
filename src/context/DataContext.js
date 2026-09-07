import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";

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

export const resolveAsset = (imageRef, fallback = "hero.jpg") => {
  if (!imageRef) return ASSET_MAP[fallback] || { uri: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800" };
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
  }
  return ASSET_MAP[fallback] || { uri: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800" };
};

// Initial default demo data synced across the entire Aces Adventure Club web application
const DEFAULT_DATA = {
  trips: [
    {
      id: "1",
      title: "Hunza Explorer",
      badge: "Featured",
      location: "Gilgit, Pakistan",
      description: "Experience breathtaking mountain landscapes and culture.",
      duration: "5 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
      price: "PKR 40,000",
      rawPrice: 40000,
      imageKey: "hunza.jpg",
      members: "24",
      status: "UPCOMING",
      category: "Hiking",
    },
    {
      id: "2",
      title: "Fairy Meadows Trek",
      badge: "Popular",
      location: "Diamer, Pakistan",
      description: "Base camp of mighty Nanga Parbat mountain.",
      duration: "7 Days",
      difficulty: "Hard",
      difficultyColor: "#EF4444",
      price: "PKR 55,000",
      rawPrice: 55000,
      imageKey: "fairy.jpg",
      members: "16",
      status: "ACTIVE",
      category: "Trekking",
    },
    {
      id: "3",
      title: "Skardu Adventure",
      badge: "Recommended",
      location: "Skardu, Pakistan",
      description: "Lakes, cold deserts and unforgettable mountain views.",
      duration: "10 Days",
      difficulty: "Moderate",
      difficultyColor: "#F59E0B",
      price: "PKR 65,000",
      rawPrice: 65000,
      imageKey: "skardu.jpg",
      members: "18",
      status: "UPCOMING",
      category: "Camping",
    },
    {
      id: "4",
      title: "Naran Valley Escape",
      badge: "Trending",
      location: "Mansehra, Pakistan",
      description: "Enjoy lush green valleys and alpine lake views.",
      duration: "4 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
      price: "PKR 35,000",
      rawPrice: 35000,
      imageKey: "naran.jpg",
      members: "20",
      status: "UPCOMING",
      category: "Hiking",
    },
    {
      id: "5",
      title: "Swat Valley Escape",
      badge: "Seasonal",
      location: "Swat, Khyber Pakhtunkhwa",
      description: "Switzerland of the East with river trails and pine forests.",
      duration: "4 Days",
      difficulty: "Easy",
      difficultyColor: "#22C55E",
      price: "PKR 38,000",
      rawPrice: 38000,
      imageKey: "nature.jpg",
      members: "20",
      status: "DRAFT",
      category: "Nature Trails",
    },
    {
      id: "6",
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

const STORAGE_KEY = "aces_adventure_club_v2_store";

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

  // Load persisted store from localStorage on init
  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setStore((prev) => ({
            ...prev,
            ...parsed,
            // Ensure any new structure defaults are preserved
            homeContent: { ...prev.homeContent, ...(parsed.homeContent || {}) },
            aboutContent: { ...prev.aboutContent, ...(parsed.aboutContent || {}) },
            contactContent: { ...prev.contactContent, ...(parsed.contactContent || {}) },
            onboardingContent: { ...prev.onboardingContent, ...(parsed.onboardingContent || {}) },
          }));
        }
      } catch (e) {
        console.warn("Could not read DataContext from localStorage", e);
      }
    }
  }, []);

  // Save changes to localStorage
  const saveStore = (updated) => {
    setStore(updated);
    if (Platform.OS === "web" && typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not write DataContext to localStorage", e);
      }
    }
  };

  // TRIP CRUD
  const addTrip = (trip) => {
    const newTrip = {
      id: Date.now().toString(),
      status: "UPCOMING",
      category: "Hiking",
      difficultyColor: "#22C55E",
      imageKey: "hunza.jpg",
      members: "0",
      ...trip,
    };
    const updated = { ...store, trips: [newTrip, ...store.trips] };
    saveStore(updated);
    return newTrip;
  };

  const updateTrip = (id, updatedFields) => {
    const updated = {
      ...store,
      trips: store.trips.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
    };
    saveStore(updated);
  };

  const deleteTrip = (id) => {
    const updated = {
      ...store,
      trips: store.trips.filter((t) => t.id !== id),
    };
    saveStore(updated);
  };

  // SPONSOR CRUD
  const addSponsor = (sponsor) => {
    const newSponsor = {
      id: Date.now().toString(),
      status: "ACTIVE",
      package: "Gold",
      trips: "1",
      ...sponsor,
    };
    const updated = { ...store, sponsors: [newSponsor, ...store.sponsors] };
    saveStore(updated);
    return newSponsor;
  };

  const updateSponsor = (id, updatedFields) => {
    const updated = {
      ...store,
      sponsors: store.sponsors.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)),
    };
    saveStore(updated);
  };

  const deleteSponsor = (id) => {
    const updated = {
      ...store,
      sponsors: store.sponsors.filter((s) => s.id !== id),
    };
    saveStore(updated);
  };

  const updateOfficialPartner = (fields) => {
    const updated = {
      ...store,
      officialPartner: { ...store.officialPartner, ...fields },
    };
    saveStore(updated);
  };

  // GALLERY CRUD
  const addGalleryItem = (item) => {
    const newItem = {
      id: Date.now().toString(),
      category: "MOUNTAINS",
      height: 250,
      imageKey: "gallery1.jpg",
      ...item,
    };
    const updated = { ...store, gallery: [newItem, ...store.gallery] };
    saveStore(updated);
    return newItem;
  };

  const updateGalleryItem = (id, updatedFields) => {
    const updated = {
      ...store,
      gallery: store.gallery.map((g) => (g.id === id ? { ...g, ...updatedFields } : g)),
    };
    saveStore(updated);
  };

  const deleteGalleryItem = (id) => {
    const updated = {
      ...store,
      gallery: store.gallery.filter((g) => g.id !== id),
    };
    saveStore(updated);
  };

  // USER CRUD
  const addUser = (user) => {
    const newUser = {
      id: Date.now().toString(),
      role: "Member",
      status: "ACTIVE",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      ...user,
    };
    const updated = { ...store, users: [newUser, ...store.users] };
    saveStore(updated);
    return newUser;
  };

  const updateUser = (id, updatedFields) => {
    const updated = {
      ...store,
      users: store.users.map((u) => (u.id === id ? { ...u, ...updatedFields } : u)),
    };
    saveStore(updated);
  };

  const deleteUser = (id) => {
    const updated = {
      ...store,
      users: store.users.filter((u) => u.id !== id),
    };
    saveStore(updated);
  };

  // INQUIRY CRUD
  const addInquiry = (inquiry) => {
    const newInquiry = {
      id: Date.now().toString(),
      status: "NEW",
      dateSubmitted: new Date().toISOString().split("T")[0],
      ...inquiry,
    };
    const updated = { ...store, inquiries: [newInquiry, ...store.inquiries] };
    saveStore(updated);
    return newInquiry;
  };

  const updateInquiryStatus = (id, status) => {
    const updated = {
      ...store,
      inquiries: store.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    };
    saveStore(updated);
  };

  const deleteInquiry = (id) => {
    const updated = {
      ...store,
      inquiries: store.inquiries.filter((inq) => inq.id !== id),
    };
    saveStore(updated);
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
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataContext;
