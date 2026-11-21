const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, serverTimestamp } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCRJw3PyOjkmcVVjKxItQB7qa75RA6Z0hM",
  authDomain: "adventuresacesclub.firebaseapp.com",
  projectId: "adventuresacesclub",
  storageBucket: "adventuresacesclub.firebasestorage.app",
  messagingSenderId: "1017011729372",
  appId: "1:1017011729372:web:3514640408ec101f991519",
  measurementId: "G-687NLPDK9L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SUPER_ADMIN_EMAIL = "superadmin@acesclub.com";
const SUPER_ADMIN_PASS = "112233445566778899";

const defaultGaliyatPoster = {
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
    "Luxury Transport",
    "Delicious Dinner",
    "Bonfire Night",
    "Music & Entertainment",
  ],
  whatsappMessage: "Hello Ace Adventure Club! I want to book my seat for the Galiyat Trip.",
  status: "ACTIVE",
  createdAt: serverTimestamp(),
};

async function seedFeaturedPosters() {
  console.log("Authenticating as Super Admin...");
  const cred = await signInWithEmailAndPassword(auth, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASS);
  console.log("Logged in! UID:", cred.user.uid);

  const postersCol = collection(db, "featured_posters");
  const snap = await getDocs(postersCol);
  console.log("Current featured_posters count in Firestore:", snap.size);

  if (snap.empty || snap.size === 0) {
    console.log("featured_posters collection is empty or does not exist. Adding Galiyat tour document...");
    const docRef = await addDoc(postersCol, defaultGaliyatPoster);
    console.log("SUCCESS! Created featured_posters document ID:", docRef.id);
  } else {
    console.log("Existing documents found:");
    snap.forEach((d) => console.log("Doc ID:", d.id, "Title:", d.data().title));
  }
}

seedFeaturedPosters()
  .then(() => {
    console.log("Done! Check your Firebase Console under Firestore Database -> featured_posters.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating featured_posters:", err);
    process.exit(1);
  });
