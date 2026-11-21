const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, serverTimestamp } = require("firebase/firestore");
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

const SUPER_ADMIN_UID = "dAA4wFxhnjZHLP5yQA4lwuiSKDv1";
const SUPER_ADMIN_EMAIL = "superadmin@acesclub.com";
const SUPER_ADMIN_PASS = "112233445566778899";

async function verifySuperAdmin() {
  console.log("Signing in as Super Admin with email & password...");
  const cred = await signInWithEmailAndPassword(auth, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASS);
  console.log("Successfully authenticated as Super Admin! UID:", cred.user.uid);

  const docRef = doc(db, "users", cred.user.uid);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    console.log("Super Admin doc does not exist. Creating it now...");
    await setDoc(docRef, {
      fullName: "Super Administrator",
      name: "Super Administrator",
      email: SUPER_ADMIN_EMAIL,
      role: "super_admin",
      status: "ACTIVE",
      emailVerified: true,
      phone: "+92 300 0000000",
      location: "Headquarters",
      createdAt: serverTimestamp(),
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    });
    console.log("Created Super Admin user document successfully!");
  } else {
    console.log("Super Admin document already exists. Data:", snap.data());
    await setDoc(docRef, {
      role: "super_admin",
      status: "ACTIVE",
      emailVerified: true
    }, { merge: true });
    console.log("Super Admin user document updated with role 'super_admin' and status 'ACTIVE'.");
  }
}

verifySuperAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error setting super admin:", err);
    process.exit(1);
  });

